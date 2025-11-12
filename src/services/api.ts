import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

// Configuración base para conexión con backend Java
// Nota: En Vite, las variables de entorno deben comenzar con VITE_
const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token si existe
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('authToken')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interfaces para los servicios
export interface VerificarIdentidadRequest {
  dni: string
  nombres: string
  apellidos: string
  fechaNacimiento: string
  region: string
  distrito: string
}

export interface VotoRequest {
  dni: string
  nombres: string
  apellidos: string
  fechaNacimiento: string
  region: string
  distrito: string
}

export interface AdminLoginRequest {
  email: string
  password: string
}

export interface EntrenarModeloRequest {
  epochs?: number
  learningRate?: number
  batchSize?: number
  validationSplit?: number
}

export interface ModelarRequest {
  tipo: string
  datos: unknown
}

// Servicios para votación
export const votacionService = {
  verificarIdentidad: async (dni: string, datos: VerificarIdentidadRequest): Promise<unknown> => {
    try {
      const response = await api.post('/votacion/verificar', {
        dni,
        ...datos
      })
      return response.data
    } catch (error) {
      console.error('Error al verificar identidad:', error)
      throw error
    }
  },

  registrarVoto: async (voto: VotoRequest): Promise<unknown> => {
    try {
      const response = await api.post('/votacion/votar', voto)
      return response.data
    } catch (error) {
      console.error('Error al registrar voto:', error)
      throw error
    }
  }
}

// Servicios para administrador
export const adminService = {
  login: async (email: string, password: string): Promise<unknown> => {
    try {
      const response = await api.post('/admin/login', { email, password })
      return response.data
    } catch (error) {
      console.error('Error en login de administrador:', error)
      throw error
    }
  },

  limpiarDatos: async (): Promise<unknown> => {
    try {
      const response = await api.post('/admin/limpiar')
      return response.data
    } catch (error) {
      console.error('Error al limpiar datos:', error)
      throw error
    }
  },

  entrenarModelo: async (config: EntrenarModeloRequest): Promise<unknown> => {
    try {
      const response = await api.post('/admin/entrenar', config)
      return response.data
    } catch (error) {
      console.error('Error al entrenar modelo:', error)
      throw error
    }
  },

  modelar: async (datos: ModelarRequest): Promise<unknown> => {
    try {
      const response = await api.post('/admin/modelar', datos)
      return response.data
    } catch (error) {
      console.error('Error al modelar:', error)
      throw error
    }
  },

  cargarDatos: async (archivo: File): Promise<unknown> => {
    try {
      const formData = new FormData()
      formData.append('archivo', archivo)
      const response = await api.post('/admin/cargar-datos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error al cargar datos:', error)
      throw error
    }
  },

  obtenerEstadisticas: async (): Promise<unknown> => {
    try {
      const response = await api.get('/admin/estadisticas')
      return response.data
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      throw error
    }
  }
}

export default api

