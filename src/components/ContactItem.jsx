import { useState } from 'react'
import { useChat } from '../context/ChatContext'

export default function ContactItem({ contacto, isActive, onClick, onEdit, onDelete }) {
  const { formatMessageTime } = useChat()
  const [hover, setHover] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') onClick()
      }}
      onMouseEnter={event => {
        setHover(true)
        if (!isActive) event.currentTarget.style.background = 'var(--bg-hover)'
      }}
      onMouseLeave={event => {
        setHover(false)
        if (!isActive) event.currentTarget.style.background = 'transparent'
      }}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        padding: '10px 16px',
        background: isActive ? 'var(--bg-active)' : 'transparent',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background 0.15s',
        outline: 'none',
      }}
    >
      <div style={{
        width: '49px',
        height: '49px',
        borderRadius: '50%',
        background: contacto.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        color: 'white',
        fontSize: '14px',
        flexShrink: 0,
      }}>
        {contacto.avatar}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
          <span style={{
            fontWeight: '400',
            color: 'var(--text-primary)',
            fontSize: '16px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {contacto.name}
          </span>
          <span style={{ fontSize: '12px', color: contacto.unread > 0 ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }}>
            {formatMessageTime(contacto.lastTime)}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {contacto.lastMessage}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            {contacto.unread > 0 && (
              <span style={{
                background: 'var(--accent)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
              }}>
                {contacto.unread}
              </span>
            )}

            <button
              type="button"
              onClick={event => {
                event.stopPropagation()
                onEdit?.()
              }}
              title="Editar contacto"
              aria-label={`Editar ${contacto.name}`}
              style={{ ...actionButtonStyle, display: hover ? 'flex' : 'none' }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={event => {
                event.stopPropagation()
                onDelete?.()
              }}
              title="Eliminar contacto"
              aria-label={`Eliminar ${contacto.name}`}
              style={{ ...actionButtonStyle, display: hover ? 'flex' : 'none', color: '#d93025' }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm3.46-9.12 1.41-1.41L12 9.59l1.12-1.12 1.41 1.41L13.41 11l1.12 1.12-1.41 1.41L12 12.41l-1.12 1.12-1.41-1.41L10.59 11zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const actionButtonStyle = {
  width: '28px',
  height: '28px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  color: 'var(--icon-color)',
  background: 'var(--bg-header)',
}
