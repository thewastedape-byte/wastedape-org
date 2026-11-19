import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://yruuzkxpnbgruwuivchy.supabase.co',
  proces…_KEY || 'eyJhbG…_qkE'
)

export async function POST(req: NextRequest) {
  try {
    const { page, referrer } = await req.json()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''

    // Skip tracking admin/internal pages and bots
    if (page.startsWith('/admin') || page.startsWith('/api')) {
      return NextResponse.json({ ok: true })
    }

    // Enrich IP via ipapi.co (free, no key needed, 1k/day)
    let enriched: any = {}
    if (ip && ip !== 'unknown' && ip !== '127.0.0.1' && !ip.startsWith('192.168') && !ip.startsWith('10.')) {
      try {
        const ipRes = await fetch(`https://ipapi.co/${ip}/json/`, {
          headers: { 'User-Agent': 'wastedape-tracker/1.0' }
        })
        if (ipRes.ok) enriched = await ipRes.json()
      } catch {
        // IP enrichment failed, continue without it
      }
    }

    // ipapi.co field names
    const company = enriched.org || enriched.asn?.org || null
    const city = enriched.city || null
    const region = enriched.region || enriched.region_name || null
    const country = enriched.country_name || enriched.country || null
    const hostname = enriched.hostname || null

    // Store in Supabase
    await supabase.from('visitors').insert({
      page,
      ip,
      city,
      region,
      country,
      org: company,
      company,
      hostname,
      user_agent: userAgent,
      referrer
    })

    // Telegram alert if company identified (and not an ISP)
    if (company && !company.includes('AS') && company.trim().length > 0) {
      const cleanCompany = company.replace(/^AS\d+\s+/, '')
      const botToken = process.env.TELEGRAM_BOT_TOKEN
      const chatId = process.env.TELEGRAM_ALERT_CHAT_ID
      
      if (botToken && chatId) {
        try {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `👁 Visitor Alert\n📄 Page: ${page}\n🏢 ${cleanCompany}\n🌍 ${city || ''}${region ? ', ' + region : ''}, ${country || ''}`
            })
          })
        } catch {
          // Telegram alert failed, continue
        }
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Visitor tracking error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
