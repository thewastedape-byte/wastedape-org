'use client'
import Link from 'next/link'

export default function ITAuditPage() {
  const accent = { color: '#C68B3A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }

  return (
    <div style={{ background: '#1a1612', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ ...bright, fontSize: '28px', margin: 0 }}>🦍 WastedApe</h1>
          <Link href="/services" style={{ ...accent, textDecoration: 'none', fontSize: '14px' }}>← All Services</Link>
        </div>

        <h2 style={{ ...accent, fontSize: '48px', marginTop: '60px', marginBottom: '20px' }}>IT NETWORK AUDIT</h2>
        <p style={{ ...dim, fontSize: '16px', marginBottom: '40px' }}>IT Network Health Audit</p>

        <div style={{ marginBottom: '50px' }}>
          <p style={{ ...bright, fontSize: '16px', lineHeight: '1.8' }}>
            We remote into your network, run a full scan, and hand you a prioritized report — what's bad, what's weak, and exactly what to fix. Fixes are quoted separately.
          </p>
        </div>

        <div style={{ marginBottom: '50px' }}>
          <h3 style={{ ...accent, fontSize: '18px', marginBottom: '20px' }}>WHAT WE DO</h3>
          <ul style={{ ...bright, fontSize: '15px', lineHeight: '2', listStyle: 'none', paddingLeft: 0 }}>
            <li>• Remote network access (with client permission)</li>
            <li>• Full device and service inventory scan</li>
            <li>• Open port and vulnerability assessment</li>
            <li>• Credential and access control review</li>
            <li>• AI-generated priority report with specific findings</li>
            <li>• Delivered within 24-48 hours</li>
          </ul>
        </div>

        <div style={{ marginBottom: '50px', padding: '30px', border: `1px solid ${accent.color}`, borderRadius: '4px' }}>
          <h3 style={{ ...accent, fontSize: '18px', marginBottom: '20px' }}>Pricing</h3>
          <p style={{ ...dim, fontSize: '15px', marginBottom: '30px' }}>Register to see audit pricing. Download our free IT Audit Checklist to prepare.</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href="/register" style={{ ...accent, padding: '12px 20px', textDecoration: 'none', border: `1px solid ${accent.color}`, borderRadius: '4px', fontSize: '14px' }}>Register to See Pricing</Link>
            <Link href="/download" style={{ ...bright, padding: '12px 20px', textDecoration: 'none', border: `1px solid ${bright.color}`, borderRadius: '4px', fontSize: '14px' }}>Free IT Audit Checklist</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
