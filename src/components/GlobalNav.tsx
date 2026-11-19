'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function GlobalNav() {
  const pathname = usePathname()
  // Homepage has its own nav already
  if (pathname === '/') return null

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      borderBottom: '1px solid rgba(200,146,42,0.2)',
      padding: '14px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(6,6,8,0.97)', backdropFilter: 'blur(8px)',
      fontFamily: 'Georgia, serif'
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <img src="/logo.svg" alt="WastedApe" style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
        <div>
          <p style={{ color: '#C8922A', fontWeight: 'bold', fontSize: '15px', margin: 0, letterSpacing: '1px', fontFamily: 'Georgia, serif' }}>THE WASTED APE</p>
          <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '9px', letterSpacing: '2px', margin: 0, fontFamily: 'Georgia, serif' }}>TECH SOLUTIONS</p>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: 'rgba(200,146,42,0.8)', fontSize: '13px', textDecoration: 'none', padding: '6px 12px', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '8px' }}>← Home</Link>
        <Link href="/#services" style={{ color: 'rgba(245,240,232,0.6)', fontSize: '13px', textDecoration: 'none', padding: '6px 12px' }}>Services</Link>
        <Link href="/#apps" style={{ color: 'rgba(245,240,232,0.6)', fontSize: '13px', textDecoration: 'none', padding: '6px 12px' }}>Apps</Link>
        <Link href="/#contact" style={{ color: 'rgba(245,240,232,0.6)', fontSize: '13px', textDecoration: 'none', padding: '6px 12px' }}>Contact</Link>
        <Link href="/maximus/book" style={{
          background: '#C8922A', color: '#060608', fontSize: '12px',
          textDecoration: 'none', padding: '8px 16px', borderRadius: '8px',
          fontWeight: 'bold', fontFamily: 'Georgia, serif'
        }}>Book a Call</Link>
      </div>
    </nav>
  )
}
