import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'
import { contactsApi, conversationsApi } from '../services/api'

const ChatContext = createContext(null)

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'CT'
}

function formatMessageTime(timestamp) {
  if (!timestamp) return ''
  const messageDate = new Date(timestamp)
  return `${String(messageDate.getHours()).padStart(2, '0')}:${String(messageDate.getMinutes()).padStart(2, '0')}`
}

function normalizeMessage(message) {
  return {
    id: message._id,
    text: message.text,
    sent: message.sender === 'user',
    timestamp: message.createdAt,
  }
}

function normalizeConversation(conversation, messages = []) {
  const contact = conversation.contact || {}
  const lastMessage = conversation.lastMessage || messages[messages.length - 1]

  return {
    id: conversation._id,
    conversationId: conversation._id,
    contactId: contact._id,
    name: contact.name || conversation.title || 'Contacto',
    phone: contact.phone || '',
    email: contact.email || '',
    avatar: initials(contact.name || conversation.title),
    color: contact.avatarColor || '#00a884',
    status: 'online',
    lastMessage: lastMessage?.text || contact.phone || 'Sin mensajes',
    lastTime: lastMessage?.createdAt || conversation.updatedAt || conversation.createdAt,
    unread: 0,
  }
}

export function ChatProvider({ children }) {
  const { isAuthenticated, user } = useAuth()
  const [contactos, setContactos] = useState([])
  const [mensajes, setMensajes] = useState({})
  const [contactoActivoId, setContactoActivoId] = useState(null)
  const [loadingChats, setLoadingChats] = useState(false)

  const contactoActivo = contactos.find(c => c.id === contactoActivoId) || null
  const mensajesActivos = mensajes[contactoActivoId] || []
  const usuario = useMemo(() => ({
    name: user?.displayName || '',
    email: user?.email || '',
  }), [user])

  const cargarChats = useCallback(async function cargarChats() {
    if (!isAuthenticated) return

    setLoadingChats(true)
    try {
      const conversationsData = await conversationsApi.list()
      const conversations = conversationsData.conversations || []

      setContactos(conversations.map(conversation => normalizeConversation(conversation)))
    } finally {
      setLoadingChats(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      setContactos([])
      setMensajes({})
      setContactoActivoId(null)
      return
    }

    cargarChats()
  }, [isAuthenticated, cargarChats])

  const seleccionarContacto = useCallback(async function seleccionarContacto(id) {
    setContactoActivoId(id)

    if (mensajes[id]) return

    const conversation = contactos.find(contacto => contacto.id === id)
    if (!conversation) return

    const data = await conversationsApi.messages(conversation.conversationId)
    setMensajes(prev => ({
      ...prev,
      [id]: (data.messages || []).map(normalizeMessage),
    }))
  }, [contactos, mensajes])

  async function enviarMensaje(texto) {
    if (!texto.trim() || !contactoActivo) return

    const data = await conversationsApi.sendMessage(contactoActivo.conversationId, {
      text: texto.trim(),
      sender: 'user',
    })
    const nuevoMensaje = normalizeMessage(data.message)

    setMensajes(prev => ({
      ...prev,
      [contactoActivoId]: [...(prev[contactoActivoId] || []), nuevoMensaje],
    }))

    setContactos(prev =>
      prev.map(c => c.id === contactoActivoId
        ? { ...c, lastMessage: texto.trim(), lastTime: nuevoMensaje.timestamp }
        : c
      )
    )
  }

  async function crearContacto(data) {
    const created = await contactsApi.create(data)
    const conversation = await conversationsApi.create({ contactId: created.contact._id })
    const normalized = normalizeConversation(conversation.conversation)
    setContactos(prev => [normalized, ...prev])
    return normalized
  }

  async function editarContacto(id, data) {
    const current = contactos.find(contacto => contacto.id === id)
    if (!current) return

    const updated = await contactsApi.update(current.contactId, data)
    setContactos(prev => prev.map(contacto => contacto.id === id
      ? {
          ...contacto,
          name: updated.contact.name,
          phone: updated.contact.phone || '',
          email: updated.contact.email || '',
          avatar: initials(updated.contact.name),
          color: updated.contact.avatarColor || contacto.color,
        }
      : contacto
    ))
  }

  async function eliminarContacto(id) {
    const current = contactos.find(contacto => contacto.id === id)
    if (!current) return

    await contactsApi.remove(current.contactId)
    setContactos(prev => prev.filter(contacto => contacto.id !== id))
    setMensajes(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    if (contactoActivoId === id) {
      setContactoActivoId(null)
    }
  }

  return (
    <ChatContext.Provider value={{
      contactos,
      contactoActivo,
      mensajesActivos,
      contactoActivoId,
      usuario,
      loadingChats,
      seleccionarContacto,
      enviarMensaje,
      crearContacto,
      editarContacto,
      eliminarContacto,
      formatMessageTime,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}
