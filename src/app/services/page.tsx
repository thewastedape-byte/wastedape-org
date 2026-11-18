'use client'
import Link from 'next/link'
export default function ServicesPage() {
  const accent = { color: '#C68B3A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }
  const services = [
    { slug: 'security', title: 'Physical Security & Access Control', desc: 'CCTV, access control, intrusion detection. Design and subcontracted installation.' },
    { slug: 'automation', title: 'Automation Controls & PLC Programming', desc: 'Allen-Bradley and Siemens PLC programming, control system integration.' },
    { slug: 'engineering', title: 'Electrical, SCADA & PLC Engineering', desc: 'Electrical engineering consulting, SCADA architecture, system design.' },
    { slug: 'it-audit', title: 'IT Network Health Audit', desc: 'Remote network scan, prioritized vulnerability report, 24-48hr delivery.' },
    { slug: 'datacenter', title: 'Data Center Energy Audits', desc: 'PUE/WUE measurement, heat and cooling audits, utility bill analysis.' },
    { slug: 'builds', title: 'App & Website Development', desc: 'Full-stack web and mobile apps. Next.js, React Native, Node.js.' },
    { slug: 'ai-bots', title: 'AI Bots & Intelligent Automation', desc: 'Custom AI agents, voice bots, Telegram bots, workflow automation.' },
  ]
  return (
    <div style={{ background: '#1a1a1a', color: '#F5F0E8', minHeight: '100vh', padding: '2rem', fontFamily: 'Georgia, serif' }}>
      <nav style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ color: '#C68B3A', textDecoration: 'none', fontSize: '1.2rem' }}>
          🦍 WastedApe
        </Link>
      </nav>
      
      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={accent}>WHAT WE OFFER</h1>
        
        <p style={{ ...dim, fontSize: '1.1rem', marginBottom: '3rem' }}>
*Services*
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {services.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ padding: '1.5rem', background: '#222', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s', hover: { borderColor: '#C68B3A' } }}>
                <h3 style={accent}>{s.title}</h3>
                <p style={dim}>{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ padding: '2rem', background: '#222', borderLeft: '4px solid #C68B3A', marginTop: '3rem' }}>
          <Link href="/download" style={{ color: '#C68B3A', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
            📋 Free IT Audit Checklist →
          </Link>
        </div>

      </main>
    </div>
  )
}
