import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = '8571979353:AAEZ9qAe0ZppXlB17_QUu9n_KNH-A8kY6yQ'
const TELEGRAM_CHAT_ID = '8590935363'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)

    const recordingStatus = params.get('RecordingStatus')
    const recordingUrl = params.get('RecordingUrl')
    const recordingDuration = params.get('RecordingDuration')
    const from = params.get('From') || params.get('Caller') || 'Unknown'
    const to = params.get('To') || params.get('Called') || '+12722733833'

    // Only notify on completed recordings
    if (recordingStatus !== 'completed') {
      return NextResponse.json({ ok: true })
    }

    const duration = recordingDuration ? `${recordingDuration}s` : 'unknown'
    const callerFormatted = from.replace(/\+1(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')

    const message = `📞 *New Voicemail — WastedApe Tech*

From: ${callerFormatted}
Duration: ${duration}

🎙 [Listen to Recording](${recordingUrl})

Reply or call back when ready.`

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: false,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Voicemail webhook error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
