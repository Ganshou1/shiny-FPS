@echo off
echo Starting service monitor...
echo This window will keep your services running. Do not close it.

:loop
:: Check if Vue app is running
tasklist /FI "IMAGENAME eq node.exe" | find "node.exe" > nul
if errorlevel 1 (
    echo Vue app is not running. Restarting...
    start cmd /c "cd /d D:\APP && npm run dev"
    timeout /t 10 /nobreak
)

:: Check if SSH tunnel is running
tasklist /FI "IMAGENAME eq ssh.exe" | find "ssh.exe" > nul
if errorlevel 1 (
    echo SSH tunnel is not running. Restarting...
    start cmd /c "ssh -R 80:localhost:3001 localhost.run"
    timeout /t 5 /nobreak
)

echo Services checked at %time%
timeout /t 30 /nobreak
goto loop 