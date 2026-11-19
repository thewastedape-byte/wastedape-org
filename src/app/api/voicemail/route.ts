import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8590935363'
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)

    const recordingStatus = params.get('RecordingStatus')
    const recordingUrl = params.get('RecordingUrl')
    const recordingDuration = params.get('RecordingDuration')
    const from = params.get('From') || params.get('Caller') || 'Unknown'

    // Only notify on completed recordings
    if (recordingStatus !== 'completed') {
      return NextResponse.json({ ok: true })
    }

    const duration = recordingDuration ? `${recordingDuration}s` : 'unknown'
    const callerFormatted = from.replace(/\+1(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')

    // 1 — Telegram notification
    const telegramMsg = `📞 *New Voicemail — WastedApe Tech*\n\nFrom: ${callerFormatted}\nDuration: ${duration}\n\n🎙 [Listen to Recording](${recordingUrl})\n\nReply or call back when ready.`
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMsg,
        parse_mode: 'Markdown',
      }),
    }).catch(e => console.error('Telegram notify failed:', e))

    // 2 — Email fallback via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'WastedApe Tech <noreply@wastedape.org>',
        to: 'thewastedape@gmail.com',
        subject: `📞 New Voicemail from ${callerFormatted}`,
        html: `<h2>New Voicemail</h2><p><strong>From:</strong> ${callerFormatted}</p><p><strong>Duration:</strong> ${duration}</p><p><a href="${recordingUrl}">🎙 Listen to Recording</a></p>`,
      }),
    }).catch(e => console.error('Email notify failed:', e))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Voicemail webhook error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
