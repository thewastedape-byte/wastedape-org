'use client'
import Link from 'next/link'

const SERVICES = [
  {
    name: 'Custom AI Bots',
    price: '$299 setup + $99/mo',
    desc: 'Fully built and deployed in 24 hours. Lead gen, calling, appointment booking, customer support.',
    link: '/services/ai-bots',
    image: '/service-ai-bots.png',
  },
  {
    name: 'AI Telemarketing',
    price: 'Per campaign',
    desc: 'AI-powered outbound calling that qualifies leads and books appointments automatically.',
    link: '/services/automation',
    image: '/service-telemarketing.png',
  },
  {
    name: 'Lead Generation',
    price: 'From $199/mo',
    desc: 'Automated lead scraping, qualification, and outreach for your target industry.',
    link: '/services/automation',
    image: '/service-leads.png',
  },
  {
    name: 'Appointment Booking Bots',
    price: '$199 setup',
    desc: 'AI that handles scheduling, reminders, and confirmations — 24/7.',
    link: '/services/builds',
    image: '/service-booking.png',
  },
  {
    name: 'Industrial Controls & Automation',
    price: '$75–$150/hr',
    desc: 'Siemens S7, Allen-Bradley, SCADA, PLC programming. 20+ years on the floor.',
    link: '/services/engineering',
    image: '/service-controls.png',
  },
  {
    name: 'Data Center Energy Audits',
    price: '$200–$5,000',
    desc: 'PUE/WUE optimization, thermal imaging, utility bill audits. NoVA/Ashburn focus.',
    link: '/services/datacenter',
    image: '/service-datacenter.png',
  },
  {
    name: 'API + Custom Builds',
    price: 'Project-based',
    desc: 'Full-stack development. Anything from automation scripts to production AI applications.',
    link: '/services/builds',
    image: '/service-builds.png',
  },
]

const APPS = [
  {
    name: 'Boat Buddy',
    tagline: 'AI Marine Diagnostic Assistant',
    desc: 'Diagnose any marine engine problem instantly. Photo analysis, service manuals, work orders, parts inventory, fleet management, cloud sync. Tiers: Free · First Mate $9.99/mo · Captain $24.99/mo · Admiral $49.99/mo. Add-ons: Yard Manager + Marina Manager. Android app on Play Store.',
    url: 'https://boatbuddy.thewastedape.com',
    logo: '/boat-buddy-logo.png',
    status: '🟢 Live',
  },
  {
    name: 'Diesel Dude',
    tagline: 'AI Diesel Diagnostic Assistant',
    desc: 'Fault codes, DPF regens, DEF systems, and more. For fleet mechanics and heavy equipment operators.',
    url: 'https://diesel-dude-app.onrender.com',
    logo: '/diesel-dude-logo.png',
    status: '🟡 Beta',
  },
  {
    name: 'ContentBuddy',
    tagline: 'AI Content Studio for Creators',
    desc: 'Full video script, YouTube titles, SEO blog post, social captions — everything in one click.',
    url: 'https://content-buddy-app.onrender.com',
    logo: '/content-buddy-logo.png',
    status: '🟢 Live',
  },
  {
    name: 'CodexBuddy',
    tagline: 'AI Coding Assistant',
    desc: 'Fix bugs, complete code, explain logic, convert between languages. GitHub Copilot at a fraction of the price.',
    url: 'https://codex-buddy-app.onrender.com',
    logo: '/logo.svg',
    status: '🟢 Live',
  },
  {
    name: 'Fret Buddy',
    tagline: 'AI Guitar Teacher',
    desc: 'Learn guitar with an AI instructor that adapts to your level. Chords, scales, songs, and real-time feedback.',
    url: 'https://fret-buddy-web.onrender.com',
    logo: '/fret-buddy-logo.png',
    status: '🟢 Live',
  },
  {
    name: 'WastedApe Tracker',
    tagline: 'Website Visitor Intelligence',
    desc: 'Know exactly who’s visiting your website — city, company, pages viewed, device, and referrer. One line of code. Real-time dashboard.',
    url: '/tracker',
    logo: '/logo.svg',
    status: '🟢 Live',
  },
]

export default function HomePage() {
  const gold = { color: '#C8922A', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.6)', fontFamily: 'Georgia, serif' }

  return (
    <div style={{ background: '#060608', minHeight: '100vh' }}>

      {/* NAV */}
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
          <a href="#contact" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>Contact</a>
          <Link href="/maximus/book" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 1.0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,8,0.2) 0%, rgba(6,6,8,0.55) 60%, rgba(6,6,8,1) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, padding: '0 24px', maxWidth: '820px', margin: '0 auto' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '240px', width: '240px', borderRadius: '50%', marginBottom: '28px', border: '3px solid rgba(200,146,42,0.6)', boxShadow: '0 0 60px rgba(200,146,42,0.3)' }} />
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '4px', marginBottom: '12px' }}>AI &bull; TECH &bull; SOLUTIONS</p>
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '20px' }}>
            Technology that works as hard as you do.
          </h1>
          <p style={{ ...dim, fontSize: '18px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '620px', margin: '0 auto 36px' }}>
            Custom AI bots, industrial automation consulting, and data center energy audits. Built by a veteran technologist — setup in hours, not months.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#services" className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}>See All Services</a>
            <Link href="/maximus/book" className="btn-outline">Book a Free Call</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', textAlign: 'center', marginBottom: '8px' }}>WHAT WE BUILD</p>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '12px' }}>Full-Service AI for Your Business</h2>
          <p style={{ ...dim, fontSize: '16px', textAlign: 'center', marginBottom: '48px' }}>From lead gen to data centers — we build, automate, and optimize the work that's eating your time.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {SERVICES.map((s) => (
              <Link key={s.name} href={s.link} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: 'rgba(12,10,8,0.95)', border: '1px solid rgba(200,146,42,0.22)', borderRadius: '14px', overflow: 'hidden' }}>
                {/* Card image */}
                {s.image ? (
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(200,146,42,0.12) 0%, rgba(6,6,8,0.9) 100%)', borderBottom: '1px solid rgba(200,146,42,0.15)' }}>
                    <span style={{ fontSize: '56px' }}>{s.icon}</span>
                  </div>
                )}
                {/* Card body */}
                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '18px', margin: '0 0 10px' }}>{s.name}</h3>
                  <p style={{ ...dim, fontSize: '14px', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>{s.desc}</p>
                  <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '13px', margin: '16px 0 0' }}>Learn more →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* APPS */}
      <section id="apps" style={{ padding: '80px 24px', background: 'rgba(200,146,42,0.03)', borderTop: '1px solid rgba(200,146,42,0.12)', borderBottom: '1px solid rgba(200,146,42,0.12)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', textAlign: 'center', marginBottom: '8px' }}>OUR APPS</p>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '12px' }}>Built by WastedApe</h2>
          <p style={{ ...dim, fontSize: '16px', textAlign: 'center', marginBottom: '48px' }}>Professional AI tools for specialized industries. Free to try.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
            {APPS.map((app) => (
              <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <img src={app.logo} alt={app.name} style={{ height: '56px', width: '56px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 2px' }}>{app.name}</h3>
                    <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '12px', margin: '0 0 2px', letterSpacing: '0.5px' }}>{app.tagline}</p>
                    <p style={{ fontFamily: 'Georgia, serif', fontSize: '11px', margin: 0, color: 'rgba(245,240,232,0.4)' }}>{app.status}</p>
                  </div>
                </div>
                <p style={{ ...dim, fontSize: '14px', lineHeight: '1.7', margin: '0 0 20px', flexGrow: 1 }}>{app.desc}</p>
                <div style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 'bold' }}>Try {app.name} Free →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS BAR */}
      <section style={{ padding: '36px 24px', background: 'rgba(200,146,42,0.05)', borderBottom: '1px solid rgba(200,146,42,0.12)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {['ABYC Certified Marine Tech', 'Google Cybersecurity Cert', '20+ Yrs IT & Industrial', 'USMC Veteran', '10+ Production AI Apps', 'Data Center Buildouts 200+ Racks', 'Siemens S7 + Allen-Bradley', 'Available Immediately'].map(c => (
            <span key={c} style={{ color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '0.5px' }}>✓ {c}</span>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', textAlign: 'center', marginBottom: '8px' }}>GET IN TOUCH</p>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 'bold', textAlign: 'center', marginBottom: '12px' }}>Ready to get started?</h2>
          <p style={{ ...dim, fontSize: '17px', lineHeight: '1.7', textAlign: 'center', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>Book a free 15-minute call. We'll scope your project, give you a firm price, and start the same week.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div style={{ background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📞</div>
              <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '8px' }}>Call or Text</h3>
              <a href="tel:+12722733833" style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 'bold', textDecoration: 'none', display: 'block', marginBottom: '6px' }}>(272) 273-3833</a>
              <p style={{ ...dim, fontSize: '12px', letterSpacing: '1px', marginBottom: '12px' }}>APE-DUDE</p>
              <p style={{ ...dim, fontSize: '13px', margin: 0 }}>Mon–Fri, 8am–6pm EST</p>
            </div>
            <div style={{ background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📅</div>
              <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '8px' }}>Book a Free Call</h3>
              <p style={{ ...dim, fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>15 minutes. Scope your project and get a real number.</p>
              <Link href="/maximus/book" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '12px 24px', fontSize: '15px' }}>Schedule Now →</Link>
            </div>
            <div style={{ background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📧</div>
              <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '8px' }}>Email</h3>
              <a href="mailto:thewastedape@gmail.com" style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', display: 'block', marginBottom: '6px' }}>thewastedape@gmail.com</a>
              <p style={{ ...dim, fontSize: '13px', margin: 0 }}>Quotes, questions, RFPs — same-day response.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ ...dim, fontSize: '14px' }}>Based in <strong style={{ color: '#F5F0E8' }}>West Virginia</strong> · On-site anywhere in the US (travel expenses covered) · Remote nationwide · Available immediately</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid rgba(200,146,42,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '36px', width: '36px', borderRadius: '50%' }} />
          <p style={{ color: 'rgba(245,240,232,0.3)', fontFamily: 'Georgia, serif', fontSize: '12px', margin: 0 }}>
            &copy; 2026 WastedApe Tech &bull; wastedape.org
          </p>
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <a href="https://boatbuddy.thewastedape.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Boat Buddy</a>
          <a href="https://diesel-dude-app.onrender.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Diesel Dude</a>
          <Link href="/services" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Services</Link>
          <Link href="/tos" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Terms</Link>
          <a href="mailto:thewastedape@gmail.com" style={{ color: 'rgba(200,146,42,0.5)', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>

    </div>
  )
}
