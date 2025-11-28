# Configuración de Usuario en Azure SQL Database

## Problema Actual

El usuario `admin_electoral` puede conectarse al servidor Azure SQL, pero no tiene permisos para acceder a la base de datos `SISTEMA_ELECTORAL`.

## Solución: Configurar Usuario en Azure Portal

### Paso 1: Acceder a Query Editor en Azure Portal

1. Ve a [Azure Portal](https://portal.azure.com)
2. Navega a tu SQL Database: `electoral-system-2024`
3. En el menú lateral, busca **"Query editor (preview)"** o **"Editor de consultas"**
4. Inicia sesión con las credenciales de administrador del servidor SQL

### Paso 2: Ejecutar Comandos SQL

Una vez en el Query Editor, ejecuta estos comandos en orden:

```sql
-- Cambiar al contexto de la base de datos
USE [SISTEMA_ELECTORAL];

-- Crear el usuario en la base de datos (mapear el login del servidor)
CREATE USER [admin_electoral] FOR LOGIN [admin_electoral];

-- Asignar permisos de propietario (acceso completo)
ALTER ROLE db_owner ADD MEMBER [admin_electoral];
```

### Paso 3: Verificar la Configuración

Después de ejecutar los comandos, verifica que funcionó:

```sql
-- Verificar que el usuario existe
SELECT name, type_desc 
FROM sys.database_principals 
WHERE name = 'admin_electoral';

-- Verificar los roles asignados
SELECT dp.name, r.name as role_name
FROM sys.database_role_members rm
JOIN sys.database_principals r ON rm.role_principal_id = r.principal_id
JOIN sys.database_principals dp ON rm.member_principal_id = dp.principal_id
WHERE dp.name = 'admin_electoral';
```

### Paso 4: Probar la Conexión

Una vez configurado, ejecuta desde tu terminal:

```bash
cd backend
python test_azure_connection.py
```

O reinicia tu servidor backend y prueba la aplicación.

## Configuración Actual

Tu archivo `config.env` ya está configurado con:

```env
DB_SERVER=electoral-system-2024.database.windows.net
DB_DATABASE=SISTEMA_ELECTORAL
DB_USER=admin_electoral
DB_PASSWORD=Eduardo123
DB_DRIVER=SQL Server
DB_TRUSTED_CONNECTION=false
```

## Notas Importantes

1. **Firewall de Azure**: Asegúrate de que tu IP esté permitida en el firewall de Azure SQL Database
2. **Usuario Administrador**: Necesitas usar el usuario administrador del servidor (no `admin_electoral`) para ejecutar los comandos de configuración
3. **Permisos**: El rol `db_owner` da acceso completo a la base de datos. Si prefieres permisos más restrictivos, usa `db_datareader` y `db_datawriter`

## Alternativa: Usar el Usuario Administrador del Servidor

Si `admin_electoral` es el administrador del servidor, puedes intentar conectarte directamente usando esas credenciales en el Query Editor de Azure Portal.

