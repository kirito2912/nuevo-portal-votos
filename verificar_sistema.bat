@echo off
echo ========================================
echo VERIFICACION COMPLETA DEL SISTEMA
echo ========================================
echo.

echo [1/5] Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado
    exit /b 1
)
echo OK
echo.

echo [2/5] Verificando Python...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python no esta instalado
    exit /b 1
)
echo OK
echo.

echo [3/5] Verificando dependencias del frontend...
call npm list --depth=0
if %errorlevel% neq 0 (
    echo ADVERTENCIA: Algunas dependencias pueden faltar
    echo Ejecutando: npm install
    call npm install
)
echo OK
echo.

echo [4/5] Compilando frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: El frontend no compila correctamente
    exit /b 1
)
echo OK
echo.

echo [5/5] Verificando sintaxis del backend...
python -m py_compile backend/main.py
if %errorlevel% neq 0 (
    echo ERROR: El backend tiene errores de sintaxis
    exit /b 1
)
echo OK
echo.

echo ========================================
echo VERIFICACION COMPLETADA EXITOSAMENTE
echo ========================================
echo.
echo El sistema esta listo para ejecutarse:
echo - Frontend: npm run dev
echo - Backend: cd backend ^&^& python -m uvicorn main:app --reload
echo.
pause
