import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authApi } from '../services/api'

export default function VerifyEmailPage() {
  const { token } = useParams()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('Verificando tu email...')

  useEffect(() => {
    async function verify() {
      try {
        const data = await authApi.verifyEmail(token)
        setStatus('success')
        setMessage(data.message || 'Email verificado correctamente')
      } catch (error) {
        setStatus('error')
        setMessage(error.message)
      }
    }

    verify()
  }, [token])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      background: 'var(--bg-app)',
    }}>
      <section style={{
        width: '100%',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        padding: '28px',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        background: 'var(--bg-sidebar)',
        textAlign: 'center',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          background: status === 'error' ? '#d93025' : 'var(--accent)',
        }}>
          {status === 'loading' ? (
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8z" />
            </svg>
          ) : status === 'success' ? (
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
              <path d="M12 2 1 21h22L12 2zm1 16h-2v-2h2zm0-4h-2v-4h2z" />
            </svg>
          )}
        </div>

        <h1 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.35rem' }}>
          Verificacion de email
        </h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {message}
        </p>
        <Link to="/" style={{
          marginTop: '8px',
          minWidth: '150px',
          height: '40px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          background: 'var(--accent)',
          color: 'white',
          fontWeight: 700,
          textDecoration: 'none',
        }}>
          Ir al login
        </Link>
      </section>
    </div>
  )
}
