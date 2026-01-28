# 🔒 API 키 Leaked 오류 해결 가이드

## 문제

```
403 Forbidden: Your API key was reported as leaked. Please use another API key.
```

**원인:** API 키가 GitHub에 커밋되어 Google이 이를 감지하고 키를 무효화했습니다.

## 해결 방법

### 1단계: 새 API 키 생성 (필수!)

1. **Google AI Studio 접속**
   - https://makersuite.google.com/app/apikey
   - 또는 https://aistudio.google.com/app/apikey

2. **새 API 키 생성**
   - "Create API Key" 또는 "+ Create API Key" 클릭
   - 프로젝트 선택 (또는 새 프로젝트 생성)
   - API 키 복사

3. **중요:** 새 API 키를 **절대** GitHub에 커밋하지 마세요!

### 2단계: 로컬 환경 변수 업데이트

`.env.local` 파일 수정:

```env
# Google Gemini API 키
GEMINI_API_KEY=여기에_새_API_키_입력
```

**확인:**
- `.env.local`이 `.gitignore`에 포함되어 있는지 확인
- Git에 커밋되지 않도록 주의

### 3단계: Vercel 환경 변수 업데이트 (중요!)

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - 프로젝트 `wjs20270127d` 선택

2. **환경 변수 수정**
   - **Settings** → **Environment Variables**
   - `GEMINI_API_KEY` 찾기
   - **Edit** 클릭
   - **Value**에 새 API 키 입력
   - **Environment**: Production, Preview, Development 모두 체크
   - **Save** 클릭

3. **재배포**
   - **Deployments** 탭
   - 최신 배포 옆 **"..."** 메뉴
   - **Redeploy** 클릭
   - 배포 완료 대기 (2-3분)

### 4단계: 테스트

1. **로컬 테스트**
   ```bash
   npm run dev
   ```
   - http://localhost:3000 접속
   - 검색 및 요약 기능 테스트

2. **배포 사이트 테스트**
   - https://wjs20270127d.vercel.app 접속
   - 검색 및 요약 기능 테스트

## 보안 주의사항

### ✅ 올바른 방법:
- API 키는 `.env.local`에만 저장
- `.env.local`은 `.gitignore`에 포함
- Vercel 환경 변수에 직접 입력
- 문서에는 플레이스홀더만 사용

### ❌ 잘못된 방법:
- 코드에 API 키 하드코딩
- 문서에 실제 API 키 포함
- GitHub에 API 키 커밋
- 공개 저장소에 API 키 노출

## 예방 조치

### 이미 커밋된 API 키 제거 (필요시):

1. **GitHub에서 Secret 허용 취소**
   - GitHub → Settings → Security → Secret scanning
   - 노출된 키 확인 및 처리

2. **Git 히스토리에서 제거 (고급)**
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.local" \
     --prune-empty --tag-name-filter cat -- --all
   ```
   ⚠️ 주의: 이 작업은 Git 히스토리를 변경합니다.

## 빠른 체크리스트

- [ ] 새 API 키 생성 (Google AI Studio)
- [ ] 로컬 `.env.local` 업데이트
- [ ] `.env.local`이 `.gitignore`에 포함되어 있는지 확인
- [ ] Vercel 환경 변수 `GEMINI_API_KEY` 업데이트
- [ ] Vercel Redeploy 실행
- [ ] 로컬에서 테스트
- [ ] 배포 사이트에서 테스트
- [ ] 오류 메시지 사라졌는지 확인

## 문제가 계속되면

1. **새 API 키가 정상 작동하는지 확인**
   - Google AI Studio에서 직접 테스트
   - API 키 권한 확인

2. **Vercel 환경 변수 확인**
   - 값이 올바르게 저장되었는지
   - Production, Preview, Development 모두 체크되었는지

3. **캐시 문제**
   - 브라우저 캐시 삭제
   - Vercel 재배포

4. **API 키 할당량 확인**
   - Google AI Studio에서 할당량 확인
   - 무료 티어 제한 확인
