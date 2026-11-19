import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8590935363'
const SW_PROJECT_ID = process.env.SW_PROJECT_ID || ''
const SW_AUTH_TOKEN = process.env.SW_AUTH_TOKEN || ''

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)

    const recordingStatus = params.get('RecordingStatus')
    const recordingUrl = params.get('RecordingUrl')
    const recordingDuration = params.get('RecordingDuration')
    const from = params.get('From') || params.get('Caller') || 'Unknown'

    if (recordingStatus !== 'completed' || !recordingUrl) {
      return NextResponse.json({ ok: true })
    }

    const duration = recordingDuration ? `${recordingDuration}s` : 'unknown'
    const callerFormatted = from.replace(/\+1(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')

    if (!TELEGRAM_BOT_TOKEN) {
      console.error('No TELEGRAM_BOT_TOKEN set')
      return NextResponse.json({ ok: true })
    }

    // Download recording from SignalWire (requires auth)
    let audioBuffer: ArrayBuffer | null = null
    if (SW_PROJECT_ID && SW_AUTH_TOKEN) {
      try {
        const auth = Buffer.from(`${SW_PROJECT_ID}:${SW_AUTH_TOKEN}`).toString('base64')
        const rec = await fetch(recordingUrl, {
          headers: { 'Authorization': `Basic ${auth}` }
        })
        if (rec.ok) audioBuffer = await rec.arrayBuffer()
      } catch (e) {
        console.error('Failed to download recording:', e)
      }
    }

    if (audioBuffer) {
      // Send as actual voice message
      const formData = new FormData()
      formData.append('chat_id', TELEGRAM_CHAT_ID)
      formData.append('caption', `📞 New Voicemail — WastedApe Tech\n\nFrom: ${callerFormatted}\nDuration: ${duration}\n\nReply or call back when ready.`)
      formData.append('voice', new Blob([audioBuffer], { type: 'audio/mpeg' }), 'voicemail.mp3')

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVoice`, {
        method: 'POST',
        body: formData,
      })
    } else {
      // Fallback: text message
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `📞 New Voicemail — WastedApe Tech\n\nFrom: ${callerFormatted}\nDuration: ${duration}\n\nReply or call back when ready.`,
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Voicemail webhook error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
