# 📤 GitHub 푸시 가이드

## ❌ 문제: 잘못된 디렉토리에서 실행

현재 `C:\Users\SD2-16\Desktop\new`에서 실행했지만,  
프로젝트는 `C:\Users\SD2-16\Desktop\new\wjs20270127`에 있습니다.

## ✅ 올바른 방법

### 1단계: 올바른 디렉토리로 이동

```bash
cd c:\Users\SD2-16\Desktop\new\wjs20270127
```

### 2단계: Git 상태 확인

```bash
git status
```

이 명령어가 작동하면 올바른 디렉토리입니다.

### 3단계: 원격 저장소 확인

```bash
git remote -v
```

원격 저장소가 설정되어 있지 않으면 다음 단계로 진행.

### 4단계: GitHub 저장소 생성 및 연결

**GitHub에서:**
1. GitHub.com 로그인
2. "New repository" 클릭
3. 저장소 이름: `wjs20270127`
4. Public 또는 Private 선택
5. "Create repository" 클릭
6. 저장소 URL 복사 (예: `https://github.com/사용자명/wjs20270127.git`)

**로컬에서:**
```bash
# 원격 저장소 추가
git remote add origin https://github.com/사용자명/wjs20270127.git

# 브랜치 이름을 main으로 변경 (필요시)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 🔍 현재 상태 확인

프로젝트 디렉토리에서 다음 명령어로 확인:

```bash
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git log --oneline -1
```

커밋이 있다면 로컬 저장소는 정상입니다.

## ⚠️ 주의사항

- 반드시 `wjs20270127` 폴더 안에서 실행해야 합니다
- `new` 폴더가 아닌 `wjs20270127` 폴더입니다
- GitHub 저장소를 먼저 생성해야 합니다
