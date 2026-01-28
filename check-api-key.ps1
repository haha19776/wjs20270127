# API 키 확인 스크립트

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GEMINI_API_KEY 확인" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$envFile = ".env.local"

if (-not (Test-Path $envFile)) {
    Write-Host "❌ .env.local 파일이 없습니다!" -ForegroundColor Red
    Write-Host "`n.env.local 파일을 생성하고 API 키를 입력하세요.`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ .env.local 파일 확인 완료" -ForegroundColor Green

# .env.local 파일 읽기
$content = Get-Content $envFile -Raw
$apiKey = $null

# GEMINI_API_KEY 추출
if ($content -match "GEMINI_API_KEY\s*=\s*(.+)") {
    $apiKey = $matches[1].Trim()
    
    # 주석 제거
    if ($apiKey -match "^#") {
        $apiKey = $null
    }
}

if (-not $apiKey -or $apiKey -eq "YOUR_GEMINI_API_KEY" -or $apiKey -eq "") {
    Write-Host "`n❌ API 키가 설정되지 않았습니다!" -ForegroundColor Red
    Write-Host "`n다음 단계를 따라주세요:" -ForegroundColor Yellow
    Write-Host "1. .env.local 파일을 열어주세요" -ForegroundColor White
    Write-Host "2. 다음 줄을 수정하세요:" -ForegroundColor White
    Write-Host "   GEMINI_API_KEY=YOUR_GEMINI_API_KEY" -ForegroundColor Gray
    Write-Host "   ↓" -ForegroundColor Gray
    Write-Host "   GEMINI_API_KEY=실제_API_키_입력" -ForegroundColor Green
    Write-Host "`n3. API 키 발급: https://makersuite.google.com/app/apikey" -ForegroundColor Cyan
    Write-Host "`n4. 서버 재시작 필요" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n✅ API 키가 설정되어 있습니다" -ForegroundColor Green
Write-Host "API 키 (처음 10자): $($apiKey.Substring(0, [Math]::Min(10, $apiKey.Length)))..." -ForegroundColor Gray

# API 키 형식 확인 (Google API 키는 보통 AIza로 시작)
if ($apiKey -notmatch "^AIza") {
    Write-Host "`n⚠️  경고: API 키 형식이 올바르지 않을 수 있습니다." -ForegroundColor Yellow
    Write-Host "Google Gemini API 키는 보통 'AIza'로 시작합니다." -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "다음 단계:" -ForegroundColor Cyan
Write-Host "1. 개발 서버가 실행 중인지 확인" -ForegroundColor White
Write-Host "2. 서버 재시작 (환경 변수 변경 후 필수)" -ForegroundColor White
Write-Host "3. 브라우저에서 http://localhost:3000 새로고침" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Cyan
