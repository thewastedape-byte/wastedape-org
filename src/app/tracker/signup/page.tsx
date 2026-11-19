'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function TrackerSignup() {
  const [form, setForm] = useState({ name: '', email: '', website: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [trackingId, setTrackingId] = useState('')

  const gold = '#C8922A'
  const dim = 'rgba(245,240,232,0.6)'
  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(200,146,42,0.4)',
    borderRadius: '10px', color: '#F5F0E8',
    fontSize: '14px', fontFamily: 'Georgia, serif',
    outline: 'none', boxSizing: 'border-box' as const,
  }
  const labelStyle = { display: 'block', color: 'rgba(245,240,232,0.7)', fontFamily: 'Georgia, serif', fontSize: '12px', marginBottom: '6px', letterSpacing: '0.5px' }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const r = await fetch('/api/tracker/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const d = await r.json()
      if (!r.ok) { setError(d.error || 'Registration failed'); return }
      setTrackingId(d.tracking_id)
    } catch { setError('Server error') }
    finally { setLoading(false) }
  }

  if (trackingId) return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '26px', marginBottom: '8px' }}>You're set up!</h2>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '14px' }}>Your tracking ID is ready. Paste the snippet below into your website.</p>
        </div>

        <div style={{ background: 'rgba(12,10,8,0.95)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '16px', padding: '32px', marginBottom: '20px' }}>
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '2px', margin: '0 0 8px' }}>YOUR TRACKING ID</p>
          <p style={{ color: '#F5F0E8', fontFamily: 'monospace', fontSize: '28px', fontWeight: 'bold', margin: '0 0 24px', letterSpacing: '2px' }}>{trackingId}</p>

          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '2px', margin: '0 0 8px' }}>PASTE INTO YOUR WEBSITE &lt;HEAD&gt;</p>
          <div style={{ background: '#0a0806', border: '1px solid rgba(200,146,42,0.2)', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
            <code style={{ color: '#C8922A', fontSize: '13px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {`<script src="https://wastedape.org/track.js?id=${trackingId}"></script>`}
            </code>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href={`/tracker/dashboard?id=${trackingId}`} style={{ flex: 1, display: 'block', textAlign: 'center', background: gold, color: '#060608', fontFamily: 'Georgia, serif', fontWeight: 'bold', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px' }}>
              View My Dashboard →
            </Link>
            <button onClick={() => navigator.clipboard.writeText(`<script src="https://wastedape.org/track.js?id=${trackingId}"></script>`)}
              style={{ flex: 1, background: 'transparent', border: '1px solid rgba(200,146,42,0.4)', color: gold, fontFamily: 'Georgia, serif', fontSize: '14px', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer' }}>
              Copy Snippet
            </button>
          </div>
        </div>

        <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '12px', textAlign: 'center' }}>
          Once installed, visit your site — you'll see traffic in your dashboard within seconds.
        </p>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '460px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/"><img src="/logo.svg" style={{ width: '72px', height: '72px', borderRadius: '50%', border: `2px solid ${gold}`, boxShadow: '0 0 20px rgba(200,146,42,0.2)', marginBottom: '14px' }} /></Link>
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '3px', margin: '0 0 4px' }}>WASTEDAPE TRACKER</p>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '12px', margin: 0 }}>Know who's visiting your website</p>
        </div>

        <div style={{ background: 'rgba(12,10,8,0.95)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '20px', padding: '36px' }}>
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '24px', textAlign: 'center', margin: '0 0 6px' }}>Get Your Tracking ID</h1>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '13px', textAlign: 'center', margin: '0 0 28px' }}>Free to start. One line of code. Know every visitor.</p>

          {error && <div style={{ background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.4)', borderRadius: '8px', padding: '10px 14px', color: '#e05555', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '20px' }}>{error}</div>}

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label style={labelStyle}>Your Name</label><input type="text" placeholder="Dan Bloom" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Email</label><input type="email" placeholder="you@business.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Your Website <span style={{ color: 'rgba(245,240,232,0.3)' }}>(optional)</span></label><input type="text" placeholder="https://yourbusiness.com" value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} style={inputStyle} /></div>
            <div><label style={labelStyle}>Password <span style={{ color: 'rgba(245,240,232,0.3)' }}>(for your dashboard)</span></label><input type="password" placeholder="Create a password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} required style={inputStyle} /></div>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', marginTop: '8px', background: loading ? 'rgba(200,146,42,0.4)' : gold, color: '#060608', border: 'none', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px', cursor: loading ? 'default' : 'pointer' }}>
              {loading ? 'Creating...' : 'Get My Free Tracking ID →'}
            </button>
          </form>

          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '12px', textAlign: 'center', marginTop: '20px' }}>
            Already have an ID?{' '}
            <Link href="/tracker/dashboard" style={{ color: gold, textDecoration: 'none' }}>View dashboard</Link>
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '20px' }}>
          {[['👁', 'Real-Time Visits'], ['📍', 'City & Company'], ['📊', 'Pages & Referrers']].map(([icon, label]) => (
            <div key={label} style={{ background: 'rgba(12,10,8,0.6)', border: '1px solid rgba(200,146,42,0.15)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{icon}</div>
              <div style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '11px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
