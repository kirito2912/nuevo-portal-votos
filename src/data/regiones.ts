// Datos simulados de regiones y distritos
export interface RegionesType {
  [key: string]: string[]
}

export const regiones: RegionesType = {
  'Lima': ['Lima Centro', 'San Isidro', 'Miraflores', 'Surco', 'La Molina'],
  'Arequipa': ['Arequipa Centro', 'Yanahuara', 'Cayma', 'Cerro Colorado', 'Sachaca'],
  'Cusco': ['Cusco Centro', 'San Sebastián', 'San Jerónimo', 'Santiago', 'Wanchaq'],
  'La Libertad': ['Trujillo Centro', 'La Esperanza', 'El Porvenir', 'Víctor Larco', 'Moche'],
  'Piura': ['Piura Centro', 'Castilla', 'Catacaos', 'Ventanilla', 'Sullana'],
  'Lambayeque': ['Chiclayo Centro', 'La Victoria', 'José Leonardo Ortiz', 'Pimentel', 'Picsi'],
  'Junín': ['Huancayo Centro', 'El Tambo', 'Chilca', 'San Jerónimo', 'Chupaca'],
  'Cajamarca': ['Cajamarca Centro', 'Baños del Inca', 'Los Baños', 'La Encañada', 'Namora'],
  'Puno': ['Puno Centro', 'Acora', 'Atuncolla', 'Capachica', 'Chucuito'],
  'Ancash': ['Huaraz Centro', 'Independencia', 'La Libertad', 'Pariacoto', 'Recuay']
}

export const getDistritosByRegion = (region: string): string[] => {
  return regiones[region] || []
}

