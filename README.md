# Sistema Electoral Nacional

Plataforma oficial de votación digital del Estado. Sistema seguro, transparente y verificable para procesos electorales.

## 🚀 Características

- **Votación Digital Segura**: Sistema de votación con cifrado y verificación
- **Panel Administrativo**: Gestión completa de procesos electorales
- **Resultados en Tiempo Real**: Visualización de resultados y estadísticas
- **Análisis de Datos**: Procesamiento y análisis de datos electorales
- **Machine Learning**: Modelos predictivos para análisis electoral

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd nuevo-portal-votos
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🏃 Desarrollo Local

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Build para Producción

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`

## 🌐 Despliegue en Vercel

Este proyecto está configurado para desplegarse fácilmente en Vercel:

1. **Conecta tu repositorio a Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub/GitLab/Bitbucket

2. **Configura las variables de entorno**:
   - En el dashboard de Vercel, ve a Settings > Environment Variables
   - Agrega `VITE_API_BASE_URL` con la URL de tu API backend

3. **Despliega**:
   - Vercel detectará automáticamente la configuración de `vercel.json`
   - El despliegue se realizará automáticamente en cada push a la rama principal

### Configuración de Vercel

El proyecto incluye `vercel.json` con la configuración necesaria:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Rewrites para SPA (Single Page Application)

## 📁 Estructura del Proyecto

```
nuevo-portal-votos/
├── src/
│   ├── admin/          # Panel administrativo
│   │   ├── components/ # Componentes del admin
│   │   └── pages/      # Páginas del admin
│   ├── components/     # Componentes compartidos
│   ├── pages/          # Páginas públicas
│   ├── services/       # Servicios API
│   └── styles/         # Estilos
├── docs/               # Documentación
├── vercel.json         # Configuración de Vercel
└── package.json        # Dependencias
```

## 🔧 Tecnologías Utilizadas

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos
- **React Router** - Navegación
- **Radix UI** - Componentes UI
- **Recharts** - Gráficos

## 📚 Documentación Adicional

- [Guía de Implementación](./docs/README_IMPLEMENTACION.md)
- [Implementación Backend](./docs/IMPLEMENTACION_BACKEND.md)
- [Ejemplo Backend FastAPI](./docs/EJEMPLO_BACKEND_FASTAPI.py)

## 🔐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL base de la API backend | `http://localhost:8000/api` |

**Nota**: Las variables que comienzan con `VITE_` son expuestas al cliente. No incluyas credenciales sensibles.

## 🐛 Solución de Problemas

### Error de CORS
Asegúrate de que tu backend tenga configurado CORS para permitir tu dominio de Vercel.

### Error de Build
Verifica que todas las dependencias estén instaladas:
```bash
npm install
```

### Variables de Entorno no funcionan
Asegúrate de que las variables en Vercel comiencen con `VITE_` y reinicia el despliegue.

## 📝 Licencia

Este proyecto es propiedad del Estado.

## 👥 Contribución

Para contribuir al proyecto, por favor contacta al equipo de desarrollo.

