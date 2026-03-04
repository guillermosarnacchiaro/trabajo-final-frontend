import { useState, useRef, useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import Message from './Message'

export default function ConversationView({ onVolver, esMobile }) {
  const { contactoActivo, mensajesActivos, enviarMensaje } = useChat()
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajesActivos])

  function handleEnviar(e) {
    e.preventDefault()
    if (!input.trim()) return
    enviarMensaje(input)
    setInput('')
  }

  if (!contactoActivo) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#f0f2f5', color: '#667781', gap: '12px',
        borderLeft: '1px solid var(--border)',
      }}>
        <svg viewBox="0 0 24 24" width="80" height="80" fill="#ccd0d5">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/>
        </svg>
        <h2 style={{ color: '#111b21', fontWeight: '300', fontSize: '28px' }}>
          WhatsApp Web
        </h2>
        <p style={{ fontSize: '14px', color: '#667781', textAlign: 'center', maxWidth: '300px', lineHeight: 1.6 }}>
          Enviá y recibí mensajes sin tener el teléfono cerca
        </p>
        <div style={{ width: '200px', height: '1px', background: '#e9edef', margin: '8px 0' }} />
        <p style={{ fontSize: '12px', color: '#8696a0' }}>
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
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '10px 16px',
        background: 'white',
        borderBottom: '1px solid #e9edef',
        flexShrink: 0, height: '60px',
      }}>

        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: contactoActivo.color, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontWeight: '700', color: 'white', fontSize: '13px', flexShrink: 0,
        }}>

        {/* Botón volver — solo mobile */}
{esMobile && (
  <button
    onClick={onVolver}
    style={{
      width: '36px', height: '36px', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#54656f', flexShrink: 0, transition: 'background 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.background='#f0f2f5'}
    onMouseLeave={e => e.currentTarget.style.background='transparent'}
  >
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  </button>
)}

          {contactoActivo.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#111b21', fontWeight: '500', margin: 0, fontSize: '16px' }}>
            {contactoActivo.name}
          </p>
          <p style={{ color: '#667781', margin: 0, fontSize: '12px' }}>
            {contactoActivo.status === 'online' ? 'en línea' : 'desconectado'}
          </p>
        </div>
<div style={{ display: 'flex', gap: '4px' }}>
  <button style={{ width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#54656f', transition: 'background 0.15s' }}
    onMouseEnter={e => e.currentTarget.style.background='#F9F8F8'}
    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  </button>
  <button style={{ width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#54656f', transition: 'background 0.15s' }}
    onMouseEnter={e => e.currentTarget.style.background='#F9F8F8'}
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
        background: '#efeae2',
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
        background: '#f0f2f5',
        flexShrink: 0, minHeight: '62px',
      }}>
        <button type="button" style={{ color: '#54656f', fontSize: '22px', padding: '4px', display:'flex', alignItems:'center' }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
        </button>
        <button type="button" style={{ color: '#54656f', display:'flex', alignItems:'center' }}>
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
            background: 'white',
            border: 'none', borderRadius: '8px',
            color: '#111b21', fontSize: '15px', outline: 'none',
          }}
        />
        <button type={input.trim() ? 'submit' : 'button'} style={{
          width: '42px', height: '42px', borderRadius: '50%',
          background: '#00a884', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background='#008069'}
          onMouseLeave={e => e.currentTarget.style.background='#00a884'}>
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