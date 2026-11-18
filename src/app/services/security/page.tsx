'use client'
import Link from 'next/link'
export default function SecurityPage() {
  const accent = { color: '#C68B3A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }
  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', color: '#F5F0E8', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
          <span style={accent}>🦍 WastedApe</span> / Security
          <br />
          <Link href="/services" style={{ ...dim, textDecoration: 'underline' }}>← All Services</Link>
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ ...bright, fontSize: '2.5rem', marginBottom: '1rem' }}>SECURITY SYSTEMS</h1>
          <p style={dim}>Physical Security & Access Control</p>
        </div>

        <div style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
          <p>We design, source, and oversee installation of physical security infrastructure — cameras, access control, and intrusion detection systems. Fully subcontracted to licensed professionals.</p>
        </div>

        <div style={{ marginBottom: '2rem', borderTop: '1px solid rgba(198, 139, 58, 0.3)', paddingTop: '1.5rem' }}>
          <h2 style={{ ...accent, fontSize: '1.2rem', marginBottom: '1rem' }}>WHAT WE DO</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>• Needs assessment and system design</li>
            <li style={{ marginBottom: '0.5rem' }}>• Camera and CCTV system specification</li>
            <li style={{ marginBottom: '0.5rem' }}>• Access control design (keycard, biometric, PIN)</li>
            <li style={{ marginBottom: '0.5rem' }}>• Intrusion detection planning</li>
            <li style={{ marginBottom: '0.5rem' }}>• Vendor sourcing and project oversight</li>
            <li style={{ marginBottom: '0.5rem' }}>• Commissioning and handoff</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(198, 139, 58, 0.3)', paddingTop: '1.5rem' }}>
          <h2 style={{ ...accent, fontSize: '1.2rem', marginBottom: '1.5rem' }}>Pricing</h2>
          <p style={dim}>Register to see pricing and request a free assessment.</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Link href="/signup" style={{ ...accent, padding: '0.75rem 1.5rem', border: `1px solid ${accent.color}`, textDecoration: 'none', borderRadius: '4px' }}>Register to See Pricing</Link>
            <Link href="/maximus/book" style={{ ...bright, padding: '0.75rem 1.5rem', background: accent.color, color: '#1a1a1a', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Contact for Deposit-Based Engagement</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
