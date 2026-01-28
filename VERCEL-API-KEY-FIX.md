# 🔑 Vercel API 키 만료 오류 해결

## 문제

```
API key expired. Please renew the API key.
reason: API_KEY_INVALID
```

현재 사용 중인 API 키가 만료되었습니다.

## 해결 방법 (3단계)

### 1단계: 새 API 키 생성

1. **Google AI Studio 접속**
   - https://aistudio.google.com/app/apikey 접속
   - Google 계정으로 로그인

2. **API 키 생성**
   - "Create API Key" 버튼 클릭
   - 프로젝트 선택 (새로 만들거나 기존 프로젝트)
   - API 키 복사 (예: `AIzaSy...`로 시작하는 긴 문자열)

### 2단계: Vercel 환경 변수 업데이트

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard 접속
   - 프로젝트 `wjs20270127d` 선택

2. **환경 변수 수정**
   - 상단 메뉴에서 **Settings** 탭 클릭
   - 왼쪽 사이드바에서 **Environment Variables** 클릭
   - `GEMINI_API_KEY` 찾기
   - **Edit** 또는 **...** 메뉴 클릭
   - **Value** 필드에 새로 생성한 API 키 붙여넣기
   - **Environment**: Production, Preview, Development 모두 체크 확인
   - **Save** 클릭

### 3단계: 재배포

1. **Deployments** 탭 클릭
2. 최신 배포 옆 **"..."** 메뉴 클릭
3. **Redeploy** 클릭
4. 배포 완료 대기 (2-3분)

## 빠른 체크리스트

- [ ] Google AI Studio에서 새 API 키 생성
- [ ] Vercel → Settings → Environment Variables
- [ ] `GEMINI_API_KEY` 값 업데이트
- [ ] Production, Preview, Development 모두 체크 확인
- [ ] Save 클릭
- [ ] Deployments → Redeploy 실행
- [ ] 배포 완료 후 사이트에서 요약 기능 테스트

## API 키 생성 상세 가이드

### Google AI Studio 접속
1. 브라우저에서 https://aistudio.google.com/app/apikey 접속
2. Google 계정으로 로그인 (API 키를 생성한 계정)

### API 키 생성
1. "Create API Key" 또는 "API 키 만들기" 버튼 클릭
2. 프로젝트 선택:
   - 기존 프로젝트 선택 또는
   - "Create new project" 클릭하여 새 프로젝트 생성
3. API 키가 생성되면 복사
   - 형식: `AIzaSy...` (약 39자)
   - ⚠️ 한 번만 보여주므로 반드시 복사!

### API 키 형식 예시
```
AIzaSyCXH-6EhzSsLZYkUUJddCTz2ye5Fa5KEKs
```

## 현재 상태

- ❌ 현재 API 키: `AIzaSyCXH-6EhzSsLZYkUUJddCTz2ye5Fa5KEKs` (만료됨)
- ✅ 새 API 키 필요: Google AI Studio에서 생성

## 확인 방법

### 배포 후 테스트
1. 배포된 사이트 접속 (예: `wjs20270127d.vercel.app`)
2. 뉴스 검색 (예: "ai" 검색)
3. "요약 보기" 버튼 클릭
4. 요약이 정상적으로 생성되는지 확인

### 오류가 계속되면
1. Vercel → Settings → Environment Variables
2. `GEMINI_API_KEY` 값이 올바르게 저장되었는지 확인
3. 환경 변수가 Production, Preview, Development 모두 체크되었는지 확인
4. 다시 Redeploy 실행

## 추가 참고사항

### API 키 보안
- ✅ API 키는 Vercel 환경 변수에 안전하게 저장됨
- ✅ `.env.local`은 Git에 커밋되지 않음
- ❌ API 키를 코드에 하드코딩하지 마세요

### API 키 제한
- Google AI Studio에서 사용량 확인 가능
- 무료 플랜에는 일일/월별 제한이 있을 수 있음
- 제한 초과 시 새 API 키 생성 필요

## 문제 해결

### "API key expired" 오류가 계속되면
1. 새로 생성한 API 키가 올바른지 확인
2. Vercel 환경 변수가 올바르게 저장되었는지 확인
3. 재배포 후에도 오류가 계속되면:
   - Vercel Runtime Logs 확인
   - 환경 변수가 실제로 적용되었는지 확인

### "API key not valid" 오류
- API 키 형식이 올바른지 확인 (`AIzaSy...`로 시작)
- API 키가 Google AI Studio에서 활성화되어 있는지 확인
