'use client'
import Link from 'next/link'

export default function ServicesPage() {
  const gold = { color: '#C8922A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.6)', fontFamily: 'Georgia, serif' }

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

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 80px' }}>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', marginBottom: '8px' }}>WHAT WE BUILD</p>
          <h1 style={{ ...bright, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 'bold', marginBottom: '12px' }}>Full-Service AI for Your Business</h1>
          <p style={{ ...dim, fontSize: '16px', maxWidth: '620px', margin: '0 auto' }}>From lead gen to data centers — we build, automate, and optimize the work that's eating your time.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {services.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ padding: '24px', background: 'rgba(12,10,8,0.95)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '14px', cursor: 'pointer', transition: 'all 0.3s ease', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ ...gold, fontSize: '18px', marginBottom: '12px', fontWeight: 'bold' }}>{s.title}</h3>
                <p style={{ ...dim, fontSize: '14px', flex: 1 }}>{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
