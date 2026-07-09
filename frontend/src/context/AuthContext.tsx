import { useState, type ReactNode } from 'react'
import { apiFetch } from '../lib/api'
import { AuthContext } from './auth-context'

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