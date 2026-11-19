'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createHash } from 'crypto'

interface Event { id: string; page: string; referrer: string; city: string; region: string; country: string; company: string; device: string; browser: string; os: string; created_at: string }

const gold = '#C8922A'
const dim = 'rgba(245,240,232,0.6)'
const surface = 'rgba(12,10,8,0.95)'
const border = 'rgba(200,146,42,0.25)'

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

const SUPABASE_URL = 'https://yruuzkxpnbgruwuivchy.supabase.co'

function DashboardContent() {
  const params = useSearchParams()
  const [trackingId, setTrackingId] = useState(params.get('id') || '')
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(!!params.get('id'))
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [clientName, setClientName] = useState('')
  const SUPABASE_KEY = 'eyJhbG…_qkE'

  const login = async () => {
    setLoading(true); setError('')
    try {
      const hash = Array.from(new Uint8Array(
        await crypto.subtle.digest('SHA-256',
          new TextEncoder().encode(password + 'WAT_SALT_2026'))
      )).map(b => b.toString(16).padStart(2, '0')).join('')

      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/tracking_clients?tracking_id=eq.${trackingId}&password_hash=eq.${hash}&select=client_name,tracking_id`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      )
      const rows = await r.json()
      if (!rows?.length) { setError('Invalid tracking ID or password'); setLoading(false); return }
      setClientName(rows[0].client_name)
      setAuthed(true)
      loadEvents()
    } catch { setError('Connection error') }
    setLoading(false)
  }

  const loadEvents = async () => {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/tracking_events?tracking_id=eq.${trackingId}&order=created_at.desc&limit=100`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    )
    if (r.ok) setEvents(await r.json())
  }

  useEffect(() => { if (authed && trackingId) loadEvents() }, [authed])

  const today = events.filter(e => new Date(e.created_at).toDateString() === new Date().toDateString())
  const unique = [...new Set(events.map(e => e.city + e.company))].length
  const topPages = Object.entries(events.reduce((acc, e) => { acc[e.page] = (acc[e.page] || 0) + 1; return acc }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const snippet = `<script src="https://wastedape.org/track.js?id=${trackingId}"></script>`

  if (!authed) return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link href="/"><img src="/logo.svg" style={{ width: '64px', height: '64px', borderRadius: '50%', border: `2px solid ${gold}`, marginBottom: '12px' }} /></Link>
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '3px', margin: 0 }}>WASTEDAPE TRACKER</p>
        </div>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '22px', textAlign: 'center', margin: '0 0 24px' }}>View Your Dashboard</h2>
          {error && <div style={{ background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.4)', borderRadius: '8px', padding: '10px', color: '#e05555', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input placeholder="Tracking ID (WAT-XXXXXXXX)" value={trackingId} onChange={e => setTrackingId(e.target.value.toUpperCase())}
              style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${border}`, borderRadius: '10px', color: '#F5F0E8', fontFamily: 'monospace', fontSize: '15px', outline: 'none', letterSpacing: '1px' }} />
            <input type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
              style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${border}`, borderRadius: '10px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none' }} />
            <button onClick={login} disabled={loading} style={{ padding: '13px', background: gold, color: '#060608', border: 'none', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
              {loading ? 'Loading...' : 'View My Traffic →'}
            </button>
          </div>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '12px', textAlign: 'center', marginTop: '20px' }}>
            Don't have an ID? <Link href="/tracker/signup" style={{ color: gold, textDecoration: 'none' }}>Get one free →</Link>
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#060608', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      {/* Nav */}
      <div style={{ borderBottom: `1px solid ${border}`, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6,6,8,0.98)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          <div>
            <span style={{ color: gold, fontWeight: 'bold', fontSize: '13px', letterSpacing: '1px' }}>WastedApe Tracker</span>
            <span style={{ color: dim, fontSize: '11px', marginLeft: '12px' }}>{trackingId}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={loadEvents} style={{ background: 'transparent', border: `1px solid ${border}`, color: dim, borderRadius: '8px', padding: '7px 14px', cursor: 'pointer', fontSize: '12px', fontFamily: 'Georgia, serif' }}>↻ Refresh</button>
          <button onClick={() => setAuthed(false)} style={{ background: 'transparent', border: 'none', color: dim, cursor: 'pointer', fontSize: '12px', fontFamily: 'Georgia, serif' }}>Sign out</button>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          {[
            { label: 'Total Visits', value: events.length, icon: '👁' },
            { label: 'Today', value: today.length, icon: '📅' },
            { label: 'Unique Locations', value: unique, icon: '📍' },
            { label: 'Pages Tracked', value: topPages.length, icon: '📄' },
          ].map(s => (
            <div key={s.label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{s.icon}</div>
              <div style={{ color: '#F5F0E8', fontSize: '28px', fontWeight: 'bold', marginBottom: '3px' }}>{s.value}</div>
              <div style={{ color: dim, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Top Pages + Snippet side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '20px' }}>
            <p style={{ color: gold, fontSize: '11px', letterSpacing: '2px', margin: '0 0 14px', textTransform: 'uppercase' }}>Top Pages</p>
            {topPages.length === 0 && <p style={{ color: dim, fontSize: '13px' }}>No data yet — install the snippet below</p>}
            {topPages.map(([page, count]) => (
              <div key={page} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid rgba(200,146,42,0.08)` }}>
                <span style={{ color: '#F5F0E8', fontSize: '13px' }}>{page}</span>
                <span style={{ color: gold, fontSize: '13px', fontWeight: 'bold' }}>{count}</span>
              </div>
            ))}
          </div>
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '20px' }}>
            <p style={{ color: gold, fontSize: '11px', letterSpacing: '2px', margin: '0 0 14px', textTransform: 'uppercase' }}>Your Tracking Snippet</p>
            <div style={{ background: '#080604', border: '1px solid rgba(200,146,42,0.2)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <code style={{ color: '#C8922A', fontSize: '11px', fontFamily: 'monospace', wordBreak: 'break-all', display: 'block' }}>{snippet}</code>
            </div>
            <button onClick={() => navigator.clipboard.writeText(snippet)} style={{ width: '100%', padding: '10px', background: 'transparent', border: `1px solid ${border}`, color: gold, borderRadius: '8px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '13px' }}>
              Copy Snippet
            </button>
          </div>
        </div>

        {/* Recent Visitors */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${border}` }}>
            <p style={{ color: gold, fontSize: '11px', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' }}>Recent Visitors</p>
          </div>
          {events.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ color: dim, fontSize: '14px', margin: '0 0 8px' }}>No visitors tracked yet.</p>
              <p style={{ color: 'rgba(200,146,42,0.5)', fontSize: '12px', margin: 0 }}>Paste the snippet into your website's &lt;head&gt; to start tracking.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${border}` }}>
                  {['Page', 'Location', 'Company', 'Device', 'Time'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', textAlign: 'left', color: gold, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'normal' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={e.id} style={{ borderBottom: `1px solid rgba(200,146,42,0.06)` }}>
                    <td style={{ padding: '11px 20px', color: '#F5F0E8', fontSize: '13px' }}>{e.page || '/'}</td>
                    <td style={{ padding: '11px 20px', color: dim, fontSize: '12px' }}>{[e.city, e.country].filter(Boolean).join(', ') || '—'}</td>
                    <td style={{ padding: '11px 20px', color: dim, fontSize: '12px', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.company || '—'}</td>
                    <td style={{ padding: '11px 20px', color: dim, fontSize: '12px' }}>{[e.device, e.browser].filter(Boolean).join(' / ') || '—'}</td>
                    <td style={{ padding: '11px 20px', color: dim, fontSize: '11px', whiteSpace: 'nowrap' }}>{timeAgo(e.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TrackerDashboard() {
  return <Suspense fallback={<div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#C8922A', fontFamily: 'Georgia, serif' }}>Loading...</p></div>}><DashboardContent /></Suspense>
}
