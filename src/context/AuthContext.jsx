import { createContext, useContext, useEffect, useState } from 'react'
import { authApi, clearToken, getToken, setToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      if (!getToken()) {
        setLoading(false)
        return
      }

      try {
        const data = await authApi.me()
        setUser(data.user)
      } catch {
        clearToken()
      } finally {
        setLoading(false)
      }
    }

    loadSession()
  }, [])

  async function login(email, password) {
    const data = await authApi.login({ email, password })
    setToken(data.accessToken)
    setUser(data.user)
    return data.user
  }

  async function register(payload) {
    return authApi.register(payload)
  }

  function logout() {
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
