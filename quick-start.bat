@echo off
echo ========================================
echo Next.js 개발 서버 시작
echo ========================================
echo.

cd /d %~dp0

echo 패키지 확인 중...
if not exist node_modules (
    echo node_modules가 없습니다. npm install을 실행합니다...
    call npm install
    if errorlevel 1 (
        echo 설치 실패!
        pause
        exit /b 1
    )
)

echo.
echo 개발 서버 시작 중...
echo 브라우저에서 http://localhost:3000 을 열어주세요.
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo.

call npm run dev

pause
