'use client';

import Link from 'next/link';

export default function EngineeringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#C68B3A' }}>
            Engineering Services
          </h1>
          <p className="text-lg text-slate-400">Electrical. SCADA. PLC System Design.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Back Button */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 24px 0' }}>
          <Link href="/services" style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '14px', textDecoration: 'none' }}>← Back to Services</Link>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            What We Do
          </h2>
          <p className="text-lg text-slate-300 mb-6 leading-relaxed">
            We provide electrical engineering consulting and control system design for industrial and commercial applications. Our expertise spans SCADA architecture, PLC system design, and electrical engineering documentation.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#C68B3A' }}>
            Services Include
          </h3>
          <ul className="text-slate-300 space-y-3 text-lg">
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>Control system architecture and design</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>SCADA system engineering and configuration</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>PLC system design and specification</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>Electrical engineering drawings (AutoCAD Electrical)</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>Control narratives and system documentation</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#C68B3A' }}>
            Design & Consulting Available Now
          </h3>
          <p className="text-slate-300 text-lg mb-4">
            We're available for design and consulting services immediately. Full implementation services are coming soon as software licensing is finalized.
          </p>
          <p className="text-slate-400 text-base">
            Our approach: understand your process, design a system that scales, document everything clearly, hand it off to implementation teams.
          </p>
        </section>

        {/* Pricing Gate */}
        <section className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">Pricing</h3>
          <p className="text-slate-400 text-lg mb-6">
            Engineering services are quoted based on project scope, complexity, and deliverables. Design work starts immediately; implementation follows.
          </p>
          <Link
            href="/register"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: '#C68B3A' }}
          >
            Register to See Pricing
          </Link>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Design Your System</h3>
          <p className="text-slate-400 text-lg mb-6">
            Ready to discuss your control system needs. We'll engineer a solution built to last.
          </p>
          <Link
            href="/maximus/book"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: '#C68B3A' }}
          >
            Discuss Your Needs
          </Link>
        </section>
      </div>
    </div>
  );
}
