import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const { email, action, name, company, phone, service_interest } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  try {
    if (action === 'signup') {
      // 1. Insert into leads table (or upsert if exists)
      const { error: leadsError } = await supabase
        .from('leads')
        .upsert(
          {
            email,
            name: name || '',
            company: company || '',
            phone: phone || '',
            service_interest: service_interest || '',
            created_at: new Date().toISOString(),
          },
          { onConflict: 'email' } // If email exists, update the record
        )

      if (leadsError) throw leadsError

      // 2. Send magic link (Supabase Auth creates auth.users automatically)
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
        },
      })

      if (authError) throw authError

      return NextResponse.json({
        message: 'Magic link sent to email. Check your inbox.',
        email,
      })
    }

    if (action === 'login') {
      // Send magic link (no leads insert for login-only flow)
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
        },
      })

      if (authError) throw authError

      return NextResponse.json({
        message: 'Magic link sent to email',
        email,
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: error.message || 'Auth error' },
      { status: 500 }
    )
  }
}
