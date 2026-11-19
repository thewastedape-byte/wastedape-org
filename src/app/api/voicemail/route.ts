import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8590935363'
const SW_PROJECT_ID = process.env.SW_PROJECT_ID || ''
const SW_AUTH_TOKEN = process.env.SW_AUTH_TOKEN || ''
const SW_BASE = 'https://the-wastedape.signalwire.com/api/laml/2010-04-01'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)

    const recordingStatus = params.get('RecordingStatus')
    const recordingUrl = params.get('RecordingUrl')
    const recordingDuration = params.get('RecordingDuration')
    const callSid = params.get('CallSid')

    if (recordingStatus !== 'completed' || !recordingUrl) {
      return NextResponse.json({ ok: true })
    }

    const duration = recordingDuration ? `${recordingDuration}s` : 'unknown'

    // Look up caller number from CallSid
    let callerFormatted = 'Unknown'
    if (callSid && SW_PROJECT_ID && SW_AUTH_TOKEN) {
      try {
        const auth = Buffer.from(`${SW_PROJECT_ID}:${SW_AUTH_TOKEN}`).toString('base64')
        const callRes = await fetch(`${SW_BASE}/Accounts/${SW_PROJECT_ID}/Calls/${callSid}`, {
          headers: { 'Authorization': `Basic ${auth}` }
        })
        if (callRes.ok) {
          const callData = await callRes.json()
          const from = callData.from || callData.From || ''
          if (from) callerFormatted = from.replace(/\+1(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        }
      } catch (e) {
        console.error('Failed to look up caller:', e)
      }
    }

    if (!TELEGRAM_BOT_TOKEN) {
      console.error('No TELEGRAM_BOT_TOKEN set')
      return NextResponse.json({ ok: true })
    }

    // Extract recording SID from URL and build proxy link
    const recordingSid = recordingUrl.split('/').pop()?.replace('.json', '') || ''
    const listenUrl = `https://wastedape.org/api/recording/${recordingSid}`

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: `📞 New Voicemail — WastedApe Tech\n\nFrom: ${callerFormatted}\nDuration: ${duration}\n\n🎙 Listen: ${listenUrl}`,
        disable_web_page_preview: true,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Voicemail webhook error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
