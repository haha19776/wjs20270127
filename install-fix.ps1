# PowerShell 실행 정책 오류 해결 및 npm install 스크립트

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "npm install 오류 해결 스크립트" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 방법 1: cmd를 통해 npm 실행 (가장 안전)
Write-Host "방법 1: cmd를 통해 npm install 실행 중..." -ForegroundColor Yellow
cmd /c npm install

# 설치 확인
if (Test-Path node_modules\next) {
    Write-Host "`n✅ 설치 성공!" -ForegroundColor Green
    Write-Host "`n설치된 주요 패키지:" -ForegroundColor Cyan
    cmd /c "npm list --depth=0" 2>$null | Select-String -Pattern "next|react|@google|typescript"
    Write-Host "`n✅ 문제 해결 완료!" -ForegroundColor Green
} else {
    Write-Host "`n❌ 설치 실패 또는 아직 진행 중입니다." -ForegroundColor Red
    Write-Host "`n다음 방법을 시도해보세요:" -ForegroundColor Yellow
    Write-Host "1. PowerShell을 관리자 권한으로 실행" -ForegroundColor White
    Write-Host "2. 다음 명령어 실행:" -ForegroundColor White
    Write-Host "   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Cyan
    Write-Host "3. 그 다음 npm install 실행" -ForegroundColor White
}
