// Utilidades de validación

export interface ValidacionResult {
  valido: boolean
  mensaje: string
  edad?: number
}

export const validarDNI = (dni: string): ValidacionResult => {
  if (!dni) return { valido: false, mensaje: 'El DNI es requerido' }
  if (dni.length < 8) return { valido: false, mensaje: 'El DNI debe tener al menos 8 dígitos' }
  if (!/^\d+$/.test(dni)) return { valido: false, mensaje: 'El DNI solo debe contener números' }
  return { valido: true, mensaje: '' }
}

export const validarNombre = (nombre: string): ValidacionResult => {
  if (!nombre || nombre.trim().length < 2) {
    return { valido: false, mensaje: 'El nombre debe tener al menos 2 caracteres' }
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
    return { valido: false, mensaje: 'El nombre solo debe contener letras' }
  }
  return { valido: true, mensaje: '' }
}

export const calcularEdad = (fechaNacimiento: string): number | null => {
  if (!fechaNacimiento) return null
  
  const hoy = new Date()
  const nacimiento = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const mes = hoy.getMonth() - nacimiento.getMonth()
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--
  }
  
  return edad
}

export const validarEdad = (fechaNacimiento: string): ValidacionResult => {
  if (!fechaNacimiento) {
    return { valido: false, mensaje: 'La fecha de nacimiento es requerida' }
  }
  
  const edad = calcularEdad(fechaNacimiento)
  
  if (edad === null) {
    return { valido: false, mensaje: 'Fecha de nacimiento inválida' }
  }
  
  if (edad < 18) {
    return { valido: false, mensaje: 'Debe ser mayor de 18 años para votar' }
  }
  
  return { valido: true, mensaje: '', edad }
}

export const validarEmail = (email: string): ValidacionResult => {
  if (!email) return { valido: false, mensaje: 'El correo electrónico es requerido' }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valido: false, mensaje: 'Ingrese un correo electrónico válido' }
  }
  
  return { valido: true, mensaje: '' }
}

export const formatearFecha = (fecha: string): string => {
  if (!fecha) return ''
  const date = new Date(fecha)
  return date.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatearNumero = (numero: number): string => {
  return new Intl.NumberFormat('es-PE').format(numero)
}

