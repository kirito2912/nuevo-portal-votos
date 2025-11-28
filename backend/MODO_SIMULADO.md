# Modo Simulado de Votación

## Descripción

El sistema ahora incluye un **modo simulado** que se activa automáticamente cuando SQL Server no está disponible. Esto permite que la aplicación funcione incluso sin conexión a la base de datos, guardando los votos en archivos JSON locales.

## ¿Cómo Funciona?

1. **Detección Automática**: El sistema intenta conectarse a SQL Server primero
2. **Fallback Automático**: Si la conexión falla, se activa el modo simulado
3. **Almacenamiento Local**: Los votos se guardan en archivos JSON en `backend/data_simulated/`
4. **Sin Cambios en el Frontend**: El frontend no necesita cambios, todo funciona igual

## Archivos de Datos Simulados

Los datos se guardan en el directorio `backend/data_simulated/`:

- `votos_presidenciales.json` - Votos presidenciales
- `votos_regionales.json` - Votos regionales
- `votos_distritales.json` - Votos distritales
- `votos_nulos.json` - Votos nulos
- `votantes.json` - Información de votantes
- `candidatos_presidenciales.json` - Candidatos presidenciales
- `candidatos_regionales.json` - Candidatos regionales
- `candidatos_distritales.json` - Candidatos distritales

## Características

✅ **Funcionalidad Completa**: Todos los tipos de votos funcionan (presidencial, regional, distrital, nulo)
✅ **Validaciones**: Se mantienen las mismas validaciones (no votar dos veces, etc.)
✅ **Persistencia**: Los datos se guardan en archivos JSON
✅ **Transparente**: El frontend no nota la diferencia
✅ **Sin Daños**: No afecta el código existente cuando SQL Server está disponible

## Uso

### Cuando SQL Server NO está disponible:

1. El sistema detecta automáticamente que no puede conectarse
2. Activa el modo simulado
3. Los votos se guardan en archivos JSON
4. La aplicación funciona normalmente

### Cuando SQL Server SÍ está disponible:

1. El sistema usa SQL Server normalmente
2. El modo simulado no se activa
3. Todo funciona como antes

## Mensajes de Respuesta

Cuando se usa el modo simulado, los mensajes de respuesta incluyen "(modo simulado)":

```json
{
  "message": "Voto presidencial registrado exitosamente (modo simulado)"
}
```

## Migración de Datos

Si más adelante quieres migrar los datos simulados a SQL Server, puedes:

1. Leer los archivos JSON de `backend/data_simulated/`
2. Crear scripts de migración para insertar los datos en SQL Server
3. Una vez migrados, puedes eliminar los archivos JSON

## Notas Importantes

- ⚠️ Los datos simulados son **locales** y **temporales**
- ⚠️ Si eliminas el directorio `backend/data_simulated/`, perderás los datos simulados
- ⚠️ El modo simulado es para desarrollo/testing, no para producción
- ✅ Cuando SQL Server esté disponible, el sistema volverá a usarlo automáticamente

## Solución de Problemas

### El modo simulado no se activa

Verifica que:
1. SQL Server realmente no está disponible
2. El error es de conexión (ConnectionError)
3. Los permisos del directorio `backend/data_simulated/` están correctos

### Los datos no se guardan

Verifica que:
1. El directorio `backend/data_simulated/` existe y tiene permisos de escritura
2. No hay errores en la consola del servidor
3. Los archivos JSON se están creando correctamente

