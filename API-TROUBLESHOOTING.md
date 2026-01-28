# 🔧 API 연결 문제 해결 가이드

## 현재 상황
- API 키는 올바르게 설정됨
- 모든 모델(gemini-pro, gemini-1.5-pro, gemini-1.5-flash) 테스트 실패

## 가능한 원인 및 해결 방법

### 1. API 키가 유효하지 않음
**확인 방법:**
- [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
- API 키 상태 확인
- 새 API 키 발급 시도

**해결:**
```bash
# 새 API 키 발급 후 .env.local 업데이트
GEMINI_API_KEY=새로운_API_키
```

### 2. API 키에 권한이 없음
**확인 방법:**
- Google AI Studio에서 API 키의 권한 확인
- Generative AI API가 활성화되어 있는지 확인

**해결:**
- [Google Cloud Console](https://console.cloud.google.com/)에서 API 활성화
- "Generative Language API" 활성화 확인

### 3. 할당량 초과
**확인 방법:**
- [Google AI Studio](https://makersuite.google.com/app/apikey)에서 할당량 확인
- 사용량 대시보드 확인

**해결:**
- 무료 티어의 경우 일일/분당 제한 확인
- 시간이 지난 후 다시 시도
- 유료 플랜으로 업그레이드 고려

### 4. API 키가 삭제되었거나 비활성화됨
**확인 방법:**
- Google AI Studio에서 API 키 목록 확인
- 키가 활성 상태인지 확인

**해결:**
- 새 API 키 생성
- `.env.local` 파일 업데이트
- 서버 재시작

### 5. 네트워크/방화벽 문제
**확인 방법:**
- 인터넷 연결 확인
- 방화벽이 API 호출을 차단하는지 확인

**해결:**
- 방화벽 설정 확인
- VPN 사용 중이면 해제 후 시도

## 테스트 방법

프로젝트 루트에서 다음 명령어 실행:
```bash
node test-api.js
```

이 스크립트는 여러 모델을 자동으로 테스트하고 상세한 오류 메시지를 표시합니다.

## 다음 단계

1. **상세 오류 메시지 확인**
   - `test-api.js` 실행 결과의 전체 오류 메시지 확인
   - 오류 코드 확인 (400, 401, 403, 429 등)

2. **API 키 재발급**
   - Google AI Studio에서 새 API 키 생성
   - `.env.local` 파일 업데이트
   - 서버 재시작

3. **Google Cloud Console 확인**
   - API 활성화 상태 확인
   - 결제 정보 연결 확인 (일부 모델은 결제 필요)

## 지원 링크

- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [Gemini API 문서](https://ai.google.dev/gemini-api/docs)
- [할당량 정보](https://ai.google.dev/gemini-api/docs/quota)
