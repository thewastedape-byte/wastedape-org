'use client'
import Link from 'next/link'

export default function MaximusPage() {
  const gold = { color: '#C8922A', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.6)', fontFamily: 'Georgia, serif' }

  return (
    <div style={{ background: '#060608', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid rgba(200,146,42,0.2)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.95)', backdropFilter: 'blur(8px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '44px', width: '44px', borderRadius: '50%' }} />
          <div>
            <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px', margin: 0, letterSpacing: '1px' }}>THE WASTED APE</p>
            <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '2px', margin: 0 }}>TECH SOLUTIONS</p>
          </div>
        </Link>
        <Link href="/" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>← Back to Home</Link>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', padding: '140px 24px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <img src="/logo.svg" alt="Maximus" style={{ height: '120px', width: '120px', borderRadius: '50%', marginBottom: '28px', border: '2px solid rgba(200,146,42,0.5)', boxShadow: '0 0 40px rgba(200,146,42,0.25)' }} />
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '4px', marginBottom: '12px' }}>AI BUSINESS PARTNER</p>
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '20px' }}>
            Meet Maximus
          </h1>
          <p style={{ ...dim, fontSize: '18px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '600px', margin: '0 auto 36px' }}>
            Your AI-powered business consultant. Available 24/7 to answer questions, scope projects, and help you figure out exactly what you need.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/maximus/book" className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}>Book a Free Consultation</Link>
            <Link href="/" className="btn-outline">See Our Services</Link>
          </div>
        </div>
      </section>

      {/* WHAT MAXIMUS DOES */}
      <section style={{ padding: '80px 24px', background: 'rgba(200,146,42,0.03)', borderTop: '1px solid rgba(200,146,42,0.12)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', textAlign: 'center', marginBottom: '8px' }}>WHAT I DO</p>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>How Maximus Helps You</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🤖', title: 'Scope Your Project', desc: 'Tell me what you need. I\'ll break it down, give you a realistic timeline, and a firm price — no runaround.' },
              { icon: '⚡', title: 'Answer Any Question', desc: 'AI, automation, industrial controls, data centers — ask me anything technical. I know this stuff cold.' },
              { icon: '📅', title: 'Book & Schedule', desc: 'Ready to move forward? Book a 15-minute call and we\'ll start building the same week.' },
              { icon: '🔧', title: '24/7 Availability', desc: 'No waiting for business hours. Send a message anytime and get a real answer, not a form response.' },
            ].map(item => (
              <div key={item.title} style={{ background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.22)', borderRadius: '14px', padding: '28px' }}>
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>{item.icon}</div>
                <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '18px', margin: '0 0 10px' }}>{item.title}</h3>
                <p style={{ ...dim, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', textAlign: 'center', marginBottom: '8px' }}>EXPERTISE</p>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>What We Specialize In</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              'Custom AI Bots & Automation',
              'Industrial Controls (Siemens S7 / Allen-Bradley)',
              'Data Center Energy Audits (PUE/WUE)',
              'Marine AI Diagnostics',
              'Lead Generation Systems',
              'API & Full-Stack Development',
              'AI Telemarketing & Outbound',
              'Diesel & Fleet Diagnostics',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.18)', borderRadius: '10px' }}>
                <span style={{ color: '#C8922A', fontSize: '16px' }}>✓</span>
                <span style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'rgba(200,146,42,0.05)', borderTop: '1px solid rgba(200,146,42,0.15)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Ready to get started?</h2>
          <p style={{ ...dim, fontSize: '17px', lineHeight: '1.7', marginBottom: '36px' }}>
            Book a free 15-minute call. We'll scope your project, give you a firm price, and start the same week.
          </p>
          <Link href="/maximus/book" className="btn-primary" style={{ fontSize: '17px', padding: '16px 40px' }}>Book a Free Call →</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid rgba(200,146,42,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ color: 'rgba(245,240,232,0.3)', fontFamily: 'Georgia, serif', fontSize: '12px', margin: 0 }}>© 2026 WastedApe Tech · wastedape.org</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Home</Link>
          <Link href="/services" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Services</Link>
          <a href="mailto:thewastedape@gmail.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>

    </div>
  )
}
