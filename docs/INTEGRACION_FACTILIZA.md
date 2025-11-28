# Integración con API Factiliza

## Descripción

Este proyecto integra la API de Factiliza para autocompletar información de votantes basándose en su DNI.

## Configuración

### 1. Obtener Token de API

1. Visita [https://factiliza.com](https://factiliza.com)
2. Crea una cuenta o inicia sesión
3. Obtén tu token de API desde el panel de control

### 2. Configurar el Token

Tienes dos opciones para configurar el token:

#### Opción A: Variable de Entorno (Recomendado para producción)

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_FACTILIZA_TOKEN=tu_token_aqui
```

#### Opción B: Interfaz de Usuario (Recomendado para desarrollo)

1. En la página de login, haz clic en "Configurar API Factiliza" (en la parte inferior)
2. Ingresa tu token
3. Haz clic en "Guardar"

El token se guardará en `localStorage` y se usará automáticamente.

## Funcionamiento

### Flujo de Autocompletado

1. El usuario ingresa un DNI de 8 dígitos
2. El sistema primero busca en la base de datos local
3. Si no encuentra el votante:
   - Consulta la API de Factiliza
   - Autocompleta: Nombres, Apellidos y Fecha de Nacimiento
   - El usuario debe ingresar manualmente: Región y Distrito

### Endpoint Utilizado

```
GET https://api.factiliza.com/v1/dni/info/{dni}
Authorization: Bearer {token}
```

### Respuesta Esperada

```json
{
  "numero": "12345678",
  "nombre_completo": "JUAN CARLOS PEREZ GARCIA",
  "nombres": "JUAN CARLOS",
  "apellido_paterno": "PEREZ",
  "apellido_materno": "GARCIA",
  "fecha_nacimiento": "1990-01-15",
  "ubigeo": "150101",
  "direccion": "AV EJEMPLO 123"
}
```

## Código Relevante

### Servicio (src/services/voteService.ts)

```typescript
export const getDniInfoFromFactiliza = async (
  dni: string, 
  token?: string
): Promise<FactilizaDniResponse> => {
  // Implementación...
}
```

### Componente (src/pages/VotePage.tsx)

El autocompletado se activa automáticamente cuando el usuario ingresa un DNI válido de 8 dígitos.

## Manejo de Errores

- **Token no configurado**: Se muestra un mensaje en consola
- **DNI no encontrado**: Se registra en consola, el usuario puede ingresar datos manualmente
- **Error de red**: Se captura y registra, no interrumpe el flujo del usuario

## Seguridad

- El token se almacena en `localStorage` con el prefijo `sen:factilizaToken`
- El token nunca se expone en el código fuente
- Se recomienda usar variables de entorno en producción

## Limitaciones

- La API de Factiliza puede tener límites de uso según tu plan
- Solo funciona con DNIs peruanos válidos
- Requiere conexión a internet

## Soporte

Para problemas con la API de Factiliza, contacta a su soporte en [https://factiliza.com/soporte](https://factiliza.com/soporte)
