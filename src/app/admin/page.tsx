'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Visitor { page: string; city: string; region: string; country: string; company: string; hostname: string; referrer: string; visited_at: string; ip: string }
interface Lead { id: string; name: string; email: string; phone: string; company: string; service_interest: string; source: string; created_at: string; status: string; notes: string }
interface Consultation { id: string; name: string; email: string; company: string; challenge: string; timeline: string; submitted_at: string; status: string }

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

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<{ visitors: Visitor[], leads: Lead[], consultations: Consultation[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'leads' | 'visitors' | 'consultations'>('leads')

  const login = async () => {
    setLoading(true)
    setError('')
    try {
      const r = await fetch('/api/admin/stats', { headers: { 'x-admin-password': password } })
      if (!r.ok) { setError('Wrong password'); setLoading(false); return }
      const d = await r.json()
      setData(d)
      setAuthed(true)
    } catch { setError('Failed to connect') }
    setLoading(false)
  }

  const refresh = async () => {
    const r = await fetch('/api/admin/stats', { headers: { 'x-admin-password': password } })
    if (r.ok) setData(await r.json())
  }

  if (!authed) return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '380px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img src="/logo.svg" style={{ width: '72px', height: '72px', borderRadius: '50%', border: `2px solid ${gold}`, boxShadow: '0 0 20px rgba(200,146,42,0.2)', marginBottom: '14px' }} />
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '3px', margin: 0 }}>ADMIN ACCESS</p>
        </div>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '22px', textAlign: 'center', margin: '0 0 24px' }}>WastedApe Dashboard</h2>
          {error && <div style={{ background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.4)', borderRadius: '8px', padding: '10px', color: '#e05555', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${border}`, borderRadius: '10px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' }}
          />
          <button onClick={login} disabled={loading} style={{ width: '100%', padding: '13px', background: gold, color: '#060608', border: 'none', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            {loading ? 'Checking...' : 'Enter Dashboard →'}
          </button>
        </div>
      </div>
    </div>
  )

  const stats = [
    { label: 'Total Visitors', value: data?.visitors?.length ?? 0, icon: '👁' },
    { label: 'Leads Captured', value: data?.leads?.length ?? 0, icon: '🎯' },
    { label: 'Consultations', value: data?.consultations?.length ?? 0, icon: '📅' },
    { label: 'Today', value: data?.visitors?.filter(v => new Date(v.visited_at).toDateString() === new Date().toDateString()).length ?? 0, icon: '📊' },
  ]

  const tabStyle = (t: string) => ({
    padding: '10px 20px',
    background: tab === t ? gold : 'transparent',
    color: tab === t ? '#060608' : dim,
    border: `1px solid ${tab === t ? gold : border}`,
    borderRadius: '8px',
    fontFamily: 'Georgia, serif',
    fontSize: '13px',
    fontWeight: tab === t ? 'bold' : 'normal',
    cursor: 'pointer',
  } as React.CSSProperties)

  return (
    <div style={{ background: '#060608', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>

      {/* Nav */}
      <div style={{ borderBottom: `1px solid ${border}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6,6,8,0.98)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
          <span style={{ color: gold, fontWeight: 'bold', letterSpacing: '1px', fontSize: '14px' }}>WASTEDAPE ADMIN</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={refresh} style={{ background: 'transparent', border: `1px solid ${border}`, color: dim, borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '12px', fontFamily: 'Georgia, serif' }}>↻ Refresh</button>
          <Link href="/" style={{ color: dim, fontSize: '12px', textDecoration: 'none' }}>← Site</Link>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: '14px', padding: '24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ color: '#F5F0E8', fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ color: dim, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button style={tabStyle('leads')} onClick={() => setTab('leads')}>🎯 Leads ({data?.leads?.length ?? 0})</button>
          <button style={tabStyle('consultations')} onClick={() => setTab('consultations')}>📅 Consultations ({data?.consultations?.length ?? 0})</button>
          <button style={tabStyle('visitors')} onClick={() => setTab('visitors')}>👁 Visitors ({data?.visitors?.length ?? 0})</button>
        </div>

        {/* LEADS */}
        {tab === 'leads' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!data?.leads?.length && <p style={{ color: dim, textAlign: 'center', padding: '48px' }}>No leads yet — keep pushing traffic 💪</p>}
            {data?.leads?.map(l => (
              <div key={l.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '16px', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#F5F0E8', fontSize: '16px', margin: '0 0 3px', fontWeight: 'bold' }}>{l.name || 'Unknown'}</p>
                  <p style={{ color: gold, fontSize: '13px', margin: 0 }}>{l.email}</p>
                  {l.phone && <p style={{ color: dim, fontSize: '12px', margin: '2px 0 0' }}>{l.phone}</p>}
                </div>
                <div>
                  <p style={{ color: dim, fontSize: '11px', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Interest</p>
                  <p style={{ color: '#F5F0E8', fontSize: '13px', margin: 0 }}>{l.service_interest || '—'}</p>
                  {l.company && <p style={{ color: dim, fontSize: '12px', margin: '2px 0 0' }}>{l.company}</p>}
                </div>
                <div>
                  <p style={{ color: dim, fontSize: '11px', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Source</p>
                  <p style={{ color: '#F5F0E8', fontSize: '13px', margin: 0 }}>{l.source || 'Direct'}</p>
                  <p style={{ color: dim, fontSize: '11px', margin: '2px 0 0' }}>{timeAgo(l.created_at)}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ background: l.status === 'new' ? 'rgba(200,146,42,0.15)' : 'rgba(76,175,80,0.15)', color: l.status === 'new' ? gold : '#81C784', border: `1px solid ${l.status === 'new' ? 'rgba(200,146,42,0.4)' : 'rgba(76,175,80,0.4)'}`, borderRadius: '20px', padding: '4px 12px', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {l.status || 'new'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONSULTATIONS */}
        {tab === 'consultations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!data?.consultations?.length && <p style={{ color: dim, textAlign: 'center', padding: '48px' }}>No consultation requests yet.</p>}
            {data?.consultations?.map(c => (
              <div key={c.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <p style={{ color: '#F5F0E8', fontSize: '16px', margin: '0 0 3px', fontWeight: 'bold' }}>{c.name}</p>
                    <p style={{ color: gold, fontSize: '13px', margin: 0 }}>{c.email} {c.company && `· ${c.company}`}</p>
                  </div>
                  <p style={{ color: dim, fontSize: '11px', margin: 0 }}>{timeAgo(c.submitted_at)}</p>
                </div>
                <p style={{ color: 'rgba(245,240,232,0.75)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 8px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', borderLeft: `2px solid ${gold}` }}>{c.challenge}</p>
                <p style={{ color: dim, fontSize: '12px', margin: 0 }}>Timeline: {c.timeline}</p>
              </div>
            ))}
          </div>
        )}

        {/* VISITORS */}
        {tab === 'visitors' && (
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '14px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${border}` }}>
                  {['Page', 'Location', 'Company', 'Referrer', 'Time'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: gold, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'normal' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.visitors?.map((v, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid rgba(200,146,42,0.08)` }}>
                    <td style={{ padding: '12px 20px', color: '#F5F0E8', fontSize: '13px' }}>{v.page}</td>
                    <td style={{ padding: '12px 20px', color: dim, fontSize: '12px' }}>{[v.city, v.region, v.country].filter(Boolean).join(', ') || '—'}</td>
                    <td style={{ padding: '12px 20px', color: dim, fontSize: '12px' }}>{v.company || v.hostname || '—'}</td>
                    <td style={{ padding: '12px 20px', color: dim, fontSize: '11px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.referrer ? v.referrer.replace('https://', '').replace('http://', '').substring(0, 40) : 'Direct'}</td>
                    <td style={{ padding: '12px 20px', color: dim, fontSize: '11px', whiteSpace: 'nowrap' }}>{timeAgo(v.visited_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
