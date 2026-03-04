import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../context/ChatContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUsuario } = useChat()
  const [form, setForm] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (form.name.trim().length < 2) errs.name = 'Ingresá tu nombre'
    if (form.phone.trim().length < 7) errs.phone = 'Ingresá un número válido'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setUsuario({ name: form.name, phone: form.phone })
    navigate('/chat')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Franja verde arriba */}
      <div style={{
        height: '220px',
        background: '#00a884',
        flexShrink: 0,
      }} />

      {/* Card centrada */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: '-80px',
        padding: '0 1rem',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}>

          {/* Logo WhatsApp */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: '#00a884',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '0.5rem',
          }}>
            <svg viewBox="0 0 24 24" width="44" height="44" fill="white">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.37 17.04 14.27C16.97 14.17 16.81 14.1 16.56 13.98C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.31C14.15 13.55 13.67 14.1 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.22 11.94 13.96 11 13.12C10.26 12.47 9.77 11.67 9.62 11.43C9.5 11.19 9.61 11.05 9.73 10.93C9.84 10.82 9.99 10.64 10.11 10.5C10.23 10.36 10.27 10.25 10.35 10.08C10.43 9.92 10.39 9.78 10.33 9.66C10.27 9.54 9.77 8.33 9.56 7.82C9.36 7.33 9.16 7.39 9 7.38C8.86 7.38 8.7 7.33 8.53 7.33Z"/>
            </svg>
          </div>

          <h1 style={{ color: '#111b21', fontSize: '1.4rem', fontWeight: '500', margin: 0 }}>
            Ingresá a WhatsApp
          </h1>
          <p style={{ color: '#667781', fontSize: '0.875rem', margin: 0, textAlign: 'center' }}>
            Completá tus datos para continuar
          </p>

          <form onSubmit={handleSubmit} noValidate style={{
            width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem'
          }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ color: '#00a884', fontSize: '0.8rem', fontWeight: '500' }}>
                Tu nombre
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre completo"
                style={{
                  padding: '10px 14px',
                  background: 'white',
                  border: 'none',
                  borderBottom: `2px solid ${errors.name ? '#f15c6d' : '#e9edef'}`,
                  color: '#111b21', fontSize: '1rem', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderBottomColor = '#00a884'}
                onBlur={e => e.target.style.borderBottomColor = errors.name ? '#f15c6d' : '#e9edef'}
              />
              {errors.name && <span style={{ color: '#f15c6d', fontSize: '0.78rem' }}>{errors.name}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ color: '#00a884', fontSize: '0.8rem', fontWeight: '500' }}>
                Número de teléfono
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Ej: 1122334455"
                style={{
                  padding: '10px 14px',
                  background: 'white',
                  border: 'none',
                  borderBottom: `2px solid ${errors.phone ? '#f15c6d' : '#e9edef'}`,
                  color: '#111b21', fontSize: '1rem', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderBottomColor = '#00a884'}
                onBlur={e => e.target.style.borderBottomColor = errors.phone ? '#f15c6d' : '#e9edef'}
              />
              {errors.phone && <span style={{ color: '#f15c6d', fontSize: '0.78rem' }}>{errors.phone}</span>}
            </div>

            <button type="submit" style={{
              marginTop: '0.5rem',
              padding: '12px',
              background: '#00a884',
              border: 'none',
              borderRadius: '24px',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.target.style.background = '#008069'}
              onMouseLeave={e => e.target.style.background = '#00a884'}
            >
              CONTINUAR
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}