import { NextRequest, NextResponse } from 'next/server'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ''

const SYSTEM_PROMPT = `You are the WastedApe Tech AI assistant — a sharp, no-BS sales and support bot for WastedApe Tech (wastedape.org).

## What WastedApe Tech Does
Founded and run by Daniel Bloom — 20+ years industrial IT/controls experience, 10+ AI apps in production. Veteran-owned (USMC).

### AI & Software Services
- Custom AI Telegram bots — from $150 setup, delivered in 3–5 days
- AI-powered web apps (Next.js + Claude/GPT + Supabase + Stripe) — from $500, 7–14 days
- Voice AI systems (Deepgram STT + ElevenLabs TTS + phone integration) — from $300
- Automation & scripting (Python/Node.js, web scraping, API integrations) — from $75

### Industrial Consulting (On-site eastern OH/WV or remote nationwide)
- PLC/SCADA consulting — $75–$150/hr (Siemens S7/TIA Portal, Allen-Bradley/Studio 5000, Eaton CoDeSys)
- HMI configuration, VFD programming, OT network design
- CANbus, LIN bus, J1939, PROFINET

### Data Center Energy Audits (specialty: NoVA/Ashburn market)
- PUE/WUE measurement and benchmarking
- Thermal imaging, electrical consumption analysis
- Utility bill audits, cooling efficiency assessment
- Written reports with ROI recommendations
- Pricing: $200 benchmark report → $5,000 on-site full audit
- Monitoring subscriptions $99–$299/mo

### Live Apps
- Boat Buddy AI — marine diagnostic assistant (Play Store, paying subscribers)
- ContentBuddy — AI content studio
- CodexBuddy — AI coding assistant

## Contact & Booking
- Phone/text: (330) 419-9283
- Email: thewastedape@gmail.com
- Book a free 15-min call: wastedape.org/book
- Based in WV, on-site in eastern OH/WV, remote nationwide, available immediately

## Your Job
- Answer questions about services, pricing, and capabilities honestly
- Qualify leads — ask what they're trying to build/solve
- Always push toward booking a free call for anything substantive
- Keep responses SHORT (2–4 sentences max unless they ask for detail)
- Be direct and confident — not salesy, not corporate
- If asked something you don't know, say so and give the email/phone`

// Simple in-memory rate limiter — 20 messages per IP per hour
const rateLimits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimits.get(ip)
  if (!limit || now > limit.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 3600_000 })
    return true
  }
  if (limit.count >= 20) return false
  limit.count++
  return true
}

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Chat not configured' }, { status: 503 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many messages. Try again later.' }, { status: 429 })
  }

  let messages: { role: string; content: string }[]
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages) || messages.length === 0) throw new Error('bad')
    // Limit conversation history to last 10 messages
    if (messages.length > 10) messages = messages.slice(-10)
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Anthropic error:', err)
      return NextResponse.json({ error: 'AI error' }, { status: 502 })
    }

    const data = await res.json()
    const reply = data.content?.[0]?.text || 'Sorry, something went wrong.'
    return NextResponse.json({ reply })
  } catch (e) {
    console.error('Chat error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
