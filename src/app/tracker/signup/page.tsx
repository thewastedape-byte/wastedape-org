'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function TrackerSignup() {
  const [form, setForm] = useState({ name: '', email: '', website: '', password: '' })
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [trackingId, setTrackingId] = useState('')
  const [copied, setCopied] = useState(false)

  const gold = '#C8922A'
  const dim = 'rgba(245,240,232,0.6)'
  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(200,146,42,0.35)',
    borderRadius: '10px', color: '#F5F0E8',
    fontSize: '14px', fontFamily: 'Georgia, serif',
    outline: 'none', boxSizing: 'border-box' as const,
  }
  const labelStyle = {
    display: 'block', color: 'rgba(245,240,232,0.65)',
    fontFamily: 'Georgia, serif', fontSize: '12px',
    marginBottom: '6px', letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
  }

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
      if (!r.ok) { setError(d.error || 'Registration failed'); setLoading(false); return }
      setTrackingId(d.tracking_id)
    } catch { setError('Server error') }
    finally { setLoading(false) }
  }

  const snippet = `<script src="https://wastedape.org/track.js?id=${trackingId}"></script>`

  const copySnippet = () => {
    navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (trackingId) return (
    <div style={{ background: '#060608', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid rgba(200,146,42,0.2)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.97)', backdropFilter: 'blur(8px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/logo.svg" style={{ height: '40px', width: '40px', borderRadius: '50%', border: '1px solid rgba(200,146,42,0.4)' }} />
          <div>
            <p style={{ color: gold, fontWeight: 'bold', fontSize: '14px', margin: 0, letterSpacing: '1px' }}>THE WASTED APE</p>
            <p style={{ color: 'rgba(245,240,232,0.35)', fontSize: '9px', letterSpacing: '2px', margin: 0 }}>TRACKER</p>
          </div>
        </Link>
        <Link href="/tracker/dashboard" style={{ color: gold, fontSize: '13px', textDecoration: 'none' }}>View Dashboard →</Link>
      </nav>

      <div style={{ paddingTop: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '100px 24px 48px' }}>
        <div style={{ maxWidth: '580px', width: '100%' }}>

          {/* Success header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(200,146,42,0.12)', border: '2px solid rgba(200,146,42,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 16px' }}>✓</div>
            <h1 style={{ color: '#F5F0E8', fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px' }}>You're set up!</h1>
            <p style={{ color: dim, fontSize: '15px', margin: 0, lineHeight: 1.6 }}>Your tracking ID is ready. Install the snippet below to start seeing visitors.</p>
          </div>

          {/* Tracking ID card */}
          <div style={{ background: 'rgba(12,10,8,0.95)', border: '2px solid rgba(200,146,42,0.4)', borderRadius: '20px', padding: '36px', marginBottom: '20px', boxShadow: '0 0 40px rgba(200,146,42,0.08)' }}>

            {/* ID */}
            <div style={{ textAlign: 'center', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid rgba(200,146,42,0.15)' }}>
              <p style={{ color: gold, fontSize: '10px', letterSpacing: '3px', margin: '0 0 10px', textTransform: 'uppercase' }}>Your Tracking ID</p>
              <div style={{ background: 'rgba(200,146,42,0.08)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '10px', padding: '16px 24px', display: 'inline-block' }}>
                <code style={{ color: '#F5F0E8', fontSize: '26px', fontWeight: 'bold', letterSpacing: '3px', fontFamily: 'monospace' }}>{trackingId}</code>
              </div>
              <p style={{ color: dim, fontSize: '12px', margin: '10px 0 0' }}>Save this ID — you'll need it to access your dashboard</p>
            </div>

            {/* Snippet */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: gold, fontSize: '10px', letterSpacing: '3px', margin: '0 0 10px', textTransform: 'uppercase' }}>Install on Your Website</p>
              <p style={{ color: dim, fontSize: '13px', margin: '0 0 12px', lineHeight: 1.5 }}>Paste this one line into your website's <code style={{ color: gold, background: 'rgba(200,146,42,0.1)', padding: '1px 6px', borderRadius: '4px' }}>&lt;head&gt;</code> tag:</p>
              <div style={{ background: '#060402', border: '1px solid rgba(200,146,42,0.2)', borderRadius: '10px', padding: '16px', marginBottom: '12px', position: 'relative' }}>
                <code style={{ color: gold, fontSize: '12px', fontFamily: 'monospace', wordBreak: 'break-all', display: 'block', lineHeight: 1.5 }}>{snippet}</code>
              </div>
              <button onClick={copySnippet} style={{ width: '100%', padding: '12px', background: copied ? 'rgba(76,175,80,0.15)' : 'rgba(200,146,42,0.1)', border: `1px solid ${copied ? 'rgba(76,175,80,0.4)' : 'rgba(200,146,42,0.4)'}`, color: copied ? '#81C784' : gold, borderRadius: '10px', fontFamily: 'Georgia, serif', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
                {copied ? '✓ Copied!' : 'Copy Snippet'}
              </button>
            </div>

            {/* Platform quick guide */}
            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '10px', padding: '16px', marginBottom: '24px' }}>
              <p style={{ color: gold, fontSize: '10px', letterSpacing: '2px', margin: '0 0 10px', textTransform: 'uppercase' }}>Where to paste it</p>
              {[
                ['WordPress', 'Appearance → Theme Editor → header.php → before </head>'],
                ['Squarespace', 'Settings → Advanced → Code Injection → Header'],
                ['Wix', 'Settings → Custom Code → Head'],
                ['Shopify', 'Online Store → Themes → Edit Code → theme.liquid'],
              ].map(([platform, path]) => (
                <div key={platform} style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ color: gold, fontSize: '12px', width: '90px', flexShrink: 0, fontWeight: 'bold' }}>{platform}</span>
                  <span style={{ color: dim, fontSize: '12px', lineHeight: 1.4 }}>{path}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href={`/tracker/dashboard?id=${trackingId}`} style={{ display: 'block', width: '100%', padding: '15px', background: gold, color: '#060608', textAlign: 'center', borderRadius: '12px', textDecoration: 'none', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px', boxSizing: 'border-box' }}>
              View My Dashboard →
            </Link>
          </div>

          <p style={{ color: 'rgba(245,240,232,0.3)', fontSize: '12px', textAlign: 'center', lineHeight: 1.6 }}>
            Once installed, visit your site and check the dashboard — you'll see your visit appear within seconds.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#060608', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid rgba(200,146,42,0.2)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.97)', backdropFilter: 'blur(8px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/logo.svg" style={{ height: '40px', width: '40px', borderRadius: '50%', border: '1px solid rgba(200,146,42,0.4)' }} />
          <div>
            <p style={{ color: gold, fontWeight: 'bold', fontSize: '14px', margin: 0, letterSpacing: '1px' }}>THE WASTED APE</p>
            <p style={{ color: 'rgba(245,240,232,0.35)', fontSize: '9px', letterSpacing: '2px', margin: 0 }}>TRACKER</p>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/tracker/dashboard" style={{ color: dim, fontSize: '13px', textDecoration: 'none' }}>Sign In</Link>
          <Link href="/tracker" style={{ color: dim, fontSize: '13px', textDecoration: 'none' }}>← Pricing</Link>
        </div>
      </nav>

      <div style={{ paddingTop: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '100px 24px 48px' }}>
        <div style={{ maxWidth: '460px', width: '100%' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src="/tracker-icon.png" style={{ width: '80px', height: '80px', borderRadius: '50%', border: `2px solid rgba(200,146,42,0.5)`, boxShadow: '0 0 30px rgba(200,146,42,0.2)', marginBottom: '16px', objectFit: 'cover' }} />
            <p style={{ color: gold, fontSize: '11px', letterSpacing: '3px', margin: '0 0 6px' }}>WASTEDAPE TRACKER</p>
            <h1 style={{ color: '#F5F0E8', fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px' }}>Create Your Account</h1>
            <p style={{ color: dim, fontSize: '14px', margin: 0, lineHeight: 1.6 }}>Get your unique tracking ID and start seeing who visits your website.</p>
          </div>

          {/* Form card */}
          <div style={{ background: 'rgba(12,10,8,0.95)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '20px', padding: '36px', boxShadow: '0 0 40px rgba(200,146,42,0.06)' }}>

            {error && (
              <div style={{ background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.4)', borderRadius: '8px', padding: '12px 16px', color: '#e05555', fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input type="text" placeholder="Dan Bloom" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" placeholder="you@business.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Your Website <span style={{ color: 'rgba(245,240,232,0.3)', fontSize: '10px', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                <input type="text" placeholder="https://yourbusiness.com" value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Password <span style={{ color: 'rgba(245,240,232,0.3)', fontSize: '10px', textTransform: 'none', letterSpacing: 0 }}>(to access your dashboard)</span></label>
                <input type="password" placeholder="Create a password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} required style={inputStyle} />
              </div>

              {/* TOS checkbox */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px', background: 'rgba(200,146,42,0.05)', border: '1px solid rgba(200,146,42,0.2)', borderRadius: '10px' }}>
                <input type="checkbox" id="tos" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                  style={{ marginTop: '2px', accentColor: gold, width: '16px', height: '16px', flexShrink: 0, cursor: 'pointer' }} />
                <label htmlFor="tos" style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '13px', lineHeight: 1.5, cursor: 'pointer' }}>
                  I agree to the <a href="/tos" target="_blank" style={{ color: gold, textDecoration: 'underline' }}>Terms of Service</a>. I understand that I am responsible for disclosing the use of visitor tracking on my own website.
                </label>
              </div>

              <button type="submit" disabled={loading || !agreed} style={{
                width: '100%', padding: '15px', marginTop: '4px',
                background: !agreed ? 'rgba(200,146,42,0.25)' : loading ? 'rgba(200,146,42,0.4)' : gold,
                color: !agreed ? 'rgba(200,146,42,0.5)' : '#060608', border: 'none', borderRadius: '12px',
                fontFamily: 'Georgia, serif', fontWeight: 'bold',
                fontSize: '16px', cursor: !agreed || loading ? 'default' : 'pointer',
                transition: 'all 0.2s',
              }}>
                {loading ? 'Setting up your account...' : agreed ? 'Get My Tracking ID →' : 'Please agree to Terms below'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(200,146,42,0.15)' }} />
              <p style={{ color: 'rgba(245,240,232,0.3)', fontSize: '12px', margin: 0 }}>already have an account?</p>
              <div style={{ flex: 1, height: '1px', background: 'rgba(200,146,42,0.15)' }} />
            </div>

            <Link href="/tracker/dashboard" style={{ display: 'block', textAlign: 'center', marginTop: '14px', color: gold, fontSize: '13px', textDecoration: 'none' }}>
              Sign in to your dashboard →
            </Link>
          </div>

          {/* Features */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '20px' }}>
            {[['👁', 'Real-Time'], ['📍', 'City & Company'], ['📊', 'Pages & Sources']].map(([icon, label]) => (
              <div key={label} style={{ background: 'rgba(12,10,8,0.6)', border: '1px solid rgba(200,146,42,0.15)', borderRadius: '10px', padding: '14px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>{icon}</div>
                <div style={{ color: 'rgba(245,240,232,0.45)', fontSize: '11px', lineHeight: 1.3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
