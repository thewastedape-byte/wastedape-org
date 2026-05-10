'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const PACKAGES = [
  { id: 'basic', name: 'Basic Setup', price: '$199', priceId: 'price_1TUomGHfCuVeN1IrXXXXXXXX', desc: '1-hour remote session, Telegram bot, email monitoring, calendar' },
  { id: 'pro', name: 'Pro Setup', price: '$499', priceId: 'price_1TUomHHfCuVeN1IrXXXXXXXX', desc: '3-hour session, fully custom agent, all tools connected, team access' },
  { id: 'starter', name: 'Starter Support', price: '$49/mo', priceId: 'price_1TUomIHfCuVeN1IrXXXXXXXX', desc: 'Monthly maintenance, 1 support session, updates' },
  { id: 'growth', name: 'Growth Support', price: '$99/mo', priceId: 'price_1TUomJHfCuVeN1IrXXXXXXXX', desc: 'Unlimited support, priority response, new features monthly' },
]

function BookContent() {
  const searchParams = useSearchParams()
  const defaultService = searchParams.get('service') || 'pro'
  const [selected, setSelected] = useState(defaultService)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const pkg = PACKAGES.find(p => p.id === selected) || PACKAGES[1]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) { setError('Name and email are required.'); return }
    setError('')
    setLoading(true)
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: selected, name, email, business, notes })
      })
      const data = await r.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Checkout failed. Please try again.')
    } catch { setError('Something went wrong. Email thewastedape@gmail.com to book manually.') }
    finally { setLoading(false) }
  }

  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }
  const accent = { color: '#C68B3A', fontFamily: 'Georgia, serif' }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '0 0 60px' }}>
      <nav style={{ borderBottom: '1px solid rgba(198,139,58,0.2)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <span style={{ fontSize: '22px' }}>&#127183;</span>
          <p style={{ color: '#C68B3A', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px', margin: 0 }}>WastedApe</p>
        </Link>
        <Link href="/" style={{ color: 'rgba(198,139,58,0.7)', fontFamily: 'Georgia, serif', fontSize: '13px', textDecoration: 'none' }}>&larr; Back</Link>
      </nav>

      <div style={{ maxWidth: '640px', margin: '48px auto', padding: '0 24px' }}>
        <p style={{ ...accent, fontSize: '12px', letterSpacing: '3px', marginBottom: '8px' }}>BOOK A SESSION</p>
        <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Get your AI set up</h1>
        <p style={{ ...dim, fontSize: '15px', marginBottom: '40px' }}>Choose a package, fill in your info, and pay securely via Stripe. We&apos;ll be in touch within 24 hours to schedule your session.</p>

        {/* Package selector */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontWeight: 'bold', marginBottom: '12px' }}>Select Package</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PACKAGES.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)}
                style={{ background: selected === p.id ? 'rgba(198,139,58,0.12)' : 'rgba(15,15,15,0.9)', border: selected === p.id ? '2px solid #C68B3A' : '1px solid rgba(198,139,58,0.2)', borderRadius: '10px', padding: '14px 18px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontWeight: 'bold', margin: '0 0 4px', fontSize: '15px' }}>{p.name}</p>
                  <p style={{ ...dim, fontSize: '13px', margin: 0 }}>{p.desc}</p>
                </div>
                <p style={{ ...accent, fontWeight: 'bold', fontSize: '16px', margin: 0, flexShrink: 0, marginLeft: '16px' }}>{p.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Dan Bloom"
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(198,139,58,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address *</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(198,139,58,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Business Name</label>
            <input value={business} onChange={e => setBusiness(e.target.value)} placeholder="Your shop or company name"
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(198,139,58,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>What do you want the AI to do?</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Monitor my eBay store, answer customer emails, manage my calendar..."
              rows={3}
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(198,139,58,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          {error && <p style={{ color: '#e87070', fontFamily: 'Georgia, serif', fontSize: '13px' }}>{error}</p>}

          <button type="submit" disabled={loading}
            style={{ background: loading ? 'rgba(198,139,58,0.4)' : '#C68B3A', color: '#0a0a0a', fontFamily: 'Georgia, serif', fontWeight: 'bold', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Redirecting to checkout...' : `Pay ${pkg.price} — ${pkg.name}`}
          </button>

          <p style={{ ...dim, fontSize: '12px', textAlign: 'center' }}>
            Secure checkout via Stripe &bull; We&apos;ll contact you within 24h to schedule &bull;{' '}
            <a href="mailto:thewastedape@gmail.com" style={{ color: 'rgba(198,139,58,0.6)' }}>Questions? Email us</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default function BookPage() {
  return <Suspense fallback={<div style={{ background: '#0a0a0a', minHeight: '100vh' }} />}><BookContent /></Suspense>
}
