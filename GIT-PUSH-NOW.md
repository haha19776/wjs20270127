# 🚀 GitHub 푸시 방법 (Cursor 터미널)

## Cursor 터미널에서 푸시하기

네, 맞습니다! Cursor의 터미널(cmd 또는 PowerShell)에서 직접 명령어를 입력하면 됩니다.

## 방법 1: PowerShell에서 푸시 (권장)

### 1단계: Cursor 터미널 열기
- `Ctrl + `` (백틱) 또는
- View → Terminal

### 2단계: 프로젝트 디렉토리로 이동
```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127
```

### 3단계: 프록시 제거 후 푸시
```powershell
# 프록시 환경 변수 제거
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
$env:http_proxy = $null
$env:https_proxy = $null

# Git 프록시 설정 제거
git config --global http.proxy ""
git config --global https.proxy ""

# 푸시 실행
git push origin main
```

### 4단계: 인증 정보 입력
- **Username**: `haha19776`
- **Password**: `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` (Personal Access Token)

## 방법 2: 한 줄로 실행

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127; $env:HTTP_PROXY = $null; $env:HTTPS_PROXY = $null; git push origin main
```

그 다음 인증 정보 입력:
- Username: `haha19776`
- Password: `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`

## 방법 3: Git Credential Manager 사용

첫 푸시 후 자동 저장:

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127

# Credential Manager 설정
git config --global credential.helper manager-core

# 프록시 제거
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null

# 푸시 (첫 번째만 인증 필요)
git push origin main
```

## 현재 상태

- ✅ 5개의 커밋이 푸시 대기 중
- ✅ 빌드 오류 수정 완료
- ⚠️ 프록시 문제로 푸시 실패 (위 방법으로 해결)

## 푸시할 커밋 목록

```
465990a Fix: Remove invalid exports from route handlers
ee0f7ae Add Vercel deployment guide
58abf5f Resolve vercel.json merge conflict
bbf59b5 Add deployment guides and fix push issues
8eb3c97 Add deployment and git guides
```

## 푸시 성공 후

1. GitHub 저장소에서 커밋 확인
2. Vercel 자동 배포 시작 (약 2-3분)
3. Vercel 대시보드에서 배포 상태 확인

## 문제 해결

### "fatal: unable to access"
→ 프록시 환경 변수를 제거하세요 (위의 방법 1 참조)

### "Permission denied"
→ Personal Access Token을 비밀번호로 입력하세요

### "remote: Support for password authentication was removed"
→ Personal Access Token을 사용해야 합니다 (이미 제공됨)
