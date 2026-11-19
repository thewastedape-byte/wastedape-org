'use client'
import Link from 'next/link'

export default function AIBotsPage() {
  const gold = { color: '#C8922A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.6)', fontFamily: 'Georgia, serif' }

  return (
    <div style={{ background: '#060608', minHeight: '100vh', color: '#F5F0E8' }}>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid rgba(200,146,42,0.2)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.95)', backdropFilter: 'blur(8px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '44px', width: '44px', borderRadius: '50%' }} />
          <div>
            <p style={{ ...gold, fontWeight: 'bold', fontSize: '16px', margin: 0, letterSpacing: '1px' }}>THE WASTED APE</p>
            <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '2px', margin: 0 }}>TECH SOLUTIONS</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="/#apps" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>Apps</a>
          <a href="/#services" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>Services</a>
          <a href="/#contact" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>Contact</a>
          <Link href="/maximus/book" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>Get Started</Link>
        </div>
      </nav>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 24px 80px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '12px', fontSize: '14px' }}>
            <span style={gold}>🦍 WastedApe</span> / <span style={bright}>AI Bots</span>
          </div>
          <Link href="/services" style={{ ...dim, fontSize: '14px', textDecoration: 'underline' }}>← All Services</Link>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ ...bright, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 'bold', marginBottom: '12px' }}>AI BOT DEVELOPMENT</h1>
          <p style={{ ...dim, fontSize: '16px' }}>AI Bots & Intelligent Automation</p>
        </div>

        <div style={{ marginBottom: '32px', lineHeight: '1.8', fontSize: '16px', color: 'rgba(245,240,232,0.8)' }}>
          <p>Custom AI bots, voice agents, and intelligent automation. Telegram bots, customer-facing AI assistants, outbound calling systems — built and deployed to production.</p>
        </div>

        <div style={{ marginBottom: '32px', borderTop: '1px solid rgba(200,146,42,0.25)', paddingTop: '24px' }}>
          <h2 style={{ ...gold, fontSize: '18px', marginBottom: '16px', fontWeight: 'bold' }}>WHAT WE BUILD</h2>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.9' }}>
            <li style={{ marginBottom: '8px', fontSize: '15px' }}>• Telegram bots with real tool use and memory</li>
            <li style={{ marginBottom: '8px', fontSize: '15px' }}>• AI-powered customer-facing chat apps</li>
            <li style={{ marginBottom: '8px', fontSize: '15px' }}>• Voice AI with real-time STT and TTS</li>
            <li style={{ marginBottom: '8px', fontSize: '15px' }}>• Outbound calling systems (SignalWire + AI)</li>
            <li style={{ marginBottom: '8px', fontSize: '15px' }}>• Marketplace automation (eBay, Shopify)</li>
            <li style={{ marginBottom: '8px', fontSize: '15px' }}>• Workflow automation and AI integrations</li>
          </ul>
        </div>

        <div style={{ borderTop: '1px solid rgba(200,146,42,0.25)', paddingTop: '24px' }}>
          <h2 style={{ ...gold, fontSize: '18px', marginBottom: '16px', fontWeight: 'bold' }}>Pricing</h2>
          <p style={{ ...dim, fontSize: '15px', marginBottom: '24px' }}>Register to see pricing. Bot builds start at $500.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ ...dim, padding: '12px 24px', border: '1px solid rgba(200,146,42,0.4)', textDecoration: 'none', borderRadius: '8px', fontSize: '14px', transition: 'all 0.3s' }}>Register to See Pricing</Link>
            <Link href="/maximus/book" style={{ ...bright, padding: '12px 24px', background: '#C8922A', color: '#060608', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.3s' }}>Build Your Bot</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
