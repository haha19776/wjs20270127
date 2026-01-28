# Next.js 개발 서버 시작 스크립트

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next.js 개발 서버 시작" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 프로젝트 디렉토리로 이동
Set-Location $PSScriptRoot

# node_modules 확인
if (-not (Test-Path node_modules)) {
    Write-Host "❌ node_modules가 없습니다. 먼저 npm install을 실행하세요." -ForegroundColor Red
    Write-Host "`n다음 명령어를 실행하세요:" -ForegroundColor Yellow
    Write-Host "  cmd /c npm install" -ForegroundColor White
    exit 1
}

Write-Host "✅ node_modules 확인 완료" -ForegroundColor Green

# 포트 3000 확인
$portInUse = netstat -ano | findstr :3000
if ($portInUse) {
    Write-Host "`n⚠️  포트 3000이 이미 사용 중입니다." -ForegroundColor Yellow
    Write-Host "기존 프로세스를 종료하시겠습니까? (Y/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "Y" -or $response -eq "y") {
        $processId = ($portInUse -split '\s+')[-1]
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        Write-Host "프로세스 종료 완료" -ForegroundColor Green
        Start-Sleep -Seconds 2
    }
}

Write-Host "`n🚀 개발 서버 시작 중...`n" -ForegroundColor Green
Write-Host "브라우저에서 http://localhost:3000 을 열어주세요.`n" -ForegroundColor Cyan
Write-Host "서버를 중지하려면 Ctrl+C를 누르세요.`n" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Gray

# 개발 서버 시작
cmd /c npm run dev
