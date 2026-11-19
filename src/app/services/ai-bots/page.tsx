'use client';

import Link from 'next/link';

export default function AIBotsPage() {
  return (
    <div style={{ backgroundColor: '#060608', color: '#F5F0E8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Fixed Nav */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(6, 6, 8, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(200, 146, 42, 0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Georgia, serif', color: '#C8922A' }}>
            THE WASTED APE
          </div>
          <div style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '1px', color: 'rgba(245, 240, 232, 0.6)' }}>
            TECH SOLUTIONS
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/services" style={{ color: '#F5F0E8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
              Services
            </Link>
            <Link href="/signup" style={{ color: '#F5F0E8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ paddingTop: '100px', flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '100px 24px 0' }}>
        {/* Back Button */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 24px 0' }}>
          <Link href="/services" style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '14px', textDecoration: 'none' }}>← Back to Services</Link>
        </div>

        {/* Hero */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ color: '#C8922A', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', marginBottom: '16px' }}>
            AI BOT DEVELOPMENT
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '24px', lineHeight: '1.2' }}>
            AI Bots & Intelligent Automation
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(245, 240, 232, 0.6)', maxWidth: '600px', lineHeight: '1.6' }}>
            Custom AI agents, voice bots, Telegram bots, and workflow automation — built and deployed to production. 10+ live deployments across marine, fleet, retail, and business automation.
          </p>
        </section>

        {/* What We Do Card */}
        <section style={{
          backgroundColor: 'rgba(200, 146, 42, 0.05)',
          border: '1px solid rgba(200, 146, 42, 0.2)',
          borderRadius: '8px',
          padding: '32px',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '24px', color: '#F5F0E8' }}>
            What We Do
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Custom Telegram bots with real tool use and memory</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>AI-powered customer-facing chat applications</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Voice AI with real-time speech-to-text and TTS</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Outbound AI calling systems (SignalWire + GPT)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>eBay, Shopify, and marketplace automation bots</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Workflow automation and AI integrations</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Ongoing hosting and maintenance</span>
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <section style={{
          backgroundColor: 'rgba(200, 146, 42, 0.1)',
          border: '1px solid rgba(200, 146, 42, 0.2)',
          borderRadius: '8px',
          padding: '48px 32px',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '24px', color: '#F5F0E8' }}>
            Ready to Get Started?
          </h3>
          <p style={{ fontSize: '16px', color: 'rgba(245, 240, 232, 0.6)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Let's build your custom AI bot or automation system. From concept to production deployment.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-outline" style={{
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              textAlign: 'center'
            }}>
              Register to See Pricing
            </Link>
            <Link href="/maximus/book" className="btn-primary" style={{
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              textAlign: 'center'
            }}>
              Contact for Deposit-Based Engagement
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'rgba(6, 6, 8, 0.8)',
        borderTop: '1px solid rgba(200, 146, 42, 0.2)',
        padding: '48px 24px',
        marginTop: '64px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div style={{ color: 'rgba(245, 240, 232, 0.6)', fontSize: '14px' }}>
            © 2026 WastedApe • wastedape.org
          </div>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'flex-end' }}>
            <Link href="/services" style={{ color: '#F5F0E8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
              Services
            </Link>
            <Link href="/download" style={{ color: '#F5F0E8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
              Free Checklist
            </Link>
            <Link href="/maximus/book" style={{ color: '#F5F0E8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
