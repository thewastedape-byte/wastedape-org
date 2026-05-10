'use client'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
      <p style={{ fontSize: '60px', marginBottom: '16px' }}>&#127183;</p>
      <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>You&apos;re booked!</h1>
      <p style={{ color: 'rgba(245,240,232,0.6)', fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: '1.7', maxWidth: '480px', marginBottom: '32px' }}>
        Payment confirmed. We&apos;ll email you at the address you provided within 24 hours to schedule your session.
        <br /><br />
        Questions? <a href="mailto:thewastedape@gmail.com" style={{ color: '#C68B3A' }}>thewastedape@gmail.com</a>
      </p>
      <Link href="/" style={{ background: '#C68B3A', color: '#0a0a0a', fontFamily: 'Georgia, serif', fontWeight: 'bold', textDecoration: 'none', padding: '14px 28px', borderRadius: '8px', fontSize: '15px' }}>
        Back to Home
      </Link>
    </div>
  )
}
