@echo off
echo ====================================
echo   Iniciando Backend Sistema Electoral
echo ====================================
echo.

REM Verificar si existe el archivo .env o config.env
if not exist .env (
    if not exist config.env (
        echo [ERROR] No se encontro el archivo .env ni config.env
        pause
        exit /b 1
    )
    echo Usando config.env como archivo de configuracion
)

echo Verificando conexion a la base de datos...
python test_connection.py
if errorlevel 1 (
    echo.
    echo [ERROR] No se pudo conectar a la base de datos
    echo Verifica la configuracion en config.env
    pause
    exit /b 1
)

echo.
echo Verificando usuario admin...
python check_admin_hash.py
echo.

echo Iniciando servidor en http://localhost:8000
echo Presiona Ctrl+C para detener el servidor
echo.
python -m uvicorn main:app --reload --port 8000

pause

