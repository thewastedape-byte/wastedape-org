import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const SUPABASE_URL = 'https://yruuzkxpnbgruwuivchy.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export async function POST(req: NextRequest) {
  try {
    const { tracking_id, page, referrer, device, browser, os } = await req.json()
    if (!tracking_id) return NextResponse.json({ ok: false })

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    // Validate client exists and is active
    const clientRes = await fetch(
      `${SUPABASE_URL}/rest/v1/tracking_clients?tracking_id=eq.${tracking_id}&active=eq.true&select=id`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    )
    const clients = await clientRes.json()
    if (!clients?.length) return NextResponse.json({ ok: false })

    // Geolocate IP
    let city = null, region = null, country = null, company = null
    if (ip !== 'unknown' && !ip.startsWith('127.')) {
      try {
        const geo = await fetch(`https://ipapi.co/${ip}/json/`, {
          headers: { 'User-Agent': 'wastedape-tracker/1.0' }
        })
        if (geo.ok) {
          const g = await geo.json()
          city = g.city || null
          region = g.region || null
          country = g.country_name || null
          company = g.org || null
        }
      } catch (e) {
        // Silently fail geo, still store event
      }
    }

    // Store event
    const eventRes = await fetch(`${SUPABASE_URL}/rest/v1/tracking_events`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        tracking_id,
        page,
        referrer: referrer || null,
        ip,
        city,
        region,
        country,
        company,
        device,
        browser,
        os
      })
    })

    if (!eventRes.ok) {
      console.error('Failed to store tracking event:', await eventRes.text())
      return NextResponse.json({ ok: false })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Tracker error:', err)
    return NextResponse.json({ ok: false })
  }
}

export async function GET(req: NextRequest) {
  // Allow CORS preflight for the tracking script
  return new Response('ok', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}

export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
