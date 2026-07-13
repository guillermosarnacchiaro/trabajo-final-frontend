const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
const TOKEN_KEY = 'whatsapp_final_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export async function apiRequest(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 204) return null

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Error al conectar con la API')
  }

  return data
}

export const authApi = {
  register: (payload) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  login: (payload) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  verifyEmail: (token) => apiRequest(`/auth/verify-email/${token}`),
  resendVerification: (payload) => apiRequest('/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  forgotPassword: (payload) => apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  resetPassword: (payload) => apiRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  me: () => apiRequest('/users/me'),
}

export const contactsApi = {
  list: () => apiRequest('/contacts'),
  create: (payload) => apiRequest('/contacts', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  update: (id, payload) => apiRequest(`/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  remove: (id) => apiRequest(`/contacts/${id}`, { method: 'DELETE' }),
}

export const conversationsApi = {
  list: () => apiRequest('/conversations'),
  create: (payload) => apiRequest('/conversations', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  update: (id, payload) => apiRequest(`/conversations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  remove: (id) => apiRequest(`/conversations/${id}`, { method: 'DELETE' }),
  messages: (id) => apiRequest(`/conversations/${id}/messages`),
  sendMessage: (id, payload) => apiRequest(`/conversations/${id}/messages`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
}
