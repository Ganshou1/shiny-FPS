@echo off
echo Setting up Windows Firewall rule for FPS Management System...
echo.

:: Add firewall rule for inbound connections on port 3001
netsh advfirewall firewall add rule name="FPS Management System (3001)" dir=in action=allow protocol=TCP localport=3001

echo.
echo Firewall rule has been added.
echo Your FPS Management System should now be accessible from other devices on your network.
echo.
echo Press any key to exit...
pause > nul 