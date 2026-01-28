# 🔍 Vercel 오류 확인 및 해결 가이드

## 오류 메시지 확인 방법

### 1. Build Logs 확인 (빌드 오류)
1. Vercel 대시보드 → 프로젝트 선택
2. **Deployments** 탭 클릭
3. 실패한 배포 클릭
4. **Build Logs** 탭에서 오류 메시지 확인
5. 오류 메시지 전체를 복사해주세요

### 2. Runtime Logs 확인 (런타임 오류)
1. 배포 상세 페이지에서 **Runtime Logs** 탭 클릭
2. 오류 메시지 확인
3. 오류 메시지 전체를 복사해주세요

### 3. Function Logs 확인 (API 오류)
1. 배포 상세 페이지에서 **Functions** 탭 클릭
2. 각 API 라우트의 로그 확인
3. 오류 메시지 확인

## 일반적인 오류 및 해결 방법

### 오류 1: 환경 변수 누락

**증상**: 
```
GEMINI_API_KEY 환경변수가 설정되지 않았습니다
```

**해결**:
1. Vercel → Settings → Environment Variables
2. `GEMINI_API_KEY` 추가
3. Value: `AIzaSyCXH-6EhzSsLZYkUUJddCTz2ye5Fa5KEKs`
4. Environment: Production, Preview, Development 모두 체크
5. **Save** 클릭
6. **Redeploy** 실행

### 오류 2: API 라우트 404

**증상**: `/api/search-news` 또는 `/api/summarize-news` 접근 불가

**해결**:
- 이미 수정 완료: `app/api/search-news/route.ts` 존재
- 이미 수정 완료: `app/api/summarize-news/route.ts` 존재

### 오류 3: 빌드 오류 (TypeScript)

**증상**: 
```
Type error: Route "app/api/..." does not match
```

**해결**:
- ✅ 이미 수정 완료: `app/api/news/route.ts`의 `searchNews` export 제거
- ✅ 이미 수정 완료: `app/api/summarize/route.ts`의 `summarizeNews` export 제거

### 오류 4: 모듈을 찾을 수 없음

**증상**: 
```
Module not found: Can't resolve '@/app/...'
```

**해결**:
- `tsconfig.json`의 `paths` 설정 확인 (이미 올바르게 설정됨)

### 오류 5: 함수 실행 시간 초과

**증상**: 
```
Function execution timeout
```

**해결**:
- Vercel 무료 플랜은 10초 제한
- Gemini API 응답이 느린 경우 발생 가능
- 현재 코드는 이미 최적화됨

## 빠른 해결 체크리스트

- [ ] 환경 변수 `GEMINI_API_KEY` 설정됨
- [ ] 환경 변수가 Production, Preview, Development 모두 체크됨
- [ ] `app/api/search-news/route.ts` 파일 존재
- [ ] `app/api/summarize-news/route.ts` 파일 존재
- [ ] `package.json`에 모든 의존성 포함
- [ ] 빌드가 성공적으로 완료됨

## 재배포 방법

### 방법 1: 자동 재배포
GitHub에 푸시하면 자동으로 재배포됩니다.

### 방법 2: 수동 재배포
1. Vercel 대시보드 → 프로젝트
2. Deployments 탭
3. 최신 배포 옆 "..." 메뉴
4. **Redeploy** 클릭

## 오류 메시지 공유

정확한 해결을 위해 다음 정보를 공유해주세요:

1. **Build Logs**의 전체 오류 메시지
2. **Runtime Logs**의 오류 메시지 (있는 경우)
3. **Functions** 탭의 오류 메시지 (있는 경우)
4. 배포 상태 (Ready/Error/Building)

## 현재 프로젝트 상태

✅ 빌드 오류 수정 완료
✅ Route Handler export 문제 해결
✅ API 라우트 파일 존재 확인
✅ TypeScript 설정 확인

## 다음 단계

1. Vercel 대시보드에서 오류 메시지 확인
2. 위의 체크리스트 확인
3. 오류 메시지를 공유해주시면 정확히 해결하겠습니다
