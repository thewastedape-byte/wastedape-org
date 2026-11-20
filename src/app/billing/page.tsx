'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const ADMIN_PASSWORD = 'WastedApe2026!'
const STRIPE_PK = 'pk_live_51TTpplHfCuVeN1IrcHjby0slnE9vTvmL0cs3muq2qo2y1AMtf94rVMuEXm73AuJblrhCQ8XqbmQ7qj6n7yY2HUje00HGciov2V'

const gold = '#C8922A'
const dim = 'rgba(245,240,232,0.6)'
const surface = 'rgba(12,10,8,0.95)'
const border = 'rgba(200,146,42,0.3)'

const inputStyle = {
  width: '100%', padding: '11px 14px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(200,146,42,0.35)',
  borderRadius: '8px', color: '#F5F0E8',
  fontSize: '14px', fontFamily: 'Georgia, serif',
  outline: 'none', boxSizing: 'border-box' as const,
}

function generateInvoiceNumber() {
  const date = new Date()
  const yr = date.getFullYear().toString().slice(-2)
  const mo = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 900) + 100
  return `WAT-${yr}${mo}${day}-${rand}`
}

export default function BillingPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [pwError, setPwError] = useState('')

  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [description, setDescription] = useState('')
  const [lineItems, setLineItems] = useState([{ desc: '', amount: '' }])
  const [invoiceNumber] = useState(generateInvoiceNumber)

  const [stripe, setStripe] = useState<any>(null)
  const [cardElement, setCardElement] = useState<any>(null)
  const [cardReady, setCardReady] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [successData, setSuccessData] = useState<any>(null)

  const totalAmount = lineItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)

  // Load Stripe.js
  useEffect(() => {
    if (!authed) return
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/'
    script.onload = () => {
      const s = (window as any).Stripe(STRIPE_PK)
      setStripe(s)
    }
    document.head.appendChild(script)
  }, [authed])

  // Mount Stripe card element
  useEffect(() => {
    if (!stripe || !cardRef.current) return
    const elements = stripe.elements({
      appearance: {
        theme: 'night',
        variables: {
          colorPrimary: '#C8922A',
          colorBackground: '#0c0a08',
          colorText: '#F5F0E8',
          colorDanger: '#e05555',
          fontFamily: 'Georgia, serif',
          borderRadius: '8px',
        }
      }
    })
    const card = elements.create('card', {
      style: {
        base: { color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', '::placeholder': { color: 'rgba(245,240,232,0.3)' } },
        invalid: { color: '#e05555' }
      }
    })
    card.mount(cardRef.current)
    card.on('ready', () => setCardReady(true))
    setCardElement(card)
    return () => card.destroy()
  }, [stripe])

  const addLineItem = () => setLineItems(prev => [...prev, { desc: '', amount: '' }])
  const removeLineItem = (i: number) => setLineItems(prev => prev.filter((_, idx) => idx !== i))
  const updateLineItem = (i: number, field: 'desc' | 'amount', val: string) => {
    setLineItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item))
  }

  const handleCharge = async () => {
    if (!stripe || !cardElement) return
    if (!clientName || !clientEmail) { setError('Client name and email required'); return }
    if (totalAmount <= 0) { setError('Total must be greater than $0'); return }

    setLoading(true)
    setError('')

    // Create PaymentMethod from card element (card data goes to Stripe, NOT our server)
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { name: clientName, email: clientEmail }
    })

    if (pmError) {
      setError(pmError.message)
      setLoading(false)
      return
    }

    // Send PaymentMethod ID (not card numbers) to our server
    try {
      const r = await fetch('/api/billing/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: totalAmount.toFixed(2),
          clientName,
          clientEmail,
          description: description || lineItems.map(i => i.desc).filter(Boolean).join(', '),
          lineItems,
          invoiceNumber,
        })
      })
      const d = await r.json()
      if (!r.ok) { setError(d.error || 'Charge failed'); setLoading(false); return }
      setSuccess(true)
      setSuccessData(d)
    } catch {
      setError('Network error')
    }
    setLoading(false)
  }

  if (!authed) return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '360px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img src="/logo.svg" style={{ width: '64px', height: '64px', borderRadius: '50%', border: `2px solid ${gold}`, marginBottom: '12px' }} />
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '3px', margin: 0 }}>BILLING PORTAL</p>
        </div>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '16px', padding: '28px' }}>
          {pwError && <div style={{ background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.3)', borderRadius: '8px', padding: '10px', color: '#e05555', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{pwError}</div>}
          <input type="password" placeholder="Admin password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { if (password === ADMIN_PASSWORD) setAuthed(true); else setPwError('Wrong password') } }}
            style={{ ...inputStyle, marginBottom: '12px' }} />
          <button onClick={() => { if (password === ADMIN_PASSWORD) setAuthed(true); else setPwError('Wrong password') }}
            style={{ width: '100%', padding: '12px', background: gold, color: '#060608', border: 'none', borderRadius: '8px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            Enter →
          </button>
        </div>
      </div>
    </div>
  )

  if (success) return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(76,175,80,0.15)', border: '2px solid rgba(76,175,80,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>✓</div>
        <h2 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '26px', margin: '0 0 8px' }}>Payment Successful!</h2>
        <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '14px', margin: '0 0 8px' }}>Invoice {invoiceNumber}</p>
        <p style={{ color: '#81C784', fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'bold', margin: '0 0 24px' }}>${totalAmount.toFixed(2)} charged</p>
        <p style={{ color: dim, fontFamily: 'Georgia, serif', fontSize: '13px', margin: '0 0 32px' }}>Receipt emailed to {clientEmail}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', background: gold, color: '#060608', border: 'none', borderRadius: '8px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
            New Invoice
          </button>
          <Link href="/invoices" style={{ padding: '12px 24px', background: 'transparent', color: gold, border: `1px solid ${gold}`, borderRadius: '8px', fontFamily: 'Georgia, serif', fontSize: '14px', textDecoration: 'none' }}>
            View All Invoices
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#060608', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${border}`, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6,6,8,0.98)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
          <span style={{ color: gold, fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>BILLING PORTAL</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href="/invoices" style={{ color: dim, fontSize: '13px', textDecoration: 'none' }}>All Invoices</Link>
          <Link href="/" style={{ color: dim, fontSize: '13px', textDecoration: 'none' }}>← Home</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Invoice header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ color: '#F5F0E8', fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px' }}>New Invoice & Charge</h1>
            <p style={{ color: dim, fontSize: '13px', margin: 0 }}>Invoice #: <span style={{ color: gold }}>{invoiceNumber}</span></p>
          </div>
          <div style={{ color: '#F5F0E8', fontSize: '32px', fontWeight: 'bold' }}>${totalAmount.toFixed(2)}</div>
        </div>

        {error && <div style={{ background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.4)', borderRadius: '8px', padding: '12px', color: '#e05555', fontSize: '13px', marginBottom: '20px' }}>{error}</div>}

        {/* Client info */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '14px', padding: '24px', marginBottom: '16px' }}>
          <p style={{ color: gold, fontSize: '10px', letterSpacing: '2px', margin: '0 0 14px', textTransform: 'uppercase' }}>Client Information</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', color: dim, fontSize: '11px', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>Name *</label>
              <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client name" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', color: dim, fontSize: '11px', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email *</label>
              <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="client@email.com" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Line items */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '14px', padding: '24px', marginBottom: '16px' }}>
          <p style={{ color: gold, fontSize: '10px', letterSpacing: '2px', margin: '0 0 14px', textTransform: 'uppercase' }}>Line Items</p>
          {lineItems.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 32px', gap: '8px', marginBottom: '10px', alignItems: 'center' }}>
              <input value={item.desc} onChange={e => updateLineItem(i, 'desc', e.target.value)} placeholder="Description of work" style={inputStyle} />
              <input type="number" value={item.amount} onChange={e => updateLineItem(i, 'amount', e.target.value)} placeholder="$0.00" style={{ ...inputStyle, textAlign: 'right' }} />
              {lineItems.length > 1 && (
                <button onClick={() => removeLineItem(i)} style={{ background: 'transparent', border: '1px solid rgba(224,85,85,0.3)', color: '#e05555', borderRadius: '6px', width: '32px', height: '38px', cursor: 'pointer', fontSize: '16px' }}>×</button>
              )}
            </div>
          ))}
          <button onClick={addLineItem} style={{ background: 'transparent', border: `1px dashed rgba(200,146,42,0.4)`, color: gold, borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '13px', width: '100%', marginTop: '4px' }}>
            + Add Line Item
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '12px', borderTop: `1px solid rgba(200,146,42,0.2)` }}>
            <span style={{ color: '#F5F0E8', fontSize: '16px', fontWeight: 'bold' }}>Total</span>
            <span style={{ color: gold, fontSize: '22px', fontWeight: 'bold' }}>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Card input */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
          <p style={{ color: gold, fontSize: '10px', letterSpacing: '2px', margin: '0 0 14px', textTransform: 'uppercase' }}>Card Information</p>
          <div ref={cardRef} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(200,146,42,0.3)`, borderRadius: '8px', minHeight: '44px' }} />
          {!cardReady && stripe && <p style={{ color: dim, fontSize: '12px', marginTop: '8px' }}>Loading secure card input...</p>}
          {!stripe && <p style={{ color: dim, fontSize: '12px', marginTop: '8px' }}>Loading Stripe...</p>}
          <p style={{ color: 'rgba(245,240,232,0.25)', fontSize: '11px', marginTop: '10px', lineHeight: 1.5 }}>
            🔒 Card data is encrypted by Stripe and never stored on our servers. PCI DSS compliant.
          </p>
        </div>

        {/* Charge button */}
        <button
          onClick={handleCharge}
          disabled={loading || !cardReady || totalAmount <= 0}
          style={{
            width: '100%', padding: '16px',
            background: loading || !cardReady || totalAmount <= 0 ? 'rgba(200,146,42,0.3)' : gold,
            color: loading || !cardReady || totalAmount <= 0 ? 'rgba(200,146,42,0.5)' : '#060608',
            border: 'none', borderRadius: '12px',
            fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '18px',
            cursor: loading || !cardReady || totalAmount <= 0 ? 'default' : 'pointer',
            transition: 'all 0.2s',
          }}>
          {loading ? 'Processing...' : `Charge $${totalAmount.toFixed(2)}`}
        </button>

        <p style={{ color: 'rgba(245,240,232,0.25)', fontSize: '11px', textAlign: 'center', marginTop: '12px' }}>
          Receipt emailed to client immediately upon successful charge.
        </p>
      </div>
    </div>
  )
}
