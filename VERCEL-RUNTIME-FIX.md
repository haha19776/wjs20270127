# 🔧 Vercel 런타임 오류 해결 가이드

## 오류 확인 방법

### 1. Build Logs 확인
1. Vercel 대시보드 → 프로젝트 선택
2. **Deployments** 탭 → 실패한 배포 클릭
3. **Build Logs** 탭에서 빌드 오류 확인

### 2. Runtime Logs 확인
1. 배포 상세 페이지에서 **Runtime Logs** 탭 클릭
2. 런타임 오류 메시지 확인

### 3. Function Logs 확인
1. 배포 상세 페이지에서 **Functions** 탭 클릭
2. 각 API 라우트의 로그 확인

## 일반적인 오류 및 해결 방법

### 오류 1: 환경 변수 누락

**증상**: `GEMINI_API_KEY 환경변수가 설정되지 않았습니다`

**해결**:
1. Vercel → Settings → Environment Variables
2. `GEMINI_API_KEY` 추가
3. Value: `AIzaSyCXH-6EhzSsLZYkUUJddCTz2ye5Fa5KEKs`
4. Environment: Production, Preview, Development 모두 체크
5. **Redeploy** 실행

### 오류 2: API 라우트 404

**증상**: `/api/search-news` 또는 `/api/summarize-news` 접근 불가

**해결**:
- `app/api/` 디렉토리 구조 확인
- `route.ts` 파일이 올바른 위치에 있는지 확인

### 오류 3: CORS 오류

**증상**: 브라우저 콘솔에 CORS 관련 오류

**해결**:
- Next.js는 서버 사이드 렌더링이므로 CORS 문제가 거의 없음
- API 라우트가 올바르게 설정되어 있는지 확인

### 오류 4: 모듈을 찾을 수 없음

**증상**: `Module not found` 또는 `Cannot find module`

**해결**:
- `package.json`의 모든 의존성이 포함되어 있는지 확인
- `node_modules`가 `.gitignore`에 포함되어 있는지 확인 (포함되어야 함)

### 오류 5: 타입 오류

**증상**: TypeScript 컴파일 오류

**해결**:
- 로컬에서 `npm run build` 실행하여 오류 확인
- 오류 수정 후 다시 푸시

## 빠른 해결 체크리스트

- [ ] 환경 변수 `GEMINI_API_KEY` 설정됨
- [ ] 환경 변수가 Production, Preview, Development 모두 체크됨
- [ ] `app/api/search-news/route.ts` 파일 존재
- [ ] `app/api/summarize-news/route.ts` 파일 존재
- [ ] `package.json`에 모든 의존성 포함
- [ ] 빌드가 성공적으로 완료됨

## 디버깅 방법

### 1. 로컬에서 테스트
```bash
npm run build
npm start
```

### 2. Vercel CLI로 로컬 테스트
```bash
npm i -g vercel
vercel dev
```

### 3. 환경 변수 확인
Vercel 대시보드에서:
- Settings → Environment Variables
- 모든 환경 변수가 올바르게 설정되었는지 확인

## 재배포 방법

### 방법 1: 자동 재배포
GitHub에 푸시하면 자동으로 재배포됩니다.

### 방법 2: 수동 재배포
1. Vercel 대시보드 → 프로젝트
2. Deployments 탭
3. 최신 배포 옆 "..." 메뉴
4. **Redeploy** 클릭

### 방법 3: 환경 변수 재설정 후 재배포
1. Settings → Environment Variables
2. `GEMINI_API_KEY` 확인/수정
3. **Save** 클릭
4. **Redeploy** 실행

## 오류 메시지 공유

정확한 해결을 위해 다음 정보를 공유해주세요:
1. Build Logs의 전체 오류 메시지
2. Runtime Logs의 오류 메시지
3. 브라우저 콘솔의 오류 메시지 (있는 경우)
