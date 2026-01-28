# ✅ GitHub 푸시 오류 해결 가이드

## 문제 원인

원격 저장소(GitHub)에 로컬에 없는 변경사항이 있어서 푸시가 거부되었습니다.
이는 GitHub에서 README.md를 생성했거나 초기 커밋이 있을 때 발생합니다.

## 해결 방법 (2가지)

### 방법 1: 원격 변경사항 가져오기 (안전, 권장)

**PowerShell에서 직접 실행하세요:**

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127

# 프록시 환경 변수 제거
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
$env:http_proxy = $null
$env:https_proxy = $null

# 원격 변경사항 가져오기
git pull origin main --allow-unrelated-histories

# 인증 정보 입력:
# Username: haha19776
# Password: Personal_Access_Token

# 충돌이 있으면 해결 후
git add .
git commit -m "Merge remote changes"

# 다시 푸시
git push -u origin main
```

### 방법 2: 강제 푸시 (빠름, 원격 변경사항 덮어씀)

**원격 저장소의 변경사항을 무시하고 로컬 내용으로 덮어쓰려면:**

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127

# 프록시 환경 변수 제거
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
$env:http_proxy = $null
$env:https_proxy = $null

# 강제 푸시
git push -u origin main --force

# 인증 정보 입력:
# Username: haha19776
# Password: Personal_Access_Token
```

⚠️ **주의**: 방법 2는 원격 저장소의 기존 파일들(예: README.md)을 삭제할 수 있습니다.

## Personal Access Token이 없다면

1. https://github.com/settings/tokens 접속
2. **Generate new token** → **Generate new token (classic)**
3. **Note**: `wjs20270127` 입력
4. **Select scopes**: `repo` 체크
5. **Generate token** 클릭
6. 토큰 복사

## 추천

- **원격 파일을 보존하고 싶다면**: 방법 1 사용
- **원격 파일이 필요없다면**: 방법 2 사용 (더 빠름)

## 현재 상태

- 로컬 커밋: 3개
- 원격 저장소에 로컬에 없는 변경사항 존재
- 프록시 설정 문제 (명령어에서 제거 필요)
