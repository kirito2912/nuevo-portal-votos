"""
Script para crear o actualizar el usuario admin en la base de datos
"""
import pyodbc
import hashlib
import os
from dotenv import load_dotenv

load_dotenv()

DB_SERVER = os.getenv("DB_SERVER", "DESKTOP-9HF4IO3\\PC")
DB_DATABASE = os.getenv("DB_DATABASE", "SISTEMA_ELECTORAL")
DB_DRIVER = os.getenv("DB_DRIVER", "SQL Server")
DB_TRUSTED_CONNECTION = os.getenv("DB_TRUSTED_CONNECTION", "true").lower() == "true"

def get_db_connection():
    """Crea una conexión a SQL Server"""
    if DB_TRUSTED_CONNECTION:
        connection_string = (
            f"DRIVER={{{DB_DRIVER}}};"
            f"SERVER={DB_SERVER};"
            f"DATABASE={DB_DATABASE};"
            "Trusted_Connection=yes;"
            "TrustServerCertificate=yes;"
        )
    else:
        DB_USER = os.getenv("DB_USER", "")
        DB_PASSWORD = os.getenv("DB_PASSWORD", "")
        connection_string = (
            f"DRIVER={{{DB_DRIVER}}};"
            f"SERVER={DB_SERVER};"
            f"DATABASE={DB_DATABASE};"
            f"UID={DB_USER};"
            f"PWD={DB_PASSWORD};"
            "TrustServerCertificate=yes;"
        )
    return pyodbc.connect(connection_string)

def hash_password(password: str) -> str:
    """Hashea una contraseña usando SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

try:
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Contraseña por defecto: Pipe123 (según el frontend)
    password = "Pipe123"
    hashed_password = hash_password(password)
    
    print(f"Creando/actualizando usuario admin...")
    print(f"Contraseña: {password}")
    print(f"Hash: {hashed_password}")
    print()
    
    # Lista de emails admin posibles
    admin_emails = [
        'admin@grupo3.com',
        'admin@electoral.gov'
    ]
    
    for email in admin_emails:
        # Verificar si el usuario existe
        cursor.execute("SELECT ID_USUARIO, CORREO, ROL FROM USUARIO WHERE CORREO = ?", (email,))
        row = cursor.fetchone()
        
        if row:
            # Actualizar el hash si existe
            cursor.execute(
                "UPDATE USUARIO SET CONTRASENA = ?, ROL = ? WHERE CORREO = ?",
                (hashed_password, 'admin', email)
            )
            conn.commit()
            print(f"[OK] Usuario {email} actualizado con contraseña '{password}'")
        else:
            # Crear el usuario si no existe
            cursor.execute(
                "INSERT INTO USUARIO (CORREO, CONTRASENA, ROL) OUTPUT INSERTED.ID_USUARIO VALUES (?, ?, ?)",
                (email, hashed_password, 'admin')
            )
            id_usuario = cursor.fetchone()[0]
            conn.commit()
            print(f"[OK] Usuario {email} creado con ID {id_usuario} y contraseña '{password}'")
    
    print()
    print("Usuarios admin en la base de datos:")
    cursor.execute("SELECT ID_USUARIO, CORREO, ROL FROM USUARIO WHERE ROL = 'admin'")
    for r in cursor.fetchall():
        print(f"  - {r[1]} (ID: {r[0]}, Rol: {r[2]})")
    
    cursor.close()
    conn.close()
    print()
    print("[OK] Proceso completado exitosamente!")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()

