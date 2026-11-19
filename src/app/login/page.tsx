'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const gold = '#C8922A'
  const dim = 'rgba(245,240,232,0.6)'
  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(200,146,42,0.4)',
    borderRadius: '10px', color: '#F5F0E8',
    fontSize: '14px', fontFamily: 'Georgia, serif',
    outline: 'none', boxSizing: 'border-box' as const,
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'login' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '460px', width: '100%', textAlign: 'center', background: 'rgba(12,10,8,0.95)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '20px', padding: '48px 36px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '12px' }}>Check Your Email</h2>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '14px', marginBottom: '8px' }}>We sent a magic link to:</p>
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>{email}</p>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '13px', lineHeight: '1.6' }}>Redirecting to dashboard in 3 seconds...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '420px', width: '100%' }}>

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link href="/">
            <img src="/logo.svg" alt="WastedApe" style={{ height: '80px', width: '80px', borderRadius: '50%', border: '2px solid rgba(200,146,42,0.5)', boxShadow: '0 0 30px rgba(200,146,42,0.2)', marginBottom: '14px' }} />
          </Link>
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px', margin: '0 0 2px', letterSpacing: '1px' }}>THE WASTED APE</p>
          <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '2px', margin: 0 }}>TECH SOLUTIONS</p>
        </div>

        <div style={{ background: 'rgba(12,10,8,0.95)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '20px', padding: '40px 36px' }}>
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 'bold', margin: '0 0 6px', textAlign: 'center' }}>Sign In</h1>
          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '14px', textAlign: 'center', margin: '0 0 28px' }}>Enter your email to get a magic link.</p>

          {error && (
            <div style={{ background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.4)', borderRadius: '8px', padding: '12px 16px', color: '#e05555', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', color: 'rgba(245,240,232,0.7)', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '6px' }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={inputStyle} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px', marginTop: '8px',
              background: loading ? 'rgba(200,146,42,0.4)' : gold,
              color: '#060608', border: 'none', borderRadius: '10px',
              fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '16px',
              cursor: loading ? 'default' : 'pointer'
            }}>
              {loading ? 'Sending...' : 'Send Magic Link →'}
            </button>
          </form>

          <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '13px', textAlign: 'center', marginTop: '24px' }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: gold, textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
