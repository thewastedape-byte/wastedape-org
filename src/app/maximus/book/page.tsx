'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function MaximusConsultation() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [challenge, setChallenge] = useState('')
  const [timeline, setTimeline] = useState('1-2 weeks')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }
  const accent = { color: '#C68B3A', fontFamily: 'Georgia, serif' }
  const bright = { color: '#F5F0E8', fontFamily: 'Georgia, serif' }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !challenge) {
      setError('Name, email, and challenge description are required.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/maximus/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, challenge, timeline })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to submit form.')
        setLoading(false)
        return
      }

      setSuccess(true)
      setName('')
      setEmail('')
      setCompany('')
      setChallenge('')
      setTimeline('1-2 weeks')
      
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Email thewastedape@gmail.com to book manually.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '0 0 60px' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(198,139,58,0.2)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <span style={{ fontSize: '22px' }}>&#127183;</span>
          <p style={{ ...accent, fontWeight: 'bold', fontSize: '16px', margin: 0 }}>WastedApe</p>
        </Link>
        <Link href="/maximus" style={{ ...accent, fontSize: '13px', textDecoration: 'none', opacity: 0.7 }}>&larr; Back to Maximus</Link>
      </nav>

      <div style={{ maxWidth: '640px', margin: '48px auto', padding: '0 24px' }}>
        <p style={{ ...accent, fontSize: '12px', letterSpacing: '3px', marginBottom: '8px' }}>CONSULTATION REQUEST</p>
        <h1 style={{ ...bright, fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Book with Maximus</h1>
        <p style={{ ...dim, fontSize: '15px', marginBottom: '32px' }}>Tell us about your challenge. We&apos;ll review your request and schedule a session within 24 hours.</p>

        {success && (
          <div style={{ background: 'rgba(76,175,80,0.15)', border: '1px solid rgba(76,175,80,0.4)', borderRadius: '10px', padding: '16px', marginBottom: '24px', color: '#81C784' }}>
            <p style={{ fontFamily: 'Georgia, serif', margin: 0 }}>✓ Request submitted! We'll be in touch soon.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Name */}
          <div>
            <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(198,139,58,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(198,139,58,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Company */}
          <div>
            <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Company / Organization</label>
            <input
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="Your company name (optional)"
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(198,139,58,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Challenge */}
          <div>
            <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>What's Your Challenge? *</label>
            <textarea
              value={challenge}
              onChange={e => setChallenge(e.target.value)}
              placeholder="Describe the problem you're trying to solve. The more detail, the better we can help."
              rows={5}
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(198,139,58,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>

          {/* Timeline */}
          <div>
            <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>When Do You Need Help?</label>
            <select
              value={timeline}
              onChange={e => setTimeline(e.target.value)}
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(198,139,58,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            >
              <option value="ASAP" style={{ background: '#0a0a0a', color: '#F5F0E8' }}>ASAP (This week)</option>
              <option value="1-2 weeks" style={{ background: '#0a0a0a', color: '#F5F0E8' }}>1-2 weeks</option>
              <option value="1 month" style={{ background: '#0a0a0a', color: '#F5F0E8' }}>1 month</option>
              <option value="flexible" style={{ background: '#0a0a0a', color: '#F5F0E8' }}>Flexible</option>
            </select>
          </div>

          {error && <p style={{ color: '#e87070', fontFamily: 'Georgia, serif', fontSize: '13px' }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ background: loading ? 'rgba(198,139,58,0.4)' : '#C68B3A', color: '#0a0a0a', fontFamily: 'Georgia, serif', fontWeight: 'bold', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Submitting...' : 'Submit Consultation Request'}
          </button>

          <p style={{ ...dim, fontSize: '12px', textAlign: 'center' }}>
            We'll review your request and get back to you within 24 hours.
          </p>
        </form>
      </div>
    </div>
  )
}
