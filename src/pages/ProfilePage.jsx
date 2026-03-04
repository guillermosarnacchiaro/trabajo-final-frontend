import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: 'Mi Nombre', status: 'Disponible' })
  const [guardado, setGuardado] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setGuardado(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f1117',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Header */}
      <div style={{
        padding: '16px',
        background: '#1a1d27',
        borderBottom: '1px solid #222538',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <button
          onClick={() => navigate('/chat')}
          style={{
            background: 'none',
            border: 'none',
            color: '#8b8fa8',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          ←
        </button>
        <h1 style={{ color: '#eef0f8', fontSize: '18px', margin: 0 }}>
          Mi perfil
        </h1>
      </div>

      {/* Contenido */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 16px',
        gap: '24px',
      }}>

        {/* Avatar */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: '#6c63ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          fontWeight: '700',
          color: 'white',
        }}>
          {form.name.slice(0, 2).toUpperCase()}
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: '#8b8fa8', fontSize: '13px' }}>Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength={40}
              style={{
                padding: '10px 14px',
                background: '#1a1d27',
                border: '1px solid #222538',
                borderRadius: '8px',
                color: '#eef0f8',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: '#8b8fa8', fontSize: '13px' }}>Estado</label>
            <input
              name="status"
              value={form.status}
              onChange={handleChange}
              maxLength={80}
              placeholder="Ej: En el servidor, No molestar..."
              style={{
                padding: '10px 14px',
                background: '#1a1d27',
                border: '1px solid #222538',
                borderRadius: '8px',
                color: '#eef0f8',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '10px',
              background: guardado ? '#34d399' : '#6c63ff',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'background 0.3s',
            }}
          >
            {guardado ? '✓ Guardado!' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  )
}