import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const ANALYTICS_FILE = path.join(process.cwd(), 'analytics.json')

interface AnalyticsData {
  totalViews: number
  pageBreakdown: Record<string, number>
  dailyBreakdown: Record<string, { total: number; pages: Record<string, number> }>
  lastUpdated: string | null
}

function loadAnalytics(): AnalyticsData {
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const raw = fs.readFileSync(ANALYTICS_FILE, 'utf8')
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

function saveAnalytics(data: AnalyticsData) {
  try {
    data.lastUpdated = new Date().toISOString()
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), 'utf8')
  } catch {
    // ignore in serverless/read-only environments
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { page = '/' } = body

    const data = loadAnalytics()
    const today = new Date().toISOString().split('T')[0]

    data.totalViews++
    data.pageBreakdown[page] = (data.pageBreakdown[page] || 0) + 1

    if (!data.dailyBreakdown[today]) {
      data.dailyBreakdown[today] = { total: 0, pages: {} }
    }
    data.dailyBreakdown[today].total++
    data.dailyBreakdown[today].pages[page] = (data.dailyBreakdown[today].pages[page] || 0) + 1

    saveAnalytics(data)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
