# 🚀 GitHub & Vercel 배포 가이드

## ⚠️ GitHub에 올리면 안 되는 파일/폴더

### 1. 환경 변수 파일 (중요!)
```
.env.local          # API 키가 포함되어 있음 - 절대 올리면 안 됨!
.env                # 환경 변수 파일
```

### 2. 의존성 및 빌드 파일
```
node_modules/       # npm 패키지들
.next/              # Next.js 빌드 결과물
out/                # 빌드 출력
build/              # 빌드 폴더
```

### 3. 로그 및 캐시 파일
```
*.log               # 모든 로그 파일
install.log         # 설치 로그
.npm/               # npm 캐시
```

### 4. 시스템 파일
```
.DS_Store           # macOS 시스템 파일
*.pem               # 인증서 파일
```

### 5. Vercel 관련
```
.vercel/            # Vercel 배포 설정 (자동 생성)
```

### 6. 기타
```
*.tsbuildinfo       # TypeScript 빌드 정보
next-env.d.ts       # Next.js 타입 정의 (자동 생성)
```

## ✅ GitHub에 올려도 되는 파일

- 모든 소스 코드 (`.ts`, `.tsx`, `.js`, `.jsx`)
- 설정 파일 (`package.json`, `tsconfig.json`, `tailwind.config.ts` 등)
- 문서 파일 (`README.md` 등)
- 테스트 스크립트 (선택사항)

## 📋 배포 전 체크리스트

### 1. .env.local 확인
```bash
# .env.local 파일이 .gitignore에 포함되어 있는지 확인
cat .gitignore | grep .env.local
```

### 2. Git 상태 확인
```bash
git status
# .env.local이 표시되지 않아야 함
```

### 3. Vercel 환경 변수 설정
배포 후 Vercel 대시보드에서:
- Settings → Environment Variables
- `GEMINI_API_KEY` 추가
- Value: 실제 API 키 입력

## 🔒 보안 주의사항

1. **절대 .env.local을 커밋하지 마세요**
   - API 키가 유출되면 즉시 삭제하고 새로 발급받으세요

2. **GitHub에 올리기 전 확인**
   ```bash
   git status
   # .env.local이 목록에 없어야 함
   ```

3. **이미 올렸다면**
   - Git 히스토리에서 제거 필요
   - API 키 즉시 재발급

## 📝 배포 순서

1. **Git 초기화 및 커밋**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **GitHub 저장소 생성 및 푸시**
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Vercel 배포**
   - Vercel에서 GitHub 저장소 연결
   - 환경 변수 `GEMINI_API_KEY` 설정
   - 자동 배포 완료

## 🎯 핵심 요약

**절대 올리면 안 되는 것:**
- `.env.local` (API 키)
- `node_modules/`
- `.next/`
- 로그 파일들

**올려도 되는 것:**
- 모든 소스 코드
- 설정 파일
- 문서
