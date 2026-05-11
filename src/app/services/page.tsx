'use client'
import Link from 'next/link'

const SERVICES = [
  {
    category: 'INDUSTRY APPS',
    items: [
      {
        name: 'Boat Buddy',
        tagline: 'AI Marine Diagnostic Assistant',
        price: 'Free to try',
        priceDetail: 'Subscription plans from $29/mo',
        desc: 'AI-powered marine engine diagnostics built for boat owners and marine service shops. Photo analysis, 25 system diagrams, service manuals, work orders, invoices, and fleet management.',
        features: [
          'AI diagnosis from photos or descriptions',
          '25 marine system diagrams',
          'Service manuals + repair guides',
          'Work orders and customer invoices',
          'Parts inventory tracking',
          'Team + technician management',
          'Customer history and notes',
        ],
        cta: 'Try Boat Buddy Free',
        ctaUrl: 'https://boatbuddy.thewastedape.com',
        ctaExternal: true,
        badge: null,
        highlight: false,
      },
      {
        name: 'Diesel Dude',
        tagline: 'AI Diesel Fleet Management',
        price: 'Free to try',
        priceDetail: 'Subscription plans from $29/mo',
        desc: 'AI diagnostic and fleet management for diesel mechanics and heavy equipment operators. Covers Cummins, CAT, Detroit, John Deere, and more.',
        features: [
          'Fault code lookup (OBD2 + J1939)',
          'DPF regen + DEF system guidance',
          'Asset log tracked by hours',
          'Work orders and invoices',
          'Parts inventory',
          'Cummins, CAT, Detroit, Deere support',
          'RTA Fleet integration (coming)',
        ],
        cta: 'Try Diesel Dude Free',
        ctaUrl: 'https://dieseldude.thewastedape.com',
        ctaExternal: true,
        badge: null,
        highlight: false,
      },
    ]
  },
  {
    category: 'CUSTOM AI BUILDS',
    items: [
      {
        name: 'Custom AI Bot Build',
        tagline: 'Your Business, Automated',
        price: '$299 setup',
        priceDetail: '+ $99/mo maintenance',
        desc: 'We design and deploy a custom AI assistant tailored to your business. Whether you need scheduling automation, customer follow-ups, lead management, or anything in between — we build it, connect it to your tools, and keep it running.',
        features: [
          'Full custom build to your requirements',
          'Connected to your phone, email, calendar',
          'Integrates with existing tools (Shopify, Gmail, etc.)',
          'Deployed in under 24 hours',
          'Ongoing support and updates',
          'Business-specific training and prompting',
          'White-labeled to your brand',
        ],
        cta: 'Book a Build Call',
        ctaUrl: '/book',
        ctaExternal: false,
        badge: 'MOST POPULAR',
        highlight: true,
      },
      {
        name: 'White Label AI Solutions',
        tagline: 'Resell Under Your Brand',
        price: 'Custom pricing',
        priceDetail: 'Volume discounts available',
        desc: 'License our AI infrastructure and resell it under your brand. Perfect for agencies, consultants, and businesses looking to add AI as a service offering.',
        features: [
          'Full white-label branding',
          'Your domain, your logo',
          'Reseller dashboard',
          'Client management portal',
          'Revenue sharing or flat fee',
          'Dedicated support channel',
          'Custom integrations on request',
        ],
        cta: 'Talk to Us',
        ctaUrl: 'mailto:thewastedape@gmail.com',
        ctaExternal: true,
        badge: null,
        highlight: false,
      },
    ]
  },
  {
    category: 'LEAD GENERATION & OUTREACH',
    items: [
      {
        name: 'Lead Generation Bot',
        tagline: 'Automated Lead Scraping + Qualification',
        price: 'From $199/mo',
        priceDetail: 'Includes 500 qualified leads/mo',
        desc: 'We scrape Google Maps for your target business type, qualify each lead with AI, and deliver a ready-to-contact list with personalized outreach messages. You focus on closing — we fill the pipeline.',
        features: [
          'Google Maps scraping by keyword + location',
          'AI lead scoring (1-10)',
          'Personalized outreach message per lead',
          'CSV + JSON export',
          'Deduplication across runs',
          'Target by industry: marine, diesel, HVAC, contractors, and more',
          'Weekly or monthly delivery',
        ],
        cta: 'Get Started',
        ctaUrl: '/book',
        ctaExternal: false,
        badge: null,
        highlight: false,
      },
      {
        name: 'Marketing Automation Bot',
        tagline: 'Hands-Free Email + SMS Campaigns',
        price: '$249 setup',
        priceDetail: '+ $99/mo',
        desc: 'Automated marketing campaigns that run on autopilot. AI-written follow-up sequences, smart timing, and re-engagement — all triggered by customer behavior.',
        features: [
          'AI-written email and SMS sequences',
          'Smart send-time optimization',
          'Behavior-triggered campaigns',
          'Open/click tracking and reporting',
          'Integrates with your CRM or lead list',
          'A/B testing built in',
          'Unsubscribe and compliance handling',
        ],
        cta: 'Book a Call',
        ctaUrl: '/book',
        ctaExternal: false,
        badge: null,
        highlight: false,
      },
    ]
  },
  {
    category: 'AI CALLING & BOOKING',
    items: [
      {
        name: 'AI Telemarketing Service',
        tagline: 'Outbound AI Calling Campaigns',
        price: 'Per campaign',
        priceDetail: 'Contact us for pricing',
        desc: 'AI-powered outbound calling that introduces your business, qualifies prospects, and books follow-ups — all without a human dialer. Fully FTC-compliant with mandatory AI disclosure on every call.',
        features: [
          'GPT-4o conversation engine',
          'Natural voice via ElevenLabs',
          'Mandatory AI disclosure (FTC compliant)',
          'Voicemail detection + custom VM drops',
          'Live objection handling',
          'Call logging and outcome tracking',
          'Telegram campaign report when done',
        ],
        cta: 'Request a Campaign',
        ctaUrl: '/book',
        ctaExternal: false,
        badge: null,
        highlight: false,
      },
      {
        name: 'Appointment Booking Bot',
        tagline: '24/7 Automated Scheduling',
        price: '$199 setup',
        priceDetail: '+ $49/mo',
        desc: 'An AI that handles scheduling, confirmations, and reminders around the clock. Syncs with your calendar, sends reminders, and follows up with no-shows automatically.',
        features: [
          '24/7 booking via SMS, email, or web chat',
          'Calendar sync (Google, Outlook)',
          'Automated reminders (1 day + 1 hour)',
          'No-show follow-up sequence',
          'Rescheduling handling',
          'Buffer time and availability rules',
          'Booking link for SMS/email campaigns',
        ],
        cta: 'Book a Setup Call',
        ctaUrl: '/book',
        ctaExternal: false,
        badge: null,
        highlight: false,
      },
    ]
  },
  {
    category: 'COMING SOON',
    items: [
      {
        name: 'Business Audit Bot',
        tagline: 'AI Business Intelligence Report',
        price: 'Coming soon',
        priceDetail: 'Join the waitlist',
        desc: 'An AI that audits your business operations, identifies automation opportunities, and delivers a prioritized action plan. Like hiring a business consultant — but instant and affordable.',
        features: [
          'Automated operations review',
          'Identifies time-wasting processes',
          'Prioritized automation roadmap',
          'ROI estimates per recommendation',
          'Competitive benchmark report',
          'Delivered within 24 hours',
          'Follow-up implementation support',
        ],
        cta: 'Join Waitlist',
        ctaUrl: 'mailto:thewastedape@gmail.com?subject=Business Audit Bot Waitlist',
        ctaExternal: true,
        badge: 'COMING SOON',
        highlight: false,
      },
    ]
  },
]

export default function ServicesPage() {
  const dim = { color: 'rgba(245,240,232,0.6)', fontFamily: 'Georgia, serif' }
  const gold = { color: '#C8922A', fontFamily: 'Georgia, serif' }

  return (
    <div style={{ background: '#060608', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid rgba(200,146,42,0.2)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.95)', backdropFilter: 'blur(8px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '44px', width: '44px', borderRadius: '50%' }} />
          <div>
            <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px', margin: 0, letterSpacing: '1px' }}>THE WASTED APE</p>
            <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '2px', margin: 0 }}>TECH SOLUTIONS</p>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/#apps" style={{ ...gold, fontSize: '13px', textDecoration: 'none' }}>Apps</Link>
          <Link href="/services" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold' }}>Services</Link>
          <Link href="/book" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center', padding: '140px 24px 60px' }}>
        <p style={{ ...gold, fontSize: '12px', letterSpacing: '4px', marginBottom: '12px' }}>WHAT WE OFFER</p>
        <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '20px' }}>
          Every AI service your<br />business could need.
        </h1>
        <p style={{ ...dim, fontSize: '18px', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 36px' }}>
          From industry-specific apps to fully custom AI builds, lead generation, telemarketing, and booking automation — we've got the whole stack.
        </p>
        <Link href="/book" className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}>Book a Free 15-Min Call</Link>
      </section>

      {/* Services List */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        {SERVICES.map(category => (
          <div key={category.category} style={{ marginBottom: '72px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ height: '1px', background: 'rgba(200,146,42,0.3)', flex: 1 }} />
              <p style={{ ...gold, fontSize: '11px', letterSpacing: '3px', fontWeight: 'bold', whiteSpace: 'nowrap', margin: 0 }}>{category.category}</p>
              <div style={{ height: '1px', background: 'rgba(200,146,42,0.3)', flex: 1 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: category.items.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
              {category.items.map(service => (
                <div key={service.name} style={{
                  background: 'rgba(12,10,8,0.9)',
                  border: service.highlight ? '2px solid #C8922A' : '1px solid rgba(200,146,42,0.2)',
                  borderRadius: '16px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  maxWidth: category.items.length === 1 ? '600px' : undefined,
                  margin: category.items.length === 1 ? '0 auto' : undefined,
                }}>
                  {service.badge && (
                    <div style={{
                      position: 'absolute', top: '-12px', left: '24px',
                      background: service.badge === 'COMING SOON' ? 'rgba(100,100,100,0.9)' : '#C8922A',
                      color: service.badge === 'COMING SOON' ? '#ccc' : '#060608',
                      fontFamily: 'Georgia, serif', fontSize: '10px', fontWeight: 'bold',
                      letterSpacing: '2px', padding: '4px 12px', borderRadius: '4px',
                    }}>
                      {service.badge}
                    </div>
                  )}

                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '22px', margin: '0 0 4px' }}>{service.name}</h3>
                    <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '12px', margin: 0, letterSpacing: '1px' }}>{service.tagline}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'bold' }}>{service.price}</span>
                    <span style={{ ...dim, fontSize: '13px' }}>{service.priceDetail}</span>
                  </div>

                  <p style={{ ...dim, fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', flexGrow: 1 }}>{service.desc}</p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                    {service.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(245,240,232,0.65)', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '6px', lineHeight: '1.4' }}>
                        <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '1px' }}>&#10003;</span> {f}
                      </li>
                    ))}
                  </ul>

                  {service.ctaExternal ? (
                    <a href={service.ctaUrl} target="_blank" rel="noopener noreferrer"
                      className={service.highlight ? 'btn-primary' : 'btn-outline'}
                      style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                      {service.cta} &#8594;
                    </a>
                  ) : (
                    <Link href={service.ctaUrl}
                      className={service.highlight ? 'btn-primary' : 'btn-outline'}
                      style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                      {service.cta} &#8594;
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: 'rgba(200,146,42,0.06)', borderTop: '1px solid rgba(200,146,42,0.15)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ ...gold, fontSize: '12px', letterSpacing: '3px', marginBottom: '16px' }}>NOT SURE WHERE TO START?</p>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2' }}>
            Let's figure it out together.
          </h2>
          <p style={{ ...dim, fontSize: '17px', lineHeight: '1.7', marginBottom: '36px' }}>
            Book a free 15-minute call. We'll listen, ask a few questions, and tell you exactly what to build and what it'll cost. No pitch, no pressure.
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
