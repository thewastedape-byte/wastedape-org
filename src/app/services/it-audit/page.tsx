'use client';

import Link from 'next/link';

export default function ITAuditPage() {
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

      {/* Back Button */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 24px 0', width: '100%' }}>
        <Link href="/services" style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '14px', textDecoration: 'none' }}>← Back to Services</Link>
      </div>

      {/* Main Content */}
      <main style={{ paddingTop: '100px', flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '100px 24px 0' }}>
        {/* Hero */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ color: '#C8922A', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', marginBottom: '16px' }}>
            IT NETWORK AUDITS
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '24px', lineHeight: '1.2' }}>
            IT Network Audits
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(245, 240, 232, 0.6)', maxWidth: '600px', lineHeight: '1.6' }}>
            Complete network assessment. Actionable report. 24-48 hours.
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
          <p style={{ fontSize: '16px', color: '#F5F0E8', lineHeight: '1.6', marginBottom: '24px' }}>
            We remote into your network with your permission, run a comprehensive scan, identify vulnerabilities, and deliver a prioritized report. You get clear visibility into what's broken, what's risky, and what needs fixing first.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '16px', color: '#C8922A' }}>
            The Audit Includes
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Complete device inventory (routers, switches, servers, workstations, IoT)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Network scan and open port analysis</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Vulnerability assessment</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Security posture evaluation</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>AI-generated priority report</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', lineHeight: '1.6' }}>
              <span style={{ color: '#C8922A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>Delivered within 24-48 hours</span>
            </li>
          </ul>
        </section>

        {/* What's NOT Included */}
        <section style={{
          backgroundColor: 'rgba(200, 146, 42, 0.05)',
          border: '1px solid rgba(200, 146, 42, 0.2)',
          borderRadius: '8px',
          padding: '32px',
          marginBottom: '48px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '24px', color: '#F5F0E8' }}>
            What's NOT Included
          </h3>
          <p style={{ fontSize: '16px', color: '#F5F0E8', lineHeight: '1.6', marginBottom: '24px' }}>
            The audit is discovery and assessment. Fixes are quoted separately based on findings.
          </p>
          <p style={{ fontSize: '16px', color: 'rgba(245, 240, 232, 0.6)', lineHeight: '1.6' }}>
            Once we identify gaps, we'll provide estimates for remediation. You choose what to fix and in what order.
          </p>
        </section>

        {/* Pricing */}
        <section style={{
          backgroundColor: 'rgba(200, 146, 42, 0.05)',
          border: '1px solid rgba(200, 146, 42, 0.2)',
          borderRadius: '8px',
          padding: '32px',
          marginBottom: '48px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '24px', color: '#F5F0E8' }}>
            Pricing
          </h3>
          <p style={{ fontSize: '16px', color: 'rgba(245, 240, 232, 0.6)', lineHeight: '1.6', marginBottom: '24px' }}>
            Audit report starts at $X. Fix implementation is quoted per finding. Register to see current pricing and book.
          </p>
          <Link href="/signup" style={{
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-block',
            backgroundColor: '#C8922A',
            color: '#060608',
            transition: 'opacity 0.3s'
          }}>
            Register to See Pricing
          </Link>
        </section>

        {/* Free Resource */}
        <section style={{
          backgroundColor: 'rgba(200, 146, 42, 0.05)',
          border: '1px solid rgba(200, 146, 42, 0.2)',
          borderRadius: '8px',
          padding: '32px',
          marginBottom: '48px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '24px', color: '#F5F0E8' }}>
            Want a Quick Assessment?
          </h3>
          <p style={{ fontSize: '16px', color: '#F5F0E8', lineHeight: '1.6', marginBottom: '24px' }}>
            Download our free IT Network Health Checklist — 20 points covering inventory, security, compliance, and operations. It's what we use in our audits.
          </p>
          <Link href="/download" style={{
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-block',
            backgroundColor: '#C8922A',
            color: '#060608',
            transition: 'opacity 0.3s'
          }}>
            Download Free Checklist
          </Link>
        </section>

        {/* CTA */}
        <section style={{
          backgroundColor: 'rgba(200, 146, 42, 0.1)',
          border: '1px solid rgba(200, 146, 42, 0.2)',
          borderRadius: '8px',
          padding: '48px 32px',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '24px', color: '#F5F0E8' }}>
            Ready for an Audit?
          </h3>
          <p style={{ fontSize: '16px', color: 'rgba(245, 240, 232, 0.6)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Schedule your network audit. We'll handle the scan, you get the answers.
          </p>
          <Link href="/maximus/book" style={{
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-block',
            backgroundColor: '#C8922A',
            color: '#060608',
            transition: 'opacity 0.3s'
          }}>
            Get a Network Audit
          </Link>
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
