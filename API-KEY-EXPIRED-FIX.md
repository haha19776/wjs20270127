# 🔑 API 키 만료 오류 해결 가이드

## 문제

```
API key expired. Please renew the API key.
reason: API_KEY_INVALID
```

Google Gemini API 키가 만료되었습니다.

## 해결 방법

### 방법 1: 새로운 API 키 생성 (권장)

1. **Google AI Studio 접속**
   - https://aistudio.google.com/app/apikey 접속
   - 또는 https://makersuite.google.com/app/apikey

2. **새 API 키 생성**
   - "Create API Key" 클릭
   - 새 프로젝트 선택 또는 기존 프로젝트 선택
   - API 키 복사

3. **Vercel 환경 변수 업데이트**
   - Vercel 대시보드 → 프로젝트 선택
   - Settings → Environment Variables
   - `GEMINI_API_KEY` 찾기
   - Value를 새 API 키로 변경
   - Save 클릭
   - **Redeploy** 실행

4. **로컬 환경 변수 업데이트** (선택사항)
   - `.env.local` 파일 열기
   - `GEMINI_API_KEY=새로운_API_키`로 변경

### 방법 2: 기존 API 키 갱신

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com/ 접속
   - API 및 서비스 → 사용자 인증 정보
   - 기존 API 키 찾기
   - "키 제한사항" 확인
   - 필요시 키 갱신

## Vercel 환경 변수 업데이트 단계

### 1단계: Vercel 대시보드 접속
1. https://vercel.com/dashboard 접속
2. 프로젝트 `wjs20270127d` 선택

### 2단계: 환경 변수 수정
1. **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Environment Variables** 클릭
3. `GEMINI_API_KEY` 찾기
4. **Edit** 또는 **...** 메뉴 클릭
5. **Value** 필드에 새 API 키 입력
6. **Save** 클릭

### 3단계: 재배포
1. **Deployments** 탭 클릭
2. 최신 배포 옆 **"..."** 메뉴 클릭
3. **Redeploy** 클릭
4. 배포 완료 대기 (2-3분)

## API 키 생성 방법 (상세)

### Google AI Studio에서 생성

1. **접속**
   - https://aistudio.google.com/app/apikey

2. **로그인**
   - Google 계정으로 로그인

3. **API 키 생성**
   - "Create API Key" 버튼 클릭
   - 프로젝트 선택 (새로 만들거나 기존 프로젝트)
   - API 키가 생성되면 복사

4. **API 키 형식**
   - `AIzaSy...`로 시작하는 긴 문자열
   - 예: `AIzaSyCXH-6EhzSsLZYkUUJddCTz2ye5Fa5KEKs`

## 현재 사용 중인 API 키

- 현재 키: `AIzaSyCXH-6EhzSsLZYkUUJddCTz2ye5Fa5KEKs` (만료됨)
- 새 키 필요: Google AI Studio에서 생성

## 확인 방법

### 1. Vercel 환경 변수 확인
- Settings → Environment Variables
- `GEMINI_API_KEY` 값 확인

### 2. 배포 후 테스트
- 배포된 사이트 접속
- 뉴스 검색 후 "요약 보기" 클릭
- 오류 없이 요약이 생성되는지 확인

## 문제 해결 체크리스트

- [ ] Google AI Studio에서 새 API 키 생성
- [ ] Vercel 환경 변수 `GEMINI_API_KEY` 업데이트
- [ ] 환경 변수가 Production, Preview, Development 모두 체크됨
- [ ] Vercel에서 Redeploy 실행
- [ ] 배포 완료 후 테스트
- [ ] 요약 기능 정상 작동 확인

## 추가 참고사항

### API 키 보안
- API 키는 절대 GitHub에 커밋하지 마세요
- `.env.local`은 `.gitignore`에 포함되어 있음
- Vercel 환경 변수는 안전하게 저장됨

### API 키 제한
- Google AI Studio에서 API 키 사용량 확인 가능
- 무료 플랜에는 일일/월별 제한이 있을 수 있음
- 제한 초과 시 새 API 키 필요

## 빠른 해결 요약

1. **새 API 키 생성**: https://aistudio.google.com/app/apikey
2. **Vercel 환경 변수 업데이트**: Settings → Environment Variables
3. **재배포**: Deployments → Redeploy
4. **테스트**: 사이트에서 요약 기능 확인
