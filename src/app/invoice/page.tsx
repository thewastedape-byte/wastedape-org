'use client'
import { useState } from 'react'
import Link from 'next/link'

const HOST_PASSWORD = 'wastedape2026'

export default function InvoicePage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')

  const [clientEmail, setClientEmail] = useState('')
  const [clientName, setClientName] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<any>(null)
  const [error, setError] = useState('')

  const login = () => {
    if (password === HOST_PASSWORD) setAuthed(true)
    else setAuthError('Wrong password.')
  }

  const sendInvoice = async () => {
    if (!clientEmail || !amount || !description) {
      setError('Email, amount, and job description are required.'); return
    }
    setError(''); setLoading(true)
    try {
      const r = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientEmail, clientName, description, amount, notes })
      })
      const data = await r.json()
      if (data.success) {
        setSuccess(data)
        setClientEmail(''); setClientName(''); setDescription(''); setAmount(''); setNotes('')
      } else {
        setError(data.error || 'Failed to send invoice.')
      }
    } catch { setError('Network error. Try again.') }
    finally { setLoading(false) }
  }

  const accent = { color: '#C8922A', fontFamily: 'Georgia, serif' }
  const dim = { color: 'rgba(245,240,232,0.55)', fontFamily: 'Georgia, serif' }
  const inputStyle = { width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '8px', padding: '12px 14px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const }
  const labelStyle = { ...dim, fontSize: '12px', display: 'block' as const, marginBottom: '6px', textTransform: 'uppercase' as const, letterSpacing: '1px' }

  if (!authed) {
    return (
      <div style={{ background: '#060608', backgroundImage: 'url(/remote-bg.png)', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '360px', width: '100%', background: 'rgba(8,6,4,0.92)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '16px', padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <img src="/logo.svg" alt="WastedApe" style={{ height: '64px', width: '64px', borderRadius: '50%', marginBottom: '12px' }} />
            <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Invoice Tool</h1>
            <p style={{ ...dim, fontSize: '13px', marginTop: '4px' }}>WastedApe Tech Solutions</p>
          </div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') login() }}
            placeholder="Host password"
            style={{ ...inputStyle, marginBottom: '12px' }} />
          {authError && <p style={{ color: '#e87070', fontFamily: 'Georgia, serif', fontSize: '12px', marginBottom: '8px' }}>{authError}</p>}
          <button onClick={login} style={{ width: '100%', background: '#C8922A', color: '#060608', fontFamily: 'Georgia, serif', fontWeight: 'bold', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', cursor: 'pointer' }}>
            Enter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#060608', backgroundImage: 'url(/remote-bg.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh', padding: '80px 24px 40px' }}>
      {/* Nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,6,8,0.92)', borderBottom: '1px solid rgba(200,146,42,0.2)', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '36px', width: '36px', borderRadius: '50%' }} />
          <p style={{ ...accent, fontWeight: 'bold', fontSize: '15px', margin: 0 }}>WastedApe Invoice</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href="/remote/host" style={{ ...dim, fontSize: '13px', textDecoration: 'none' }}>Remote</Link>
          <Link href="/" style={{ ...dim, fontSize: '13px', textDecoration: 'none' }}>Home</Link>
        </div>
      </div>

      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>Send Invoice</h1>
        <p style={{ ...dim, fontSize: '14px', marginBottom: '32px' }}>Stripe emails the client a professional invoice — they pay online.</p>

        {success && (
          <div style={{ background: 'rgba(112,192,112,0.1)', border: '1px solid rgba(112,192,112,0.4)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <p style={{ color: '#70c070', fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px' }}>&#10003; Invoice sent!</p>
            <p style={{ ...dim, fontSize: '13px', margin: '0 0 12px' }}>
              ${success.amount} invoice sent to {success.clientEmail}
            </p>
            {success.invoiceUrl && (
              <a href={success.invoiceUrl} target="_blank" rel="noopener noreferrer"
                style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '13px' }}>
                View invoice &#8594;
              </a>
            )}
          </div>
        )}

        <div style={{ background: 'rgba(8,6,4,0.88)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Client info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Client Email *</label>
              <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="client@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Client Name</label>
              <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="John Smith" style={inputStyle} />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label style={labelStyle}>Amount ($) *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 'bold' }}>$</span>
              <input type="number" step="0.01" min="0.50" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                style={{ ...inputStyle, paddingLeft: '30px', fontSize: '24px', fontWeight: 'bold', color: '#C8922A' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              {['50.00','75.00','100.00','150.00','200.00','250.00','500.00'].map(p => (
                <button key={p} onClick={() => setAmount(p)}
                  style={{ background: amount === p ? '#C8922A' : 'rgba(200,146,42,0.15)', color: amount === p ? '#060608' : '#C8922A', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontFamily: 'Georgia, serif', cursor: 'pointer' }}>
                  ${p}
                </button>
              ))}
            </div>
          </div>

          {/* Job description */}
          <div>
            <label style={labelStyle}>Job Description *</label>
            <input value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Website setup, DNS configuration, bot programming..."
              style={inputStyle} />
          </div>

          {/* Notes */}
          <div>
            <label style={labelStyle}>Notes (optional — appears on invoice)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Additional details, payment terms, etc."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {error && <p style={{ color: '#e87070', fontFamily: 'Georgia, serif', fontSize: '13px', margin: 0 }}>{error}</p>}

          <button onClick={sendInvoice} disabled={loading}
            style={{ background: loading ? 'rgba(200,146,42,0.4)' : '#C8922A', color: '#060608', fontFamily: 'Georgia, serif', fontWeight: 'bold', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Sending invoice...' : `Send Invoice${amount ? ` — $${parseFloat(amount || '0').toFixed(2)}` : ''}`}
          </button>

          <p style={{ ...dim, fontSize: '11px', textAlign: 'center', margin: 0 }}>
            Stripe sends a professional email invoice. Client pays online. Funds go to your account.
          </p>
        </div>
      </div>
    </div>
  )
}
