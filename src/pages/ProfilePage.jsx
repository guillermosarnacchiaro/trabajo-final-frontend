import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { usuario } = useChat()
  const [form, setForm] = useState({ name: usuario.name || 'Sin nombre', status: 'Disponible' })
  const [editandoNombre, setEditandoNombre] = useState(false)
  const [editandoStatus, setEditandoStatus] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [esMobile, setEsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    function handleResize() {
      setEsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setGuardado(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setEditandoNombre(false)
    setEditandoStatus(false)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2000)
  }

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'var(--bg-app)',
    }}>

      {/* Panel izquierdo */}
      <div style={{
        width: esMobile ? '100vw' : '420px',
        background: 'var(--bg-sidebar)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>

        {/* Header verde */}
        <div style={{
          background: 'var(--accent)',
          padding: '28px 24px 20px',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => navigate('/chat')} style={{
              color: 'white', display: 'flex', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
            }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '500' }}>Perfil</span>
          </div>
        </div>

        {/* Avatar */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          padding: '32px 0 24px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              background: 'var(--accent)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '2.5rem', fontWeight: '700',
            }}>
              {form.name.slice(0, 2).toUpperCase()}
            </div>
            <button style={{
              position: 'absolute', bottom: '4px', right: '4px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--accent)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              border: '2px solid white', cursor: 'pointer',
            }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Nombre */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>
              Nombre
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {editandoNombre ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  autoFocus
                  style={{
                    flex: 1, border: 'none', borderBottom: '2px solid var(--accent)',
                    fontSize: '16px', color: 'var(--text-primary)', outline: 'none',
                    padding: '4px 0', background: 'transparent', caretColor: 'var(--accent)',
                  }}
                />
              ) : (
                <span style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{form.name}</span>
              )}
              <button type="button" onClick={() => setEditandoNombre(!editandoNombre)} style={{
                color: 'var(--icon-color)', display: 'flex', alignItems: 'center',
                marginLeft: '12px', background: 'none', border: 'none', cursor: 'pointer',
              }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Estado */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>
              Info
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {editandoStatus ? (
                <input
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  autoFocus
                  style={{
                    flex: 1, border: 'none', borderBottom: '2px solid var(--accent)',
                    fontSize: '16px', color: 'var(--text-primary)', outline: 'none',
                    padding: '4px 0', background: 'transparent', caretColor: 'var(--accent)',
                  }}
                />
              ) : (
                <span style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{form.status}</span>
              )}
              <button type="button" onClick={() => setEditandoStatus(!editandoStatus)} style={{
                color: 'var(--icon-color)', display: 'flex', alignItems: 'center',
                marginLeft: '12px', background: 'none', border: 'none', cursor: 'pointer',
              }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Botón guardar */}
          {(editandoNombre || editandoStatus) && (
            <div style={{ padding: '16px 24px' }}>
              <button type="submit" style={{
                width: '100%', padding: '10px',
                background: 'var(--accent)', border: 'none',
                borderRadius: '24px', color: 'white',
                fontSize: '15px', fontWeight: '600', cursor: 'pointer',
              }}>
                Guardar
              </button>
            </div>
          )}

          {guardado && (
            <p style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '13px', padding: '8px' }}>
              ✓ Cambios guardados
            </p>
          )}

          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)' }}>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                width: '100%',
                minHeight: '64px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '0 32px',
                color: '#e60023',
                background: 'var(--bg-sidebar)',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                fontSize: '16px',
                fontWeight: 400,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              <span>Cerrar sesión</span>
            </button>
          </div>

        </form>
      </div>

      {/* Panel derecho vacío — solo desktop */}
      {!esMobile && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-secondary)', gap: '12px',
        }}>
          <svg viewBox="0 0 24 24" width="80" height="80" fill="#ccd0d5">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Perfil</p>
        </div>
      )}

    </div>
  )
}
