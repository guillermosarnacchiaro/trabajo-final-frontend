import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useChat } from '../context/ChatContext'
import Sidebar from '../components/Sidebar'
import ConversationView from '../components/ConversationView'

function useEsMobile() {
  const [esMobile, setEsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    function handleResize() {
      setEsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return esMobile
}

export default function ChatPage() {
  const { seleccionarContacto } = useChat()
  const { id } = useParams()
  const navigate = useNavigate()
  const esMobile = useEsMobile()
  const [mostrarChat, setMostrarChat] = useState(false)

  useEffect(() => {
    if (id) {
      seleccionarContacto(parseInt(id))
      setMostrarChat(true)
    }
  }, [id])

  function handleSeleccionar(idContacto) {
    seleccionarContacto(idContacto)
    navigate(`/chat/${idContacto}`)
    setMostrarChat(true)
  }

  function handleVolver() {
    setMostrarChat(false)
    navigate('/chat')
  }

  const mostrarSidebar = !esMobile || !mostrarChat
  const mostrarConversacion = !esMobile || mostrarChat

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#f0f2f5',
    }}>

      <div style={{
        display: mostrarSidebar ? 'flex' : 'none',
        flexShrink: 0,
        width: esMobile ? '100vw' : 'auto',
      }}>
        <Sidebar onSeleccionar={handleSeleccionar} />
      </div>

      <div style={{
        display: mostrarConversacion ? 'flex' : 'none',
        flex: 1,
        overflow: 'hidden',
        width: esMobile ? '100vw' : 'auto',
      }}>
        <ConversationView onVolver={handleVolver} esMobile={esMobile} />
      </div>

    </div>
  )
}