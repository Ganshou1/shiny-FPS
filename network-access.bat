@echo off
echo Setting up network access for FPS Management System...

:: Start Vue app with host set to 0.0.0.0 to allow external connections
start cmd /c "cd /d D:\APP && set HOST=0.0.0.0 && npm run dev"

:: Wait for Vue app to start
timeout /t 10 /nobreak

:: Open firewall port
netsh advfirewall firewall add rule name="FPS Management System (3001)" dir=in action=allow protocol=TCP localport=3001

:: Get IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set ip=%%a
    goto :found
)

:found
set ip=%ip:~1%

echo.
echo Your FPS Management System is now accessible at:
echo http://%ip%:3001
echo.
echo Share this URL with others on your network.
echo They can access the system by entering this URL in their browser.
echo.
echo Keep this window open to maintain the connection.
echo Press any key to exit...
pause > nul 