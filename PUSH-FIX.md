# 🔧 GitHub 푸시 오류 해결

## 문제 상황

원격 저장소에 로컬에 없는 변경사항이 있어서 푸시가 거부되었습니다.
이는 GitHub에서 README.md를 생성했거나 초기 커밋이 있을 때 발생합니다.

## 해결 방법

### 방법 1: 원격 변경사항 가져오기 (권장)

PowerShell에서 다음 명령어를 실행하세요:

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127

# 1. 원격 변경사항 가져오기
git pull origin main --allow-unrelated-histories

# 인증 정보 입력:
# Username: haha19776
# Password: Personal_Access_Token

# 2. 충돌이 있으면 해결 후
git add .
git commit -m "Merge remote changes"

# 3. 다시 푸시
git push -u origin main
```

### 방법 2: 강제 푸시 (주의: 원격 변경사항 덮어씀)

원격 저장소의 변경사항을 무시하고 로컬 내용으로 덮어쓰려면:

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127

# 강제 푸시 (원격 변경사항 삭제됨)
git push -u origin main --force
```

⚠️ **주의**: 이 방법은 원격 저장소의 기존 파일들을 삭제할 수 있습니다.

### 방법 3: 수동 병합

1. GitHub에서 원격 저장소의 파일들을 확인
2. 로컬에 필요한 파일들을 추가
3. 커밋 후 푸시

## 현재 상태

- 로컬 커밋: 3개
- 원격 저장소에 로컬에 없는 변경사항 존재
- 인증 필요 (Personal Access Token)

## 다음 단계

1. Personal Access Token이 있다면 위의 방법 1 실행
2. Token이 없다면 먼저 생성:
   - https://github.com/settings/tokens
   - Generate new token (classic)
   - repo 권한 선택
