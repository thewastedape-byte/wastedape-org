import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(
  req: NextRequest,
  { params }: { params: { sid: string } }
) {
  const SW_PROJECT_ID = process.env.SW_PROJECT_ID || ''
  const SW_AUTH_TOKEN = process.env.SW_AUTH_TOKEN || ''

  if (!SW_PROJECT_ID || !SW_AUTH_TOKEN) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const { sid } = params
  if (!sid || !/^[a-f0-9-]+$/i.test(sid)) {
    return NextResponse.json({ error: 'Invalid recording ID' }, { status: 400 })
  }

  const auth = Buffer.from(`${SW_PROJECT_ID}:${SW_AUTH_TOKEN}`).toString('base64')
  const url = `https://the-wastedape.signalwire.com/api/laml/2010-04-01/Accounts/${SW_PROJECT_ID}/Recordings/${sid}.mp3`

  try {
    const response = await fetch(url, {
      headers: { 'Authorization': `Basic ${auth}` }
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Recording not found' }, { status: 404 })
    }

    const audio = await response.arrayBuffer()
    return new Response(audio, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `inline; filename="voicemail-${sid}.mp3"`,
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch (err) {
    console.error('Recording proxy error:', err)
    return NextResponse.json({ error: 'Failed to fetch recording' }, { status: 500 })
  }
}
