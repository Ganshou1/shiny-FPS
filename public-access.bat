@echo off
echo Setting up public access for FPS Management System...

:: First, install localtunnel globally if not already installed
cmd /c "npm install -g localtunnel"

:: Start Vue app in background if not already running
tasklist /FI "IMAGENAME eq node.exe" | find "node.exe" > nul
if errorlevel 1 (
    echo Starting Vue app...
    start cmd /c "cd /d D:\APP && npm run dev"
    timeout /t 10 /nobreak
)

:: Start localtunnel to expose the local server
echo Creating public URL with localtunnel...
start cmd /c "lt --port 3001 --subdomain fpsadmin"

:: Wait a moment for the tunnel to establish
timeout /t 5 /nobreak

echo.
echo Your FPS Management System should now be accessible at:
echo https://fpsadmin.loca.lt
echo.
echo If the subdomain 'fpsadmin' is already taken, check the command window
echo for the actual URL assigned by localtunnel.
echo.
echo Keep this window open to maintain the connection.
echo Press any key to exit...
pause > nul 