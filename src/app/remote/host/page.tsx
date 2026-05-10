'use client'
import { useState } from 'react'
import Link from 'next/link'

const REMOTE_API = process.env.NEXT_PUBLIC_REMOTE_API || 'https://wastedape-remote-api.onrender.com'
// Host password — change this to your own
const HOST_PASSWORD = 'wastedape2026'

export default function HostPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [sessionCode, setSessionCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const login = () => {
    if (password === HOST_PASSWORD) setAuthed(true)
    else setError('Wrong password.')
  }

  const createSession = async (type: string) => {
    setLoading(true); setError('')
    try {
      const r = await fetch(`${REMOTE_API}/api/session/create`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostName: 'WastedApe Tech', sessionType: type })
      })
      const data = await r.json()
      setSessionCode(data.code)
      // Auto-open the host viewer
      setTimeout(() => { window.open(`/remote/host/session?code=${data.code}`, '_blank') }, 500)
    } catch { setError('Failed to create session. Check backend.') }
    finally { setLoading(false) }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(sessionCode).catch(() => {})
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const copyLink = () => {
    const link = `https://www.wastedape.org/remote?code=${sessionCode}`
    navigator.clipboard.writeText(link).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    // Open email compose immediately
    const subject = encodeURIComponent('WastedApe Remote Support Session')
    const body = encodeURIComponent(`Hi,

Your WastedApe technician is ready to help you.

Please click the link below to start the remote support session:

${link}

Once you open the link:
1. Click "Join Session"
2. Allow screen sharing when your browser asks
3. Your technician will be able to see your screen

The session code is: ${sessionCode}
This link expires in 30 minutes.

-- WastedApe Tech Solutions
www.wastedape.org`)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank')
  }

  const accent = { color: '#C8922A', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.85)', fontFamily: 'Georgia, serif' }

  if (!authed) {
    return (
      <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '360px', width: '100%', background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '16px', padding: '32px' }}>
          <p style={{ fontSize: '36px', textAlign: 'center', marginBottom: '12px' }}>&#128075;</p>
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>Host Login</h1>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') login() }}
            placeholder="Enter host password"
            style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '8px', padding: '12px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
          {error && <p style={{ color: '#e87070', fontFamily: 'Georgia, serif', fontSize: '12px', marginTop: '8px' }}>{error}</p>}
          <button onClick={login} style={{ width: '100%', marginTop: '16px', background: '#C8922A', color: '#060608', fontFamily: 'Georgia, serif', fontWeight: 'bold', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', cursor: 'pointer' }}>
            Enter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#060608', minHeight: '100vh', padding: '80px 24px 40px', backgroundImage: 'url(/remote-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.95)', borderBottom: '1px solid rgba(200,146,42,0.2)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '36px', width: '36px', borderRadius: '50%' }} />
          <p style={{ ...accent, fontWeight: 'bold', fontSize: '15px', margin: 0 }}>WastedApe Host Panel</p>
        </Link>
        <span style={{ ...dim, fontSize: '12px' }}>&#x1F513; Authenticated</span>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Remote Session Manager</h1>
        <p style={{ ...dim, fontSize: '15px', marginBottom: '32px' }}>Create a session code and send it to your client. They enter it at wastedape.org/remote to connect.</p>

        {/* Create session */}
        <div style={{ background: 'rgba(12,10,8,0.9)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ ...accent, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Create New Session</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <button onClick={() => createSession('free')} disabled={loading}
              style={{ padding: '14px', background: 'rgba(200,146,42,0.15)', color: '#C8922A', border: '1px solid rgba(200,146,42,0.4)', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
              &#x1F49A; Free / Internal Session
            </button>
            <button onClick={() => createSession('paid')} disabled={loading}
              style={{ padding: '14px', background: '#C8922A', color: '#060608', border: 'none', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
              &#x1F4B0; Paid Session (Client pays first)
            </button>
          </div>
          {loading && <p style={{ ...dim, fontSize: '13px', textAlign: 'center' }}>Creating session...</p>}
          {error && <p style={{ color: '#e87070', fontFamily: 'Georgia, serif', fontSize: '13px' }}>{error}</p>}
        </div>

        {/* Session code display */}
        {sessionCode && (
          <div style={{ background: 'rgba(12,10,8,0.9)', border: '2px solid #C8922A', borderRadius: '16px', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
            <p style={{ ...dim, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Session Code</p>
            <p style={{ color: '#C8922A', fontFamily: 'monospace', fontSize: '56px', fontWeight: 'bold', letterSpacing: '12px', margin: '0 0 20px' }}>{sessionCode}</p>
            <p style={{ ...dim, fontSize: '12px', marginBottom: '20px' }}>Expires in 30 minutes</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <button onClick={copyCode} style={{ padding: '12px', background: 'rgba(200,146,42,0.15)', color: '#C8922A', border: '1px solid rgba(200,146,42,0.4)', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
              <button onClick={copyLink} style={{ padding: '12px', background: 'rgba(200,146,42,0.25)', color: '#C8922A', border: '1px solid rgba(200,146,42,0.5)', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                Copy + Email
              </button>
              <button onClick={() => {
                const subject = encodeURIComponent('Your Remote Support Session - WastedApe Tech')
                const body = encodeURIComponent(`Hi,\n\nYour WastedApe technician is ready to help you.\n\nClick the link below to start your remote support session:\nhttps://www.wastedape.org/remote?code=${sessionCode}\n\nOr go to wastedape.org/remote and enter code: ${sessionCode}\n\nThis link expires in 30 minutes.\n\n-- WastedApe Tech Solutions\nwww.wastedape.org`)
                // Try Gmail web first (works on all devices), fallback to mailto
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`
                window.open(gmailUrl, '_blank')
              }} style={{ padding: '12px', background: '#C8922A', color: '#060608', border: 'none', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                Send Email
              </button>
            </div>
            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(200,146,42,0.06)', borderRadius: '8px' }}>
              <p style={{ ...dim, fontSize: '12px' }}>Client link: <span style={{ color: '#C8922A' }}>wastedape.org/remote?code={sessionCode}</span></p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={{ background: 'rgba(12,10,8,0.7)', border: '1px solid rgba(200,146,42,0.15)', borderRadius: '12px', padding: '20px' }}>
          <p style={{ ...accent, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>How to Run a Session</p>
          {[
            'Create a session (Free for internal work, Paid if client is paying)',
            'Copy the code or link and send it to your client via text/email',
            'Client goes to wastedape.org/remote and enters the code',
            'Screen share connection establishes — you see their screen',
            'Fix their site, code, or network issue',
            'End session when done',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <span style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}.</span>
              <p style={{ ...dim, fontSize: '13px', margin: 0, lineHeight: '1.5' }}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


