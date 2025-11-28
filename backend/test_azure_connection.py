"""Script para probar la conexión a Azure SQL Database"""
import pyodbc
import os
from dotenv import load_dotenv

load_dotenv("config.env")

DB_SERVER = os.getenv("DB_SERVER")
DB_DATABASE = os.getenv("DB_DATABASE")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DRIVER = os.getenv("DB_DRIVER")

print(f"Servidor: {DB_SERVER}")
print(f"Usuario: {DB_USER}")
print(f"Base de datos: {DB_DATABASE}")
print(f"Controlador: {DB_DRIVER}")
print()

# Intentar conectar sin especificar base de datos primero
try:
    print("1. Intentando conectar sin especificar base de datos...")
    connection_string = (
        f"DRIVER={{{DB_DRIVER}}};"
        f"SERVER={DB_SERVER};"
        f"UID={DB_USER};"
        f"PWD={DB_PASSWORD};"
        "Encrypt=yes;"
        "TrustServerCertificate=no;"
    )
    conn = pyodbc.connect(connection_string, timeout=10)
    print("   OK: Conexión exitosa!")
    
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sys.databases WHERE name NOT IN ('master', 'tempdb', 'model', 'msdb')")
    databases = cursor.fetchall()
    print("\n   Bases de datos disponibles:")
    for db in databases:
        print(f"     - {db[0]}")
    
    conn.close()
    
    # Ahora intentar conectar a la base de datos especificada
    print(f"\n2. Intentando conectar a la base de datos '{DB_DATABASE}'...")
    
    # Intentar con el nombre exacto de la lista
    db_name_from_list = databases[0][0] if databases else DB_DATABASE
    print(f"   Usando nombre de BD: {db_name_from_list}")
    
    # Primero, verificar permisos del usuario
    print("\n   Verificando permisos del usuario...")
    cursor.execute(f"""
        SELECT dp.name, dp.type_desc, p.permission_name, p.state_desc
        FROM sys.database_permissions p
        JOIN sys.database_principals dp ON p.grantee_principal_id = dp.principal_id
        WHERE dp.name = '{DB_USER}'
    """)
    permissions = cursor.fetchall()
    if permissions:
        print("   Permisos encontrados:")
        for perm in permissions:
            print(f"     - {perm[0]}: {perm[2]} ({perm[3]})")
    else:
        print("   No se encontraron permisos específicos para este usuario")
        print("   Intentando asignar permisos...")
        try:
            # Intentar usar la base de datos master y luego cambiar de contexto
            cursor.execute(f"USE [{db_name_from_list}]")
            print(f"   OK: Cambio de contexto a {db_name_from_list} exitoso")
        except Exception as e:
            print(f"   ERROR al cambiar contexto: {e}")
    
    # Intentar conectar directamente
    try:
        connection_string = (
            f"DRIVER={{{DB_DRIVER}}};"
            f"SERVER={DB_SERVER};"
            f"DATABASE={db_name_from_list};"
            f"UID={DB_USER};"
            f"PWD={DB_PASSWORD};"
            "Encrypt=yes;"
            "TrustServerCertificate=no;"
        )
        conn2 = pyodbc.connect(connection_string, timeout=10)
        print(f"   OK: Conexión exitosa a '{db_name_from_list}'!")
        
        cursor2 = conn2.cursor()
        cursor2.execute("SELECT @@VERSION")
        version = cursor2.fetchone()
        print(f"   Versión SQL Server: {version[0][:80]}...")
        
        conn2.close()
        print("\n✅ Conexión a Azure SQL Database exitosa!")
    except Exception as e2:
        print(f"   ERROR al conectar directamente: {e2}")
        print("\n   Sugerencia: El usuario necesita ser asignado a la base de datos en Azure.")
        print("   Puedes hacerlo desde Azure Portal o ejecutando:")
        print(f"   CREATE USER [{DB_USER}] FOR LOGIN [{DB_USER}];")
        print(f"   ALTER ROLE db_owner ADD MEMBER [{DB_USER}];")
    
except Exception as e:
    print(f"   ERROR: {str(e)}")
    print("\nPosibles soluciones:")
    print("1. Verifica que el nombre de la base de datos sea correcto")
    print("2. Verifica que el usuario tenga permisos para acceder a la base de datos")
    print("3. Verifica que el firewall de Azure permita tu IP")

