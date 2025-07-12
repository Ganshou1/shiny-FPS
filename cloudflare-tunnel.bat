@echo off
echo Setting up Cloudflare Tunnel for FPS Management System...

:: Check if cloudflared is already installed
where cloudflared >nul 2>&1
if %errorlevel% neq 0 (
    echo Downloading Cloudflare Tunnel client...
    curl -Lo cloudflared.exe https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe
)

:: Start Vue app in background if not already running
tasklist /FI "IMAGENAME eq node.exe" | find "node.exe" > nul
if errorlevel 1 (
    echo Starting Vue app...
    start cmd /c "cd /d D:\APP && npm run dev"
    timeout /t 10 /nobreak
)

:: Start Cloudflare Tunnel
echo Creating public URL with Cloudflare Tunnel...
start cmd /c "cloudflared.exe tunnel --url http://localhost:3001"

:: Wait a moment for the tunnel to establish
timeout /t 5 /nobreak

echo.
echo Your FPS Management System should now be accessible at the URL shown in the Cloudflare Tunnel window.
echo.
echo Keep that window open to maintain the connection.
echo Press any key to exit...
pause > nul 