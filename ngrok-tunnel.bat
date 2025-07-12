@echo off
setlocal enabledelayedexpansion
echo Setting up ngrok tunnel for FPS Management System...

:: Check if ngrok is already installed
if not exist ngrok.exe (
    echo Downloading ngrok...
    curl -Lo ngrok.zip https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip
    echo Extracting ngrok...
    powershell -command "Expand-Archive -Path ngrok.zip -DestinationPath . -Force"
    del ngrok.zip
)

:: Start Vue app in background if not already running
tasklist /FI "IMAGENAME eq node.exe" | find "node.exe" > nul
if errorlevel 1 (
    echo Starting Vue app...
    start cmd /c "cd /d D:\APP && npm run dev"
    timeout /t 10 /nobreak
)

:: Check which port Vue is using (could be 3001, 3002, 3003, etc.)
for /f "tokens=2 delims=:" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr "300"') do (
    set port=%%a
    set port=!port:~1,4!
    if "!port:~0,3!"=="300" goto :portfound
)

:portfound
if "%port%"=="" set port=3001
echo Detected Vue app running on port %port%

:: Start ngrok without authentication
echo Starting ngrok tunnel...
start cmd /c "ngrok http %port% --log=stdout"

:: Wait for ngrok to start
timeout /t 5 /nobreak

:: Get the ngrok URL
echo.
echo Your FPS Management System should now be accessible at:
echo.
echo Check the ngrok window for your public URL (it looks like https://xxxx-xxx-xxx-xx.ngrok-free.app)
echo.
echo IMPORTANT: Copy that URL from the ngrok window and share it with others.
echo.
echo Keep all windows open to maintain the connection.
echo Press any key to exit...
pause > nul
endlocal 