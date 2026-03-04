import { createContext, useContext, useState, useEffect } from 'react'

const ChatContext = createContext(null)

const CONTACTOS = [
  { id: 1, name: 'Valen', avatar: 'VG', color: '#7c3aed', status: 'online', lastMessage: 'La música es lo único que me salva', lastTime: '10:32', unread: 2 },
  { id: 2, name: 'Martín', avatar: 'MR', color: '#b45309', status: 'offline', lastMessage: 'No soy un extraño', lastTime: 'Ayer', unread: 0 },
  { id: 3, name: 'Sofi', avatar: 'SP', color: '#0369a1', status: 'online', lastMessage: 'El día de hoy es un gran día', lastTime: '09:15', unread: 3 },
  { id: 4, name: 'Lucas', avatar: 'LF', color: '#065f46', status: 'offline', lastMessage: 'Seguí tu luz interior', lastTime: 'Lun', unread: 0 },
  { id: 5, name: 'Cami', avatar: 'CS', color: '#be123c', status: 'online', lastMessage: 'Rodando bajé mil veces', lastTime: 'Mar', unread: 1 },
  { id: 6, name: 'Flor', avatar: 'FM', color: '#0e7490', status: 'offline', lastMessage: 'Cuando seas grande lo vas a entender', lastTime: 'Mié', unread: 0 },
  { id: 7, name: 'Marcos', avatar: 'GR', color: '#92400e', status: 'group', lastMessage: 'Suena el tren, suena el viento', lastTime: 'Jue', unread: 5 },
]

const MENSAJES = {
  1: [
    { id: 1, text: 'Sabías que Cerati aprendió a tocar la guitarra de chico escuchando a los Beatles?', sent: false, time: '10:00' },
    { id: 2, text: 'Sí, y después se volvió fan de Zeppelin y David Bowie. Una mezcla explosiva.', sent: true, time: '10:05' },
    { id: 3, text: 'Lo que pocos saben es que estudió publicidad en la UBA antes de dedicarse a la música.', sent: false, time: '10:10' },
    { id: 4, text: 'Y que Soda Stereo se formó en el 82, justo después de la Guerra de Malvinas. Un momento muy especial para el rock argentino.', sent: true, time: '10:20' },
    { id: 5, text: 'La música es lo único que me salva', sent: false, time: '10:32' },
  ],
  2: [
    { id: 1, text: 'Charly García grabó La Máquina de Hacer Pájaros siendo el más joven del grupo. Tenía 21 años.', sent: true, time: '09:00' },
    { id: 2, text: 'Y antes de eso ya había disuelto Sui Generis que era uno de los grupos más populares del país. Se animó a empezar de cero.', sent: false, time: '09:10' },
    { id: 3, text: 'Lo más loco es que Serú Girán fue rechazado por varias discográficas antes de grabar su primer disco.', sent: true, time: '09:20' },
    { id: 4, text: 'Hoy esos discos son considerados clásicos absolutos del rock en español.', sent: false, time: '09:30' },
    { id: 5, text: 'No soy un extraño', sent: false, time: 'Ayer' },
  ],
  3: [
    { id: 1, text: 'Calamaro antes de su carrera solista tocaba los teclados en Los Abuelos de la Nada.', sent: true, time: '08:00' },
    { id: 2, text: 'Exacto, con Miguel Abuelo. Tenía 18 años y ya era un músico impresionante.', sent: false, time: '08:10' },
    { id: 3, text: 'Y cuando se fue a España armó Los Rodríguez con Ariel Rot. Otro clásico.', sent: true, time: '08:20' },
    { id: 4, text: 'El Salmón lo grabó en sesiones de 20 horas seguidas. Dormía 3 horas y volvía al estudio.', sent: false, time: '08:50' },
    { id: 5, text: 'El día de hoy es un gran día', sent: false, time: '09:15' },
  ],
  4: [
    { id: 1, text: 'Spinetta formó su primera banda, Almendra, a los 17 años en el barrio de Belgrano.', sent: false, time: '14:00' },
    { id: 2, text: 'Y Artaud, su disco solista más famoso, lo grabó en solo dos semanas. Una locura.', sent: true, time: '14:10' },
    { id: 3, text: 'Lo que me parece increíble es que el Flaco estudió filosofía y eso se nota en sus letras.', sent: false, time: '14:20' },
    { id: 4, text: 'Formó como 8 bandas distintas a lo largo de su carrera. Cada vez que sentía que algo se agotaba, empezaba algo nuevo.', sent: true, time: '14:30' },
    { id: 5, text: 'Seguí tu luz interior', sent: false, time: 'Lun' },
  ],
  5: [
    { id: 1, text: 'Fito Páez nació en Rosario en 1963 y de chico le decían "el Ratón" en el barrio.', sent: true, time: '11:00' },
    { id: 2, text: 'Y a los 14 años ya tocaba en grupos locales. Después se mudó a Buenos Aires para triunfar.', sent: false, time: '11:15' },
    { id: 3, text: 'Lo que marcó su vida fue la muerte de su abuela y su tía en un asalto en el 86. Eso lo devastó.', sent: true, time: '11:30' },
    { id: 4, text: 'Y toda esa tristeza la canalizó en Ciudad de pobres corazones, que es uno de sus mejores discos.', sent: false, time: '11:45' },
    { id: 5, text: 'Rodando bajé mil veces', sent: false, time: 'Mar' },
  ],
  6: [
    { id: 1, text: 'Miguel Mateos empezó tocando covers de bandas inglesas en clubes de Zárate.', sent: true, time: '16:00' },
    { id: 2, text: 'Sí, y Zas fue de las primeras bandas argentinas en cantar rock en castellano con ese sonido nuevo wave.', sent: false, time: '16:10' },
    { id: 3, text: 'En el 84 llenaron el estadio de River. Fue histórico para el rock nacional.', sent: true, time: '16:20' },
    { id: 4, text: 'Después de Zas nunca volvió a tener ese nivel de masividad pero siguió tocando hasta hoy.', sent: false, time: '16:35' },
    { id: 5, text: 'Cuando seas grande lo vas a entender', sent: false, time: 'Mié' },
  ],
  7: [
    { id: 1, text: 'Divididos se formó en el 87 cuando se disolvió Sumo. Mollo y Arnedo venían de ahí.', sent: false, time: '20:00', name: 'Ricardo' },
    { id: 2, text: 'Exacto, y con Luca Prodan fallecido tuvieron que reinventarse completamente. Lo lograron con creces.', sent: true, time: '20:05' },
    { id: 3, text: 'El Titán Mollo estudió guitarra clásica y folklore del norte antes de meterse en el rock. Por eso suena tan distinto.', sent: false, time: '20:10', name: 'Diego' },
    { id: 4, text: 'Y la banda nunca firmó con una multinacional. Siempre fueron independientes, eso les dio libertad total.', sent: false, time: '20:20', name: 'Ricardo' },
    { id: 5, text: 'Suena el tren, suena el viento', sent: false, time: 'Jue', name: 'Diego' },
  ],
}

export function ChatProvider({ children }) {
  const [contactos, setContactos] = useState(CONTACTOS)
  const [mensajes, setMensajes] = useState(MENSAJES)
  const [contactoActivoId, setContactoActivoId] = useState(null)
  const [usuario, setUsuario] = useState({ name: '', phone: '' })

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
  { contactoId: 1, texto: 'Y encima el último show de Soda en el 97 convocó 70 mil personas en River. Fue su despedida más épica 🎸' },
  { contactoId: 2, texto: 'Sí, y encima Piano Bar lo grabó en 4 días. Llegaba al estudio y componía en el momento, sin nada preparado' },
  { contactoId: 3, texto: 'Exacto, y Los Rodríguez vendieron más discos en España que la mayoría de bandas españolas. Increíble para un argentino' },
  { contactoId: 4, texto: 'Y lo más loco es que después de Almendra formó Pescado Rabioso, Invisible y Spinetta Jade. Nunca se quedaba quieto' },
  { contactoId: 5, texto: 'Claro, y El amor después del amor vendió más de 600 mil copias. Es el disco más vendido del rock argentino hasta hoy' },
  { contactoId: 6, texto: 'Exacto, y con ese estudio prestado grabaron Cuando seas grande que terminó siendo un himno generacional' },
  { contactoId: 7, texto: 'Y lo que pocos saben es que Ricardo Mollo también es pintor. Sus cuadros se exponen en galerías de Buenos Aires 🎨' },
  { contactoId: 1, texto: 'Además Cerati dirigió él mismo varios videoclips de Soda. Era muy perfeccionista con todo lo visual' },
  { contactoId: 2, texto: 'Y mirá que Sui Generis vendía estadios, y lo disolvió igual. Prefería arriesgarse antes que repetirse' },
  { contactoId: 3, texto: 'Y después de El Salmón se tomó años sin grabar. Necesitaba descansar el cerebro después de esa intensidad' },
  { contactoId: 4, texto: 'Justo, Artaud fue un disco que las discográficas no querían editar. Lo sacó igual y hoy es considerado el mejor del rock argentino' },
  { contactoId: 5, texto: 'Por eso las letras de esa época son tan profundas. Todo lo que vivió lo volcó ahí sin filtro 🎹' },
  { contactoId: 7, texto: 'Y nunca firmaron con multinacional. Esa independencia les permitió hacer exactamente lo que querían sin presiones' },
  { contactoId: 6, texto: 'Duró poco con Zas pero lo que dejó alcanza para ser recordado siempre. Calidad sobre cantidad' },
  { contactoId: 1, texto: 'Tenés razón. Y Cerati siguió igual de genial en su carrera solista. Siempre evolucionando 🤘' },
  { contactoId: 3, texto: 'Y hoy sigue tocando, más tranquilo pero igual de afilado. El tipo no pierde el nivel nunca' },
  { contactoId: 2, texto: 'Charly es eso, un genio que nunca terminás de descubrir. Siempre encontrás algo nuevo en sus discos' },
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
    usuario,
    setUsuario,
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