import { useState, useRef, useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import { useTheme } from '../context/ThemeContext'
import Message from './Message'

export default function ConversationView({ onVolver, esMobile }) {
  const { contactoActivo, mensajesActivos, enviarMensaje } = useChat()
  const { theme, toggleTheme } = useTheme()
  const [input, setInput] = useState('')
  const [showEmojis, setShowEmojis] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajesActivos])

  useEffect(() => {
    function handleClickOutside(event) {
      if (showEmojis && !event.target.closest('[data-emoji-picker]')) {
        setShowEmojis(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showEmojis])

  function handleEnviar(e) {
    e.preventDefault()
    if (!input.trim()) return
    enviarMensaje(input)
    setInput('')
  }

  function addEmoji(emoji) {
    setInput(prev => prev + emoji)
  }

  const commonEmojis = ['😀', '😂', '❤️', '👍', '👎', '👋', '🙏', '🔥', '💯', '🎉', '🤔', '😢', '😮', '🙄', '😴']

  if (!contactoActivo) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-chat)', color: 'var(--text-secondary)', gap: '12px',
        borderLeft: '1px solid var(--border)',
      }}>
        <svg viewBox="0 0 24 24" width="80" height="80" fill="#ccd0d5">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/>
        </svg>
        <h2 style={{ color: 'var(--text-primary)', fontWeight: '300', fontSize: '28px' }}>
          WhatsApp Web
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '300px', lineHeight: 1.6 }}>
          Enviá y recibí mensajes sin tener el teléfono cerca
        </p>
        <div style={{ width: '200px', height: '1px', background: 'var(--border)', margin: '8px 0' }} />
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          🔒 Los mensajes están cifrados de extremo a extremo
        </p>
      </div>
    )
  }

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', height: '100vh',
    }}>

{/* Header */}
<div style={{
  display: 'flex', alignItems: 'center', gap: '8px',
  padding: '10px 16px',
  background: 'var(--bg-sidebar)',
  borderBottom: '1px solid var(--border)',
  flexShrink: 0, height: '60px',
}}>

  {/* Botón volver — solo mobile */}
  {esMobile && (
    <button
      onClick={onVolver}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--icon-color)', background: 'none', border: 'none',
        cursor: 'pointer', padding: '4px', flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </button>
  )}

  <div style={{
    width: '40px', height: '40px', borderRadius: '50%',
    background: contactoActivo.color, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', color: 'white', fontSize: '13px', flexShrink: 0,
  }}>
    {contactoActivo.avatar}
  </div>

  <div style={{
    flex: 1
  }}>
    <p style={{ color: 'var(--text-primary)', fontWeight: '500', margin: 0, fontSize: '16px' }}>
      {contactoActivo.name}
    </p>
    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>
      {contactoActivo.status === 'online' ? 'en línea' : 'desconectado'}
    </p>
  </div>

  <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}>
    <button title="Cambiar tema" onClick={toggleTheme} style={{ width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--icon-color)', transition: 'background 0.15s', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
      onMouseEnter={e => e.currentTarget.style.background='var(--bg-hover)'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}>
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM12 4c-.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1s1 0.4 1 1v2c0 0.6-0.4 1-1 1zm0 16c-.6 0-1 0.4-1 1v2c0 0.6 0.4 1 1 1s1-0.4 1-1v-2c0-0.6-0.4-1-1-1zM5.64 6.64c-0.4-0.4-1.04-0.4-1.41 0L3.82 7.05C3.41 7.46 3.41 8.1 3.82 8.51c0.39 0.39 1.02 0.39 1.41 0l0.41-0.41c0.4-0.4 0.4-1.04 0-1.41zm12.73 12.73c-0.4-0.4-1.04-0.4-1.41 0l-0.41 0.41c-0.4 0.4-0.4 1.04 0 1.41 0.39 0.39 1.02 0.39 1.41 0l0.41-0.41c0.4-0.4 0.4-1.04 0-1.41zM20 12c0-.6 0.4-1 1-1h2c0.6 0 1 0.4 1 1s-0.4 1-1 1h-2c-0.6 0-1-0.4-1-1zM4 12c0-.6-0.4-1-1-1H1c-0.6 0-1 0.4-1 1s0.4 1 1 1h2c0.6 0 1-0.4 1-1zm14.36-5.64c-0.4-0.4-1.04-0.4-1.41 0-0.4 0.4-0.4 1.04 0 1.41l0.41 0.41c0.39 0.39 1.02 0.39 1.41 0 0.4-0.4 0.4-1.04 0-1.41l-0.41-0.41zM6.05 18.18c-0.4-0.4-1.04-0.4-1.41 0-0.4 0.4-0.4 1.04 0 1.41l0.41 0.41c0.39 0.39 1.02 0.39 1.41 0 0.4-0.4 0.4-1.04 0-1.41l-0.41-0.41z"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M9.37,5.51C9.52,6.15,9.63,6.82,9.63,7.5c0,4.08-3.32,7.4-7.4,7.4c-0.68,0-1.35,-0.11,-1.99,-0.26C0.96,18.3,4.3,21,8.1,21 C12.79,21,16.5,17.29,16.5,12.6C16.5,8.8,13.8,5.5,9.37,5.51z"/>
        </svg>
      )}
    </button>
    <button style={{ width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--icon-color)', transition: 'background 0.15s', background: 'none', border: 'none', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.background='var(--bg-hover)'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    </button>
    <button style={{ width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--icon-color)', transition: 'background 0.15s', background: 'none', border: 'none', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.background='var(--bg-hover)'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    </button>
  </div>
</div>

      {/* Mensajes */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '12px 0',
        display: 'flex', flexDirection: 'column',
        background: 'var(--bg-chat)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cg fill='none' stroke='%23c8b89a' stroke-width='0.4' opacity='0.4'%3E%3Cellipse cx='30' cy='30' rx='12' ry='18' transform='rotate(-30 30 30)'/%3E%3Cellipse cx='100' cy='20' rx='10' ry='16' transform='rotate(20 100 20)'/%3E%3Cellipse cx='170' cy='40' rx='11' ry='17' transform='rotate(-15 170 40)'/%3E%3Cellipse cx='60' cy='100' rx='12' ry='18' transform='rotate(25 60 100)'/%3E%3Cellipse cx='140' cy='90' rx='10' ry='15' transform='rotate(-35 140 90)'/%3E%3Cellipse cx='20' cy='160' rx='11' ry='17' transform='rotate(15 20 160)'/%3E%3Cellipse cx='100' cy='150' rx='12' ry='18' transform='rotate(-25 100 150)'/%3E%3Cellipse cx='170' cy='170' rx='10' ry='16' transform='rotate(30 170 170)'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }}>
        {mensajesActivos.map(mensaje => (
          <Message key={mensaje.id} mensaje={mensaje} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleEnviar} style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 16px',
        background: 'var(--bg-sidebar)',
        flexShrink: 0, minHeight: '62px',
      }}>
        <div style={{ position: 'relative' }} data-emoji-picker>
          <button type="button" onClick={() => setShowEmojis(!showEmojis)} style={{ color: 'var(--icon-color)', fontSize: '22px', padding: '4px', display:'flex', alignItems:'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
          </button>
          {showEmojis && (
            <div style={{
              position: 'absolute', bottom: '100%', left: '0',
              background: 'var(--bg-sidebar)', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '8px', display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000,
            }}>
              {commonEmojis.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    addEmoji(emoji)
                    setShowEmojis(false)
                  }}
                  style={{
                    width: '32px', height: '32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '20px', borderRadius: '4px',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        <button type="button" style={{ color: 'var(--icon-color)', display:'flex', alignItems:'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
          </svg>
        </button>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe un mensaje"
          style={{
            flex: 1, padding: '10px 16px',
            background: 'var(--bg-input)',
            border: 'none', borderRadius: '8px',
            color: 'var(--text-primary)', fontSize: '15px', outline: 'none',
            caretColor: 'var(--accent)',
          }}
          autoComplete="off"
          spellCheck="false"
        />
        <button type={input.trim() ? 'submit' : 'button'} style={{
          width: '42px', height: '42px', borderRadius: '50%',
          background: 'var(--accent)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.2s', border: 'none', cursor: 'pointer',
        }}
          onMouseEnter={e => e.currentTarget.style.background='var(--accent-dark)'}
          onMouseLeave={e => e.currentTarget.style.background='var(--accent)'}>
          {input.trim() ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          )}
        </button>
      </form>

    </div>
  )
}