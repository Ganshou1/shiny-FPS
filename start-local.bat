@echo off
echo Starting FPS Management System locally...

:: Start Vue app
start cmd /c "cd /d D:\APP && npm run dev"

:: Wait for Vue app to start
timeout /t 10 /nobreak

:: Open the redirect page
start "" "D:\APP\redirect.html"

:: Display local network IP for access from other devices
echo.
echo Your FPS Management System is starting locally.
echo.
echo To access from this computer:
echo http://localhost:3001
echo.
echo To access from other devices on your network, use your computer's IP address:
ipconfig | findstr /i "IPv4"
echo.
echo For example: http://YOUR-IP-ADDRESS:3001
echo.
echo Press any key to exit this window...
pause > nul 