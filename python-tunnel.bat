@echo off
echo Setting up Python HTTP server for FPS Management System...

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed. Please install Python first.
    echo You can download it from https://www.python.org/downloads/
    pause
    exit /b
)

:: Create a simple Python reverse proxy
echo Creating Python reverse proxy script...
echo import http.server, socketserver, urllib.request, sys > proxy.py
echo class ProxyHandler(http.server.BaseHTTPRequestHandler): >> proxy.py
echo     def do_GET(self): >> proxy.py
echo         try: >> proxy.py
echo             url = 'http://localhost:3003' + self.path >> proxy.py
echo             print(f"Forwarding request to {url}") >> proxy.py
echo             response = urllib.request.urlopen(url) >> proxy.py
echo             self.send_response(response.status) >> proxy.py
echo             for header, value in response.getheaders(): >> proxy.py
echo                 self.send_header(header, value) >> proxy.py
echo             self.end_headers() >> proxy.py
echo             self.wfile.write(response.read()) >> proxy.py
echo         except Exception as e: >> proxy.py
echo             print(f"Error: {e}") >> proxy.py
echo             self.send_response(500) >> proxy.py
echo             self.end_headers() >> proxy.py
echo             self.wfile.write(f"Error: {e}".encode()) >> proxy.py
echo     def do_POST(self): >> proxy.py
echo         try: >> proxy.py
echo             content_length = int(self.headers['Content-Length']) >> proxy.py
echo             post_data = self.rfile.read(content_length) >> proxy.py
echo             url = 'http://localhost:3003' + self.path >> proxy.py
echo             print(f"Forwarding POST request to {url}") >> proxy.py
echo             req = urllib.request.Request(url, data=post_data, headers=self.headers) >> proxy.py
echo             response = urllib.request.urlopen(req) >> proxy.py
echo             self.send_response(response.status) >> proxy.py
echo             for header, value in response.getheaders(): >> proxy.py
echo                 self.send_header(header, value) >> proxy.py
echo             self.end_headers() >> proxy.py
echo             self.wfile.write(response.read()) >> proxy.py
echo         except Exception as e: >> proxy.py
echo             print(f"Error: {e}") >> proxy.py
echo             self.send_response(500) >> proxy.py
echo             self.end_headers() >> proxy.py
echo             self.wfile.write(f"Error: {e}".encode()) >> proxy.py
echo PORT = 8000 >> proxy.py
echo Handler = ProxyHandler >> proxy.py
echo with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd: >> proxy.py
echo     print(f"Serving at port {PORT}") >> proxy.py
echo     httpd.serve_forever() >> proxy.py

:: Kill any existing node processes
taskkill /F /IM node.exe 2>nul

:: Start Vue app
echo Starting Vue app...
start cmd /c "cd /d D:\APP && npm run dev"

:: Wait for Vue app to start
echo Waiting for Vue app to start...
timeout /t 10 /nobreak

:: Start Python proxy server
echo Starting Python proxy server...
start cmd /c "python proxy.py"

:: Open firewall port
echo Opening firewall port...
netsh advfirewall firewall add rule name="FPS Management System (8000)" dir=in action=allow protocol=TCP localport=8000

:: Get IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set ip=%%a
    goto :found
)

:found
set ip=%ip:~1%

echo.
echo Your FPS Management System should now be accessible at:
echo http://%ip%:8000
echo.
echo Share this URL with others on your network.
echo.
echo Keep all windows open to maintain the connection.
echo Press any key to exit...
pause > nul 