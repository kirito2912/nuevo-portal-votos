import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { regiones, getDistritosByRegion } from '../data/regiones'
import { calcularEdad } from '../utils/validaciones'
import './Votar.css'

interface FormData {
  dni: string
  nombres: string
  apellidos: string
  fechaNacimiento: string
  region: string
  distrito: string
}

interface Errors {
  [key: string]: string
  general?: string
}

const Votar: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    dni: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    region: '',
    distrito: ''
  })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [verificacionExitosa, setVerificacionExitosa] = useState<boolean>(false)

  const validarFormulario = (): boolean => {
    const nuevosErrores: Errors = {}

    if (!formData.dni || formData.dni.length < 8) {
      nuevosErrores.dni = 'El DNI debe tener al menos 8 dígitos'
    }

    if (!formData.nombres || formData.nombres.trim().length < 2) {
      nuevosErrores.nombres = 'Ingrese sus nombres completos'
    }

    if (!formData.apellidos || formData.apellidos.trim().length < 2) {
      nuevosErrores.apellidos = 'Ingrese sus apellidos completos'
    }

    if (!formData.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = 'Ingrese su fecha de nacimiento'
    } else {
      const edad = calcularEdad(formData.fechaNacimiento)
      if (edad === null || edad < 18) {
        nuevosErrores.fechaNacimiento = 'Debe ser mayor de 18 años para votar'
      }
    }

    if (!formData.region) {
      nuevosErrores.region = 'Seleccione una región'
    }

    if (!formData.distrito) {
      nuevosErrores.distrito = 'Seleccione un distrito'
    }

    setErrors(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'region' && { distrito: '' })
    }))
    if (errors[name]) {
      setErrors(prev => {
        const nuevosErrores = { ...prev }
        delete nuevosErrores[name]
        return nuevosErrores
      })
    }
  }

  const handleVerificarIdentidad = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validarFormulario()) {
      return
    }

    setLoading(true)
    try {
      // Simulación de verificación (en producción se conectaría al backend)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Aquí se haría la llamada real al backend
      // const resultado = await votacionService.verificarIdentidad(formData.dni, formData)
      
      setVerificacionExitosa(true)
      setStep(2)
    } catch (error) {
      setErrors({ general: 'Error al verificar identidad. Por favor, intente nuevamente.' })
    } finally {
      setLoading(false)
    }
  }

  const handleVotar = async () => {
    setLoading(true)
    try {
      // Simulación de voto (en producción se conectaría al backend)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Aquí se haría la llamada real al backend
      // await votacionService.registrarVoto(formData)
      
      alert('¡Voto registrado exitosamente!')
      navigate('/')
    } catch (error) {
      alert('Error al registrar el voto. Por favor, intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const distritos = formData.region ? getDistritosByRegion(formData.region) : []
  const edadCalculada = formData.fechaNacimiento ? calcularEdad(formData.fechaNacimiento) : null

  return (
    <div className="votar-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="votar-container">
          <div className="votar-card">
            <div className="votar-header">
              <h1>Verificación de Identidad</h1>
              <p>Complete sus datos para verificar su identidad y ejercer su voto</p>
            </div>

            {step === 1 && (
              <form onSubmit={handleVerificarIdentidad} className="votar-form">
                {errors.general && (
                  <div className="error-message">{errors.general}</div>
                )}

                <div className="form-group">
                  <label htmlFor="dni">Número de DNI *</label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    placeholder="Ingrese su DNI"
                    maxLength={8}
                    required
                  />
                  {errors.dni && <span className="error">{errors.dni}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="nombres">Nombres Completos *</label>
                  <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                    placeholder="Ingrese sus nombres"
                    required
                  />
                  {errors.nombres && <span className="error">{errors.nombres}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="apellidos">Apellidos Completos *</label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    placeholder="Ingrese sus apellidos"
                    required
                  />
                  {errors.apellidos && <span className="error">{errors.apellidos}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="fechaNacimiento">Fecha de Nacimiento *</label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    required
                  />
                  {errors.fechaNacimiento && <span className="error">{errors.fechaNacimiento}</span>}
                  {formData.fechaNacimiento && edadCalculada !== null && edadCalculada >= 18 && (
                    <span className="success">✓ Edad válida ({edadCalculada} años)</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="region">Región *</label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione una región</option>
                    {Object.keys(regiones).map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                  {errors.region && <span className="error">{errors.region}</span>}
                </div>

                {formData.region && (
                  <div className="form-group">
                    <label htmlFor="distrito">Distrito *</label>
                    <select
                      id="distrito"
                      name="distrito"
                      value={formData.distrito}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.region}
                    >
                      <option value="">Seleccione un distrito</option>
                      {distritos.map(distrito => (
                        <option key={distrito} value={distrito}>{distrito}</option>
                      ))}
                    </select>
                    {errors.distrito && <span className="error">{errors.distrito}</span>}
                  </div>
                )}

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Verificando...' : 'Verificar Identidad'}
                </button>

                <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
                  Cancelar
                </button>
              </form>
            )}

            {step === 2 && verificacionExitosa && (
              <div className="verificacion-exitosa">
                <div className="success-icon">✓</div>
                <h2>¡Verificación Exitosa!</h2>
                <div className="datos-verificados">
                  <p><strong>DNI:</strong> {formData.dni}</p>
                  <p><strong>Nombre:</strong> {formData.nombres} {formData.apellidos}</p>
                  <p><strong>Región:</strong> {formData.region}</p>
                  <p><strong>Distrito:</strong> {formData.distrito}</p>
                </div>
                <div className="votar-actions">
                  <button onClick={handleVotar} className="btn-primary" disabled={loading}>
                    {loading ? 'Registrando voto...' : 'Confirmar Voto'}
                  </button>
                  <button onClick={() => setStep(1)} className="btn-secondary">
                    Volver
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Votar

