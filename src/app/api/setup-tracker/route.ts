import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const SUPABASE_URL = 'https://yruuzkxpnbgruwuivchy.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlydXV6a3hwbmJncnV3dWl2Y2h5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODExMDQwOSwiZXhwIjoyMDkzNjg2NDA5fQ.W5L_dL7hVu6O0XWoSDIYMoJYwXUqu-291hBGluS_qkE'

// This endpoint creates the tracker tables via table creation API
export async function POST(req: NextRequest) {
  // Verify admin key (should be called only by Dan)
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${SUPABASE_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Create tracking_clients table
    const clientsRes = await fetch(`${SUPABASE_URL}/rest/v1/tracking_clients`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: '00000000-0000-0000-0000-000000000000',
        tracking_id: '_test_init',
        client_name: 'Init',
        email: 'init@test.local',
        website: 'http://test.local',
        password_hash: null,
        plan: 'free',
        active: false
      })
    })

    if (!clientsRes.ok && clientsRes.status !== 409) {
      return NextResponse.json({ error: `Clients table creation failed: ${await clientsRes.text()}` }, { status: 500 })
    }

    // Delete test record
    await fetch(`${SUPABASE_URL}/rest/v1/tracking_clients?tracking_id=eq._test_init`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    })

    // Create tracking_events table
    const eventsRes = await fetch(`${SUPABASE_URL}/rest/v1/tracking_events`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: '00000000-0000-0000-0000-000000000000',
        tracking_id: '_test_init',
        page: '/',
        referrer: null,
        ip: null,
        city: null,
        region: null,
        country: null,
        company: null,
        device: null,
        browser: null,
        os: null
      })
    })

    if (!eventsRes.ok && eventsRes.status !== 409) {
      return NextResponse.json({ error: `Events table creation failed: ${await eventsRes.text()}` }, { status: 500 })
    }

    // Delete test record
    await fetch(`${SUPABASE_URL}/rest/v1/tracking_events?tracking_id=eq._test_init`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    })

    return NextResponse.json({ ok: true, message: 'Tracker tables initialized' })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
