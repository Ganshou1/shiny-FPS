@echo off
echo Setting up public access for FPS Management System...

:: Download ngrok if not present
if not exist ngrok.exe (
    echo Downloading ngrok...
    curl -Lo ngrok.zip https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip
    echo Extracting ngrok...
    powershell -command "Expand-Archive -Path ngrok.zip -DestinationPath . -Force"
    del ngrok.zip
)

:: Kill any existing node processes
taskkill /F /IM node.exe 2>nul

:: Start Vue app with a specific port
echo Starting Vue app...
start cmd /c "cd /d D:\APP && set PORT=3003 && npm run dev"

:: Wait for Vue app to start
echo Waiting for Vue app to start...
timeout /t 10 /nobreak

:: Start ngrok
echo Starting ngrok tunnel...
start cmd /c "ngrok http 3003 --log=stdout"

:: Wait for ngrok to start
timeout /t 5 /nobreak

echo.
echo Your FPS Management System should now be accessible at the URL shown in the ngrok window.
echo It should look like: https://xxxx-xxx-xxx-xx.ngrok-free.app
echo.
echo IMPORTANT: Copy that URL from the ngrok window and share it with others.
echo.
echo Keep all windows open to maintain the connection.
echo Press any key to exit...
pause > nul 