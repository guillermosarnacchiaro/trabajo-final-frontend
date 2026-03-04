import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: 'Guille', status: 'Disponible' })
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

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#f0f2f5',
    }}>

      {/* Panel izquierdo */}
      <div style={{
        width: esMobile ? '100vw' : '420px',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>

        {/* Header verde */}
        <div style={{
          background: '#00a884',
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
          borderBottom: '1px solid #f0f2f5',
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              background: '#00a884', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '2.5rem', fontWeight: '700',
            }}>
              {form.name.slice(0, 2).toUpperCase()}
            </div>
            <button style={{
              position: 'absolute', bottom: '4px', right: '4px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#00a884', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              border: '2px solid white', cursor: 'pointer',
            }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ flex: 1 }}>

          {/* Nombre */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f2f5' }}>
            <p style={{ color: '#00a884', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>
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
                    flex: 1, border: 'none', borderBottom: '2px solid #00a884',
                    fontSize: '16px', color: '#111b21', outline: 'none',
                    padding: '4px 0', background: 'transparent',
                  }}
                />
              ) : (
                <span style={{ fontSize: '16px', color: '#111b21' }}>{form.name}</span>
              )}
              <button type="button" onClick={() => setEditandoNombre(!editandoNombre)} style={{
                color: '#54656f', display: 'flex', alignItems: 'center',
                marginLeft: '12px',
              }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Estado */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f2f5' }}>
            <p style={{ color: '#00a884', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>
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
                    flex: 1, border: 'none', borderBottom: '2px solid #00a884',
                    fontSize: '16px', color: '#111b21', outline: 'none',
                    padding: '4px 0', background: 'transparent',
                  }}
                />
              ) : (
                <span style={{ fontSize: '16px', color: '#111b21' }}>{form.status}</span>
              )}
              <button type="button" onClick={() => setEditandoStatus(!editandoStatus)} style={{
                color: '#54656f', display: 'flex', alignItems: 'center',
                marginLeft: '12px',
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
                background: '#00a884', border: 'none',
                borderRadius: '24px', color: 'white',
                fontSize: '15px', fontWeight: '600', cursor: 'pointer',
              }}>
                Guardar
              </button>
            </div>
          )}

          {guardado && (
            <p style={{ textAlign: 'center', color: '#00a884', fontSize: '13px', padding: '8px' }}>
              ✓ Cambios guardados
            </p>
          )}

        </form>
      </div>

      {/* Panel derecho vacío — solo desktop */}
      {!esMobile && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: '#667781', gap: '12px',
        }}>
          <svg viewBox="0 0 24 24" width="80" height="80" fill="#ccd0d5">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <p style={{ fontSize: '16px', color: '#667781' }}>Perfil</p>
        </div>
      )}

    </div>
  )
}