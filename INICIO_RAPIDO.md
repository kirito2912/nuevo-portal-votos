# 🚀 Inicio Rápido - Sistema Electoral

## ⚠️ Importante: Iniciar Backend Primero

Para que el sistema funcione correctamente, debes iniciar el backend antes de usar la aplicación.

## 📋 Pasos para Iniciar

### 1. Iniciar el Backend (FastAPI)

**En Windows:**
```bash
cd backend
start.bat
```

**En Linux/Mac:**
```bash
cd backend
./start.sh
```

El backend se iniciará en: `http://localhost:8000`

### 2. Iniciar el Frontend (React + Vite)

En otra terminal:

```bash
npm run dev
```

El frontend se iniciará en: `http://localhost:5173`

## 🔧 Configuración de Factiliza (Opcional)

Si deseas autocompletar datos del DNI:

1. Obtén tu token en [https://factiliza.com](https://factiliza.com)
2. En la página de login, haz clic en "Configurar API Factiliza"
3. Ingresa tu token y guarda

## ✅ Verificar que Todo Funciona

1. Abre el navegador en `http://localhost:5173`
2. Abre la consola del navegador (F12)
3. No deberías ver errores de conexión
4. Ingresa un DNI de 8 dígitos para probar

## 🐛 Solución de Problemas

### Error: ERR_CONNECTION_REFUSED en puerto 8000

**Causa:** El backend no está corriendo

**Solución:** 
1. Abre una terminal
2. Ve a la carpeta `backend`
3. Ejecuta `start.bat` (Windows) o `./start.sh` (Linux/Mac)

### Error: Token de Factiliza no configurado

**Causa:** No has configurado el token de Factiliza

**Solución:** 
- Puedes usar el sistema sin Factiliza (ingresando datos manualmente)
- O configura el token siguiendo los pasos arriba

### Error: CORS

**Causa:** El backend no está configurado correctamente

**Solución:** 
- Verifica que el backend esté corriendo en el puerto 8000
- Revisa el archivo `backend/main.py` para configuración de CORS

## 📚 Más Información

- [Documentación del Backend](./backend/README.md)
- [Integración Factiliza](./docs/INTEGRACION_FACTILIZA.md)
- [Configuración Completa](./backend/CONFIGURACION_COMPLETA.md)
