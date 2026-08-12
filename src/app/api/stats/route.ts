import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!

export async function GET() {
  try {
    const headers = {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
    }

    // Total views
    const totalRes = await fetch(
      `${SUPABASE_URL}/rest/v1/page_views?select=id`,
      { headers: { ...headers, Prefer: 'count=exact' } }
    )
    const totalCount = parseInt(totalRes.headers.get('content-range')?.split('/')[1] ?? '0', 10)

    // All rows for breakdown (limit 10000)
    const rowsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/page_views?select=path,viewed_at&limit=10000&order=viewed_at.desc`,
      { headers }
    )
    const rows: { path: string; viewed_at: string }[] = await rowsRes.json()

    // Page breakdown
    const pageBreakdown: Record<string, number> = {}
    const dailyBreakdown: Record<string, Record<string, number>> = {}

    for (const row of rows) {
      const p = row.path || '/'
      const day = row.viewed_at.split('T')[0]
      pageBreakdown[p] = (pageBreakdown[p] || 0) + 1
      if (!dailyBreakdown[day]) dailyBreakdown[day] = {}
      dailyBreakdown[day][p] = (dailyBreakdown[day][p] || 0) + 1
    }

    return NextResponse.json({
      service: 'WastedApe.org',
      totalViews: totalCount,
      pageBreakdown,
      dailyBreakdown,
      lastUpdated: rows[0]?.viewed_at ?? null,
    })
  } catch (err) {
    console.error('Stats error:', err)
    return NextResponse.json({ error: 'Could not read analytics' }, { status: 500 })
  }
}