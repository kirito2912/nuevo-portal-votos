import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AdminLogin.css'

const AdminLogin: React.FC = () => {
  const navigate = useNavigate()
  const { loginAdmin } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulación de login (en producción se conectaría al backend)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Validación básica del email
      if (!formData.email || !formData.email.includes('@')) {
        throw new Error('Ingrese un correo electrónico válido')
      }

      // Aquí se haría la llamada real al backend
      // const response = await adminService.login(formData.email, formData.password)
      
      // Simulación exitosa
      loginAdmin(formData.email)
      navigate('/admin')
    } catch (err) {
      const error = err as Error
      setError(error.message || 'Error al iniciar sesión. Verifique sus credenciales.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Panel de Administrador</h1>
          <p>Ingrese sus credenciales para acceder</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
            Volver al Inicio
          </button>
        </form>

        <div className="admin-login-info">
          <p><small>Nota: Este es un sistema de demostración. En producción, las credenciales se validarían contra el backend.</small></p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

