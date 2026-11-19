export default function BusinessCard() {
  return (
    <div style={{
      background: '#1a1a2e',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '48px',
      padding: '48px 24px',
      fontFamily: 'Georgia, serif',
    }}>
      <p style={{ color: 'rgba(200,146,42,0.6)', fontSize: '12px', letterSpacing: '3px', margin: 0 }}>
        BUSINESS CARD — PRINT READY
      </p>

      {/* FRONT */}
      <div style={{
        width: '1050px',
        maxWidth: '100%',
        height: 'auto',
        aspectRatio: '3.5 / 2',
        background: 'linear-gradient(135deg, #0a0806 0%, #161210 50%, #0d0b09 100%)',
        borderRadius: '24px',
        border: '2px solid rgba(200,146,42,0.5)',
        boxShadow: '0 0 60px rgba(200,146,42,0.15), 0 24px 64px rgba(0,0,0,0.8)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        padding: '48px 56px',
        boxSizing: 'border-box',
      }}>
        {/* Subtle gear texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at top right, rgba(200,146,42,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, right: -40,
          width: '300px', height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(200,146,42,0.08)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -20, right: -20,
          width: '220px', height: '220px',
          borderRadius: '50%',
          border: '1px solid rgba(200,146,42,0.06)',
          pointerEvents: 'none',
        }} />

        {/* Left — Logo */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '48px',
          flexShrink: 0,
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px solid rgba(200,146,42,0.6)',
            boxShadow: '0 0 24px rgba(200,146,42,0.3)',
            overflow: 'hidden',
            background: '#0a0806',
          }}>
            <img
              src="/logo.svg"
              alt="WastedApe"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(200,146,42,0.4), transparent)',
          alignSelf: 'stretch',
          marginRight: '48px',
          flexShrink: 0,
        }} />

        {/* Right — Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
        }}>
          {/* Top — Name & Title */}
          <div>
            <p style={{
              color: 'rgba(200,146,42,0.5)',
              fontSize: '10px',
              letterSpacing: '3px',
              margin: '0 0 6px',
              textTransform: 'uppercase',
            }}>
              THE WASTED APE · TECH SOLUTIONS
            </p>
            <h1 style={{
              color: '#F5F0E8',
              fontSize: '32px',
              fontWeight: 'bold',
              margin: '0 0 4px',
              letterSpacing: '1px',
              lineHeight: 1.1,
            }}>
              Daniel Bloom
            </h1>
            <p style={{
              color: '#C8922A',
              fontSize: '13px',
              letterSpacing: '2px',
              margin: 0,
              textTransform: 'uppercase',
            }}>
              Founder &amp; Technical Principal
            </p>
          </div>

          {/* Bottom — Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#C8922A', fontSize: '14px' }}>📞</span>
              <span style={{ color: '#F5F0E8', fontSize: '15px', letterSpacing: '0.5px' }}>
                (272) APE-DUDE
              </span>
              <span style={{ color: 'rgba(200,146,42,0.4)', fontSize: '11px' }}>
                · +1 (272) 273-3833
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#C8922A', fontSize: '14px' }}>✉</span>
              <span style={{ color: '#F5F0E8', fontSize: '15px' }}>
                thewastedape@gmail.com
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#C8922A', fontSize: '14px' }}>🌐</span>
              <span style={{ color: '#C8922A', fontSize: '15px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                wastedape.org
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BACK */}
      <div style={{
        width: '1050px',
        maxWidth: '100%',
        aspectRatio: '3.5 / 2',
        background: 'linear-gradient(135deg, #0a0806 0%, #161210 50%, #0d0b09 100%)',
        borderRadius: '24px',
        border: '2px solid rgba(200,146,42,0.5)',
        boxShadow: '0 0 60px rgba(200,146,42,0.15), 0 24px 64px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 56px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        gap: '16px',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(200,146,42,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <img src="/logo.svg" alt="WastedApe" style={{
          width: '80px', height: '80px', borderRadius: '50%',
          border: '2px solid rgba(200,146,42,0.5)',
          boxShadow: '0 0 30px rgba(200,146,42,0.2)',
        }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#C8922A', fontSize: '11px', letterSpacing: '4px', margin: '0 0 4px' }}>THE WASTED APE</p>
          <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '9px', letterSpacing: '3px', margin: 0 }}>TECH SOLUTIONS</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '12px', letterSpacing: '1px', margin: '0 0 6px' }}>
            AI · AUTOMATION · INDUSTRIAL CONSULTING
          </p>
          <p style={{ color: 'rgba(200,146,42,0.5)', fontSize: '11px', letterSpacing: '0.5px', margin: 0 }}>
            Veteran-Owned · Available Nationwide
          </p>
        </div>
      </div>

      {/* Print hint */}
      <p style={{ color: 'rgba(200,146,42,0.4)', fontSize: '11px', letterSpacing: '2px', margin: 0 }}>
        CTRL+P TO PRINT · 3.5" × 2" STANDARD CARD
      </p>
    </div>
  )
}
