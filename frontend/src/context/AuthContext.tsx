import { createContext, useContext, useState, type ReactNode } from 'react'
import { apiFetch } from '../lib/api'

type AuthContextType = {
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  async function login(email: string, password: string) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    localStorage.setItem('token', data.access_token)
    setToken(data.access_token)
  }

  async function signup(email: string, password: string, name: string) {
    await apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
    await login(email, password)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, signup, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}