'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function MaximusHub() {
  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }
  const accent = { color: '#C68B3A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '0 0 60px' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(198,139,58,0.2)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <span style={{ fontSize: '22px' }}>&#127183;</span>
          <p style={{ ...accent, fontWeight: 'bold', fontSize: '16px', margin: 0 }}>WastedApe</p>
        </Link>
        <Link href="/" style={{ ...accent, fontSize: '13px', textDecoration: 'none', opacity: 0.7 }}>&larr; Back</Link>
      </nav>

      {/* Hero Section */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ ...accent, fontSize: '12px', letterSpacing: '3px', marginBottom: '8px' }}>AI ASSISTANT</p>
          <h1 style={{ ...bright, fontSize: '48px', fontWeight: 'bold', marginBottom: '12px', lineHeight: '1.2' }}>
            Meet Maximus
          </h1>
          <p style={{ ...dim, fontSize: '18px', marginBottom: '32px', maxWidth: '700px', margin: '12px auto 32px' }}>
            Your personal AI consultant. Available 24/7 to solve problems, answer questions, and help you build better businesses.
          </p>
        </div>

        {/* About Maximus */}
        <div style={{ background: 'rgba(198,139,58,0.08)', border: '1px solid rgba(198,139,58,0.2)', borderRadius: '12px', padding: '32px', marginBottom: '48px' }}>
          <h2 style={{ ...accent, fontSize: '14px', letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}>Who Is Maximus?</h2>
          <p style={{ ...bright, fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
            Maximus is an AI assistant that specializes in solving complex problems across AI development, automation, infrastructure, and business optimization. With expertise in multiple domains, Maximus delivers practical solutions tailored to your specific challenges.
          </p>
          <p style={{ ...dim, fontSize: '15px', lineHeight: '1.6' }}>
            Whether you need a custom AI agent, system architecture review, or consulting on emerging technologies, Maximus combines technical depth with clear communication to help you move forward faster.
          </p>
        </div>

        {/* Services */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ ...accent, fontSize: '14px', letterSpacing: '2px', marginBottom: '24px', textTransform: 'uppercase' }}>WastedApe Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              {
                title: 'Data Center Audits',
                desc: 'Infrastructure review, optimization recommendations, cost reduction analysis.'
              },
              {
                title: 'AI Development',
                desc: 'Custom AI agents, integrations, training, and deployment for your business.'
              },
              {
                title: 'Automation Consulting',
                desc: 'Process automation, workflow optimization, system design, and implementation.'
              },
            ].map((service, i) => (
              <div key={i} style={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(198,139,58,0.2)', borderRadius: '10px', padding: '24px' }}>
                <h3 style={{ ...accent, fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{service.title}</h3>
                <p style={{ ...dim, fontSize: '14px', margin: 0 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'rgba(198,139,58,0.12)', border: '2px solid rgba(198,139,58,0.3)', borderRadius: '12px', padding: '40px 32px', textAlign: 'center' }}>
          <h2 style={{ ...bright, fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>Book a Consultation</h2>
          <p style={{ ...dim, fontSize: '15px', marginBottom: '24px' }}>
            Need expert guidance? Schedule a session with Maximus to discuss your challenge and explore solutions.
          </p>
          <Link href="/maximus/book" style={{ background: '#C68B3A', color: '#0a0a0a', fontFamily: 'Georgia, serif', fontWeight: 'bold', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', fontSize: '16px' }}>
            Schedule Now
          </Link>
        </div>
      </div>
    </div>
  )
}
