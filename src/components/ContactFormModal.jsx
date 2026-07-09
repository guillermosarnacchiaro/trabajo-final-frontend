import { useState } from 'react'

const DEFAULT_FORM = {
  name: '',
  phone: '',
  email: '',
  avatarColor: '#00a884',
}

const COLORS = ['#00a884', '#008069', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b']

export default function ContactFormModal({ contact, loading, error, onClose, onSubmit }) {
  const [form, setForm] = useState(() => {
    if (contact) {
      return {
        name: contact.name || '',
        phone: contact.phone || '',
        email: contact.email || '',
        avatarColor: contact.color || DEFAULT_FORM.avatarColor,
      }
    }

    return DEFAULT_FORM
  })

  function handleChange(event) {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      avatarColor: form.avatarColor,
    })
  }

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-label={contact ? 'Editar contacto' : 'Nuevo contacto'}>
      <form onSubmit={handleSubmit} style={modalStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
            {contact ? 'Editar contacto' : 'Nuevo contacto'}
          </h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" style={iconButtonStyle}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.41L10.59 13.41 4.29 19.7 2.88 18.29 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.3-6.29z" />
            </svg>
          </button>
        </div>

        <label style={labelStyle}>
          Nombre
          <input name="name" value={form.name} onChange={handleChange} required minLength={2} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Telefono
          <input name="phone" value={form.phone} onChange={handleChange} required minLength={6} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} />
        </label>

        <div style={labelStyle}>
          Color
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, avatarColor: color }))}
                aria-label={`Color ${color}`}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: color,
                  border: form.avatarColor === color ? '3px solid var(--text-primary)' : '2px solid var(--border)',
                }}
              />
            ))}
          </div>
        </div>

        {error && <p style={{ color: '#d93025', fontSize: '0.85rem', margin: 0 }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
          <button type="button" onClick={onClose} style={secondaryButtonStyle}>
            Cancelar
          </button>
          <button type="submit" disabled={loading} style={{ ...primaryButtonStyle, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  background: 'rgba(17, 27, 33, 0.42)',
}

const modalStyle = {
  width: '100%',
  maxWidth: '420px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  background: 'var(--bg-sidebar)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
}

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  color: 'var(--text-secondary)',
  fontSize: '0.85rem',
  fontWeight: 600,
}

const inputStyle = {
  width: '100%',
  height: '40px',
  padding: '0 12px',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  background: 'var(--bg-input)',
  color: 'var(--text-primary)',
  outline: 'none',
}

const iconButtonStyle = {
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--icon-color)',
  borderRadius: '50%',
}

const primaryButtonStyle = {
  minWidth: '96px',
  height: '38px',
  padding: '0 16px',
  borderRadius: '20px',
  background: 'var(--accent)',
  color: 'white',
  fontWeight: 700,
}

const secondaryButtonStyle = {
  minWidth: '96px',
  height: '38px',
  padding: '0 16px',
  borderRadius: '20px',
  background: 'var(--bg-header)',
  color: 'var(--text-primary)',
  fontWeight: 600,
}
