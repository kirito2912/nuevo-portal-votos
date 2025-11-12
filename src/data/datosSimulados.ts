// Datos simulados para el sistema de votación

export interface DatoSimulado {
  dni: string
  nombre: string
  apellidos: string
  fechaNacimiento: string
  region: string
  distrito: string
  fecha: string
  edad: number
}

export interface EstadisticasSimuladas {
  totalVotos: number
  votosHoy: number
  votosPorRegion: { [key: string]: number }
  votosPorDistrito: { [key: string]: number }
  participacionPorEdad: { [key: string]: number }
}

export interface ModelosSimulados {
  configuracion: {
    epochs: number
    learningRate: number
    batchSize: number
    validationSplit: number
  }
  metricas: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
  }
  historial: Array<{
    epoch: number
    loss: number
    accuracy: number
  }>
}

export const datosSimulados: DatoSimulado[] = [
  {
    dni: '12345678',
    nombre: 'Juan Carlos Pérez García',
    apellidos: 'Pérez García',
    fechaNacimiento: '1990-05-15',
    region: 'Lima',
    distrito: 'Lima Centro',
    fecha: '2024-01-15',
    edad: 34
  },
  {
    dni: '23456789',
    nombre: 'María Elena Rodríguez López',
    apellidos: 'Rodríguez López',
    fechaNacimiento: '1985-08-22',
    region: 'Arequipa',
    distrito: 'Arequipa Centro',
    fecha: '2024-01-15',
    edad: 39
  },
  {
    dni: '34567890',
    nombre: 'Carlos Alberto Sánchez Martínez',
    apellidos: 'Sánchez Martínez',
    fechaNacimiento: '1992-11-10',
    region: 'Cusco',
    distrito: 'Cusco Centro',
    fecha: '2024-01-16',
    edad: 32
  },
  {
    dni: '45678901',
    nombre: 'Ana Patricia Fernández Torres',
    apellidos: 'Fernández Torres',
    fechaNacimiento: '1988-03-25',
    region: 'La Libertad',
    distrito: 'Trujillo Centro',
    fecha: '2024-01-16',
    edad: 36
  },
  {
    dni: '56789012',
    nombre: 'Luis Miguel Gutiérrez Ramírez',
    apellidos: 'Gutiérrez Ramírez',
    fechaNacimiento: '1995-07-18',
    region: 'Piura',
    distrito: 'Piura Centro',
    fecha: '2024-01-17',
    edad: 29
  },
  {
    dni: '67890123',
    nombre: 'Carmen Rosa Morales Vargas',
    apellidos: 'Morales Vargas',
    fechaNacimiento: '1983-12-05',
    region: 'Lambayeque',
    distrito: 'Chiclayo Centro',
    fecha: '2024-01-17',
    edad: 41
  },
  {
    dni: '78901234',
    nombre: 'Roberto Andrés Herrera Díaz',
    apellidos: 'Herrera Díaz',
    fechaNacimiento: '1991-04-30',
    region: 'Junín',
    distrito: 'Huancayo Centro',
    fecha: '2024-01-18',
    edad: 33
  },
  {
    dni: '89012345',
    nombre: 'Sofía Alejandra Castro Ruiz',
    apellidos: 'Castro Ruiz',
    fechaNacimiento: '1987-09-14',
    region: 'Cajamarca',
    distrito: 'Cajamarca Centro',
    fecha: '2024-01-18',
    edad: 37
  },
  {
    dni: '90123456',
    nombre: 'Diego Fernando Mendoza Silva',
    apellidos: 'Mendoza Silva',
    fechaNacimiento: '1993-06-20',
    region: 'Puno',
    distrito: 'Puno Centro',
    fecha: '2024-01-19',
    edad: 31
  },
  {
    dni: '01234567',
    nombre: 'Laura Beatriz Jiménez Flores',
    apellidos: 'Jiménez Flores',
    fechaNacimiento: '1989-02-12',
    region: 'Ancash',
    distrito: 'Huaraz Centro',
    fecha: '2024-01-19',
    edad: 35
  },
  {
    dni: '11223344',
    nombre: 'Pedro Antonio Vega Campos',
    apellidos: 'Vega Campos',
    fechaNacimiento: '1986-10-08',
    region: 'Lima',
    distrito: 'San Isidro',
    fecha: '2024-01-20',
    edad: 38
  },
  {
    dni: '22334455',
    nombre: 'Gabriela Isabel Ríos Mendoza',
    apellidos: 'Ríos Mendoza',
    fechaNacimiento: '1994-01-28',
    region: 'Arequipa',
    distrito: 'Yanahuara',
    fecha: '2024-01-20',
    edad: 30
  },
  {
    dni: '33445566',
    nombre: 'Fernando José Quispe Huamán',
    apellidos: 'Quispe Huamán',
    fechaNacimiento: '1984-07-03',
    region: 'Cusco',
    distrito: 'San Sebastián',
    fecha: '2024-01-21',
    edad: 40
  },
  {
    dni: '44556677',
    nombre: 'Patricia Elena Chávez Rojas',
    apellidos: 'Chávez Rojas',
    fechaNacimiento: '1990-11-17',
    region: 'La Libertad',
    distrito: 'La Esperanza',
    fecha: '2024-01-21',
    edad: 34
  },
  {
    dni: '55667788',
    nombre: 'Ricardo Manuel Torres Salinas',
    apellidos: 'Torres Salinas',
    fechaNacimiento: '1992-05-22',
    region: 'Piura',
    distrito: 'Castilla',
    fecha: '2024-01-22',
    edad: 32
  },
  {
    dni: '66778899',
    nombre: 'Monica Susana Delgado Cáceres',
    apellidos: 'Delgado Cáceres',
    fechaNacimiento: '1988-08-15',
    region: 'Lambayeque',
    distrito: 'La Victoria',
    fecha: '2024-01-22',
    edad: 36
  },
  {
    dni: '77889900',
    nombre: 'Jorge Luis Paredes Alvarado',
    apellidos: 'Paredes Alvarado',
    fechaNacimiento: '1991-03-09',
    region: 'Junín',
    distrito: 'El Tambo',
    fecha: '2024-01-23',
    edad: 33
  },
  {
    dni: '88990011',
    nombre: 'Rosa María Villanueva Córdova',
    apellidos: 'Villanueva Córdova',
    fechaNacimiento: '1987-12-24',
    region: 'Cajamarca',
    distrito: 'Baños del Inca',
    fecha: '2024-01-23',
    edad: 37
  },
  {
    dni: '99001122',
    nombre: 'Alberto Enrique Medina Pacheco',
    apellidos: 'Medina Pacheco',
    fechaNacimiento: '1993-09-06',
    region: 'Puno',
    distrito: 'Acora',
    fecha: '2024-01-24',
    edad: 31
  },
  {
    dni: '10111213',
    nombre: 'Claudia Milagros Ramos Espinoza',
    apellidos: 'Ramos Espinoza',
    fechaNacimiento: '1989-04-19',
    region: 'Ancash',
    distrito: 'Independencia',
    fecha: '2024-01-24',
    edad: 35
  },
  {
    dni: '11121314',
    nombre: 'Miguel Ángel Huamán Quispe',
    apellidos: 'Huamán Quispe',
    fechaNacimiento: '1985-06-11',
    region: 'Lima',
    distrito: 'Miraflores',
    fecha: '2024-01-25',
    edad: 39
  },
  {
    dni: '12131415',
    nombre: 'Elena Victoria Cáceres Ríos',
    apellidos: 'Cáceres Ríos',
    fechaNacimiento: '1992-10-02',
    region: 'Arequipa',
    distrito: 'Cayma',
    fecha: '2024-01-25',
    edad: 32
  },
  {
    dni: '13141516',
    nombre: 'Oscar Daniel Salinas Mendoza',
    apellidos: 'Salinas Mendoza',
    fechaNacimiento: '1986-02-27',
    region: 'Cusco',
    distrito: 'San Jerónimo',
    fecha: '2024-01-26',
    edad: 38
  },
  {
    dni: '14151617',
    nombre: 'Verónica Lucía Espinoza Torres',
    apellidos: 'Espinoza Torres',
    fechaNacimiento: '1994-08-13',
    region: 'La Libertad',
    distrito: 'El Porvenir',
    fecha: '2024-01-26',
    edad: 30
  },
  {
    dni: '15161718',
    nombre: 'Héctor Manuel Rojas Paredes',
    apellidos: 'Rojas Paredes',
    fechaNacimiento: '1990-01-31',
    region: 'Piura',
    distrito: 'Catacaos',
    fecha: '2024-01-27',
    edad: 34
  },
  {
    dni: '16171819',
    nombre: 'Diana Carolina Alvarado Villanueva',
    apellidos: 'Alvarado Villanueva',
    fechaNacimiento: '1988-05-16',
    region: 'Lambayeque',
    distrito: 'José Leonardo Ortiz',
    fecha: '2024-01-27',
    edad: 36
  },
  {
    dni: '17181920',
    nombre: 'Javier Eduardo Córdova Medina',
    apellidos: 'Córdova Medina',
    fechaNacimiento: '1991-11-23',
    region: 'Junín',
    distrito: 'Chilca',
    fecha: '2024-01-28',
    edad: 33
  },
  {
    dni: '18192021',
    nombre: 'Natalia Esperanza Pacheco Ramos',
    apellidos: 'Pacheco Ramos',
    fechaNacimiento: '1987-07-07',
    region: 'Cajamarca',
    distrito: 'Los Baños',
    fecha: '2024-01-28',
    edad: 37
  },
  {
    dni: '19202122',
    nombre: 'Walter Francisco Quispe Huamán',
    apellidos: 'Quispe Huamán',
    fechaNacimiento: '1993-03-14',
    region: 'Puno',
    distrito: 'Atuncolla',
    fecha: '2024-01-29',
    edad: 31
  },
  {
    dni: '20212223',
    nombre: 'Yolanda Margarita Espinoza Cáceres',
    apellidos: 'Espinoza Cáceres',
    fechaNacimiento: '1989-09-26',
    region: 'Ancash',
    distrito: 'La Libertad',
    fecha: '2024-01-29',
    edad: 35
  }
]

// Estadísticas simuladas
export const estadisticasSimuladas: EstadisticasSimuladas = {
  totalVotos: 15234,
  votosHoy: 456,
  votosPorRegion: {
    'Lima': 5234,
    'Arequipa': 2341,
    'Cusco': 1890,
    'La Libertad': 1654,
    'Piura': 1423,
    'Lambayeque': 1234,
    'Junín': 987,
    'Cajamarca': 876,
    'Puno': 654,
    'Ancash': 435
  },
  votosPorDistrito: {
    'Lima Centro': 1234,
    'San Isidro': 987,
    'Miraflores': 876,
    'Arequipa Centro': 654,
    'Cusco Centro': 543
  },
  participacionPorEdad: {
    '18-25': 2345,
    '26-35': 4567,
    '36-45': 3456,
    '46-55': 2876,
    '56-65': 1234,
    '65+': 756
  }
}

// Modelos de datos para entrenamiento
export const modelosSimulados: ModelosSimulados = {
  configuracion: {
    epochs: 100,
    learningRate: 0.001,
    batchSize: 32,
    validationSplit: 0.2
  },
  metricas: {
    accuracy: 0.92,
    precision: 0.89,
    recall: 0.91,
    f1Score: 0.90
  },
  historial: [
    { epoch: 1, loss: 0.65, accuracy: 0.72 },
    { epoch: 25, loss: 0.32, accuracy: 0.85 },
    { epoch: 50, loss: 0.18, accuracy: 0.90 },
    { epoch: 75, loss: 0.12, accuracy: 0.91 },
    { epoch: 100, loss: 0.08, accuracy: 0.92 }
  ]
}

