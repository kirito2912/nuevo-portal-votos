@echo off
echo ====================================
echo   Iniciando Backend Sistema Electoral
echo ====================================
echo.

REM Verificar si existe el archivo .env o config.env
if not exist .env (
    if not exist config.env (
        echo [ERROR] No se encontro el archivo .env ni config.env
        echo Por favor crea el archivo .env con las credenciales de SQL Server
        echo.
        echo Ejemplo:
        echo DB_SERVER=localhost
        echo DB_DATABASE=SISTEMA_ELECTORAL
        echo DB_USER=
        echo DB_PASSWORD=
        echo DB_DRIVER=ODBC Driver 17 for SQL Server
        echo DB_TRUSTED_CONNECTION=true
        echo.
        pause
        exit /b 1
    )
    echo Usando config.env como archivo de configuracion
)

echo Verificando dependencias...
python -c "import fastapi" 2>nul
if errorlevel 1 (
    echo Instalando dependencias...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo [ERROR] No se pudieron instalar las dependencias
        pause
        exit /b 1
    )
)

echo.
echo Iniciando servidor en http://localhost:8000
echo Presiona Ctrl+C para detener el servidor
echo.
python -m uvicorn main:app --reload --port 8000

pause

