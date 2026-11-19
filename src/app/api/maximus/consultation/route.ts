import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const SUPABASE_URL = 'https://yruuzkxpnbgruwuivchy.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbG…_qkE'

interface ConsultationRequest {
  name: string
  email: string
  company?: string
  challenge: string
  timeline: string
}

export async function POST(req: NextRequest) {
  try {
    const body: ConsultationRequest = await req.json()

    const { name, email, company, challenge, timeline } = body

    // Validate required fields
    if (!name || !email || !challenge) {
      return NextResponse.json(
        { error: 'Name, email, and challenge are required.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      )
    }

    const emailContent = `
<h2>New Maximus Consultation Request</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
<p><strong>Timeline:</strong> ${timeline}</p>
<hr />
<h3>Challenge / Project:</h3>
<p>${challenge.replace(/\n/g, '<br>')}</p>
    `

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'thewastedape@gmail.com',
        subject: `New Consultation Request from ${name}`,
        html: emailContent,
        reply_to: email,
      }),
    })

    if (!emailResponse.ok) {
      const error = await emailResponse.json()
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 500 }
      )
    }

    // Save to Supabase
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/consultations`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({ name, email, company: company || null, challenge, timeline, status: 'new', submitted_at: new Date().toISOString() })
      })
    } catch (dbErr) {
      console.error('Supabase insert error:', dbErr)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Consultation endpoint error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
