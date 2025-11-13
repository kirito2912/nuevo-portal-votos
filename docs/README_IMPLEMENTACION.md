# Guía Rápida de Implementación

## 📋 Resumen

Esta guía te ayudará a implementar las funcionalidades reales del panel administrativo, reemplazando los datos simulados con conexiones reales a tu backend.

## 🚀 Pasos Rápidos

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 2. Instalar Dependencias del Backend

```bash
pip install fastapi uvicorn pandas scikit-learn supabase python-dotenv
```

### 3. Configurar Base de Datos (Supabase)

1. Crea las tablas necesarias (ver `IMPLEMENTACION_BACKEND.md`)
2. Obtén tu URL y KEY de Supabase
3. Agrega las credenciales al `.env` del backend

### 4. Iniciar Backend

```bash
cd backend
python main.py
# O
uvicorn main:app --reload
```

### 5. Activar Servicios en Frontend

En cada archivo de servicio (`src/services/*.ts`):
1. Descomenta las llamadas `fetch` reales
2. Comenta o elimina las simulaciones
3. Asegúrate de que `API_BASE_URL` esté configurado

## 📁 Archivos Creados

### Documentación
- `docs/IMPLEMENTACION_BACKEND.md` - Guía completa de implementación
- `docs/EJEMPLO_BACKEND_FASTAPI.py` - Código de ejemplo del backend
- `docs/README_IMPLEMENTACION.md` - Este archivo

### Servicios Frontend
- `src/services/resultsService.ts` - Servicio de Resultados
- `src/services/processingService.ts` - Servicio de Procesamiento
- `src/services/trainingService.ts` - Servicio de Entrenamiento ML
- `src/services/analysisService.ts` - Servicio de Análisis

## 🔄 Cómo Conectar los Componentes

### Ejemplo: Actualizar ResultsTab

```typescript
// src/admin/components/ResultsTab.tsx
import { useEffect, useState } from 'react';
import { getResultsStatus } from '../../services/resultsService';

export default function ResultsTab() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getResultsStatus();
        setStatus(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatus();
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="results-section">
      {/* Usar status.hasNullData en lugar del estado simulado */}
      <div className={`results-status-badge ${status.hasNullData ? 'results-status-warning' : 'results-status-ok'}`}>
        {/* ... */}
      </div>
    </div>
  );
}
```

## 📚 Recursos Adicionales

- [Documentación FastAPI](https://fastapi.tiangolo.com/)
- [Documentación Supabase](https://supabase.com/docs)
- [Documentación Pandas](https://pandas.pydata.org/docs/)
- [Documentación Scikit-learn](https://scikit-learn.org/stable/)

## ⚠️ Notas Importantes

1. **Seguridad**: Nunca expongas tus credenciales de Supabase en el frontend
2. **Validación**: Agrega validación de datos en el backend
3. **Manejo de Errores**: Implementa manejo de errores robusto
4. **Testing**: Prueba cada endpoint antes de conectar el frontend
5. **Performance**: Considera usar paginación para grandes volúmenes de datos

## 🆘 Solución de Problemas

### Error de CORS
Agrega tu URL del frontend a `allow_origins` en el backend FastAPI.

### Error de Conexión
Verifica que:
- El backend esté corriendo
- La URL en `.env` sea correcta
- Las credenciales de Supabase sean válidas

### Datos no se actualizan
Verifica que:
- Los endpoints estén retornando datos correctamente
- Los servicios estén descomentados
- No haya errores en la consola del navegador

