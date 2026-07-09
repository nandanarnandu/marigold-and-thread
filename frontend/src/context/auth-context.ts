import { createContext } from 'react'

export type AuthContextType = {
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isLoggedIn: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
