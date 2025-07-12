@echo off
echo Getting your local network URL for FPS Management System...
echo.

:: Get the local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set ip=%%a
    goto :found
)

:found
set ip=%ip:~1%
echo Your FPS Management System is accessible at:
echo http://%ip%:3001
echo.
echo Make sure:
echo 1. Your Vue app is running (npm run dev)
echo 2. You are on the same network as the device you're trying to access from
echo 3. Windows Firewall allows incoming connections on port 3001
echo.
echo Press any key to exit...
pause > nul 