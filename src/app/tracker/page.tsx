'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8922A'
const dim = 'rgba(245,240,232,0.6)'
const surface = 'rgba(12,10,8,0.95)'
const border = 'rgba(200,146,42,0.25)'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    desc: 'Perfect for small business owners',
    features: ['1 website', 'Up to 1,000 visits/mo', 'Real-time visitor dashboard', 'City & company tracking', 'Page & referrer data', 'Device & browser info', 'Email support'],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    desc: 'For growing businesses',
    features: ['3 websites', 'Up to 10,000 visits/mo', 'Everything in Starter', 'Priority support', 'Export visitor data', 'Custom alerts'],
    highlight: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: '$99',
    desc: 'For agencies & power users',
    features: ['Unlimited websites', 'Unlimited visits', 'Everything in Pro', 'White-label dashboard', 'API access', 'Dedicated support'],
    highlight: false,
  },
]

export default function TrackerLanding() {
  const [loading, setLoading] = useState<string | null>(null)

  const checkout = async (planId: string) => {
    setLoading(planId)
    try {
      const r = await fetch('/api/tracker/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId })
      })
      const d = await r.json()
      if (d.url) window.location.href = d.url
    } catch { setLoading(null) }
  }

  return (
    <div style={{ background: '#060608', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid rgba(200,146,42,0.2)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.97)', backdropFilter: 'blur(8px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/logo.svg" style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
          <span style={{ color: gold, fontWeight: 'bold', fontSize: '15px', letterSpacing: '1px' }}>WastedApe Tracker</span>
        </Link>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/tracker/dashboard" style={{ color: dim, fontSize: '13px', textDecoration: 'none' }}>Sign In</Link>
          <a href="#pricing" style={{ background: gold, color: '#060608', padding: '9px 20px', borderRadius: '8px', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold' }}>Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', padding: '140px 24px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ color: gold, fontSize: '11px', letterSpacing: '4px', margin: '0 0 16px' }}>WEBSITE VISITOR INTELLIGENCE</p>
          <h1 style={{ color: '#F5F0E8', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 'bold', lineHeight: '1.15', margin: '0 0 20px' }}>
            Know exactly who's<br />visiting your website.
          </h1>
          <p style={{ color: dim, fontSize: '18px', lineHeight: '1.7', margin: '0 auto 40px', maxWidth: '600px' }}>
            One line of code. Real-time visitor tracking — city, company, pages viewed, device, and more. No technical skills required.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#pricing" style={{ background: gold, color: '#060608', padding: '16px 36px', borderRadius: '10px', fontSize: '17px', textDecoration: 'none', fontWeight: 'bold' }}>See Plans & Pricing →</a>
            <Link href="/tracker/dashboard" style={{ background: 'transparent', color: gold, border: `1px solid ${gold}`, padding: '16px 36px', borderRadius: '10px', fontSize: '17px', textDecoration: 'none' }}>Sign In</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(200,146,42,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ color: gold, fontSize: '11px', letterSpacing: '3px', textAlign: 'center', margin: '0 0 12px' }}>HOW IT WORKS</p>
          <h2 style={{ color: '#F5F0E8', fontSize: '36px', textAlign: 'center', margin: '0 0 56px' }}>Up and running in 2 minutes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { step: '1', title: 'Sign up', desc: 'Create your account and choose a plan. Takes 60 seconds.' },
              { step: '2', title: 'Get your snippet', desc: 'You\'ll receive a one-line tracking code unique to your account.' },
              { step: '3', title: 'Install it', desc: 'Paste it into your website\'s <head> tag. Works on any platform.' },
              { step: '4', title: 'Watch it live', desc: 'Open your dashboard and see visitors in real-time — city, company, pages.' },
            ].map(s => (
              <div key={s.step} style={{ background: surface, border: `1px solid ${border}`, borderRadius: '14px', padding: '28px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(200,146,42,0.15)', border: `1px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: gold, fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>{s.step}</div>
                <h3 style={{ color: '#F5F0E8', fontSize: '18px', margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ color: dim, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: 'rgba(200,146,42,0.03)', borderTop: '1px solid rgba(200,146,42,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ color: gold, fontSize: '11px', letterSpacing: '3px', textAlign: 'center', margin: '0 0 12px' }}>WHAT YOU SEE</p>
          <h2 style={{ color: '#F5F0E8', fontSize: '36px', textAlign: 'center', margin: '0 0 48px' }}>Every visitor. Full detail.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              ['📍', 'City & Country', 'Know exactly where your visitors are located'],
              ['🏢', 'Company Name', 'See which businesses are checking you out'],
              ['📄', 'Pages Viewed', 'Track which pages get the most attention'],
              ['🔗', 'Referrer Source', 'Know how they found you'],
              ['📱', 'Device & Browser', 'Desktop vs mobile, Chrome vs Safari'],
              ['⚡', 'Real-Time', 'See visits as they happen, not hours later'],
            ].map(([icon, title, desc]) => (
              <div key={title as string} style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '22px' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
                <h3 style={{ color: '#F5F0E8', fontSize: '15px', margin: '0 0 6px' }}>{title as string}</h3>
                <p style={{ color: dim, fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '80px 24px', borderTop: '1px solid rgba(200,146,42,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ color: gold, fontSize: '11px', letterSpacing: '3px', textAlign: 'center', margin: '0 0 12px' }}>PRICING</p>
          <h2 style={{ color: '#F5F0E8', fontSize: '36px', textAlign: 'center', margin: '0 0 12px' }}>Simple monthly pricing</h2>
          <p style={{ color: dim, fontSize: '16px', textAlign: 'center', margin: '0 0 48px' }}>Cancel anytime. No contracts.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {PLANS.map(plan => (
              <div key={plan.id} style={{ background: surface, border: `2px solid ${plan.highlight ? gold : border}`, borderRadius: '16px', padding: '36px 28px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {plan.highlight && <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: gold, color: '#060608', padding: '4px 20px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                <h3 style={{ color: '#F5F0E8', fontSize: '22px', margin: '0 0 4px' }}>{plan.name}</h3>
                <p style={{ color: dim, fontSize: '13px', margin: '0 0 20px' }}>{plan.desc}</p>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ color: '#F5F0E8', fontSize: '44px', fontWeight: 'bold' }}>{plan.price}</span>
                  <span style={{ color: dim, fontSize: '14px' }}>/month</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flexGrow: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '10px', color: dim, fontSize: '14px', marginBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: gold, flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => checkout(plan.id)} disabled={loading === plan.id}
                  style={{ width: '100%', padding: '14px', background: plan.highlight ? gold : 'transparent', color: plan.highlight ? '#060608' : gold, border: `1px solid ${gold}`, borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
                  {loading === plan.id ? 'Redirecting...' : `Start ${plan.name} →`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid rgba(200,146,42,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ color: 'rgba(245,240,232,0.3)', fontSize: '12px', margin: 0 }}>© 2026 WastedApe Tech · wastedape.org</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/" style={{ color: 'rgba(200,146,42,0.5)', fontSize: '12px', textDecoration: 'none' }}>Home</Link>
          <Link href="/tracker/dashboard" style={{ color: 'rgba(200,146,42,0.5)', fontSize: '12px', textDecoration: 'none' }}>Dashboard</Link>
          <a href="mailto:thewastedape@gmail.com" style={{ color: 'rgba(200,146,42,0.5)', fontSize: '12px', textDecoration: 'none' }}>Support</a>
        </div>
      </footer>
    </div>
  )
}
