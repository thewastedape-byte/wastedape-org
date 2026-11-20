'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const ADMIN_PASSWORD = 'WastedApe2026!'
const SUPABASE_URL = 'https://yruuzkxpnbgruwuivchy.supabase.co'
const SUPABASE_KEY = 'eyJhbG…_qkE'

const gold = '#C8922A'
const dim = 'rgba(245,240,232,0.6)'
const surface = 'rgba(12,10,8,0.95)'
const border = 'rgba(200,146,42,0.25)'

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

interface Invoice {
  id: string
  invoice_number: string
  client_name: string
  client_email: string
  description: string
  amount: number
  status: string
  stripe_payment_id: string
  paid_at: string
  created_at: string
}

export default function InvoicesPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [pwError, setPwError] = useState('')
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(false)

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
  const thisMonth = invoices.filter(i => {
    const d = new Date(i.paid_at || i.created_at)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && i.status === 'paid'
  }).reduce((sum, i) => sum + i.amount, 0)

  const loadInvoices = async () => {
    setLoading(true)
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/invoices?select=*&order=created_at.desc&limit=100`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      })
      if (r.ok) setInvoices(await r.json())
    } catch {}
    setLoading(false)
  }

  useEffect(() => { if (authed) loadInvoices() }, [authed])

  if (!authed) return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '340px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/logo.svg" style={{ width: '60px', height: '60px', borderRadius: '50%', border: `2px solid ${gold}`, marginBottom: '12px' }} />
          <p style={{ color: gold, fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '3px', margin: 0 }}>INVOICE HISTORY</p>
        </div>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '14px', padding: '24px' }}>
          {pwError && <div style={{ color: '#e05555', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>{pwError}</div>}
          <input type="password" placeholder="Admin password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { if (password === ADMIN_PASSWORD) setAuthed(true); else setPwError('Wrong password') } }}
            style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,146,42,0.35)', borderRadius: '8px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' }} />
          <button onClick={() => { if (password === ADMIN_PASSWORD) setAuthed(true); else setPwError('Wrong password') }}
            style={{ width: '100%', padding: '12px', background: gold, color: '#060608', border: 'none', borderRadius: '8px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            View Invoices →
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#060608', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <nav style={{ borderBottom: `1px solid ${border}`, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6,6,8,0.98)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
          <span style={{ color: gold, fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>INVOICE HISTORY</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/billing" style={{ background: gold, color: '#060608', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold' }}>+ New Invoice</Link>
          <button onClick={loadInvoices} style={{ background: 'transparent', border: `1px solid ${border}`, color: dim, borderRadius: '8px', padding: '7px 14px', cursor: 'pointer', fontSize: '12px', fontFamily: 'Georgia, serif' }}>↻</button>
          <Link href="/" style={{ color: dim, fontSize: '13px', textDecoration: 'none' }}>← Home</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: '💰' },
            { label: 'This Month', value: `$${thisMonth.toFixed(2)}`, icon: '📅' },
            { label: 'Total Invoices', value: invoices.length, icon: '📄' },
            { label: 'Paid', value: invoices.filter(i => i.status === 'paid').length, icon: '✅' },
          ].map(s => (
            <div key={s.label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{s.icon}</div>
              <div style={{ color: '#F5F0E8', fontSize: '26px', fontWeight: 'bold', marginBottom: '3px' }}>{s.value}</div>
              <div style={{ color: dim, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Invoice list */}
        {loading ? (
          <p style={{ color: dim, textAlign: 'center', padding: '48px' }}>Loading...</p>
        ) : invoices.length === 0 ? (
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '14px', padding: '48px', textAlign: 'center' }}>
            <p style={{ color: dim, fontSize: '15px', margin: '0 0 16px' }}>No invoices yet.</p>
            <Link href="/billing" style={{ background: gold, color: '#060608', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '14px' }}>Create First Invoice →</Link>
          </div>
        ) : (
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '14px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${border}` }}>
                  {['Invoice #', 'Client', 'Description', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ padding: '12px 18px', textAlign: 'left', color: gold, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'normal' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr key={inv.id} style={{ borderBottom: `1px solid rgba(200,146,42,0.07)` }}>
                    <td style={{ padding: '12px 18px', color: gold, fontSize: '12px', fontFamily: 'monospace' }}>{inv.invoice_number}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <div style={{ color: '#F5F0E8', fontSize: '14px', fontWeight: 'bold' }}>{inv.client_name}</div>
                      <div style={{ color: dim, fontSize: '11px' }}>{inv.client_email}</div>
                    </td>
                    <td style={{ padding: '12px 18px', color: dim, fontSize: '13px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.description}</td>
                    <td style={{ padding: '12px 18px', color: '#F5F0E8', fontSize: '15px', fontWeight: 'bold' }}>${inv.amount?.toFixed(2)}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{
                        background: inv.status === 'paid' ? 'rgba(76,175,80,0.15)' : 'rgba(200,146,42,0.15)',
                        color: inv.status === 'paid' ? '#81C784' : gold,
                        border: `1px solid ${inv.status === 'paid' ? 'rgba(76,175,80,0.4)' : 'rgba(200,146,42,0.4)'}`,
                        borderRadius: '20px', padding: '3px 10px', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase'
                      }}>{inv.status}</span>
                    </td>
                    <td style={{ padding: '12px 18px', color: dim, fontSize: '12px', whiteSpace: 'nowrap' }}>{timeAgo(inv.paid_at || inv.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
