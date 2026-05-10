'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const REMOTE_API = process.env.NEXT_PUBLIC_REMOTE_API || 'https://wastedape-remote-api.onrender.com'

function RemoteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [code, setCode] = useState(searchParams.get('code') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sessionInfo, setSessionInfo] = useState<any>(null)

  const validateCode = async () => {
    if (!code || code.length !== 6) { setError('Enter a valid 6-digit session code.'); return }
    setError(''); setLoading(true)
    try {
      const r = await fetch(`${REMOTE_API}/api/session/${code}`)
      const data = await r.json()
      if (data.valid) {
        setSessionInfo(data)
        if (data.paid) {
          router.push(`/remote/connect?code=${code}`)
        }
      } else {
        setError('Session not found or expired. Ask your technician for a new code.')
      }
    } catch { setError('Connection error. Please try again.') }
    finally { setLoading(false) }
  }

  const accent = { color: '#C8922A', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }

  return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundImage: 'url(/remote-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.95)', borderBottom: '1px solid rgba(200,146,42,0.2)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '36px', width: '36px', borderRadius: '50%' }} />
          <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '15px', margin: 0 }}>WastedApe</p>
        </Link>
        <Link href="/" style={{ color: 'rgba(200,146,42,0.6)', fontFamily: 'Georgia, serif', fontSize: '13px', textDecoration: 'none' }}>&larr; Home</Link>
      </div>

      <div style={{ maxWidth: '480px', width: '100%', marginTop: '60px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '48px', marginBottom: '12px' }}>&#128187;</p>
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Remote Support</h1>
          <p style={{ ...dim, fontSize: '15px' }}>Enter the 6-digit code your technician gave you to start the session.</p>
        </div>

        {/* Code entry */}
        <div style={{ background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '16px', padding: '32px' }}>
          <label style={{ ...dim, fontSize: '12px', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px' }}>Session Code</label>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
            onKeyDown={e => { if (e.key === 'Enter') validateCode() }}
            placeholder="000000"
            style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '2px solid rgba(200,146,42,0.3)', borderRadius: '10px', padding: '16px', color: '#F5F0E8', fontFamily: 'monospace', fontSize: '32px', textAlign: 'center', letterSpacing: '8px', outline: 'none', boxSizing: 'border-box' }}
          />

          {error && <p style={{ color: '#e87070', fontFamily: 'Georgia, serif', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>{error}</p>}

          <button onClick={validateCode} disabled={loading || code.length !== 6}
            style={{ width: '100%', marginTop: '20px', background: (loading || code.length !== 6) ? 'rgba(200,146,42,0.3)' : '#C8922A', color: (loading || code.length !== 6) ? 'rgba(200,146,42,0.5)' : '#060608', fontFamily: 'Georgia, serif', fontWeight: 'bold', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '16px', cursor: loading || code.length !== 6 ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Connecting...' : 'Join Session'}
          </button>

          <p style={{ ...dim, fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
            Need help? <a href="mailto:thewastedape@gmail.com" style={{ color: '#C8922A' }}>thewastedape@gmail.com</a>
          </p>
        </div>

        {/* How it works */}
        <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', textAlign: 'center' }}>
          {[
            { icon: '🔑', text: 'Get code from your technician' },
            { icon: '🔗', text: 'Enter it here to connect' },
            { icon: '✅', text: 'Tech fixes your issue remotely' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(12,10,8,0.7)', border: '1px solid rgba(200,146,42,0.15)', borderRadius: '10px', padding: '16px' }}>
              <p style={{ fontSize: '24px', marginBottom: '6px' }}>{s.icon}</p>
              <p style={{ ...dim, fontSize: '11px', lineHeight: '1.4' }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function RemotePage() {
  return <Suspense fallback={<div style={{ background: '#060608', minHeight: '100vh' }} />}><RemoteContent /></Suspense>
}
