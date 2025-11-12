import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Votar from './components/Votar'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

interface ProtectedAdminRouteProps {
  children: React.ReactNode
}

function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { isAdminAuthenticated } = useAuth()
  return isAdminAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/procesos" element={<Dashboard />} />
            <Route path="/votar" element={<Votar />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminPanel />
                </ProtectedAdminRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

