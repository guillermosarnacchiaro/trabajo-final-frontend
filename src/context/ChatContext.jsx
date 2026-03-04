import { createContext, useContext, useState, useEffect } from 'react'

const ChatContext = createContext(null)

const CONTACTOS = [
  { id: 1, name: 's1mple', avatar: 'S1', color: '#f472b6', status: 'online', lastMessage: 'Te banco en el próximo match', lastTime: '10:32', unread: 2 },
  { id: 2, name: 'NiKo', avatar: 'NK', color: '#34d399', status: 'offline', lastMessage: 'Ese AWP fue una obra de arte', lastTime: 'Ayer', unread: 0 },
  { id: 3, name: 'ZywOo', avatar: 'ZY', color: '#818cf8', status: 'online', lastMessage: 'GG fácil 🙌', lastTime: 'Lun', unread: 1 },
]

const MENSAJES = {
  1: [
    { id: 1, text: 'Che, jugamos una partida de Dust2?', sent: false, time: '10:20' },
    { id: 2, text: 'Dale, me conecto en 5 minutos', sent: true, time: '10:21' },
    { id: 3, text: 'Avisame cuando estés listo, voy de entry', sent: false, time: '10:25' },
    { id: 4, text: 'Listo! Comprando AK y granadas', sent: true, time: '10:28' },
    { id: 5, text: 'Te banco en el próximo match', sent: false, time: '10:32' },
  ],
  2: [
    { id: 1, text: 'Viste el clutch 1v4 de ayer?', sent: true, time: '09:00' },
    { id: 2, text: 'Sí! Tremendo, cómo llegaste a ese ángulo?', sent: false, time: '09:05' },
    { id: 3, text: 'Ese AWP fue una obra de arte', sent: false, time: '09:10' },
  ],
  3: [
    { id: 1, text: 'Practicaste los lanzamientos de smoke?', sent: true, time: '14:00' },
    { id: 2, text: 'Sí, ya me sé todos los de Mirage', sent: false, time: '14:05' },
    { id: 3, text: 'GG fácil 🙌', sent: false, time: '14:10' },
  ],
}

export function ChatProvider({ children }) {
  const [contactos, setContactos] = useState(CONTACTOS)
  const [mensajes, setMensajes] = useState(MENSAJES)
  const [contactoActivoId, setContactoActivoId] = useState(null)

  const contactoActivo = contactos.find(c => c.id === contactoActivoId) || null
  const mensajesActivos = mensajes[contactoActivoId] || []

  function seleccionarContacto(id) {
    setContactoActivoId(id)
    setContactos(prev =>
      prev.map(c => c.id === id ? { ...c, unread: 0 } : c)
    )
  }

  function enviarMensaje(texto) {
    if (!texto.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    const nuevoMensaje = { id: Date.now(), text: texto, sent: true, time }
    setMensajes(prev => ({
      ...prev,
      [contactoActivoId]: [...(prev[contactoActivoId] || []), nuevoMensaje]
    }))
    setContactos(prev =>
      prev.map(c => c.id === contactoActivoId ? { ...c, lastMessage: texto, lastTime: time } : c)
    )
  }

  useEffect(() => {
  const mensajesAutomaticos = [
    { contactoId: 1, texto: 'dale cuando quieras arrancamos' },
    { contactoId: 2, texto: 'che viste el último major?' },
    { contactoId: 1, texto: 'compré el nuevo skin del AK jajaja' },
    { contactoId: 3, texto: 'gg wp, la próxima los bajamos' },
    { contactoId: 2, texto: 'ese headshot fue una locura bro' },
    { contactoId: 1, texto: 'querés jugar otra ronda?' },
    { contactoId: 3, texto: 'me tiré smoke y entré por B' },
  ]

  let index = 0

  const intervalo = setInterval(() => {
    if (index >= mensajesAutomaticos.length) {
      clearInterval(intervalo)
      return
    }

    const { contactoId, texto } = mensajesAutomaticos[index]
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`

    const nuevoMensaje = { id: Date.now(), text: texto, sent: false, time }

    setMensajes(prev => ({
      ...prev,
      [contactoId]: [...(prev[contactoId] || []), nuevoMensaje]
    }))

    setContactos(prev =>
      prev.map(c =>
        c.id === contactoId
          ? { ...c, lastMessage: texto, lastTime: time, unread: c.unread + 1 }
          : c
      )
    )

    index++
  }, 2000) // cada 8 segundos

  return () => clearInterval(intervalo)
}, [])

  return (
    <ChatContext.Provider value={{
      contactos,
      contactoActivo,
      mensajesActivos,
      contactoActivoId,
      seleccionarContacto,
      enviarMensaje,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}