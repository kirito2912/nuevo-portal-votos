"""Script para configurar el usuario en Azure SQL Database"""
import pyodbc
import os
from dotenv import load_dotenv

load_dotenv("config.env")

DB_SERVER = os.getenv("DB_SERVER")
DB_DATABASE = os.getenv("DB_DATABASE")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DRIVER = os.getenv("DB_DRIVER")

print("Configurando usuario en Azure SQL Database...")
print(f"Servidor: {DB_SERVER}")
print(f"Base de datos: {DB_DATABASE}")
print(f"Usuario: {DB_USER}")
print()

try:
    # Primero, obtener el nombre exacto de la base de datos desde el servidor
    print("1. Conectando al servidor para obtener información...")
    connection_string_server = (
        f"DRIVER={{{DB_DRIVER}}};"
        f"SERVER={DB_SERVER};"
        f"UID={DB_USER};"
        f"PWD={DB_PASSWORD};"
        "Encrypt=yes;"
        "TrustServerCertificate=no;"
    )
    
    conn_server = pyodbc.connect(connection_string_server, timeout=10)
    print("   OK: Conexión al servidor exitosa!")
    
    cursor_server = conn_server.cursor()
    cursor_server.execute("SELECT name FROM sys.databases WHERE name NOT IN ('master', 'tempdb', 'model', 'msdb')")
    all_dbs = cursor_server.fetchall()
    
    db_name = None
    db_name_clean = DB_DATABASE
    for db in all_dbs:
        db_candidate = db[0].strip('"\'')
        if db_candidate.upper() == DB_DATABASE.upper():
            db_name_clean = db_candidate
            break
    
    if all_dbs:
        db_name_clean = all_dbs[0][0].strip('"\'')
    
    conn_server.close()
    print(f"   Base de datos a usar: {db_name_clean}")
    
    # Intentar conectar directamente a la base de datos
    print(f"\n2. Intentando conectar directamente a la base de datos '{db_name_clean}'...")
    connection_string_db = (
        f"DRIVER={{{DB_DRIVER}}};"
        f"SERVER={DB_SERVER};"
        f"DATABASE={db_name_clean};"
        f"UID={DB_USER};"
        f"PWD={DB_PASSWORD};"
        "Encrypt=yes;"
        "TrustServerCertificate=no;"
    )
    
    try:
        conn = pyodbc.connect(connection_string_db, timeout=10)
        print("   OK: Conexión directa exitosa!")
        cursor = conn.cursor()
        
        # Verificar si el usuario ya existe en la base de datos
        print(f"\n3. Verificando si el usuario '{DB_USER}' existe en la base de datos...")
        cursor.execute("""
            SELECT name, type_desc 
            FROM sys.database_principals 
            WHERE name = ?
        """, DB_USER)
        user_exists = cursor.fetchone()
        
        if user_exists:
            print(f"   El usuario '{DB_USER}' ya existe (tipo: {user_exists[1]})")
        else:
            print(f"   El usuario '{DB_USER}' no existe en la base de datos")
            print(f"   Creando usuario '{DB_USER}' en la base de datos...")
            
            # Crear el usuario en la base de datos
            # En Azure SQL, el usuario del servidor debe mapearse a un usuario de base de datos
            cursor.execute(f"""
                CREATE USER [{DB_USER}] FOR LOGIN [{DB_USER}];
            """)
            conn.commit()
            print("   OK: Usuario creado en la base de datos")
        
        # Asignar permisos (db_owner para acceso completo)
        print(f"\n4. Asignando permisos al usuario '{DB_USER}'...")
        try:
            cursor.execute(f"""
                ALTER ROLE db_owner ADD MEMBER [{DB_USER}];
            """)
            conn.commit()
            print("   OK: Permisos asignados (db_owner)")
        except Exception as e:
            error_msg = str(e).lower()
            if "already exists" in error_msg or "ya existe" in error_msg or "already a member" in error_msg:
                print("   El usuario ya tiene permisos asignados")
            else:
                print(f"   Advertencia: {e}")
        
        # Verificar permisos
        print(f"\n5. Verificando permisos del usuario...")
        cursor.execute("""
            SELECT dp.name, r.name as role_name
            FROM sys.database_role_members rm
            JOIN sys.database_principals r ON rm.role_principal_id = r.principal_id
            JOIN sys.database_principals dp ON rm.member_principal_id = dp.principal_id
            WHERE dp.name = ?
        """, DB_USER)
        roles = cursor.fetchall()
        if roles:
            print("   Roles asignados:")
            for role in roles:
                print(f"     - {role[1]}")
        else:
            print("   No se encontraron roles asignados")
        
        # Probar una consulta
        cursor.execute("SELECT DB_NAME()")
        current_db = cursor.fetchone()
        print(f"\n   Base de datos actual: {current_db[0]}")
        
        conn.close()
        print("\n✅ Configuración completada exitosamente!")
        print(f"\nAhora puedes usar la base de datos '{db_name_clean}' con el usuario '{DB_USER}'")
        
    except pyodbc.OperationalError as conn_error:
        error_msg = str(conn_error)
        if "Cannot open database" in error_msg or "login failed" in error_msg:
            print(f"   ERROR: El usuario '{DB_USER}' no tiene acceso a la base de datos '{db_name_clean}'")
            print("\n   SOLUCIÓN: Necesitas ejecutar estos comandos SQL en Azure Portal:")
            print("   1. Ve a Azure Portal > SQL Database > Query Editor")
            print("   2. Conéctate como administrador del servidor")
            print("   3. Ejecuta estos comandos:")
            print()
            print(f"   USE [{db_name_clean}];")
            print(f"   CREATE USER [{DB_USER}] FOR LOGIN [{DB_USER}];")
            print(f"   ALTER ROLE db_owner ADD MEMBER [{DB_USER}];")
            print()
            raise Exception("El usuario necesita ser configurado manualmente en Azure Portal")
        else:
            raise
    
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")
    print("\nPosibles soluciones:")
    print("1. Verifica que el usuario tenga permisos de administrador en el servidor")
    print("2. Ejecuta los comandos SQL manualmente desde Azure Portal Query Editor")
    print("3. Asegúrate de que el firewall de Azure permita tu IP")
