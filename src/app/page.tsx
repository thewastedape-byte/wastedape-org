'use client'
import Link from 'next/link'

const APPS = [
  {
    name: 'ContentBuddy',
    tagline: 'AI Content Studio for Creators — Coming Soon',
    desc: 'Paste a topic or script and get everything in one click: full video script, 10 YouTube titles, SEO blog post, Instagram caption, TikTok script, Twitter thread, LinkedIn post, and email newsletter.',
    url: null,
    logo: '/content-buddy-logo.png',
    comingSoon: true,
    features: ['Full video script from any topic', 'YouTube titles, description & chapters', 'SEO-optimized blog post', 'Instagram, TikTok, Twitter & LinkedIn captions', 'Email newsletter version', 'One click — everything in 30 seconds'],
  },
  {
    name: 'Boat Buddy',
    tagline: 'AI Marine Diagnostic Assistant',
    desc: 'Diagnose any marine engine problem instantly. Photo analysis, service manuals, work orders, fleet management. Built for boaters and marine service shops.',
    url: 'https://boatbuddy.thewastedape.com',
    logo: '/boat-buddy-logo.png',
    features: ['AI engine diagnosis', '25 system diagrams', 'Service manuals', 'Work orders + invoices', 'Parts inventory', 'Team management', '⚓ Add-on: Yard Manager ($29/mo)', '🚢 Add-on: Marina Manager ($49/mo)'],
  },
  {
    name: 'Diesel Dude',
    tagline: 'AI Diesel Diagnostic Assistant — Coming Soon',
    desc: 'From pickup trucks to heavy equipment — fault codes, DPF regens, DEF systems, and more. Built for fleet mechanics and heavy equipment operators. Currently in development.',
    url: null,
    logo: '/diesel-dude-logo.png',
    comingSoon: true,
    features: ['Cummins, CAT, Detroit, Deere', 'OBD2 + J1939 fault codes', 'Asset log by hours', 'Work orders + invoices', 'RTA Fleet integration', 'Service manuals'],
  },
]

const SERVICES_PREVIEW = [
  { icon: '🤖', name: 'Custom AI Bot Builds', price: '$299 setup + $99/mo', desc: 'We build and deploy a custom AI assistant for your business in under a day.' },
  { icon: '📞', name: 'AI Telemarketing', price: 'Per campaign', desc: 'AI-powered outbound calling that qualifies leads and books appointments automatically.' },
  { icon: '🎯', name: 'Lead Generation Bots', price: 'From $199/mo', desc: 'Automated lead scraping, qualification, and outreach for your target industry.' },
  { icon: '📅', name: 'Appointment Booking Bots', price: '$199 setup', desc: 'AI that handles scheduling, reminders, and confirmations — 24/7.' },
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
          <Link href="/services" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>Services</Link>
          <a href="#contact" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>Contact</a>
          <Link href="/book" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 1.0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,8,0.1) 0%, rgba(6,6,8,0.5) 70%, rgba(6,6,8,1) 100%)' }} />
        
        <div style={{ position: 'relative', zIndex: 10, padding: '0 24px', maxWidth: '800px', margin: '0 auto' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '280px', width: '280px', borderRadius: '50%', marginBottom: '28px', border: '3px solid rgba(200,146,42,0.6)', boxShadow: '0 0 60px rgba(200,146,42,0.3)' }} />
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '4px', marginBottom: '12px' }}>AI &bull; TECH &bull; SOLUTIONS</p>
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '20px' }}>
            Technology that works as hard as you do.
          </h1>
          <p style={{ ...dim, fontSize: '18px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '600px', margin: '0 auto 36px' }}>
            AI assistants custom-built for your business. Marine diagnostics, diesel fleet tools, lead generation, AI calling, and more. Setup in hours, not months.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services" className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}>See All Services</Link>
            <Link href="/book" className="btn-outline">Book a Free Call</Link>
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
              {(app as any).comingSoon ? (
                <div style={{ textAlign: 'center', padding: '12px', borderRadius: '10px', background: 'rgba(200,146,42,0.08)', border: '1px dashed rgba(200,146,42,0.3)' }}>
                  <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '13px', margin: 0 }}>🚧 Under Development — Coming Soon</p>
                </div>
              ) : (
                <a href={app.url!} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                  Try {app.name} Free &#8594;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section style={{ padding: '80px 24px', background: 'rgba(200,146,42,0.04)', borderTop: '1px solid rgba(200,146,42,0.12)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', textAlign: 'center', marginBottom: '8px' }}>WHAT WE BUILD</p>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '12px' }}>Full-Service AI for Your Business</h2>
          <p style={{ ...dim, fontSize: '16px', textAlign: 'center', marginBottom: '48px' }}>From lead gen to customer calls — we automate the work that's eating your time.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            {SERVICES_PREVIEW.map(s => (
              <div key={s.name} style={{ background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.2)', borderRadius: '14px', padding: '28px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{s.icon}</div>
                <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '18px', margin: '0 0 6px' }}>{s.name}</h3>
                <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '13px', margin: '0 0 10px', fontWeight: 'bold' }}>{s.price}</p>
                <p style={{ ...dim, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/services" className="btn-primary" style={{ fontSize: '17px', padding: '16px 40px', marginRight: '16px' }}>See All Services</Link>
            <Link href="/book" className="btn-outline">Book a Free Call</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="contact" style={{ padding: '80px 24px', textAlign: 'center', background: 'rgba(200,146,42,0.06)', borderTop: '1px solid rgba(200,146,42,0.15)', borderBottom: '1px solid rgba(200,146,42,0.15)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', marginBottom: '16px' }}>READY TO AUTOMATE?</p>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2' }}>
            Get your AI running today.
          </h2>
          <p style={{ ...dim, fontSize: '18px', lineHeight: '1.7', marginBottom: '36px' }}>
            Book a free 15-minute call. We'll figure out exactly what to build, give you a price, and start the same week.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" className="btn-primary" style={{ fontSize: '18px', padding: '18px 44px' }}>Book Free Call</Link>
            <a href="mailto:thewastedape@gmail.com" className="btn-outline">Email Us</a>
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
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <a href="https://boatbuddy.thewastedape.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Boat Buddy</a>
          <a href="https://dieseldude.thewastedape.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Diesel Dude</a>
          <Link href="/services" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Services</Link>
          <a href="mailto:thewastedape@gmail.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>
    </div>
  )
}
