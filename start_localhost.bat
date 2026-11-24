@echo off
echo ========================================================
echo   Tech Karma Classes - Localhost Auto-Launcher
echo ========================================================

REM 1. Check if MongoDB is running on port 27017
netstat -ano | findstr 27017 >nul
if %errorlevel% neq 0 (
    echo [1/3] Starting MongoDB Server with official student database...
    start /b "" mongod --config "D:\Microsoft VS Code\bin\mongod.cfg"
    timeout /t 3 >nul
) else (
    echo [1/3] MongoDB is already active on port 27017.
)

REM 2. Start Backend API Server
echo [2/3] Starting Backend Server on port 5000...
start "TechKarma Backend" cmd /k "cd /d %~dp0backend && node server.js"

REM 3. Start Frontend Vite Dev Server
echo [3/3] Starting Frontend Vite Server on port 5173...
start "TechKarma Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 4 >nul
start http://localhost:5173/admin
echo.
echo ========================================================
echo   Tech Karma Classes is live at http://localhost:5173
echo ========================================================
