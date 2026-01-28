# npm offline 모드 해제 및 설치 스크립트
$env:npm_config_offline = $null
Remove-Item Env:npm_config_offline -ErrorAction SilentlyContinue

Write-Host "npm offline 모드 해제 중..." -ForegroundColor Yellow
npm config set offline false

Write-Host "의존성 설치 시작..." -ForegroundColor Green
npm install

Write-Host "설치 완료!" -ForegroundColor Green
