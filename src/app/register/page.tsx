'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service_interest: 'general',
  })

  const gold = '#C8922A'
  const dim = 'rgba(245,240,232,0.6)'
  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(200,146,42,0.4)',
    borderRadius: '10px',
    color: '#F5F0E8',
    fontSize: '14px',
    fontFamily: 'Georgia, serif',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }
  const labelStyle = {
    display: 'block',
    color: 'rgba(245,240,232,0.7)',
    fontFamily: 'Georgia, serif',
    fontSize: '13px',
    marginBottom: '6px',
    letterSpacing: '0.5px',
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, action: 'signup' }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Registration failed')
      setSubmitted(true)
      setSubmittedEmail(formData.email)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '460px', width: '100%', textAlign: 'center', background: 'rgba(12,10,8,0.95)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '20px', padding: '48px 36px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '12px' }}>Check Your Email</h2>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '14px', marginBottom: '8px', lineHeight: '1.6' }}>We sent a magic link to:</p>
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 'bold', marginBottom: '24px' }}>{submittedEmail}</p>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '32px', lineHeight: '1.6' }}>Click the link in your email to verify your account and access the dashboard.</p>
          <Link href="/" style={{ display: 'inline-block', background: gold, color: '#060608', fontFamily: 'Georgia, serif', fontWeight: 'bold', padding: '12px 32px', borderRadius: '10px', textDecoration: 'none', fontSize: '15px' }}>Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '460px', width: '100%' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link href="/">
            <img src="/logo.svg" alt="WastedApe" style={{ height: '80px', width: '80px', borderRadius: '50%', border: '2px solid rgba(200,146,42,0.5)', boxShadow: '0 0 30px rgba(200,146,42,0.2)', marginBottom: '14px' }} />
          </Link>
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px', margin: '0 0 2px', letterSpacing: '1px' }}>THE WASTED APE</p>
          <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '2px', margin: 0 }}>TECH SOLUTIONS</p>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(12,10,8,0.95)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '20px', padding: '40px 36px' }}>
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 'bold', margin: '0 0 6px', textAlign: 'center' }}>Create Account</h1>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '14px', textAlign: 'center', margin: '0 0 28px', lineHeight: '1.6' }}>Get access to services, pricing, and your dashboard.</p>

          {error && (
            <div style={{ background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.4)', borderRadius: '8px', padding: '12px 16px', color: '#e05555', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Company <span style={{ color: 'rgba(245,240,232,0.3)' }}>(optional)</span></label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your company" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone <span style={{ color: 'rgba(245,240,232,0.3)' }}>(optional)</span></label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>What are you interested in?</label>
              <select name="service_interest" value={formData.service_interest} onChange={handleChange} style={inputStyle}>
                <option value="general">Select a service...</option>
                <option value="ai_bots">Custom AI Bots</option>
                <option value="telemarketing">AI Telemarketing</option>
                <option value="leads">Lead Generation</option>
                <option value="booking">Appointment Booking</option>
                <option value="controls">Industrial Controls</option>
                <option value="datacenter">Data Center Audit</option>
                <option value="builds">API / Custom Build</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px', marginTop: '8px',
              background: loading ? 'rgba(200,146,42,0.4)' : gold,
              color: '#060608', border: 'none', borderRadius: '10px',
              fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px',
              cursor: loading ? 'default' : 'pointer', transition: 'background 0.2s'
            }}>
              {loading ? 'Sending...' : 'Send Magic Link →'}
            </button>
          </form>

          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '13px', textAlign: 'center', marginTop: '24px' }}>
            Already registered?{' '}
            <Link href="/login" style={{ color: gold, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
