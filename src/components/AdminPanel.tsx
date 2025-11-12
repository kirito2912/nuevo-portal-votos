import React, { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { datosSimulados, DatoSimulado } from '../data/datosSimulados'
import './AdminPanel.css'

interface Estadisticas {
  totalVotos: number
  votosHoy: number
  regionesActivas: number
  distritosActivos: number
  porcentajeParticipacion: number
}

interface Message {
  type: string
  text: string
}

type TabType = 'dashboard' | 'limpiar' | 'entrenar' | 'modelar' | 'cargar' | 'datos'

const AdminPanel: React.FC = () => {
  const navigate = useNavigate()
  const { logoutAdmin, adminEmail } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<Message>({ type: '', text: '' })
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null)
  const [datosCargados, setDatosCargados] = useState<DatoSimulado[]>([])

  useEffect(() => {
    cargarEstadisticas()
  }, [])

  const cargarEstadisticas = async (): Promise<void> => {
    try {
      // Simulación de datos estadísticos
      setEstadisticas({
        totalVotos: 15234,
        votosHoy: 456,
        regionesActivas: 10,
        distritosActivos: 50,
        porcentajeParticipacion: 68.5
      })
    } catch (error) {
      console.error('Error al cargar estadísticas:', error)
    }
  }

  const handleLimpiarDatos = async (): Promise<void> => {
    if (!window.confirm('¿Está seguro de que desea limpiar todos los datos? Esta acción no se puede deshacer.')) {
      return
    }

    setLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      // Aquí se haría la llamada real al backend
      // await adminService.limpiarDatos()
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      setMessage({ type: 'success', text: 'Datos limpiados exitosamente' })
      setDatosCargados([])
      cargarEstadisticas()
    } catch (error) {
      const err = error as Error
      setMessage({ type: 'error', text: 'Error al limpiar datos: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  const handleEntrenarModelo = async (): Promise<void> => {
    setLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      // Aquí se haría la llamada real al backend
      // await adminService.entrenarModelo({ epochs: 100, learningRate: 0.001 })
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      setMessage({ type: 'success', text: 'Modelo entrenado exitosamente' })
    } catch (error) {
      const err = error as Error
      setMessage({ type: 'error', text: 'Error al entrenar modelo: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  const handleModelar = async (): Promise<void> => {
    setLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      // Aquí se haría la llamada real al backend
      // await adminService.modelar({ tipo: 'prediccion', datos: datosSimulados })
      
      await new Promise(resolve => setTimeout(resolve, 1800))
      setMessage({ type: 'success', text: 'Modelado completado exitosamente' })
    } catch (error) {
      const err = error as Error
      setMessage({ type: 'error', text: 'Error al modelar: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  const handleCargarDatos = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const archivo = e.target.files?.[0]
    if (!archivo) return

    setLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      // Aquí se haría la llamada real al backend
      // const response = await adminService.cargarDatos(archivo)
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulación: cargar datos simulados
      setDatosCargados(datosSimulados.slice(0, 20))
      setMessage({ type: 'success', text: `Datos cargados exitosamente desde ${archivo.name}` })
      cargarEstadisticas()
    } catch (error) {
      const err = error as Error
      setMessage({ type: 'error', text: 'Error al cargar datos: ' + err.message })
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  const handleLogout = (): void => {
    logoutAdmin()
    navigate('/admin/login')
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Panel de Administrador</h1>
          <div className="admin-header-actions">
            <span className="admin-email">{adminEmail}</span>
            <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
          </div>
        </div>
      </header>

      <div className="admin-container">
        <nav className="admin-sidebar">
          <button
            className={activeTab === 'dashboard' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={activeTab === 'limpiar' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('limpiar')}
          >
            🗑️ Limpiar Datos
          </button>
          <button
            className={activeTab === 'entrenar' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('entrenar')}
          >
            🎯 Entrenar Modelo
          </button>
          <button
            className={activeTab === 'modelar' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('modelar')}
          >
            📈 Modelar
          </button>
          <button
            className={activeTab === 'cargar' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('cargar')}
          >
            📁 Cargar Datos
          </button>
          <button
            className={activeTab === 'datos' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('datos')}
          >
            📋 Ver Datos
          </button>
        </nav>

        <main className="admin-main">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="admin-section">
              <h2>Dashboard</h2>
              {estadisticas && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">🗳️</div>
                    <div className="stat-content">
                      <h3>Total de Votos</h3>
                      <p className="stat-value">{estadisticas.totalVotos.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                      <h3>Votos Hoy</h3>
                      <p className="stat-value">{estadisticas.votosHoy.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🌍</div>
                    <div className="stat-content">
                      <h3>Regiones Activas</h3>
                      <p className="stat-value">{estadisticas.regionesActivas}</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📍</div>
                    <div className="stat-content">
                      <h3>Distritos Activos</h3>
                      <p className="stat-value">{estadisticas.distritosActivos}</p>
                    </div>
                  </div>
                  <div className="stat-card stat-card-large">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                      <h3>Participación</h3>
                      <p className="stat-value">{estadisticas.porcentajeParticipacion}%</p>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${estadisticas.porcentajeParticipacion}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'limpiar' && (
            <div className="admin-section">
              <h2>Limpiar Datos</h2>
              <div className="action-card">
                <p>Esta acción eliminará todos los datos del sistema. Esta operación no se puede deshacer.</p>
                <button 
                  onClick={handleLimpiarDatos} 
                  className="btn-danger"
                  disabled={loading}
                >
                  {loading ? 'Limpiando...' : 'Limpiar Todos los Datos'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'entrenar' && (
            <div className="admin-section">
              <h2>Entrenar Modelo</h2>
              <div className="action-card">
                <p>Inicia el proceso de entrenamiento del modelo de predicción con los datos disponibles.</p>
                <button 
                  onClick={handleEntrenarModelo} 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Entrenando...' : 'Iniciar Entrenamiento'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'modelar' && (
            <div className="admin-section">
              <h2>Modelar</h2>
              <div className="action-card">
                <p>Ejecuta el proceso de modelado con los datos cargados en el sistema.</p>
                <button 
                  onClick={handleModelar} 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Modelando...' : 'Ejecutar Modelado'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'cargar' && (
            <div className="admin-section">
              <h2>Cargar Datos</h2>
              <div className="action-card">
                <p>Seleccione un archivo para cargar datos al sistema.</p>
                <div className="file-upload">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleCargarDatos}
                    accept=".csv,.json,.xlsx"
                    disabled={loading}
                  />
                  <label htmlFor="file-upload" className="file-upload-label">
                    {loading ? 'Cargando...' : 'Seleccionar Archivo'}
                  </label>
                </div>
                <p className="file-info">Formatos soportados: CSV, JSON, XLSX</p>
              </div>
            </div>
          )}

          {activeTab === 'datos' && (
            <div className="admin-section">
              <h2>Datos Cargados</h2>
              {datosCargados.length > 0 ? (
                <div className="datos-table-container">
                  <table className="datos-table">
                    <thead>
                      <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Región</th>
                        <th>Distrito</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datosCargados.map((dato, index) => (
                        <tr key={index}>
                          <td>{dato.dni}</td>
                          <td>{dato.nombre}</td>
                          <td>{dato.region}</td>
                          <td>{dato.distrito}</td>
                          <td>{dato.fecha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <p>No hay datos cargados. Use la opción "Cargar Datos" para importar información.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminPanel

