# 서버 재시작 스크립트

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "서버 재시작" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Set-Location $PSScriptRoot

# 1. 기존 Node.js 프로세스 종료
Write-Host "1. 기존 서버 종료 중..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host "   ✅ 기존 프로세스 종료 완료" -ForegroundColor Green
    Start-Sleep -Seconds 2
} else {
    Write-Host "   ℹ️  실행 중인 서버가 없습니다" -ForegroundColor Gray
}

# 2. 포트 3000 확인
Write-Host "`n2. 포트 3000 확인 중..." -ForegroundColor Yellow
$portInUse = netstat -ano | findstr ":3000" | findstr "LISTENING"
if ($portInUse) {
    Write-Host "   ⚠️  포트 3000이 아직 사용 중입니다" -ForegroundColor Yellow
    Start-Sleep -Seconds 3
} else {
    Write-Host "   ✅ 포트 3000 사용 가능" -ForegroundColor Green
}

# 3. node_modules 확인
Write-Host "`n3. 패키지 확인 중..." -ForegroundColor Yellow
if (Test-Path node_modules\next) {
    Write-Host "   ✅ 패키지 설치 확인" -ForegroundColor Green
} else {
    Write-Host "   ❌ node_modules가 없습니다. npm install을 실행하세요." -ForegroundColor Red
    exit 1
}

# 4. 서버 시작
Write-Host "`n4. 개발 서버 시작 중...`n" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Gray
Write-Host "서버가 시작되면 브라우저에서" -ForegroundColor Cyan
Write-Host "http://localhost:3000 을 열어주세요" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Gray

# 서버 시작
cmd /c npm run dev
