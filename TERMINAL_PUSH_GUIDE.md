# 💻 터미널에서 GitHub 푸시 가이드

## 🖥️ 터미널 열기

### 방법 1: PowerShell (권장)
1. **Windows 키** 누르기
2. **"PowerShell"** 또는 **"터미널"** 검색
3. **Windows PowerShell** 실행

### 방법 2: 명령 프롬프트
1. **Windows 키 + R** 누르기
2. **"cmd"** 입력 후 Enter
3. 명령 프롬프트 창 열림

---

## 📋 단계별 명령어

### 1단계: 프로젝트 폴더로 이동

```powershell
cd C:\Users\SD2-16\Desktop\chatbot3
```

**확인:** 프롬프트에 경로가 표시되면 성공

---

### 2단계: Git 상태 확인

```powershell
git status
```

**확인 사항:**
- 변경된 파일 목록 확인
- `.env` 파일이 목록에 **나오면 안 됩니다!**

---

### 3단계: 변경사항 추가 (스테이징)

```powershell
git add .
```

**의미:** 모든 변경된 파일을 스테이징 영역에 추가

---

### 4단계: 커밋 (변경사항 저장)

```powershell
git commit -m "Fix: Critical Vercel function invocation error"
```

**의미:** 변경사항을 로컬 저장소에 저장

---

### 5단계: GitHub에 푸시

```powershell
git push
```

**의미:** 로컬 저장소의 변경사항을 GitHub에 업로드

---

## 📝 전체 명령어 (한 번에 복사)

```powershell
cd C:\Users\SD2-16\Desktop\chatbot3
git status
git add .
git commit -m "Fix: Critical Vercel function invocation error"
git push
```

---

## ⚠️ 주의사항

### 1. `.env` 파일 확인

푸시 전에 반드시 확인:
```powershell
git status
```

`.env` 파일이 목록에 **나오면 안 됩니다!**
- 이미 `.gitignore`에 포함되어 있어서 자동으로 제외됩니다
- 만약 나온다면: `git rm --cached .env` 실행

### 2. Git 사용자 정보 설정 (처음 한 번만)

만약 "Author identity unknown" 오류가 나면:
```powershell
git config user.name "haha19776"
git config user.email "haha19776@users.noreply.github.com"
```

---

## 🔐 인증 오류 해결

### "Permission denied" 또는 "Authentication failed"

**해결 방법 1: Personal Access Token 사용**

1. GitHub > Settings > Developer settings > Personal access tokens
2. "Generate new token" 클릭
3. 토큰 생성 후 복사
4. 푸시 시 비밀번호 대신 토큰 입력

**해결 방법 2: GitHub Desktop 사용**

1. https://desktop.github.com/ 에서 다운로드
2. 설치 후 GitHub 로그인
3. File > Add Local Repository
4. `C:\Users\SD2-16\Desktop\chatbot3` 선택
5. "Publish repository" 클릭

---

## 🎯 빠른 실행 순서

1. **터미널 열기** (PowerShell 또는 cmd)
2. **프로젝트 폴더로 이동:**
   ```powershell
   cd C:\Users\SD2-16\Desktop\chatbot3
   ```
3. **상태 확인:**
   ```powershell
   git status
   ```
4. **파일 추가:**
   ```powershell
   git add .
   ```
5. **커밋:**
   ```powershell
   git commit -m "Fix: Critical Vercel function invocation error"
   ```
6. **푸시:**
   ```powershell
   git push
   ```

---

## 🆘 문제 해결

### "git is not recognized"
→ Git이 설치되지 않음
→ https://git-scm.com/download/win 에서 설치

### "fatal: not a git repository"
→ Git 저장소가 초기화되지 않음
→ 이미 초기화되어 있으므로 무시해도 됨

### "Permission denied"
→ GitHub 인증 필요
→ Personal Access Token 사용 또는 GitHub Desktop 사용

### "Everything up-to-date"
→ 이미 푸시된 상태
→ 새로운 변경사항이 없음

---

## ✅ 성공 확인

푸시가 성공하면:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Writing objects: 100% (X/X), done.
To https://github.com/haha19776/newschat.git
   abc1234..def5678  main -> main
```

이런 메시지가 나오면 성공! 🎉

---

## 📋 체크리스트

- [ ] 터미널 열기
- [ ] 프로젝트 폴더로 이동 (`cd`)
- [ ] Git 상태 확인 (`git status`)
- [ ] `.env` 파일이 목록에 없는지 확인
- [ ] 파일 추가 (`git add .`)
- [ ] 커밋 (`git commit -m "메시지"`)
- [ ] 푸시 (`git push`)

---

**터미널에서 위 명령어를 순서대로 실행하세요!** 🚀
