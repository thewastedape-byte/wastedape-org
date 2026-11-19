import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

export const runtime = 'nodejs'

const SUPABASE_URL = 'https://yruuzkxpnbgruwuivchy.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbG…_qkE'

function generateTrackingId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = 'WAT-'
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, website, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password required' }, { status: 400 })
    }

    // Check if email already registered
    const existing = await fetch(
      `${SUPABASE_URL}/rest/v1/tracking_clients?email=eq.${encodeURIComponent(email)}&select=id`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    )
    const rows = await existing.json()
    if (rows?.length) return NextResponse.json({ error: 'Email already registered' }, { status: 409 })

    const tracking_id = generateTrackingId()
    const password_hash = createHash('sha256').update(password + 'WAT_SALT_2026').digest('hex')

    const insert = await fetch(`${SUPABASE_URL}/rest/v1/tracking_clients`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify({ name, email, website: website || null, password_hash, tracking_id, plan: 'free' })
    })

    if (!insert.ok) {
      const err = await insert.text()
      console.error('Insert error:', err)
      return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
    }

    return NextResponse.json({ tracking_id, success: true })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
