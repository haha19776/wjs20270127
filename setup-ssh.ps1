# SSH 키 생성 및 GitHub 설정 스크립트

Write-Host "SSH 키 생성 중..." -ForegroundColor Cyan

# .ssh 디렉토리 생성
if (-not (Test-Path "$env:USERPROFILE\.ssh")) {
    New-Item -ItemType Directory -Path "$env:USERPROFILE\.ssh" -Force | Out-Null
}

# SSH 키 생성 (이미 있으면 스킵)
$sshKeyPath = "$env:USERPROFILE\.ssh\id_ed25519"
if (-not (Test-Path $sshKeyPath)) {
    ssh-keygen -t ed25519 -f $sshKeyPath -N '""' -C "wjs20270127@github" | Out-Null
    Write-Host "SSH 키 생성 완료!" -ForegroundColor Green
} else {
    Write-Host "SSH 키가 이미 존재합니다." -ForegroundColor Yellow
}

# 공개 키 표시
$pubKeyPath = "$env:USERPROFILE\.ssh\id_ed25519.pub"
if (Test-Path $pubKeyPath) {
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "SSH 공개 키 (GitHub에 추가하세요)" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Green
    Get-Content $pubKeyPath
    Write-Host "`n========================================`n" -ForegroundColor Green
    
    Write-Host "다음 단계:" -ForegroundColor Cyan
    Write-Host "1. 위의 SSH 공개 키 전체를 복사하세요" -ForegroundColor White
    Write-Host "2. https://github.com/settings/keys 접속" -ForegroundColor White
    Write-Host "3. New SSH key 클릭" -ForegroundColor White
    Write-Host "4. Title: wjs20270127 입력" -ForegroundColor White
    Write-Host "5. Key에 위에서 복사한 키 붙여넣기" -ForegroundColor White
    Write-Host "6. Add SSH key 클릭`n" -ForegroundColor White
    
    Write-Host "GitHub에 키를 추가한 후 다음 명령어 실행:" -ForegroundColor Yellow
    Write-Host "git push -u origin main`n" -ForegroundColor Cyan
}

# GitHub 호스트 키 추가
if (-not (Test-Path "$env:USERPROFILE\.ssh\known_hosts")) {
    ssh-keyscan github.com | Out-File -FilePath "$env:USERPROFILE\.ssh\known_hosts" -Encoding utf8
    Write-Host "GitHub 호스트 키 추가 완료" -ForegroundColor Green
}
