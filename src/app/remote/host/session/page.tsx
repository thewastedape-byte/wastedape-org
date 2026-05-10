'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const REMOTE_API = process.env.NEXT_PUBLIC_REMOTE_API || 'https://wastedape-remote-api.onrender.com'

function HostSessionContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''
  const [status, setStatus] = useState('Connecting...')
  const [clientConnected, setClientConnected] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [controlOn, setControlOn] = useState(false)
  const [agentConnected, setAgentConnected] = useState(false)
  const [zoom, setZoom] = useState(100)

  const videoRef = useRef<HTMLVideoElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const socketRef = useRef<any>(null)
  const [agentScreenshot, setAgentScreenshot] = useState<string | null>(null)

  useEffect(() => {
    if (!code) return
    connect()
    return () => {
      socketRef.current?.disconnect?.()
      pcRef.current?.close()
    }
  }, [code])

  const connect = async () => {
    try {
      const { io } = await import('socket.io-client')
      const socket = io(REMOTE_API, { transports: ['websocket', 'polling'] })
      socketRef.current = socket

      socket.on('connect', () => {
        setStatus('Connected — waiting for client')
        socket.emit('host:join', { code })
      })

      socket.on('client:joined', async () => {
        setClientConnected(true)
        setStatus('Client joined — establishing video...')
        await createPeerConnection()
      })

      socket.on('webrtc:answer', async ({ answer }: any) => {
        await pcRef.current?.setRemoteDescription(new RTCSessionDescription(answer)).catch(console.error)
      })

      socket.on('webrtc:ice', async ({ candidate }: any) => {
        if (candidate) await pcRef.current?.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => {})
      })

      socket.on('peer:disconnected', () => {
        setClientConnected(false)
        setStreaming(false)
        setControlOn(false)
        setStatus('Client disconnected')
        if (videoRef.current) videoRef.current.srcObject = null
      })

      socket.on('agent:ready', () => {
        setAgentConnected(true)
        setStreaming(true)
        setStatus('Desktop agent connected — full OS control available')
      })

      socket.on('screenshot', ({ data }: any) => {
        setAgentScreenshot('data:image/jpeg;base64,' + data)
        setStreaming(true)
      })

      socket.on('session:ended', () => {
        setStatus('Session ended')
        setStreaming(false)
      })
    } catch (e: any) {
      setStatus('Connection error: ' + e.message)
    }
  }

  const createPeerConnection = async () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ]
    })
    pcRef.current = pc

    // Video track arrives → show it
    pc.ontrack = (e) => {
      if (videoRef.current && e.streams[0]) {
        videoRef.current.srcObject = e.streams[0]
        videoRef.current.play().then(() => {
          setStreaming(true)
          setStatus("Live — client screen visible")
        }).catch(() => {
          setStreaming(true)
          setStatus("Live — click video to play")
        })
      }
    }

    // ICE candidates
    pc.onicecandidate = (e) => {
      if (e.candidate) socketRef.current?.emit('webrtc:ice', { code, candidate: e.candidate, from: 'host' })
    }

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'failed') setStatus('Connection failed — start new session')
      if (pc.connectionState === 'connected') setStatus('Connected')
    }

    // Data channel for control
    const dc = pc.createDataChannel('control', { ordered: true })
    dcRef.current = dc
    dc.onopen = () => {
      console.log('Data channel OPEN')
      setStatus('Control ready — turn on Control to use')
    }
    dc.onerror = (e) => console.log('DC error:', e)
    dc.onclose = () => console.log('DC closed')

    // Receive video from client
    pc.addTransceiver('video', { direction: 'recvonly' })

    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    socketRef.current?.emit('webrtc:offer', { code, offer })
  }

  const sendControl = (cmd: any) => {
    if (!controlOn) return
    // Try WebRTC data channel first (browser mode)
    const dc = dcRef.current
    if (dc && dc.readyState === 'open') {
      dc.send(JSON.stringify(cmd))
      return
    }
    // Fall back to socket relay (desktop agent mode)
    socketRef.current?.emit('agent:control', { code, command: cmd })
  }

  const handleClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.preventDefault(); e.stopPropagation()
    if (!controlOn || !streaming) return
    const rect = e.currentTarget.getBoundingClientRect()
    sendControl({ type: 'click', x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (!controlOn || !streaming) return
    const rect = e.currentTarget.getBoundingClientRect()
    sendControl({ type: 'mousemove', x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height })
  }

  const handleScroll = (e: React.WheelEvent<HTMLVideoElement>) => {
    if (!controlOn || !streaming) return
    sendControl({ type: 'scroll', deltaX: e.deltaX, deltaY: e.deltaY })
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (!controlOn || !streaming) return
    e.preventDefault()
    sendControl({ type: 'keydown', key: e.key, code: e.code, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, altKey: e.altKey })
  }

  const endSession = () => {
    socketRef.current?.emit('session:end', { code })
    pcRef.current?.close()
    if (videoRef.current) videoRef.current.srcObject = null
    setStreaming(false)
    setClientConnected(false)
    setControlOn(false)
    setStatus('Session ended')
  }

  return (
    <div style={{ background: '#000', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

      {/* Slim top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(6,6,8,0.92)', borderBottom: '1px solid rgba(200,146,42,0.3)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.svg" alt="" style={{ height: '28px', width: '28px', borderRadius: '50%' }} />
          <span style={{ color: '#C8922A', fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 'bold' }}>
            Code: {code}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: clientConnected ? '#70c070' : '#e87070', display: 'inline-block' }} />
          <span style={{ color: 'rgba(245,240,232,0.7)', fontFamily: 'Georgia, serif', fontSize: '12px' }}>{status}</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Zoom */}
          {[75,100,150,200].map(z => (
            <button key={z} onClick={() => setZoom(z)}
              style={{ padding: '4px 8px', background: zoom === z ? '#C8922A' : 'rgba(200,146,42,0.12)', color: zoom === z ? '#000' : '#C8922A', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '5px', fontFamily: 'Georgia, serif', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              {z}%
            </button>
          ))}
          {/* Control toggle */}
          {agentConnected && (
            <span style={{ color: '#70c070', fontFamily: 'Georgia, serif', fontSize: '11px', background: 'rgba(112,192,112,0.15)', border: '1px solid rgba(112,192,112,0.3)', borderRadius: '5px', padding: '3px 8px' }}>
              Desktop Agent
            </span>
          )}
          {streaming && (
            <button onClick={() => { setControlOn(!controlOn); if (!controlOn) videoRef.current?.focus() }}
              style={{ padding: '5px 12px', background: controlOn ? '#C8922A' : 'rgba(200,146,42,0.12)', color: controlOn ? '#000' : '#C8922A', border: `2px solid ${controlOn ? '#C8922A' : 'rgba(200,146,42,0.4)'}`, borderRadius: '6px', fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              {controlOn ? 'Control ON' : 'Control OFF'}
            </button>
          )}
          {/* Fullscreen */}
          <button onClick={() => {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen()
            else document.exitFullscreen()
          }}
            style={{ padding: '5px 10px', background: 'rgba(200,146,42,0.12)', color: '#C8922A', border: '1px solid rgba(200,146,42,0.3)', borderRadius: '6px', fontFamily: 'Georgia, serif', fontSize: '12px', cursor: 'pointer' }}>
            Full Screen
          </button>
          <button onClick={endSession}
            style={{ padding: '5px 12px', background: 'rgba(139,26,26,0.4)', color: '#e87070', border: '1px solid rgba(139,26,26,0.6)', borderRadius: '6px', fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            End
          </button>
        </div>
      </div>

      {/* Full screen video area */}
      <div style={{ flex: 1, marginTop: '44px', overflow: zoom > 100 ? 'auto' : 'hidden', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: '#050505' }}>
        {!streaming && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '60vh', textAlign: 'center', padding: '24px' }}>
            <p style={{ fontSize: '56px', marginBottom: '16px' }}>&#x1F5A5;</p>
            <p style={{ color: 'rgba(245,240,232,0.6)', fontFamily: 'Georgia, serif', fontSize: '16px', marginBottom: '8px' }}>{clientConnected ? 'Connecting video...' : 'Waiting for client to join'}</p>
            {!clientConnected && <p style={{ color: 'rgba(200,146,42,0.6)', fontFamily: 'Georgia, serif', fontSize: '13px' }}>Client link: wastedape.org/remote?code={code}</p>}
          </div>
        )}
        {/* Agent screenshot stream */}
        {agentScreenshot && (
          <img
            ref={imgRef}
            src={agentScreenshot}
            style={{ display: 'block', width: zoom <= 100 ? '100%' : `${zoom}%`, maxWidth: zoom <= 100 ? '100%' : 'none', cursor: controlOn ? 'crosshair' : 'default', outline: 'none', userSelect: 'none' }}
            onClick={handleClick as any}
            onMouseMove={handleMouseMove as any}
            onWheel={handleScroll as any}
            onKeyDown={handleKey as any}
            onContextMenu={e => e.preventDefault()}
            tabIndex={0}
            draggable={false}
            alt="Remote screen"
          />
        )}
        {/* WebRTC video stream (browser share fallback) */}
        <video
          ref={videoRef}
          style={{ display: (!agentScreenshot && streaming) ? 'block' : 'none', width: zoom <= 100 ? '100%' : `${zoom}%`, maxWidth: zoom <= 100 ? '100%' : 'none', objectFit: zoom <= 100 ? 'contain' : 'fill', cursor: controlOn ? 'crosshair' : 'default', outline: 'none' }}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onWheel={handleScroll}
          onKeyDown={handleKey}
          onContextMenu={e => e.preventDefault()}
          tabIndex={0}
          autoPlay
          muted={false}
        />
      </div>
    </div>
  )
}

export default function HostSessionPage() {
  return <Suspense fallback={<div style={{ background: '#000', width: '100vw', height: '100vh' }} />}><HostSessionContent /></Suspense>
}
