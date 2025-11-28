"""
Script para probar el login del admin
"""
import requests
import json

API_URL = "http://localhost:8000/api/auth/login"

# Credenciales a probar
credentials = {
    "correo": "admin@grupo3.com",
    "contrasena": "12345"
}

print("Probando login del admin...")
print(f"URL: {API_URL}")
print(f"Credenciales: {credentials}")
print()

try:
    response = requests.post(
        API_URL,
        json=credentials,
        headers={"Content-Type": "application/json"},
        timeout=5
    )
    
    print(f"Status Code: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    print()
    
    if response.status_code == 200:
        data = response.json()
        print("[OK] Login exitoso!")
        print(f"Respuesta: {json.dumps(data, indent=2)}")
    else:
        try:
            error_data = response.json()
            print(f"[ERROR] Login falló:")
            print(f"  Detalle: {error_data.get('detail', 'Error desconocido')}")
        except:
            print(f"[ERROR] Login falló:")
            print(f"  Respuesta: {response.text}")
            
except requests.exceptions.ConnectionError:
    print("[ERROR] No se pudo conectar al backend")
    print("  Asegúrate de que el backend esté corriendo en http://localhost:8000")
except requests.exceptions.Timeout:
    print("[ERROR] Timeout al conectar al backend")
except Exception as e:
    print(f"[ERROR] Error inesperado: {e}")
    import traceback
    traceback.print_exc()

