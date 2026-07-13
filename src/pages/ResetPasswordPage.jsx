import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authApi } from '../services/api'

export default function ResetPasswordPage() {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setInfo('')

    if (password !== confirmPassword) {
      setError('Las passwords no coinciden')
      return
    }

    setLoading(true)
    try {
      const data = await authApi.resetPassword({ token, password })
      setInfo(data.message || 'Password actualizada correctamente')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <h1 style={titleStyle}>Nueva password</h1>
        <p style={copyStyle}>Elegí una nueva password para tu cuenta.</p>

        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Nueva password"
          minLength={6}
          required
          style={inputStyle}
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
          placeholder="Repetir password"
          minLength={6}
          required
          style={inputStyle}
        />

        {error && <p style={errorStyle}>{error}</p>}
        {info && <p style={infoStyle}>{info}</p>}

        <button type="submit" disabled={loading} style={{ ...primaryButtonStyle, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Guardando...' : 'GUARDAR PASSWORD'}
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
