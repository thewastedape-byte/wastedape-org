import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const STATS_FILE = path.join(process.cwd(), 'view-stats.json')

interface ViewStats {
  totalViews: number
  pageBreakdown: Record<string, number>
  dailyBreakdown: Record<string, Record<string, number>>
  lastUpdated: string | null
}

function loadStats(): ViewStats {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, 'utf8')
      return JSON.parse(raw)
    }
  } catch {
    // ignore
  }
  return {
    totalViews: 0,
    pageBreakdown: {},
    dailyBreakdown: {},
    lastUpdated: null,
  }
}

function saveStats(data: ViewStats) {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), 'utf8')
  } catch {
    // ignore in serverless/read-only environments
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { path: pagePath = '/' } = body

    const data = loadStats()
    const today = new Date().toISOString().split('T')[0]

    // Increment totals
    data.totalViews++
    data.pageBreakdown[pagePath] = (data.pageBreakdown[pagePath] || 0) + 1

    // Increment daily breakdown: dailyBreakdown[YYYY-MM-DD][path]
    if (!data.dailyBreakdown[today]) {
      data.dailyBreakdown[today] = {}
    }
    data.dailyBreakdown[today][pagePath] = (data.dailyBreakdown[today][pagePath] || 0) + 1

    data.lastUpdated = new Date().toISOString()
    saveStats(data)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
