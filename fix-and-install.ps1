# npm offline 모드 문제 해결 및 설치 스크립트
Write-Host "npm 설치 문제 해결 중..." -ForegroundColor Cyan

# 환경 변수 제거 시도
$env:npm_config_offline = $null
Remove-Item Env:npm_config_offline -ErrorAction SilentlyContinue

# npm config 설정
Write-Host "npm 설정 업데이트 중..." -ForegroundColor Yellow
npm config set offline false --location project
npm config set prefer-offline false --location project

# .npmrc 파일 확인
if (Test-Path .npmrc) {
    Write-Host ".npmrc 파일 내용:" -ForegroundColor Cyan
    Get-Content .npmrc
}

Write-Host "`n의존성 설치 시작... (시간이 걸릴 수 있습니다)" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Gray

# npm install 실행
npm install --no-offline --prefer-online

Write-Host "`n================================================" -ForegroundColor Gray

# 설치 확인
if (Test-Path node_modules\next) {
    Write-Host "`n✅ 설치 성공!" -ForegroundColor Green
    Write-Host "`n설치된 주요 패키지:" -ForegroundColor Cyan
    npm list next react @google/generative-ai --depth=0
} else {
    Write-Host "`n❌ 설치 실패 또는 아직 진행 중입니다." -ForegroundColor Red
    Write-Host "`n수동으로 다음 명령어를 실행해보세요:" -ForegroundColor Yellow
    Write-Host "  Remove-Item Env:npm_config_offline -ErrorAction SilentlyContinue" -ForegroundColor White
    Write-Host "  npm install" -ForegroundColor White
}
