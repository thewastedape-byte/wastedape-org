'use client';

import Link from 'next/link';

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#C68B3A' }}>
            Industrial Automation
          </h1>
          <p className="text-lg text-slate-400">PLC Programming. Control Systems. Integration.</p>
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
            We design and implement industrial automation systems that streamline production, improve efficiency, and reduce downtime. From PLC programming to full control system integration, we handle everything from concept through commissioning.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#C68B3A' }}>
            Services Include
          </h3>
          <ul className="text-slate-300 space-y-3 text-lg">
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>Automation system design and architecture</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>PLC programming (Allen-Bradley Studio 5000, Siemens TIA Portal)</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>Control panel design and integration</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>Industrial networking (PROFINET, EtherNet/IP)</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>→</span>
              <span>System commissioning and optimization</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#C68B3A' }}>
            Technologies We Use
          </h3>
          <ul className="text-slate-300 space-y-3 text-lg">
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>•</span>
              <span>Allen-Bradley (Studio 5000, CompactLogix, ControlLogix)</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>•</span>
              <span>Siemens (TIA Portal, S7-1200, S7-1500)</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>•</span>
              <span>PROFINET and EtherNet/IP networking</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-4" style={{ color: '#C68B3A' }}>•</span>
              <span>HMI/SCADA integration</span>
            </li>
          </ul>
        </section>

        {/* Pricing Gate */}
        <section className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">Pricing</h3>
          <p className="text-slate-400 text-lg mb-6">
            Automation projects are tailored to your production environment. Costs depend on system scope, complexity, and hardware requirements.
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
          <h3 className="text-2xl font-bold mb-4">Ready to Automate?</h3>
          <p className="text-slate-400 text-lg mb-6">
            Tell us about your production challenge. Let's design a system that works.
          </p>
          <Link
            href="/maximus/book"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: '#C68B3A' }}
          >
            Discuss Your Project
          </Link>
        </section>
      </div>
    </div>
  );
}
