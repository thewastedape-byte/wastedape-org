'use client'
import Link from 'next/link'
export default function DatacenterPage() {
  const accent = { color: '#C68B3A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }
  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', color: '#F5F0E8', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
          <span style={accent}>🦍 WastedApe</span> / Data Center
          <br />
          <Link href="/services" style={{ ...dim, textDecoration: 'underline' }}>← All Services</Link>
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ ...bright, fontSize: '2.5rem', marginBottom: '1rem' }}>DATA CENTER AUDITS</h1>
          <p style={dim}>Data Center Energy & Infrastructure Audits</p>
        </div>

        <div style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
          <p>On-site and remote audits measuring PUE, WUE, cooling efficiency, and energy waste. Deliverable: written report with findings and recommendations.</p>
        </div>

        <div style={{ marginBottom: '2rem', borderTop: '1px solid rgba(198, 139, 58, 0.3)', paddingTop: '1.5rem' }}>
          <h2 style={{ ...accent, fontSize: '1.2rem', marginBottom: '1rem' }}>WHAT WE AUDIT</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>• PUE (Power Usage Effectiveness) measurement</li>
            <li style={{ marginBottom: '0.5rem' }}>• WUE (Water Usage Effectiveness) analysis</li>
            <li style={{ marginBottom: '0.5rem' }}>• Heat and cooling system efficiency</li>
            <li style={{ marginBottom: '0.5rem' }}>• 12-month utility bill analysis</li>
            <li style={{ marginBottom: '0.5rem' }}>• Cooling tower CoC and water chemistry</li>
            <li style={{ marginBottom: '0.5rem' }}>• Electrical consumption vs. IT load</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(198, 139, 58, 0.3)', paddingTop: '1.5rem' }}>
          <h2 style={{ ...accent, fontSize: '1.2rem', marginBottom: '1.5rem' }}>Pricing</h2>
          <p style={dim}>Register to see audit tiers from utility bill review to full on-site audit.</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Link href="/signup" style={{ ...accent, padding: '0.75rem 1.5rem', border: `1px solid ${accent.color}`, textDecoration: 'none', borderRadius: '4px' }}>Register to See Pricing</Link>
            <Link href="/maximus/book" style={{ ...bright, padding: '0.75rem 1.5rem', background: accent.color, color: '#1a1a1a', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Request an Audit</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
