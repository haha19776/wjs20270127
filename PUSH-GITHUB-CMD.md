# 🚀 CMD에서 GitHub 푸시하기

## CMD 사용 권장 이유

✅ **CMD가 더 안정적:**
- Git 인증이 더 잘 작동함
- PowerShell 인증 오류 회피
- 더 간단한 명령어

## CMD에서 푸시 방법

### 1단계: CMD 터미널 열기

**Cursor에서:**
1. `Ctrl + Shift + `` (백틱) 또는 `Ctrl + J`로 터미널 열기
2. 터미널 오른쪽 위 **"+"** 옆 드롭다운 클릭
3. **"Command Prompt"** 또는 **"cmd"** 선택

**또는 Windows에서:**
- `Win + R` → `cmd` 입력 → Enter

### 2단계: 프로젝트 디렉토리로 이동

```cmd
cd c:\Users\SD2-16\Desktop\new\wjs20270127
```

### 3단계: Git 상태 확인

```cmd
git status
```

**예상 결과:**
```
On branch main
Your branch is ahead of 'origin/main' by 5 commits.
```

### 4단계: GitHub에 푸시

```cmd
git push origin main
```

### 5단계: 인증 정보 입력

**Username 입력:**
```
haha19776
```

**Password 입력:**
```
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
```

**참고:** Password 입력 시 화면에 표시되지 않습니다 (정상입니다)

### 6단계: 성공 확인

**성공 메시지:**
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 2.45 KiB | 2.45 MiB/s, done.
Total 8 (delta 3), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/haha19776/wjs20270127.git
   [이전 커밋 해시] -> main
```

## 문제 해결

### 인증 오류가 발생하면:

**방법 1: Git Credential Manager 사용**
```cmd
git config --global credential.helper manager-core
git push origin main
```

**방법 2: URL에 인증 정보 포함 (임시)**
```cmd
git push https://haha19776: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@github.com/haha19776/wjs20270127.git main
```

**방법 3: Personal Access Token 재생성**
- GitHub → Settings → Developer settings → Personal access tokens
- 새 토큰 생성 후 사용

## 푸시 후 확인

### GitHub 저장소 확인:
1. https://github.com/haha19776/wjs20270127 접속
2. 최신 커밋 확인:
   - "Remove API keys from documentation files for security"
   - "Add search debugging guides"
   - "Add debugging logs for search functionality"

### Vercel 자동 재배포 확인:
1. https://vercel.com/dashboard 접속
2. 프로젝트 `wjs20270127d` 선택
3. **Deployments** 탭 확인
4. 최근 5분 이내에 새 배포가 시작되었는지 확인

## 전체 명령어 (복사해서 사용)

```cmd
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git status
git push origin main
```

**인증 정보:**
- Username: `haha19776`
- Password: `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`
