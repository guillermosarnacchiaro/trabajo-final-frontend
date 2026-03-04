import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
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
    navigate('/chat')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111b21',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      {/* Franja verde arriba */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '220px',
        background: '#00a884',
        zIndex: 0,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        background: '#202c33',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.2rem',
      }}>

        {/* Ícono */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#00a884',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
        }}>
          💬
        </div>

        <h1 style={{ color: '#e9edef', fontSize: '1.5rem', fontWeight: '300', textAlign: 'center' }}>
          Ingresá a ChatApp
        </h1>
        <p style={{ color: '#8696a0', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.5 }}>
          Completá tus datos para continuar
        </p>

        <form onSubmit={handleSubmit} noValidate style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

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
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${errors.name ? '#f15c6d' : '#2a3942'}`,
                color: '#e9edef',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderBottomColor = '#00a884'}
              onBlur={e => e.target.style.borderBottomColor = errors.name ? '#f15c6d' : '#2a3942'}
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
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${errors.phone ? '#f15c6d' : '#2a3942'}`,
                color: '#e9edef',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderBottomColor = '#00a884'}
              onBlur={e => e.target.style.borderBottomColor = errors.phone ? '#f15c6d' : '#2a3942'}
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
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = '#00cf9d'}
            onMouseLeave={e => e.target.style.background = '#00a884'}
          >
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  )
}