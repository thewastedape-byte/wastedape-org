'use client'
import Link from 'next/link'
import { useState } from 'react'

const SERVICES = [
  {
    icon: '🤖',
    name: 'Custom AI Bots',
    desc: 'Fully built + deployed in 24 hours. Lead generation, calling, appointment booking, customer support.',
    link: '/services/ai-bots'
  },
  {
    icon: '📊',
    name: 'Data Automation',
    desc: 'Scrape, clean, enrich, and sync customer data. Integrations with your existing tools.',
    link: '/services/automation'
  },
  {
    icon: '🏭',
    name: 'Industrial OT/IT',
    desc: 'Energy audits, predictive maintenance, legacy system integration. Veteran-led engineering.',
    link: '/services/engineering'
  },
  {
    icon: '⚙️',
    name: 'API + Custom Builds',
    desc: 'Full-stack development. Anything from automation scripts to full applications.',
    link: '/services/builds'
  },
]

const APPS = [
  {
    name: 'Boat Buddy AI',
    tagline: 'Marine Engine Diagnostics',
    desc: 'AI photo analysis, service manuals, work orders. For marine shops and boat owners.',
    url: 'https://boatbuddy.thewastedape.com',
    status: '🟢 Live',
  },
  {
    name: 'Diesel Dude AI',
    tagline: 'Diesel & Heavy Equipment Diagnostics',
    desc: 'Fault codes, DPF regens, DEF systems. For fleet mechanics and OEM technicians.',
    url: 'https://diesel-dude-app.onrender.com',
    status: '🟡 Beta',
  },
  {
    name: 'ContentBuddy',
    tagline: 'AI Content Studio',
    desc: 'Video scripts, blog posts, social captions — everything in one click.',
    url: 'https://content-buddy-app.onrender.com',
    status: '🟢 Live',
  },
  {
    name: 'CodexBuddy',
    tagline: 'AI Coding Assistant',
    desc: 'Code completion, bug fixing, language conversion. GitHub Copilot alternative.',
    url: 'https://codex-buddy-app.onrender.com',
    status: '🟢 Live',
  },
]

export default function HomePage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  return (
    <main style={{ background: '#0a0a0a', color: '#f5f0e8', minHeight: '100vh' }}>
      {/* HERO SECTION */}
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(245,240,232,0.1)',
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          margin: '0 0 20px 0',
          fontWeight: 'bold',
          lineHeight: 1.2,
        }}>
          AI Tools Built For <span style={{ color: '#ff6b35' }}>Real Work</span>
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: 'rgba(245,240,232,0.7)',
          maxWidth: '700px',
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          Custom AI automation, bots, and tools for marine shops, mechanics, fleet managers, and industrial operations. Veteran-owned. Fast. No BS.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/services" style={{
            padding: '12px 30px',
            background: '#ff6b35',
            color: '#0a0a0a',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            cursor: 'pointer',
          }}>
            View Services
          </Link>
          <Link href="/maximus/book" style={{
            padding: '12px 30px',
            background: 'transparent',
            color: '#ff6b35',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: '2px solid #ff6b35',
            cursor: 'pointer',
          }}>
            Book a Consultation
          </Link>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: '80px 20px' }}>
        <h2 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          Services
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {SERVICES.map((service, i) => (
            <Link
              href={service.link}
              key={i}
              style={{
                padding: '30px',
                background: hoveredService === i ? '#1a1a1a' : '#111111',
                border: '1px solid rgba(245,240,232,0.1)',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: hoveredService === i ? 'translateY(-4px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredService(i)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', margin: '0 0 10px 0' }}>
                {service.name}
              </h3>
              <p style={{ color: 'rgba(245,240,232,0.6)', margin: 0, lineHeight: 1.6 }}>
                {service.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* APPS SHOWCASE */}
      <section style={{
        padding: '80px 20px',
        borderTop: '1px solid rgba(245,240,232,0.1)',
        background: 'rgba(255,107,53,0.02)',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          AI Apps
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {APPS.map((app, i) => (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              style={{
                padding: '30px',
                background: '#1a1a1a',
                border: '1px solid rgba(245,240,232,0.15)',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px',
              }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', margin: '0 0 5px 0' }}>
                    {app.name}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#ff6b35', margin: 0, fontWeight: 'bold' }}>
                    {app.tagline}
                  </p>
                </div>
                <div style={{ fontSize: '1rem' }}>{app.status}</div>
              </div>
              <p style={{
                color: 'rgba(245,240,232,0.7)',
                lineHeight: 1.6,
                flexGrow: 1,
              }}>
                {app.desc}
              </p>
              <div style={{ marginTop: '20px', color: '#ff6b35', fontWeight: 'bold' }}>
                Launch App →
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(245,240,232,0.1)',
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>
          Ready to Automate?
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(245,240,232,0.7)',
          maxWidth: '600px',
          margin: '0 auto 40px',
        }}>
          Talk to our team. We build custom solutions for trades, industrial operations, and businesses that need AI that actually works.
        </p>
        <Link href="/maximus/book" style={{
          padding: '15px 40px',
          background: '#ff6b35',
          color: '#0a0a0a',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-block',
        }}>
          Book 30-Minute Consultation
        </Link>
      </section>

      {/* FOOTER LINKS */}
      <footer style={{
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(245,240,232,0.1)',
        color: 'rgba(245,240,232,0.5)',
        fontSize: '0.9rem',
      }}>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <Link href="/tos" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>
            Terms of Service
          </Link>
          <Link href="/privacy" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <a href="mailto:contact@wastedape.org" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>
            contact@wastedape.org
          </a>
        </div>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} WastedApe Tech. Veteran-owned.</p>
      </footer>
    </main>
  )
}