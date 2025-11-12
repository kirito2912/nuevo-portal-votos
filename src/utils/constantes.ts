// Constantes del sistema

export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  EDAD_MINIMA_VOTO: 18,
  DNI_LONGITUD_MINIMA: 8,
  TIMEOUT_REQUEST: 30000, // 30 segundos
} as const

export const RUTAS = {
  HOME: '/',
  VOTAR: '/votar',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_PANEL: '/admin',
} as const

export const MENSAJES = {
  ERROR_GENERAL: 'Ha ocurrido un error. Por favor, intente nuevamente.',
  ERROR_CONEXION: 'Error de conexión con el servidor.',
  VOTO_EXITOSO: '¡Voto registrado exitosamente!',
  VERIFICACION_EXITOSA: 'Verificación de identidad exitosa',
  DATOS_LIMPIADOS: 'Datos limpiados exitosamente',
  MODELO_ENTRENADO: 'Modelo entrenado exitosamente',
  MODELADO_COMPLETADO: 'Modelado completado exitosamente',
  DATOS_CARGADOS: 'Datos cargados exitosamente',
} as const

export const ESTADOS = {
  CARGANDO: 'loading',
  EXITOSO: 'success',
  ERROR: 'error',
  INICIAL: 'idle',
} as const

