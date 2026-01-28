# 📤 GitHub 푸시 가이드 (Windows)

## 🖥️ 터미널 열기

### 방법 1: PowerShell 사용 (권장)
1. **Windows 키** 누르기
2. **"PowerShell"** 또는 **"터미널"** 검색
3. **Windows PowerShell** 또는 **터미널** 실행

### 방법 2: 명령 프롬프트 사용
1. **Windows 키 + R** 누르기
2. **"cmd"** 입력 후 Enter
3. 명령 프롬프트 창 열림

### 방법 3: VS Code 터미널 사용
1. VS Code에서 프로젝트 폴더 열기
2. **Ctrl + `** (백틱) 누르기
3. 하단에 터미널 창 열림

---

## 📋 단계별 명령어

### 1단계: 프로젝트 폴더로 이동

```powershell
cd C:\Users\SD2-16\Desktop\chatbot3
```

또는 VS Code 터미널에서는 이미 프로젝트 폴더에 있으므로 생략 가능

---

### 2단계: Git 상태 확인

```powershell
git status
```

**확인 사항:**
- 수정된 파일 목록 확인
- `.env` 파일이 포함되지 않았는지 확인

---

### 3단계: 변경사항 추가

```powershell
git add .
```

**의미:** 모든 변경된 파일을 스테이징 영역에 추가

---

### 4단계: 커밋 (변경사항 저장)

```powershell
git commit -m "Fix: Update Vercel configuration for Flask deployment"
```

**의미:** 변경사항을 로컬 저장소에 저장
**메시지:** 원하는 메시지로 변경 가능

---

### 5단계: GitHub에 푸시

```powershell
git push
```

**의미:** 로컬 저장소의 변경사항을 GitHub에 업로드

---

## 🔐 첫 번째 푸시인 경우

만약 처음 푸시하는 경우:

```powershell
# 1. 원격 저장소 추가 (이미 되어있으면 생략)
git remote add origin https://github.com/haha19776/newschat.git

# 2. 브랜치 이름 설정
git branch -M main

# 3. 푸시
git push -u origin main
```

---

## 📝 전체 명령어 (한 번에 복사)

```powershell
cd C:\Users\SD2-16\Desktop\chatbot3
git status
git add .
git commit -m "Fix: Update Vercel configuration"
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

### 2. 인증 오류 시
GitHub 인증이 필요할 수 있습니다:
- Personal Access Token 사용
- 또는 GitHub Desktop 사용

### 3. 충돌 오류 시
```powershell
git pull
```
먼저 GitHub의 변경사항을 가져온 후 다시 푸시

---

## 🎯 빠른 체크리스트

- [ ] 터미널 열기
- [ ] 프로젝트 폴더로 이동 (`cd`)
- [ ] Git 상태 확인 (`git status`)
- [ ] `.env` 파일이 포함되지 않았는지 확인
- [ ] 변경사항 추가 (`git add .`)
- [ ] 커밋 (`git commit -m "메시지"`)
- [ ] 푸시 (`git push`)

---

## 🆘 문제 해결

### "git is not recognized"
→ Git이 설치되지 않음
→ https://git-scm.com/download/win 에서 설치

### "fatal: not a git repository"
→ Git 저장소가 초기화되지 않음
→ `git init` 실행 후 다시 시도

### "Permission denied"
→ GitHub 인증 필요
→ Personal Access Token 설정 필요

---

## 💡 팁

### VS Code 사용 시
1. **소스 제어** 탭 (Ctrl+Shift+G)
2. 변경사항 확인
3. **+** 버튼으로 스테이징
4. 커밋 메시지 입력
5. **✓** 버튼으로 커밋
6. **...** 메뉴 > **Push** 클릭

이 방법이 더 쉬울 수 있습니다!
