export default function TOSPage() {
  const gold = '#C8922A'
  const dim = 'rgba(245,240,232,0.6)'
  const h2Style = { fontSize: '1.3rem', marginBottom: '12px', color: gold, fontFamily: 'Georgia, serif', fontWeight: 'bold' as const }
  const pStyle = { color: dim, lineHeight: 1.8, marginBottom: '14px', fontFamily: 'Georgia, serif', fontSize: '15px' }
  const liStyle = { color: dim, lineHeight: 1.8, fontFamily: 'Georgia, serif', fontSize: '15px', marginBottom: '6px' }

  return (
    <main style={{ background: '#060608', color: '#F5F0E8', minHeight: '100vh', padding: '80px 24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px', paddingBottom: '32px', borderBottom: '1px solid rgba(200,146,42,0.2)' }}>
          <p style={{ color: gold, fontSize: '11px', letterSpacing: '3px', margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>LEGAL</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Georgia, serif', margin: '0 0 12px' }}>Terms of Service</h1>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '14px', margin: 0 }}>
            Last updated: November 19, 2026 &nbsp;·&nbsp; Effective immediately
          </p>
        </div>

        <p style={pStyle}>
          These Terms of Service ("Terms") govern your use of all products, services, websites, and applications operated by <strong style={{ color: '#F5F0E8' }}>WastedApe Tech</strong> ("we," "us," or "our"), including wastedape.org, the WastedApe Tracker, Boat Buddy, ContentBuddy, CodexBuddy, Fret Buddy, and any consulting or professional services ("Services"). By accessing or using any of our Services, you agree to be bound by these Terms.
        </p>

        {/* Section 1 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>1. Acceptance of Terms</h2>
          <p style={pStyle}>By using any WastedApe Tech service, creating an account, or making a purchase, you confirm that you are at least 18 years old, have the legal authority to enter into these Terms, and agree to comply with them in full. If you do not agree, do not use our Services.</p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>2. Services Provided</h2>
          <p style={pStyle}>WastedApe Tech provides the following categories of services:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '14px' }}>
            {[
              'AI-powered web applications and tools (Boat Buddy, ContentBuddy, CodexBuddy, Fret Buddy, and others)',
              'Website visitor tracking software (WastedApe Tracker)',
              'Custom AI bot development and deployment',
              'Industrial controls, automation, and SCADA consulting',
              'Data center energy auditing and infrastructure consulting',
              'IT support, networking, and infrastructure services',
              'Physical security system installation and subcontracting (alarm systems, CCTV, access control)',
              'General technology consulting and custom software development',
            ].map(item => <li key={item} style={liStyle}>{item}</li>)}
          </ul>
          <p style={pStyle}>Services are provided as described on our website and may change without notice.</p>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>3. WastedApe Tracker — Data Collection & Client Responsibilities</h2>
          <p style={pStyle}>The WastedApe Tracker is a website visitor analytics service. By subscribing to this service, you agree to the following:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '14px' }}>
            <li style={liStyle}><strong style={{ color: '#F5F0E8' }}>Data collected:</strong> The tracking script collects IP addresses, approximate geographic location (city/country), organization/ISP, pages visited, referrer URLs, device type, browser, and operating system of visitors to your website.</li>
            <li style={liStyle}><strong style={{ color: '#F5F0E8' }}>Your responsibility:</strong> You are solely responsible for disclosing the use of third-party tracking software in your own website's Privacy Policy and obtaining any required consent from your visitors under applicable laws (including GDPR, CCPA, and similar regulations).</li>
            <li style={liStyle}><strong style={{ color: '#F5F0E8' }}>No personal data guarantee:</strong> While we do not intentionally collect names, emails, or other directly identifiable personal information through the tracker, IP addresses may be considered personal data under some jurisdictions. You accept responsibility for compliance in your jurisdiction.</li>
            <li style={liStyle}><strong style={{ color: '#F5F0E8' }}>WastedApe Tech data rights:</strong> We retain the right to use aggregated, anonymized tracking data across all clients for internal analytics, product improvement, and market research purposes. We will not sell individually identifiable client visitor data to third parties.</li>
            <li style={liStyle}><strong style={{ color: '#F5F0E8' }}>Prohibited use:</strong> You may not use the tracker to collect data on websites you do not own or have explicit permission to monitor. Unauthorized tracking is a violation of these Terms and may violate applicable law.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>4. Accounts & Security</h2>
          <p style={pStyle}>You are responsible for maintaining the security of your account credentials. You agree to notify us immediately of any unauthorized access. We reserve the right to terminate accounts that violate these Terms or engage in fraudulent activity.</p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>5. Payments & Subscriptions</h2>
          <p style={pStyle}>Subscription services are billed monthly. All charges are non-refundable unless required by law. You may cancel at any time and retain access through the end of your billing period. We reserve the right to modify pricing with 30 days' notice. Failure to pay may result in service suspension.</p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>6. Acceptable Use</h2>
          <p style={pStyle}>You agree not to use our Services to:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '14px' }}>
            {[
              'Violate any applicable law or regulation',
              'Track, monitor, or collect data on individuals or websites without proper authorization and disclosure',
              'Transmit spam, malware, or malicious code',
              'Interfere with or disrupt our infrastructure or other users',
              'Reverse engineer, copy, or resell our software or services',
              'Engage in any activity that could expose WastedApe Tech to legal liability',
            ].map(item => <li key={item} style={liStyle}>{item}</li>)}
          </ul>
        </section>

        {/* Section 7 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>7. Consulting & Professional Services</h2>
          <p style={pStyle}>For on-site consulting, IT work, industrial controls, physical security installation, and similar professional services: all work is performed on a best-effort basis. Client is responsible for providing accurate project information. Travel expenses for on-site work outside the immediate area are the responsibility of the client unless otherwise agreed in writing. WastedApe Tech is not liable for pre-existing conditions, third-party equipment failures, or project delays caused by factors outside our control.</p>
        </section>

        {/* Section 8 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>8. Intellectual Property</h2>
          <p style={pStyle}>All software, content, designs, and materials on our Services are owned by WastedApe Tech or licensed to us. You may not copy, reproduce, or redistribute our materials without written permission. Custom software built for a client under a paid engagement belongs to the client upon full payment.</p>
        </section>

        {/* Section 9 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>9. Disclaimer of Warranties</h2>
          <p style={pStyle}>Our Services are provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee that our Services will be uninterrupted, error-free, or meet your specific requirements. Use of our Services is at your own risk.</p>
        </section>

        {/* Section 10 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>10. Limitation of Liability</h2>
          <p style={pStyle}>To the maximum extent permitted by law, WastedApe Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to: loss of profits, data loss, business interruption, or damages arising from your use or inability to use our Services. Our total liability for any claim shall not exceed the amount you paid us in the 30 days preceding the claim.</p>
        </section>

        {/* Section 11 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>11. Indemnification</h2>
          <p style={pStyle}>You agree to indemnify and hold harmless WastedApe Tech, its owner, and affiliates from any claims, damages, losses, or expenses (including legal fees) arising from your use of our Services, your violation of these Terms, or your violation of any third-party rights.</p>
        </section>

        {/* Section 12 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>12. Privacy</h2>
          <p style={pStyle}>We collect limited data necessary to provide our Services. We do not sell your personal data to third parties. For visitors to our website, we collect usage analytics via Google Analytics, Microsoft Clarity, and our own tracking systems. By using our Services, you consent to this data collection as described.</p>
        </section>

        {/* Section 13 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>13. Termination</h2>
          <p style={pStyle}>We reserve the right to suspend or terminate your access to any Service at any time for violations of these Terms. You may cancel your account at any time. Upon termination, your right to use the Service ceases immediately.</p>
        </section>

        {/* Section 14 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>14. Governing Law</h2>
          <p style={pStyle}>These Terms are governed by the laws of the State of West Virginia, United States, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of West Virginia.</p>
        </section>

        {/* Section 15 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={h2Style}>15. Changes to Terms</h2>
          <p style={pStyle}>We may update these Terms at any time. Continued use of our Services after changes constitutes acceptance of the new Terms. We will update the "Last updated" date at the top of this page when changes are made.</p>
        </section>

        {/* Contact */}
        <section style={{ marginBottom: '48px', padding: '28px', background: 'rgba(200,146,42,0.05)', border: '1px solid rgba(200,146,42,0.2)', borderRadius: '14px' }}>
          <h2 style={h2Style}>16. Contact</h2>
          <p style={{ ...pStyle, margin: 0 }}>
            Questions about these Terms? Contact us:<br />
            <strong style={{ color: '#F5F0E8' }}>WastedApe Tech</strong><br />
            Email: <a href="mailto:thewastedape@gmail.com" style={{ color: gold }}>thewastedape@gmail.com</a><br />
            Phone: <a href="tel:+12722733833" style={{ color: gold }}>(272) APE-DUDE</a><br />
            Web: <a href="https://wastedape.org" style={{ color: gold }}>wastedape.org</a>
          </p>
        </section>

        <p style={{ color: 'rgba(245,240,232,0.25)', fontSize: '12px', fontFamily: 'Georgia, serif', textAlign: 'center' }}>
          © 2026 WastedApe Tech · All rights reserved
        </p>
      </div>
    </main>
  )
}
