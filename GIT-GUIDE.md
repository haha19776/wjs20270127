# 📋 Git 사용 가이드

## Git 명령어 실행 위치

**네, Cursor 터미널에서 실행하면 됩니다!**

1. Cursor 하단의 터미널 탭 클릭
2. 또는 `Ctrl + `` (백틱) 키로 터미널 열기
3. 프로젝트 디렉토리에서 명령어 실행

## Git 초기화 및 첫 커밋

### 1단계: Git 초기화
```bash
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git init
```

### 2단계: 파일 추가 전 상태 확인
```bash
git status
```

이 명령어로 다음을 확인할 수 있습니다:
- ✅ 추가될 파일들 (초록색)
- ❌ 무시되는 파일들 (.gitignore에 포함된 것들)

### 3단계: 모든 파일 추가
```bash
git add .
```

### 4단계: 다시 상태 확인
```bash
git status
```

이제 `.env.local`, `node_modules`, `.next` 등이 목록에 없어야 합니다.

### 5단계: 첫 커밋
```bash
git commit -m "Initial commit: 뉴스 검색 및 AI 요약 서비스"
```

## GitHub에 푸시하기

### 1단계: GitHub에서 새 저장소 생성
1. GitHub.com 로그인
2. "New repository" 클릭
3. 저장소 이름: `wjs20270127` (또는 원하는 이름)
4. Public 또는 Private 선택
5. "Create repository" 클릭

### 2단계: 원격 저장소 연결
```bash
git remote add origin https://github.com/사용자명/wjs20270127.git
```

### 3단계: 푸시
```bash
git branch -M main
git push -u origin main
```

## git status로 확인할 수 있는 것

```bash
git status
```

**출력 예시:**
```
On branch main
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
        new file:   app/page.tsx
        new file:   package.json
        ...

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .env.local    # ⚠️ 이게 보이면 안 됨!
```

**중요:** `.env.local`이 목록에 나타나면 안 됩니다!

## 체크리스트

GitHub에 올리기 전:
- [ ] `git status` 실행
- [ ] `.env.local`이 목록에 없는지 확인
- [ ] `node_modules`가 목록에 없는지 확인
- [ ] `.next`가 목록에 없는지 확인
- [ ] `app/` 폴더가 포함되어 있는지 확인

## 문제 해결

### .env.local이 목록에 나타나는 경우
```bash
# .gitignore 확인
cat .gitignore | grep .env

# .env.local 강제로 무시
echo ".env.local" >> .gitignore
git rm --cached .env.local
```

### 이미 커밋한 경우
```bash
# Git 히스토리에서 제거
git rm --cached .env.local
git commit -m "Remove .env.local from git"
```

## Vercel 배포 시 환경 변수 설정

GitHub에 올린 후:
1. Vercel 대시보드 접속
2. 프로젝트 선택 → Settings
3. Environment Variables 클릭
4. `GEMINI_API_KEY` 추가
5. Value에 실제 API 키 입력
6. Save 클릭
