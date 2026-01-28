# 📋 GitHub 파일 업로드 가이드

## ✅ GitHub에 올려야 하는 파일

### 핵심 소스 코드
```
app/
  ├── api/                    ✅ 올려야 함
  │   ├── search-news/
  │   └── summarize-news/
  ├── components/              ✅ 올려야 함
  │   ├── SearchBar.tsx
  │   ├── NewsList.tsx
  │   ├── ChatArea.tsx
  │   └── ErrorMessage.tsx
  ├── lib/                     ✅ 올려야 함
  │   └── geminiClient.ts
  ├── types/                   ✅ 올려야 함
  │   └── index.ts
  ├── utils/                   ✅ 올려야 함
  │   └── api.ts
  ├── page.tsx                 ✅ 올려야 함
  ├── layout.tsx               ✅ 올려야 함
  └── globals.css              ✅ 올려야 함
```

### 설정 파일
```
package.json                   ✅ 올려야 함
package-lock.json             ✅ 올려야 함
tsconfig.json                  ✅ 올려야 함
next.config.js                 ✅ 올려야 함
tailwind.config.ts             ✅ 올려야 함
postcss.config.js              ✅ 올려야 함
.gitignore                     ✅ 올려야 함
.npmrc                         ✅ 올려야 함
vercel.json                    ✅ 올려야 함
```

### 문서 파일
```
README.md                      ✅ 올려야 함
.env.local.example             ✅ 올려야 함 (API 키 없이 예시만)
```

### 가이드 파일 (선택사항)
```
GIT-DEPLOY.md                  ✅ 올려도 됨
VERCEL-DEPLOY.md               ✅ 올려도 됨
GIT-GUIDE.md                   ✅ 올려도 됨
SETUP-API-KEY.md               ✅ 올려도 됨
```

### 테스트/유틸리티 파일 (선택사항)
```
test-api.js                    ⚠️ 올려도 되지만 .gitignore에 추가 가능
list-models.js                 ⚠️ 올려도 되지만 .gitignore에 추가 가능
test.sh                        ⚠️ 올려도 되지만 .gitignore에 추가 가능
```

### 배치/스크립트 파일 (선택사항)
```
quick-start.bat                ⚠️ 올려도 되지만 .gitignore에 추가 가능
start-dev.ps1                  ⚠️ 올려도 되지만 .gitignore에 추가 가능
restart-server.ps1             ⚠️ 올려도 되지만 .gitignore에 추가 가능
check-api-key.ps1              ⚠️ 올려도 되지만 .gitignore에 추가 가능
```

## ❌ GitHub에 올리면 안 되는 파일

### 보안 관련 (절대 올리면 안 됨!)
```
.env.local                     ❌ 절대 올리면 안 됨! (API 키 포함)
.env                           ❌ 올리면 안 됨
```

### 빌드 결과물 (자동 생성됨)
```
.next/                         ❌ 올리면 안 됨 (빌드 결과물)
out/                           ❌ 올리면 안 됨
build/                         ❌ 올리면 안 됨
```

### 의존성 (자동 설치됨)
```
node_modules/                  ❌ 올리면 안 됨 (용량 큼, npm install로 설치)
```

### 캐시 및 로그
```
.npm/                          ❌ 올리면 안 됨 (npm 캐시)
*.log                          ❌ 올리면 안 됨 (로그 파일)
install.log                    ❌ 올리면 안 됨
```

### 시스템 파일
```
.DS_Store                      ❌ 올리면 안 됨 (macOS 시스템 파일)
*.pem                          ❌ 올리면 안 됨 (인증서)
```

### Vercel 관련
```
.vercel/                       ❌ 올리면 안 됨 (Vercel 배포 설정, 자동 생성)
```

### TypeScript 빌드 정보
```
*.tsbuildinfo                  ❌ 올리면 안 됨
next-env.d.ts                  ❌ 올리면 안 됨 (자동 생성)
```

## 📊 현재 상태 확인

### Git 상태 확인 명령어
```bash
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git status
```

### 올바르게 설정되었는지 확인
```bash
# .env.local이 목록에 없어야 함
git status | findstr .env.local

# node_modules가 목록에 없어야 함
git status | findstr node_modules

# .next가 목록에 없어야 함
git status | findstr .next
```

## ⚠️ 중요 체크리스트

GitHub에 푸시하기 전 확인:
- [ ] `.env.local`이 목록에 없는가?
- [ ] `node_modules`가 목록에 없는가?
- [ ] `.next`가 목록에 없는가?
- [ ] `.npm`이 목록에 없는가?
- [ ] `app/` 폴더가 포함되어 있는가?
- [ ] `package.json`이 포함되어 있는가?

## 🎯 요약

**올려야 하는 것:**
- 모든 소스 코드 (`app/` 폴더)
- 설정 파일들 (`package.json`, `tsconfig.json` 등)
- 문서 파일들 (`README.md` 등)

**올리면 안 되는 것:**
- `.env.local` (API 키)
- `node_modules/` (의존성)
- `.next/` (빌드 결과물)
- 로그 및 캐시 파일들

현재 `.gitignore` 파일이 올바르게 설정되어 있어서, 위의 파일들은 자동으로 제외됩니다.
