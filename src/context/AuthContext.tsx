import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAdminAuthenticated: boolean
  adminEmail: string
  loginAdmin: (email: string) => void
  logoutAdmin: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false)
  const [adminEmail, setAdminEmail] = useState<string>('')

  const loginAdmin = (email: string): void => {
    setIsAdminAuthenticated(true)
    setAdminEmail(email)
    localStorage.setItem('adminAuth', 'true')
    localStorage.setItem('adminEmail', email)
  }

  const logoutAdmin = (): void => {
    setIsAdminAuthenticated(false)
    setAdminEmail('')
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminEmail')
  }

  // Verificar autenticación al cargar
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    const email = localStorage.getItem('adminEmail')
    if (auth === 'true' && email) {
      setIsAdminAuthenticated(true)
      setAdminEmail(email)
    }
  }, [])

  const value: AuthContextType = {
    isAdminAuthenticated,
    adminEmail,
    loginAdmin,
    logoutAdmin
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

