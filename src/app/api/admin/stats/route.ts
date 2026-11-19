import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const SUPABASE_URL = 'https://yruuzkxpnbgruwuivchy.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlydXV6a3hwbmJncnV3dWl2Y2h5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODExMDQwOSwiZXhwIjoyMDkzNjg2NDA5fQ.W5L_dL7hVu6O0XWoSDIYMoJYwXUqu-291hBGluS_qkE'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'WastedApe2026!'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('x-admin-password')
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  }

  const base = `${SUPABASE_URL}/rest/v1`

  const [visitors, leads, consultations] = await Promise.all([
    fetch(`${base}/visitors?select=*&order=visited_at.desc&limit=50`, { headers }).then(r => r.json()),
    fetch(`${base}/leads?select=*&order=created_at.desc&limit=50`, { headers }).then(r => r.json()),
    fetch(`${base}/consultations?select=*&order=submitted_at.desc&limit=50`, { headers }).then(r => r.json()),
  ])

  return NextResponse.json({ visitors, leads, consultations })
}
