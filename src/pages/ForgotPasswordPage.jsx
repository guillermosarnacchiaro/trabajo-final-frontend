import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../services/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [resetUrl, setResetUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setInfo('')
    setResetUrl('')
    setLoading(true)

    try {
      const data = await authApi.forgotPassword({ email: email.trim() })
      setInfo(data.message || 'Revisa tu correo para cambiar la password.')
      setResetUrl(data.resetUrl || '')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <h1 style={titleStyle}>Recuperar password</h1>
        <p style={copyStyle}>Ingresa tu email y te enviamos un link para cambiarla.</p>

        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Email"
          required
          style={inputStyle}
        />

        {error && <p style={errorStyle}>{error}</p>}
        {info && <p style={infoStyle}>{info}</p>}
        {resetUrl && (
          <a href={resetUrl} target="_blank" rel="noreferrer" style={linkStyle}>
            Abrir link para cambiar password
          </a>
        )}

        <button type="submit" disabled={loading} style={{ ...primaryButtonStyle, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Enviando...' : 'ENVIAR LINK'}
        </button>

        <Link to="/" style={secondaryLinkStyle}>Volver al login</Link>
      </form>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  background: 'var(--bg-app)',
}

const cardStyle = {
  width: '100%',
  maxWidth: '420px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: '28px',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  background: 'var(--bg-sidebar)',
  textAlign: 'center',
}

const titleStyle = {
  margin: 0,
  color: 'var(--text-primary)',
  fontSize: '1.35rem',
}

const copyStyle = {
  margin: 0,
  color: 'var(--text-secondary)',
  lineHeight: 1.5,
}

const inputStyle = {
  height: '42px',
  padding: '0 12px',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  background: 'var(--bg-input)',
  color: 'var(--text-primary)',
  outline: 'none',
}

const errorStyle = {
  margin: 0,
  color: '#f15c6d',
  fontSize: '0.85rem',
}

const infoStyle = {
  margin: 0,
  color: 'var(--accent)',
  fontSize: '0.85rem',
}

const linkStyle = {
  color: 'var(--accent)',
  fontSize: '0.85rem',
}

const primaryButtonStyle = {
  height: '42px',
  borderRadius: '21px',
  background: 'var(--accent)',
  color: 'white',
  fontWeight: 700,
}

const secondaryLinkStyle = {
  color: 'var(--accent)',
  fontSize: '0.9rem',
  textDecoration: 'none',
}
