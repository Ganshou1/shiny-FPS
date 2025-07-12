@echo off
echo 准备部署FPS管理系统到GitHub Pages...

:: 确保dist目录存在
if not exist "dist" (
    echo 错误: dist目录不存在，请先运行 npm run build
    pause
    exit /b
)

:: 确保dist目录中有index.html
if not exist "dist\index.html" (
    echo 错误: dist\index.html不存在，构建可能不完整
    pause
    exit /b
)

echo.
echo 请确认以下信息:
echo 1. 您已经在GitHub上创建了仓库 "shiny-FPS"
echo 2. 您已经配置了Git
echo 3. 您有权限推送到该仓库
echo.
pause

:: 创建临时目录
echo 创建临时目录...
if exist "temp_deploy" rd /s /q "temp_deploy"
mkdir "temp_deploy"

:: 复制dist目录内容到临时目录
echo 复制构建文件...
xcopy "dist\*" "temp_deploy\" /e /i /h

:: 在临时目录中初始化Git仓库
echo 初始化Git仓库...
cd temp_deploy
git init
git add .
git commit -m "Deploy FPS Management System to GitHub Pages"

:: 添加远程仓库并推送
echo 推送到GitHub...
git remote add origin https://github.com/ganshou1/shiny-FPS.git
git branch -M main
git push -f origin main:gh-pages

:: 清理
cd ..
echo 清理临时文件...
rd /s /q "temp_deploy"

echo.
echo 部署完成！
echo 您的网站将在几分钟后可以通过以下地址访问:
echo https://ganshou1.github.io/shiny-FPS/
echo.
pause 