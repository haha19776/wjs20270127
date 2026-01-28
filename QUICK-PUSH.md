# 🚀 빠른 GitHub 푸시 가이드

## 현재 상태

✅ 원격 저장소 URL 설정 완료: `https://github.com/haha19776/wjs20270127.git`
✅ 로컬 커밋 완료 (3개 커밋)
✅ SSH 키 생성 완료

## 방법 1: Personal Access Token (가장 빠름)

### 1단계: GitHub에서 토큰 생성

1. 브라우저에서 https://github.com/settings/tokens 접속
2. **Generate new token** → **Generate new token (classic)** 클릭
3. **Note**: `wjs20270127` 입력
4. **Expiration**: 원하는 기간 선택 (예: 90 days)
5. **Select scopes**: `repo` 체크박스 선택
6. 맨 아래 **Generate token** 클릭
7. **토큰 복사** (한 번만 보여줌!)

### 2단계: 푸시 실행

PowerShell에서:

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git push -u origin main
```

**Username**: `haha19776`  
**Password**: `생성한_토큰_붙여넣기`

## 방법 2: SSH 키 사용

### 1단계: SSH 공개 키 확인

PowerShell에서:

```powershell
Get-Content $env:USERPROFILE\.ssh\id_rsa.pub
```

### 2단계: GitHub에 SSH 키 추가

1. 브라우저에서 https://github.com/settings/keys 접속
2. **New SSH key** 클릭
3. **Title**: `wjs20270127` 입력
4. **Key**: 위에서 복사한 SSH 공개 키 붙여넣기
5. **Add SSH key** 클릭

### 3단계: 원격 저장소를 SSH로 변경 후 푸시

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git remote set-url origin git@github.com:haha19776/wjs20270127.git
git push -u origin main
```

## 추천

**가장 빠른 방법**: 방법 1 (Personal Access Token)
- 브라우저에서 토큰 생성 (1분)
- 푸시 시 토큰 입력

**가장 안전한 방법**: 방법 2 (SSH)
- 한 번 설정하면 계속 사용
- 토큰 관리 불필요

## 현재 커밋 상태

```
8eb3c97 Add deployment and git guides
6191b06 Add Vercel configuration and 404 fix guide
4c7ab4f Initial commit: 뉴스 검색 및 AI 요약 서비스
```
