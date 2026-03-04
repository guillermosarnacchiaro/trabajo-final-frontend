export default function Message({ mensaje }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: mensaje.sent ? 'flex-end' : 'flex-start',
      marginBottom: '2px',
      padding: '0 60px',
    }}>
      <div style={{
        maxWidth: '65%',
        padding: '6px 10px 8px',
        borderRadius: mensaje.sent ? '8px 0px 8px 8px' : '0px 8px 8px 8px',
        background: mensaje.sent ? 'var(--bubble-sent)' : 'var(--bubble-recv)',
        color: 'var(--text-primary)',
        fontSize: '14.2px',
        lineHeight: '1.5',
        boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
      }}>
        <p style={{ margin: 0 }}>{mensaje.text}</p>
        <span style={{
          display: 'block', textAlign: 'right',
          fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px',
        }}>
          {mensaje.time} {mensaje.sent ? '✓✓' : ''}
        </span>
      </div>
    </div>
  )
}