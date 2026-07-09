import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, login, register } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    displayName: '',
    email: 'demo@whatsapp-final.com',
    password: 'Demo1234',
  })
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [verificationUrl, setVerificationUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (theme !== 'light') {
      setTheme('light')
    }
  }, [theme, setTheme])

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setInfo('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    setVerificationUrl('')
    setLoading(true)

    try {
      if (mode === 'register') {
        const data = await register({
          displayName: form.displayName.trim(),
          email: form.email.trim(),
          password: form.password,
        })
        setInfo('Cuenta creada. Verifica el email antes de iniciar sesion.')
        setVerificationUrl(data.verificationUrl || '')
        setMode('login')
        return
      }

      await login(form.email.trim(), form.password)
      navigate('/chat')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        height: '220px',
        background: 'var(--accent)',
        flexShrink: 0,
      }} />

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: '-80px',
        padding: '0 1rem',
      }}>
        <div style={{
          background: 'var(--bg-sidebar)',
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
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '0.5rem',
          }}>
            <svg viewBox="0 0 24 24" width="44" height="44" fill="white">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/>
            </svg>
          </div>

          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: '500', margin: 0 }}>
            {mode === 'login' ? 'Ingresar a WhatsApp' : 'Crear cuenta'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, textAlign: 'center' }}>
            {mode === 'login' ? 'Usa tu email y password' : 'Registrate y verifica tu email'}
          </p>

          <form onSubmit={handleSubmit} noValidate style={{
            width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem'
          }}>
            {mode === 'register' && (
              <input
                name="displayName"
                value={form.displayName}
                onChange={handleChange}
                placeholder="Nombre completo"
                style={inputStyle}
                required
              />
            )}

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              style={inputStyle}
              required
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              style={inputStyle}
              required
            />

            {error && <p style={{ color: '#f15c6d', fontSize: '0.82rem', textAlign: 'center' }}>{error}</p>}
            {info && <p style={{ color: 'var(--accent)', fontSize: '0.82rem', textAlign: 'center' }}>{info}</p>}
            {verificationUrl && (
              <a href={verificationUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontSize: '0.82rem', textAlign: 'center' }}>
                Abrir link de verificacion
              </a>
            )}

            <button type="submit" disabled={loading} style={{
              marginTop: '0.5rem',
              padding: '12px',
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '24px',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'Procesando...' : mode === 'login' ? 'ENTRAR' : 'CREAR CUENTA'}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login')
                setError('')
                setInfo('')
                setVerificationUrl('')
              }}
              style={{ color: 'var(--accent)', fontSize: '0.9rem', background: 'none', border: 'none' }}
            >
              {mode === 'login' ? 'No tengo cuenta' : 'Ya tengo cuenta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '12px 14px',
  background: 'var(--bg-input)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '1rem',
  outline: 'none',
  caretColor: 'var(--accent)',
}
