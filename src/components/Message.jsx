import { useChat } from '../context/ChatContext'

export default function Message({ mensaje }) {
  const { formatMessageTime } = useChat()

  // Función para detectar si el mensaje contiene principalmente emoticonos
  const isEmojiOnly = (text) => {
    try {
      // Lista de emoticonos comunes para detectar
      const emojiList = ['😀', '😂', '❤️', '👍', '👎', '👋', '🙏', '🔥', '💯', '🎉', '🤔', '😢', '😮', '🙄', '😴', '🧙‍♂️', '🪄', '⚡', '🦉', '🏰', '🐍', '🦁', '🦅', '🐗', '💀', '🧹', '📖', '🥃', '🎩', '🗝️']
      const cleanedText = text.replace(/\s/g, '') // Remover espacios

      if (cleanedText.length === 0) return false

      // Verificar si todos los caracteres son emoticonos conocidos
      for (let char of cleanedText) {
        if (!emojiList.includes(char)) {
          return false
        }
      }
      return true
    } catch {
      return false
    }
  }

  // Función para detectar si el mensaje es largo (aproximadamente 2+ líneas)
  const isLongMessage = (text) => {
    return text.length > 50 || text.includes('\n') || text.split(' ').length > 12
  }

  const isEmojiMessage = isEmojiOnly(mensaje.text)
  const isLong = isLongMessage(mensaje.text)

  return (
    <div style={{
      display: 'flex',
      justifyContent: mensaje.sent ? 'flex-end' : 'flex-start',
      marginBottom: '2px',
      padding: '0 60px',
    }}>
      <div style={{
        maxWidth: '65%',
        padding: isLong ? '8px 12px 12px' : '8px 12px 8px',
        borderRadius: mensaje.sent ? '8px 0px 8px 8px' : '0px 8px 8px 8px',
        background: mensaje.sent ? 'var(--bubble-sent)' : 'var(--bubble-recv)',
        color: 'var(--text-primary)',
        fontSize: isEmojiMessage ? '32px' : '15px',
        lineHeight: isEmojiMessage ? '1.2' : '1.4',
        boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
      }}>
        {isLong ? (
          <>
            <p style={{ margin: 0, wordBreak: 'break-word' }}>{mensaje.text}</p>
            <span style={{
              display: 'block', textAlign: 'right',
              fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px',
            }}>
              {formatMessageTime(mensaje.timestamp)} {mensaje.sent ? '✓✓' : ''}
            </span>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', flexWrap: 'wrap' }}>
            <p style={{ margin: 0, wordBreak: 'break-word' }}>{mensaje.text}</p>
            <span style={{
              fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {formatMessageTime(mensaje.timestamp)} {mensaje.sent ? '✓✓' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
