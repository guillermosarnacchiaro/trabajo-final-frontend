# WhatsApp Final - Frontend

Frontend React + Vite para el Trabajo Integrador Final Full-Stack. La app consume una API Express separada y permite registrarse, verificar email, iniciar sesion con JWT y gestionar contactos, conversaciones y mensajes.

## Stack

- React + Vite
- React Router DOM
- Context API
- Fetch API con JWT Bearer Token
- CSS responsive

## Funcionalidades

- Registro y login de usuarios.
- Pantalla de verificacion de email (`/verify-email/:token`).
- Rutas protegidas para usuarios autenticados.
- Listado de chats/contactos.
- Crear, editar y borrar contactos.
- Ver detalle de conversacion.
- Enviar y listar mensajes persistidos en backend.
- Tema claro/oscuro.
- UI responsive para desktop y mobile.

## Repositorio Backend

El backend se entrega en un repositorio separado.

```txt
Repo Backend:
URL Backend:
```

## Instalacion

```bash
npm install
cp .env.example .env
npm run dev
```

La web queda disponible en:

```txt
http://localhost:5173
```

## Variables de entorno

```env
VITE_API_URL=http://localhost:4000/api
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Rutas principales

```txt
/                       Login / registro
/verify-email/:token    Verificacion de email
/chat                   Listado de chats
/chat/:id               Detalle de chat
/profile                Perfil
```

## Usuario de prueba

Completar al entregar, con email ya verificado:

```txt
Email:
Password:
```

## Deploy

Completar al entregar:

```txt
Frontend URL:
Backend URL:
Repo Frontend:
Repo Backend:
```

Para desplegar en Vercel, el archivo `vercel.json` ya incluye rewrite hacia `index.html`, necesario para que funcionen las rutas de React Router al refrescar la pagina.
