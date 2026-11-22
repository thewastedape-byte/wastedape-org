import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseKey = process.env.SUPABASE_SERVICE_KEY
const supabase = supabaseKey
  ? createClient('https://yruuzkxpnbgruwuivchy.supabase.co', supabaseKey)
  : null

export async function POST(req: NextRequest) {
  try {
    const { page, referrer } = await req.json()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''

    if (page.startsWith('/admin') || page.startsWith('/api')) {
      return NextResponse.json({ ok: true })
    }

    let enriched: any = {}
    if (ip && ip !== 'unknown' && ip !== '127.0.0.1' && !ip.startsWith('192.168') && !ip.startsWith('10.')) {
      try {
        const ipRes = await fetch(`https://ipapi.co/${ip}/json/`, {
          headers: { 'User-Agent': 'wastedape-tracker/1.0' }
        })
        if (ipRes.ok) enriched = await ipRes.json()
      } catch {}
    }

    const company = enriched.org || enriched.asn?.org || null
    const city = enriched.city || null
    const region = enriched.region || enriched.region_name || null
    const country = enriched.country_name || enriched.country || null
    const hostname = enriched.hostname || null

    if (supabase) {
      await supabase.from('visitors').insert({
        page, ip, city, region, country,
        org: company, company, hostname,
        user_agent: userAgent, referrer
      })
    }

    if (company && !company.includes('AS') && company.trim().length > 0) {
      const cleanCompany = company.replace(/^AS\d+\s+/, '')
      const botToken = process.env.TELEGRAM_BOT_TOKEN
      const chatId = process.env.TELEGRAM_ALERT_CHAT_ID
      if (botToken && chatId) {
        try {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `👁 Visitor Alert\n📄 Page: ${page}\n🏢 ${cleanCompany}\n🌍 ${city || ''}${region ? ', ' + region : ''}, ${country || ''}`
            })
          })
        } catch {}
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Visitor tracking error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}