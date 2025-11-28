@echo off
echo ========================================
echo DIAGNOSTICO PARA VERCEL
echo ========================================
echo.

echo [1] Verificando líneas 1130-1131 en VotePage.tsx...
powershell -Command "$lines = Get-Content src/pages/VotePage.tsx; for($i=1128; $i -lt 1134; $i++) { Write-Host \"Linea $($i+1): $($lines[$i])\" }"
echo.

echo [2] Contando líneas totales...
powershell -Command "(Get-Content src/pages/VotePage.tsx).Count"
echo.

echo [3] Verificando sintaxis TypeScript...
call npx tsc --noEmit
echo.

echo [4] Build de producción...
call npm run build
echo.

echo ========================================
echo DIAGNOSTICO COMPLETADO
echo ========================================
pause
