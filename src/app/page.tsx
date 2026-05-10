'use client'
import Link from 'next/link'
import Image from 'next/image'

const APPS = [
  {
    name: 'Boat Buddy',
    tagline: 'AI Marine Diagnostic Assistant',
    desc: 'Diagnose any marine engine problem instantly. Photo analysis, service manuals, work orders, fleet management. Built for boaters and marine service shops.',
    url: 'https://boatbuddy.thewastedape.com',
    logo: '/boat-buddy-logo.png',
    color: '#C68B3A',
    features: ['AI engine diagnosis', '25 system diagrams', 'Service manuals', 'Work orders + invoices', 'Parts inventory', 'Team management'],
  },
  {
    name: 'Diesel Dude',
    tagline: 'AI Diesel Diagnostic Assistant',
    desc: 'From pickup trucks to heavy equipment — fault codes, DPF regens, DEF systems, and more. Built for fleet mechanics and heavy equipment operators.',
    url: 'https://dieseldude.thewastedape.com',
    logo: '/diesel-dude-logo.png',
    color: '#C68B3A',
    features: ['Cummins, CAT, Detroit, Deere', 'OBD2 + J1939 fault codes', 'Asset log by hours', 'Work orders + invoices', 'RTA Fleet integration (coming)', 'Service manuals'],
  },
]

const SERVICES = [
  { name: 'Basic Setup', price: '$299', desc: '1-hour remote session. AI assistant connected to your phone, email, and calendar. Ready same day.' },
  { name: 'Pro Setup', price: '$799', desc: '3-hour custom build. Full integration with your business tools — eBay, Gmail, Shopify, and more.' },
  { name: 'Monthly Support', price: 'from $49/mo', desc: 'Ongoing maintenance, updates, and support. Your AI keeps working perfectly.' },
]

export default function HomePage() {
  const dim = { color: 'rgba(245,240,232,0.6)', fontFamily: 'Georgia, serif' }
  const gold = { color: '#C8922A', fontFamily: 'Georgia, serif' }

  return (
    <div style={{ background: '#060608', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid rgba(200,146,42,0.2)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.95)', backdropFilter: 'blur(8px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '44px', width: '44px', borderRadius: '50%' }} />
          <div>
            <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px', margin: 0, letterSpacing: '1px' }}>THE WASTED APE</p>
            <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '2px', margin: 0 }}>TECH SOLUTIONS</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="#apps" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>Apps</a>
          <a href="#services" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>Services</a>
          <Link href="/book" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>Book a Session</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '80px', overflow: 'hidden' }}>
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 1.0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,8,0.1) 0%, rgba(6,6,8,0.5) 70%, rgba(6,6,8,1) 100%)' }} />
        
        <div style={{ position: 'relative', zIndex: 10, padding: '0 24px', maxWidth: '800px', margin: '0 auto' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '320px', width: '320px', borderRadius: '50%', marginBottom: '28px', border: '3px solid rgba(200,146,42,0.6)', boxShadow: '0 0 60px rgba(200,146,42,0.3)' }} />
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '4px', marginBottom: '12px' }}>AI &bull; TECH &bull; SOLUTIONS</p>
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '20px' }}>
            Technology that works as hard as you do.
          </h1>
          <p style={{ ...dim, fontSize: '18px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '580px', margin: '0 auto 36px' }}>
            AI assistants custom-built for your business. Marine diagnostics, diesel fleet tools, automated eBay listing, email management, and more. Setup in hours.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}>Book AI Setup — from $299</Link>
            <a href="#apps" className="btn-outline">See Our Apps</a>
          </div>
        </div>
      </section>

      {/* Apps */}
      <section id="apps" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', textAlign: 'center', marginBottom: '8px' }}>OUR APPS</p>
        <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '12px' }}>Built by WastedApe</h2>
        <p style={{ ...dim, fontSize: '16px', textAlign: 'center', marginBottom: '48px' }}>Professional AI tools for specialized industries. Free to try.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {APPS.map(app => (
            <div key={app.name} style={{ background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <img src={app.logo} alt={app.name} style={{ height: '56px', width: '56px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '22px', margin: 0 }}>{app.name}</h3>
                  <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '12px', margin: 0, letterSpacing: '1px' }}>{app.tagline}</p>
                </div>
              </div>
              <p style={{ ...dim, fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', flexGrow: 1 }}>{app.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                {app.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(245,240,232,0.65)', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ color: '#C8922A' }}>&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                Try {app.name} Free &#8594;
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '80px 24px', background: 'rgba(200,146,42,0.04)', borderTop: '1px solid rgba(200,146,42,0.12)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', textAlign: 'center', marginBottom: '8px' }}>AI SETUP SERVICES</p>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '12px' }}>We build your AI for you</h2>
          <p style={{ ...dim, fontSize: '16px', textAlign: 'center', marginBottom: '48px' }}>Remote setup sessions. Your AI assistant ready in hours, not months.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {SERVICES.map((s, i) => (
              <div key={s.name} style={{ background: 'rgba(12,10,8,0.9)', border: i === 1 ? '2px solid #C8922A' : '1px solid rgba(200,146,42,0.2)', borderRadius: '14px', padding: '28px' }}>
                {i === 1 && <p style={{ ...gold, fontSize: '11px', letterSpacing: '2px', marginBottom: '8px', fontWeight: 'bold' }}>MOST POPULAR</p>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '20px', margin: 0 }}>{s.name}</h3>
                  <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{s.price}</p>
                </div>
                <p style={{ ...dim, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/book" className="btn-primary" style={{ fontSize: '17px', padding: '16px 40px' }}>Book Your Setup</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid rgba(200,146,42,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '36px', width: '36px', borderRadius: '50%' }} />
          <p style={{ color: 'rgba(245,240,232,0.3)', fontFamily: 'Georgia, serif', fontSize: '12px', margin: 0 }}>
            &copy; 2026 WastedApe &bull; wastedape.org
          </p>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="https://boatbuddy.thewastedape.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Boat Buddy</a>
          <a href="https://dieseldude.thewastedape.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Diesel Dude</a>
          <a href="mailto:thewastedape@gmail.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>
    </div>
  )
}
