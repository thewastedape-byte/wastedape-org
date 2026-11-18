'use client'
import Link from 'next/link'
export default function BuildsPage() {
  const accent = { color: '#C68B3A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }
  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', color: '#F5F0E8', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
          <span style={accent}>🦍 WastedApe</span> / Builds
          <br />
          <Link href="/services" style={{ ...dim, textDecoration: 'underline' }}>← All Services</Link>
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ ...bright, fontSize: '2.5rem', marginBottom: '1rem' }}>APP & WEB DEVELOPMENT</h1>
          <p style={dim}>App & Website Development</p>
        </div>

        <div style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
          <p>Full-stack web and mobile apps built on Next.js, React Native, Node.js, and Python. 10+ production deployments live.</p>
        </div>

        <div style={{ marginBottom: '2rem', borderTop: '1px solid rgba(198, 139, 58, 0.3)', paddingTop: '1.5rem' }}>
          <h2 style={{ ...accent, fontSize: '1.2rem', marginBottom: '1rem' }}>WHAT WE BUILD</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>• Web applications (Next.js, React)</li>
            <li style={{ marginBottom: '0.5rem' }}>• Mobile apps (React Native / Expo)</li>
            <li style={{ marginBottom: '0.5rem' }}>• Backend APIs and integrations</li>
            <li style={{ marginBottom: '0.5rem' }}>• Stripe payment integration</li>
            <li style={{ marginBottom: '0.5rem' }}>• Database design and cloud deployment</li>
            <li style={{ marginBottom: '0.5rem' }}>• Ongoing maintenance and hosting management</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(198, 139, 58, 0.3)', paddingTop: '1.5rem' }}>
          <h2 style={{ ...accent, fontSize: '1.2rem', marginBottom: '1.5rem' }}>Pricing</h2>
          <p style={dim}>Register to see pricing. Simple site to full app — we scope it right.</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Link href="/signup" style={{ ...accent, padding: '0.75rem 1.5rem', border: `1px solid ${accent.color}`, textDecoration: 'none', borderRadius: '4px' }}>Register to See Pricing</Link>
            <Link href="/maximus/book" style={{ ...bright, padding: '0.75rem 1.5rem', background: accent.color, color: '#1a1a1a', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Tell Us What You&apos;re Building</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
