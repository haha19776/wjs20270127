# Vercel 환경 변수 업데이트 스크립트

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Vercel 환경 변수 업데이트" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$apiKey = "AIzaSyCErZL3fnk5J8s2Sk_LRD3wwj0cTAemu40"

# Vercel CLI 확인
Write-Host "Vercel CLI 확인 중..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "Vercel CLI가 설치되어 있지 않습니다." -ForegroundColor Red
    Write-Host "설치 중...`n" -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`nVercel CLI 설치 실패. 수동으로 업데이트해야 합니다." -ForegroundColor Red
        Write-Host "`n수동 업데이트 방법:" -ForegroundColor Yellow
        Write-Host "1. https://vercel.com/dashboard 접속" -ForegroundColor White
        Write-Host "2. 프로젝트 선택 → Settings → Environment Variables" -ForegroundColor White
        Write-Host "3. GEMINI_API_KEY 값 업데이트: $apiKey" -ForegroundColor White
        Write-Host "4. Save → Redeploy`n" -ForegroundColor White
        exit 1
    }
}

Write-Host "Vercel CLI 확인 완료`n" -ForegroundColor Green

# Vercel 로그인 확인
Write-Host "Vercel 로그인 확인 중..." -ForegroundColor Yellow
Write-Host "만약 로그인이 안 되어 있다면 브라우저에서 인증하세요.`n" -ForegroundColor Gray

# 환경 변수 업데이트
Write-Host "환경 변수 업데이트 중..." -ForegroundColor Yellow
Write-Host "API 키: $apiKey`n" -ForegroundColor Cyan

# Vercel CLI로 환경 변수 추가/업데이트
vercel env add GEMINI_API_KEY production --token $null 2>&1 | Out-Null

Write-Host "`n참고: Vercel CLI를 통한 환경 변수 업데이트는" -ForegroundColor Yellow
Write-Host "인증이 필요하며, 웹 인터페이스를 통한 업데이트를 권장합니다.`n" -ForegroundColor Yellow

Write-Host "수동 업데이트 방법:" -ForegroundColor Green
Write-Host "1. https://vercel.com/dashboard 접속" -ForegroundColor White
Write-Host "2. 프로젝트 wjs20270127d 선택" -ForegroundColor White
Write-Host "3. Settings → Environment Variables" -ForegroundColor White
Write-Host "4. GEMINI_API_KEY 찾기 → Edit" -ForegroundColor White
Write-Host "5. Value: $apiKey 입력" -ForegroundColor Cyan
Write-Host "6. Production, Preview, Development 모두 체크" -ForegroundColor White
Write-Host "7. Save 클릭" -ForegroundColor White
Write-Host "8. Deployments → Redeploy`n" -ForegroundColor White
