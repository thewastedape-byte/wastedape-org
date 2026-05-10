'use client'
import { useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const REMOTE_API = process.env.NEXT_PUBLIC_REMOTE_API || 'https://wastedape-remote-api.onrender.com'
const AGENT_URL = 'https://github.com/thewastedape-byte/wastedape-remote-api/releases/download/v2.0/WastedApeAgent.exe'

function ConnectContent() {
  const searchParams = useSearchParams()
  const urlCode = searchParams.get('code') || ''
  const [code, setCode] = useState(urlCode)
  const [phase, setPhase] = useState<'enter'|'agent'|'browser'|'sharing'|'ended'>('enter')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const streamRef = useRef<MediaStream | null>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const socketRef = useRef<any>(null)

  const dim = { color: 'rgba(245,240,232,0.75)', fontFamily: 'Georgia, serif' }
  const accent = { color: '#C8922A', fontFamily: 'Georgia, serif' }

  const startBrowserShare = async () => {
    if (!code.trim()) { setError('Please enter a session code.'); return }
    setError('')
    setStatus('Requesting screen share...')
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true, audio: false })
      streamRef.current = stream
      setPhase('sharing')
      setStatus('Connecting to your technician...')

      stream.getVideoTracks()[0].addEventListener('ended', () => {
        setPhase('ended')
        socketRef.current?.emit('session:end', { code })
      })

      const { io } = await import('socket.io-client')
      const socket = io(REMOTE_API, { transports: ['websocket', 'polling'] })
      socketRef.current = socket

      socket.on('connect', () => socket.emit('client:join', { code: code.trim() }))
      socket.on('client:ready', () => setStatus('Connected — technician can see your screen.'))
      socket.on('error', (msg: string) => { setError(msg); setPhase('enter'); stream.getTracks().forEach(t => t.stop()) })

      socket.on('webrtc:offer', async ({ offer }: any) => {
        const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
        pcRef.current = pc
        stream.getTracks().forEach(t => pc.addTrack(t, stream))
        pc.onicecandidate = (e) => { if (e.candidate) socket.emit('webrtc:ice', { code, candidate: e.candidate, from: 'client' }) }
        await pc.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await pc.createAnswer()
        await pc.setLocalDescription(answer)
        socket.emit('webrtc:answer', { code, answer })
        setStatus('Technician is viewing your screen.')
      })

      socket.on('session:ended', () => { setPhase('ended'); stream.getTracks().forEach(t => t.stop()) })
      socket.on('peer:disconnected', () => setStatus('Technician disconnected.'))

    } catch (e: any) {
      const msg = e.name === 'NotAllowedError' ? 'Permission denied — please allow screen sharing.'
        : e.name === 'AbortError' ? 'Cancelled — click Join again and select a screen.'
        : e.name === 'NotSupportedError' ? 'Not supported — use Chrome or Firefox on a laptop/PC.'
        : 'Error: ' + (e.message || e.name)
      setError(msg)
      setStatus('')
      setPhase('browser')
    }
  }

  const endSession = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    pcRef.current?.close()
    socketRef.current?.emit('session:end', { code })
    setPhase('ended')
  }

  return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundImage: 'url(/remote-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img src="/logo.svg" alt="WastedApe" style={{ height: '60px', width: '60px', borderRadius: '50%', marginBottom: '10px' }} />
          <h1 style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>WastedApe Remote Support</h1>
          <p style={{ ...dim, fontSize: '13px', marginTop: '6px' }}>Your technician is ready to help</p>
        </div>

        {/* ENTER — choose method */}
        {phase === 'enter' && (
          <div style={{ background: 'rgba(12,10,8,0.92)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '16px', padding: '28px' }}>
            <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '15px', marginBottom: '16px', textAlign: 'center' }}>Enter your session code</p>
            <input
              value={code} onChange={e => setCode(e.target.value)}
              placeholder="6-digit code"
              maxLength={6}
              style={{ width: '100%', background: 'rgba(245,240,232,0.06)', border: '1px solid rgba(200,146,42,0.4)', borderRadius: '10px', padding: '14px', color: '#F5F0E8', fontFamily: 'monospace', fontSize: '26px', textAlign: 'center', letterSpacing: '8px', outline: 'none', boxSizing: 'border-box', marginBottom: '20px' }}
            />

            <p style={{ ...accent, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>Choose how to connect</p>

            {/* Option A — Desktop Agent (recommended) */}
            <div style={{ background: 'rgba(200,146,42,0.08)', border: '2px solid #C8922A', borderRadius: '12px', padding: '20px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ background: '#C8922A', color: '#060608', borderRadius: '4px', padding: '2px 8px', fontFamily: 'Georgia, serif', fontSize: '10px', fontWeight: 'bold' }}>RECOMMENDED</span>
                <span style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 'bold' }}>Desktop Agent (Full Control)</span>
              </div>
              <p style={{ ...dim, fontSize: '12px', marginBottom: '14px', lineHeight: '1.6' }}>Download a small program. Your technician gets full access to help you — fastest and most reliable.</p>
              <button onClick={() => { if (!code.trim()) { setError('Enter your session code first.'); return } setError(''); setPhase('agent') }}
                style={{ width: '100%', padding: '12px', background: '#C8922A', color: '#060608', border: 'none', borderRadius: '8px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                Download Agent &amp; Connect
              </button>
            </div>

            {/* Option B — Browser share */}
            <div style={{ background: 'rgba(12,10,8,0.5)', border: '1px solid rgba(200,146,42,0.2)', borderRadius: '12px', padding: '16px' }}>
              <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Browser Screen Share (View Only)</p>
              <p style={{ ...dim, fontSize: '12px', marginBottom: '12px' }}>No download. Share your screen in the browser. Works on Chrome/Firefox desktop only.</p>
              <button onClick={() => { setPhase('browser') }}
                style={{ width: '100%', padding: '10px', background: 'rgba(200,146,42,0.12)', color: '#C8922A', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '8px', fontFamily: 'Georgia, serif', fontSize: '13px', cursor: 'pointer' }}>
                Use Browser Instead
              </button>
            </div>

            {error && <p style={{ color: '#e87070', fontFamily: 'Georgia, serif', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>{error}</p>}
          </div>
        )}

        {/* AGENT instructions */}
        {phase === 'agent' && (
          <div style={{ background: 'rgba(12,10,8,0.92)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '16px', padding: '28px' }}>
            <p style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center' }}>3 Steps to Connect</p>
            {[
              { n: '1', title: 'Download the Agent', desc: 'Click the button below to download WastedApeAgent.exe (22MB, Windows only)' },
              { n: '2', title: 'Run It', desc: 'Double-click WastedApeAgent.exe. Windows may ask "Run anyway" — click Yes.' },
              { n: '3', title: 'Enter Your Code', desc: `Type your session code: ${code} — then click OK. Your technician connects automatically.` },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#C8922A', color: '#060608', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 'bold', margin: '4px 0 4px' }}>{s.title}</p>
                  <p style={{ ...dim, fontSize: '12px', margin: 0, lineHeight: '1.5' }}>{s.desc}</p>
                </div>
              </div>
            ))}
            <a href={AGENT_URL} download
              style={{ display: 'block', width: '100%', padding: '14px', background: '#C8922A', color: '#060608', border: 'none', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box', marginTop: '8px' }}>
              Download WastedApeAgent.exe
            </a>
            <button onClick={() => { setPhase('enter'); setError('') }}
              style={{ width: '100%', marginTop: '10px', padding: '10px', background: 'transparent', color: 'rgba(245,240,232,0.4)', border: '1px solid rgba(245,240,232,0.1)', borderRadius: '8px', fontFamily: 'Georgia, serif', fontSize: '12px', cursor: 'pointer' }}>
              Go Back
            </button>
          </div>
        )}

        {/* BROWSER share */}
        {phase === 'browser' && (
          <div style={{ background: 'rgba(12,10,8,0.92)', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '16px', padding: '28px' }}>
            <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>Browser Screen Share</p>
            <p style={{ ...dim, fontSize: '13px', marginBottom: '20px', textAlign: 'center', lineHeight: '1.6' }}>Your browser will ask what to share. Choose your entire screen for best results. Requires Chrome or Firefox on a desktop PC.</p>
            {error && <p style={{ color: '#e87070', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>{error}</p>}
            <button onClick={startBrowserShare}
              style={{ width: '100%', padding: '14px', background: '#C8922A', color: '#060608', border: 'none', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginBottom: '10px' }}>
              Join Session &amp; Share Screen
            </button>
            <button onClick={() => { setPhase('enter'); setError('') }}
              style={{ width: '100%', padding: '10px', background: 'transparent', color: 'rgba(245,240,232,0.4)', border: '1px solid rgba(245,240,232,0.1)', borderRadius: '8px', fontFamily: 'Georgia, serif', fontSize: '12px', cursor: 'pointer' }}>
              Go Back
            </button>
          </div>
        )}

        {/* SHARING */}
        {phase === 'sharing' && (
          <div style={{ background: 'rgba(12,10,8,0.92)', border: '2px solid #70c070', borderRadius: '16px', padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(112,192,112,0.15)', border: '3px solid #70c070', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '32px' }}>&#128247;</div>
            <p style={{ color: '#70c070', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Screen Sharing Active</p>
            <p style={{ ...dim, fontSize: '13px', marginBottom: '28px' }}>{status}</p>
            <button onClick={endSession}
              style={{ padding: '12px 28px', background: 'rgba(139,26,26,0.3)', color: '#e87070', border: '1px solid rgba(139,26,26,0.5)', borderRadius: '10px', fontFamily: 'Georgia, serif', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
              End Session
            </button>
          </div>
        )}

        {/* ENDED */}
        {phase === 'ended' && (
          <div style={{ background: 'rgba(12,10,8,0.92)', border: '1px solid rgba(200,146,42,0.2)', borderRadius: '16px', padding: '40px 32px', textAlign: 'center' }}>
            <p style={{ fontSize: '44px', marginBottom: '12px' }}>✓</p>
            <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Session Complete</p>
            <p style={{ ...dim, fontSize: '13px' }}>Thank you for using WastedApe Tech.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ConnectPage() {
  return <Suspense fallback={<div style={{ background: '#060608', minHeight: '100vh' }} />}><ConnectContent /></Suspense>
}
