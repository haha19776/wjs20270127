# 🚫 GitHub & Vercel 배포 체크리스트

## ❌ 절대 올리면 안 되는 파일/폴더

### 🔴 **1. 환경 변수 파일 (보안 위험!)**
```
❌ .env                    # API 키 포함! 절대 올리면 안됨!
❌ .env.local              # 로컬 환경 변수
❌ .env.production         # 프로덕션 환경 변수
```

### 🔴 **2. Python 캐시 및 빌드 파일**
```
❌ __pycache__/           # Python 바이트코드 캐시
❌ *.pyc                  # 컴파일된 Python 파일
❌ *.pyo                  # 최적화된 Python 파일
❌ *.pyd                  # Python 확장 모듈
❌ build/                 # 빌드 디렉토리
❌ dist/                  # 배포 패키지
❌ *.egg-info/            # 패키지 메타데이터
```

### 🔴 **3. 가상환경 (Virtual Environment)**
```
❌ venv/                  # Python 가상환경
❌ env/                   # 가상환경 (다른 이름)
❌ ENV/                   # 가상환경
❌ .venv/                 # 숨김 가상환경
```

### 🔴 **4. IDE 및 에디터 설정**
```
❌ .vscode/               # VS Code 설정
❌ .idea/                 # PyCharm/IntelliJ 설정
❌ *.swp                  # Vim 임시 파일
❌ *.swo                  # Vim 백업 파일
❌ .cursor/                # Cursor IDE 설정
❌ terminals/             # 터미널 로그
```

### 🔴 **5. 운영체제 파일**
```
❌ .DS_Store              # macOS 시스템 파일
❌ Thumbs.db              # Windows 썸네일 캐시
❌ Desktop.ini            # Windows 폴더 설정
```

### 🔴 **6. 로그 및 임시 파일**
```
❌ *.log                  # 로그 파일
❌ *.tmp                  # 임시 파일
❌ *.temp                 # 임시 파일
```

### 🔴 **7. 데이터베이스 파일**
```
❌ *.db                   # SQLite 데이터베이스
❌ *.sqlite               # SQLite 데이터베이스
❌ *.sqlite3              # SQLite 데이터베이스
```

### 🔴 **8. Vercel 설정 파일**
```
❌ .vercel/               # Vercel 배포 설정 (자동 생성)
```

### 🔴 **9. 기타 불필요한 파일**
```
❌ 실행방법.txt           # 로컬 실행 가이드 (선택사항)
❌ README_old.md          # 이전 README (중복)
❌ .pytest_cache/         # 테스트 캐시
❌ .coverage              # 테스트 커버리지
❌ htmlcov/               # HTML 커버리지 리포트
```

---

## ✅ 올려야 하는 파일/폴더

### 📄 **핵심 소스 코드**
```
✅ app.py                 # Flask 메인 서버
✅ wsgi.py                # WSGI 설정
✅ supabase_config.py     # Supabase 연결 설정
✅ api/index.py            # Vercel serverless function
```

### 📄 **설정 파일**
```
✅ requirements.txt       # Python 패키지 목록
✅ vercel.json            # Vercel 배포 설정
✅ runtime.txt            # Python 버전
✅ .gitignore             # Git 제외 파일 목록
✅ .env.example           # 환경 변수 예시 (안전함)
```

### 📄 **데이터베이스 스키마**
```
✅ supabase_setup.sql     # Supabase 테이블 생성 SQL
```

### 📄 **문서**
```
✅ README.md              # 프로젝트 설명
✅ README_SUPABASE.md     # Supabase 가이드
✅ SUPABASE_SETUP.md      # Supabase 설정 가이드
✅ DEPLOYMENT.md          # 배포 가이드
✅ SECURITY_SETUP.md      # 보안 설정 가이드
✅ VERCEL_FIX.md          # Vercel 문제 해결
```

### 📁 **프론트엔드**
```
✅ templates/
   └── index.html         # 메인 HTML
✅ static/
   ├── style.css          # 스타일시트
   └── script.js          # JavaScript
```

---

## 🔍 현재 프로젝트 상태 확인

### ✅ 이미 .gitignore에 포함된 항목
- `.env` ✅
- `__pycache__/` ✅
- `venv/`, `env/` ✅
- `.vercel` ✅
- `.cursor/`, `terminals/` ✅
- `*.log` ✅
- `*.db`, `*.sqlite` ✅
- `실행방법.txt` ✅

### ⚠️ 확인 필요 항목
현재 프로젝트에 있는 파일 중 확인:
- `.env` - ❌ 올리면 안됨 (이미 .gitignore에 있음)
- 모든 `.md` 파일 - ✅ 올려도 됨 (문서)
- `supabase_setup.sql` - ✅ 올려야 함 (스키마)

---

## 📋 배포 전 최종 체크리스트

### 1. 보안 확인
- [ ] `.env` 파일이 GitHub에 올라가지 않았는가?
- [ ] API 키가 코드에 하드코딩되지 않았는가?
- [ ] `.env.example`만 올라갔는가?

### 2. 불필요한 파일 확인
- [ ] `__pycache__/` 폴더가 없거나 제외되었는가?
- [ ] `venv/` 폴더가 제외되었는가?
- [ ] `.vercel/` 폴더가 제외되었는가?
- [ ] 로그 파일이 제외되었는가?

### 3. 필수 파일 확인
- [ ] `requirements.txt`가 있는가?
- [ ] `vercel.json`이 있는가?
- [ ] `app.py`가 있는가?
- [ ] `templates/`, `static/` 폴더가 있는가?

---

## 🚀 GitHub 푸시 전 확인 명령어

```bash
# 1. Git 상태 확인
git status

# 2. 올라갈 파일 목록 확인
git ls-files

# 3. .env 파일이 포함되지 않았는지 확인
git ls-files | findstr ".env"

# 4. __pycache__가 포함되지 않았는지 확인
git ls-files | findstr "__pycache__"

# 5. venv가 포함되지 않았는지 확인
git ls-files | findstr "venv"
```

---

## ⚠️ 중요 주의사항

### 🔴 절대 하지 말아야 할 것
1. **`.env` 파일을 GitHub에 올리기** - API 키 노출!
2. **API 키를 코드에 하드코딩** - 보안 위험!
3. **가상환경 폴더 올리기** - 용량 낭비!
4. **캐시 파일 올리기** - 불필요!

### ✅ 반드시 해야 할 것
1. **`.env.example` 올리기** - 다른 개발자 참고용
2. **`.gitignore` 확인** - 제외 파일 목록 확인
3. **`git status` 확인** - 올라갈 파일 최종 확인
4. **Vercel 환경 변수 설정** - API 키는 Vercel에서만 설정

---

## 📝 현재 .gitignore 상태

현재 `.gitignore` 파일이 잘 설정되어 있습니다! ✅

다음 항목들이 자동으로 제외됩니다:
- Python 캐시 및 빌드 파일
- 가상환경
- 환경 변수 파일
- IDE 설정
- 로그 및 임시 파일
- Vercel 설정

---

## 🎯 최종 정리

### 올리면 안 되는 것 (요약)
1. `.env` - API 키 포함
2. `__pycache__/` - Python 캐시
3. `venv/` - 가상환경
4. `.vercel/` - Vercel 설정
5. `*.log` - 로그 파일
6. `*.db` - 로컬 데이터베이스

### 올려야 하는 것 (요약)
1. 모든 소스 코드 (`.py`, `.html`, `.css`, `.js`)
2. 설정 파일 (`requirements.txt`, `vercel.json`)
3. 문서 파일 (`.md`)
4. `.env.example` (예시 파일)
5. `supabase_setup.sql` (스키마)

**현재 설정으로 안전하게 배포할 수 있습니다!** ✅
