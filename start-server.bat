@echo off
echo Starting Vue app and localhost.run tunnel...

:: Start Vue app in background
start cmd /c "cd /d D:\APP && npm run dev"

:: Wait for Vue app to start
timeout /t 10 /nobreak

:: Start localhost.run tunnel
start cmd /c "ssh -R 80:localhost:3001 localhost.run"

echo Services started! Check the SSH window for your app's URL
echo Press any key to exit this window...
pause > nul 