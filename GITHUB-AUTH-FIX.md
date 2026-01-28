# 🔐 GitHub 인증 설정 가이드

## 현재 상태

✅ **원격 저장소 URL 설정 완료**
- `https://github.com/haha19776/wjs20270127.git`

✅ **로컬 커밋 완료**
- 3개의 커밋이 있음
- 모든 파일이 커밋됨

❌ **인증 필요**
- GitHub에 푸시하려면 인증이 필요합니다

## 해결 방법 (3가지 중 선택)

### 방법 1: Personal Access Token 사용 (권장)

#### 1단계: GitHub에서 토큰 생성

1. GitHub.com 접속 → 로그인
2. 우측 상단 프로필 클릭 → **Settings**
3. 왼쪽 메뉴에서 **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token** → **Generate new token (classic)**
6. Note: `wjs20270127-push` (설명)
7. Expiration: 원하는 기간 선택
8. Scopes: **repo** 체크 (전체 권한)
9. **Generate token** 클릭
10. **토큰 복사** (한 번만 보여줌!)

#### 2단계: Git Credential Manager 설정

PowerShell에서:

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127

# 푸시 시도 (토큰 입력 요청됨)
git push -u origin main
```

**Username**: `haha19776`  
**Password**: `생성한_Personal_Access_Token_붙여넣기`

### 방법 2: SSH 키 사용

#### 1단계: SSH 키 생성

```powershell
# SSH 키 생성 (이미 있다면 생략)
ssh-keygen -t ed25519 -C "your_email@example.com"

# 엔터 3번 (기본 경로 사용, 비밀번호 없음)
```

#### 2단계: 공개 키를 GitHub에 추가

```powershell
# 공개 키 내용 복사
cat ~/.ssh/id_ed25519.pub
# 또는
Get-Content ~/.ssh/id_ed25519.pub
```

1. GitHub.com → **Settings** → **SSH and GPG keys**
2. **New SSH key** 클릭
3. Title: `wjs20270127`
4. Key: 위에서 복사한 공개 키 붙여넣기
5. **Add SSH key** 클릭

#### 3단계: 원격 저장소를 SSH로 변경

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127

# SSH URL로 변경
git remote set-url origin git@github.com:haha19776/wjs20270127.git

# 확인
git remote -v

# 푸시
git push -u origin main
```

### 방법 3: GitHub CLI 사용

```powershell
# GitHub CLI 설치 (없다면)
winget install GitHub.cli

# 인증
gh auth login

# 브라우저에서 인증 또는 토큰 입력

# 푸시
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git push -u origin main
```

## 현재 커밋 상태

```
8eb3c97 Add deployment and git guides
6191b06 Add Vercel configuration and 404 fix guide
4c7ab4f Initial commit: 뉴스 검색 및 AI 요약 서비스
```

## 추천 방법

**가장 빠른 방법**: 방법 1 (Personal Access Token)
- 브라우저에서 토큰 생성
- 푸시 시 토큰을 비밀번호로 입력

**가장 안전한 방법**: 방법 2 (SSH)
- 한 번 설정하면 계속 사용 가능
- 토큰 관리 불필요

## 문제 해결

### "fatal: could not read Username"
→ Personal Access Token을 비밀번호로 입력해야 합니다.

### "Permission denied (publickey)"
→ SSH 키가 GitHub에 추가되지 않았습니다.

### "remote: Support for password authentication was removed"
→ Personal Access Token을 사용해야 합니다.
