'use client'
import Link from 'next/link'
export default function DatacenterPage() {
  const accent = { color: '#C68B3A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }
  return (
    <div style={{ background: '#1a1a1a', color: '#F5F0E8', minHeight: '100vh', padding: '2rem', fontFamily: 'Georgia, serif' }}>
      <nav style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between' }}>
        <span style={accent}>🦍 WastedApe</span>
        <Link href="/services" style={{ color: '#C68B3A', textDecoration: 'none' }}>← All Services</Link>
      </nav>
      
      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={accent}>DATA CENTER AUDITS</h1>
        
        <p style={{ ...dim, fontSize: '1.2rem', marginTop: '0.5rem' }}>
*Data Center Energy & Infrastructure Audits*
        </p>

        <p style={bright}>
On-site and remote audits measuring PUE, WUE, cooling efficiency, and energy waste. Deliverable: written report with findings and recommendations.
        </p>
        
        <section style={{ marginTop: '2rem' }}>
          <h2 style={accent}>
*WHAT WE AUDIT*
          </h2>
          
          <ul style={dim}>
            <li>• PUE (Power Usage Effectiveness) measurement</li>
            <li>• WUE (Water Usage Effectiveness) analysis</li>
            <li>• Heat and cooling system efficiency</li>
            <li>• 12-month utility bill analysis</li>
            <li>• Cooling tower CoC and water chemistry</li>
            <li>• Electrical consumption vs. IT load</li>
          </ul>
        </section>

        <section style={{ marginTop: '3rem', padding: '2rem', background: '#222', borderLeft: '4px solid #C68B3A' }}>
          <h2 style={accent}>
*Pricing*
          </h2>
          <p style={dim}>
Register to see audit tiers from utility bill review to full on-site audit.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Link href="/register" style={{ padding: '0.75rem 1.5rem', background: '#C68B3A', color: '#000', textDecoration: 'none', fontWeight: 'bold' }}>
              Register to See Pricing
            </Link>
            <Link href="/maximus/book" style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: '#C68B3A', border: '1px solid #C68B3A', textDecoration: 'none', fontWeight: 'bold' }}>
              Request an Audit
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}
