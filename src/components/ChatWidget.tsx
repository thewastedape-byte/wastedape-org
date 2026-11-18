'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const gold = '#C8922A'
  const bg = '#0c0a08'
  const surface = '#131110'
  const border = 'rgba(200,146,42,0.25)'
  const dim = 'rgba(245,240,232,0.65)'
  const light = '#F5F0E8'

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hey — I'm the WastedApe assistant. What are you trying to build or solve?"
      }])
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setError('')

    const updated: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated })
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || 'Something went wrong.')
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      }
    } catch {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '90px', right: '20px', zIndex: 9999,
          width: 'min(380px, calc(100vw - 40px))',
          height: 'min(520px, calc(100vh - 140px))',
          background: bg,
          border: `1px solid ${border}`,
          borderRadius: '16px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,146,42,0.1)',
          display: 'flex', flexDirection: 'column',
          fontFamily: 'Georgia, serif',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 18px',
            borderBottom: `1px solid ${border}`,
            background: surface,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${gold}, #8b6218)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px'
              }}>🦍</div>
              <div>
                <p style={{ color: light, fontSize: '13px', fontWeight: 'bold', margin: 0 }}>WastedApe Tech</p>
                <p style={{ color: gold, fontSize: '10px', letterSpacing: '1px', margin: 0 }}>AI ASSISTANT • ONLINE</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: dim, fontSize: '20px', lineHeight: 1, padding: '4px'
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '10px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user'
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? `linear-gradient(135deg, ${gold}, #8b6218)`
                    : surface,
                  border: msg.role === 'assistant' ? `1px solid ${border}` : 'none',
                  color: msg.role === 'user' ? '#fff' : light,
                  fontSize: '13.5px',
                  lineHeight: '1.55',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: surface,
                  border: `1px solid ${border}`,
                  color: gold, fontSize: '18px', letterSpacing: '4px'
                }}>•••</div>
              </div>
            )}
            {error && (
              <div style={{
                color: '#e05555', fontSize: '12px',
                textAlign: 'center', padding: '4px'
              }}>{error}</div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 14px',
            borderTop: `1px solid ${border}`,
            background: surface,
            display: 'flex', gap: '8px', alignItems: 'center'
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about services, pricing, or your project..."
              disabled={loading}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${border}`,
                borderRadius: '10px',
                padding: '10px 14px',
                color: light,
                fontSize: '13px',
                fontFamily: 'Georgia, serif',
                outline: 'none',
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() && !loading ? gold : 'rgba(200,146,42,0.3)',
                border: 'none', borderRadius: '10px',
                width: '40px', height: '40px',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                fontSize: '18px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 0.2s'
              }}
            >↑</button>
          </div>

          {/* Footer */}
          <div style={{
            padding: '6px 14px 10px',
            background: surface,
            textAlign: 'center'
          }}>
            <a href="tel:+13304199283" style={{
              color: 'rgba(200,146,42,0.6)', fontSize: '11px',
              fontFamily: 'Georgia, serif', textDecoration: 'none'
            }}>
              Or call/text: (330) 419-9283
            </a>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999,
          width: '60px', height: '60px', borderRadius: '50%',
          background: open
            ? 'rgba(200,146,42,0.9)'
            : `linear-gradient(135deg, ${gold}, #8b6218)`,
          border: `2px solid rgba(200,146,42,0.5)`,
          boxShadow: '0 8px 24px rgba(200,146,42,0.35)',
          cursor: 'pointer',
          fontSize: open ? '22px' : '26px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
          color: '#fff'
        }}
        aria-label="Chat with WastedApe Tech"
      >
        {open ? '✕' : '🦍'}
      </button>
    </>
  )
}
