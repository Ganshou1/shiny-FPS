@echo off
echo Setting up autostart for FPS Management System...

:: Create a shortcut in the startup folder
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateStartupShortcut.vbs"
echo sLinkFile = oWS.SpecialFolders("Startup") ^& "\FPS-Management-System.lnk" >> "%TEMP%\CreateStartupShortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateStartupShortcut.vbs"
echo oLink.TargetPath = "D:\APP\start-server.bat" >> "%TEMP%\CreateStartupShortcut.vbs"
echo oLink.WorkingDirectory = "D:\APP" >> "%TEMP%\CreateStartupShortcut.vbs"
echo oLink.Description = "Start FPS Management System" >> "%TEMP%\CreateStartupShortcut.vbs"
echo oLink.Save >> "%TEMP%\CreateStartupShortcut.vbs"
cscript /nologo "%TEMP%\CreateStartupShortcut.vbs"
del "%TEMP%\CreateStartupShortcut.vbs"

:: Create a shortcut for the keep-alive script
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateKeepAliveShortcut.vbs"
echo sLinkFile = oWS.SpecialFolders("Startup") ^& "\FPS-Management-KeepAlive.lnk" >> "%TEMP%\CreateKeepAliveShortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateKeepAliveShortcut.vbs"
echo oLink.TargetPath = "D:\APP\keep-alive.bat" >> "%TEMP%\CreateKeepAliveShortcut.vbs"
echo oLink.WorkingDirectory = "D:\APP" >> "%TEMP%\CreateKeepAliveShortcut.vbs"
echo oLink.Description = "Keep FPS Management System Running" >> "%TEMP%\CreateKeepAliveShortcut.vbs"
echo oLink.Save >> "%TEMP%\CreateKeepAliveShortcut.vbs"
cscript /nologo "%TEMP%\CreateKeepAliveShortcut.vbs"
del "%TEMP%\CreateKeepAliveShortcut.vbs"

echo Setup complete! The FPS Management System will start automatically when you log in.
echo Press any key to exit...
pause > nul 