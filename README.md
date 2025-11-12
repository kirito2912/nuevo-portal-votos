# Sistema de Votación Electoral

Sistema completo de votación electoral desarrollado en React con dashboard, panel de administrador y conexión a backend Java.

## Características

### 🗳️ Módulo de Votación
- Verificación de identidad con validación de DNI
- Validación de edad (mayor de 18 años)
- Selección de región y distrito dinámico
- Interfaz intuitiva y segura

### 📊 Dashboard
- Vista general del sistema
- Acceso rápido a votación y administración
- Información del sistema y requisitos

### ⚙️ Panel de Administrador
- Login con correo electrónico
- Gestión de datos (limpiar, cargar)
- Entrenamiento y modelado de datos
- Estadísticas en tiempo real
- Conexión con backend Java y base de datos externa

## Tecnologías

- **React 18.2.0** - Framework principal
- **TypeScript 5.3.3** - Tipado estático
- **React Router 6.20.0** - Navegación
- **Axios 1.6.2** - Cliente HTTP para backend Java
- **Vite 5.0.8** - Build tool y dev server

**Nota:** Este proyecto utiliza solo React puro (frontend), sin dependencias de Node.js en tiempo de ejecución. La conexión al backend se realiza mediante HTTP requests a un servidor Java.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

3. Construir para producción:
```bash
npm run build
```

## Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080/api
```

**Nota:** En Vite, las variables de entorno deben comenzar con `VITE_` para ser accesibles en el código del cliente.

### Conexión con Backend Java

El sistema está configurado para conectarse a un backend Java en `http://localhost:8080/api`. Los endpoints disponibles son:

#### Votación
- `POST /api/votacion/verificar` - Verificar identidad
- `POST /api/votacion/votar` - Registrar voto

#### Administrador
- `POST /api/admin/login` - Login de administrador
- `POST /api/admin/limpiar` - Limpiar datos
- `POST /api/admin/entrenar` - Entrenar modelo
- `POST /api/admin/modelar` - Ejecutar modelado
- `POST /api/admin/cargar-datos` - Cargar datos
- `GET /api/admin/estadisticas` - Obtener estadísticas

## Estructura del Proyecto

```
src/
├── components/          # Componentes React (TypeScript)
│   ├── Dashboard.tsx
│   ├── Votar.tsx
│   ├── AdminLogin.tsx
│   └── AdminPanel.tsx
├── context/            # Context API (TypeScript)
│   └── AuthContext.tsx
├── data/               # Datos simulados (TypeScript)
│   ├── regiones.ts
│   └── datosSimulados.ts
├── hooks/              # Custom hooks (TypeScript)
│   └── useLocalStorage.ts
├── services/           # Servicios API (TypeScript)
│   └── api.ts
├── utils/              # Utilidades (TypeScript)
│   ├── validaciones.ts
│   ├── constantes.ts
│   └── helpers.ts
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

**Archivos de configuración:**
- `tsconfig.json` - Configuración de TypeScript
- `tsconfig.node.json` - Configuración TypeScript para Node (solo build)
- `vite.config.ts` - Configuración de Vite

## Funcionalidades Principales

### Verificación de Identidad
- Validación de DNI (mínimo 8 dígitos)
- Validación de nombres y apellidos
- Verificación de edad (18+ años)
- Selección de región y distrito

### Panel de Administrador
- **Limpiar Datos**: Elimina todos los datos del sistema
- **Entrenar Modelo**: Entrena modelos de predicción
- **Modelar**: Ejecuta procesos de modelado
- **Cargar Datos**: Importa datos desde archivos (CSV, JSON, XLSX)
- **Ver Datos**: Visualiza datos cargados en tabla

## Datos Simulados

El sistema incluye datos simulados de:
- 30+ votantes con información completa
- 10 regiones con múltiples distritos
- Estadísticas de participación
- Métricas de modelos

## Desarrollo

### Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza build de producción

## Notas

- **TypeScript:** Todo el código está escrito en TypeScript para mayor seguridad de tipos
- **React Puro:** Solo utiliza React y librerías del frontend, sin dependencias de Node.js en tiempo de ejecución
- **Backend Java:** El sistema está preparado para conectarse a un backend Java mediante HTTP requests
- **Validaciones:** Las validaciones de identidad son simuladas en desarrollo
- **Datos:** Los datos se pueden cargar desde archivos externos
- **Responsive:** El sistema es completamente responsive

## Licencia

Este proyecto es de uso interno para el sistema de votación electoral.
