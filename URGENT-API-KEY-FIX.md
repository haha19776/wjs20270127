# 🚨 긴급: API 키 Leaked 오류 해결

## 현재 문제

```
403 Forbidden: Your API key was reported as leaked. Please use another API key.
```

**원인:** API 키가 GitHub에 커밋되어 Google이 이를 감지하고 키를 무효화했습니다.

## 즉시 해결 방법

### 1단계: 새 API 키 생성 (필수!)

1. **Google AI Studio 접속**
   - https://makersuite.google.com/app/apikey
   - 또는 https://aistudio.google.com/app/apikey

2. **새 API 키 생성**
   - "Create API Key" 또는 "+ Create API Key" 클릭
   - 프로젝트 선택 (또는 새 프로젝트 생성)
   - **생성된 API 키를 복사** (중요!)

3. **구 API 키 삭제 (선택사항)**
   - Google AI Studio에서 구 API 키 삭제 권장

### 2단계: 새 API 키를 알려주세요

**새 API 키를 생성하셨다면, 아래 형식으로 알려주세요:**

```
새 API 키: AIzaSy...
```

제가 즉시 다음 작업을 수행하겠습니다:
- ✅ 로컬 `.env.local` 파일 업데이트
- ✅ Vercel 환경 변수 업데이트 안내
- ✅ 테스트 및 확인

### 3단계: 자동 업데이트 (제가 처리)

새 API 키를 받으면:
1. 로컬 `.env.local` 파일 업데이트
2. Vercel 환경 변수 업데이트 가이드 제공
3. 재배포 안내

## 빠른 체크리스트

- [ ] Google AI Studio에서 새 API 키 생성
- [ ] 새 API 키를 여기에 공유
- [ ] 제가 로컬 파일 업데이트 완료 대기
- [ ] Vercel 환경 변수 업데이트 (제가 안내)
- [ ] Vercel Redeploy 실행
- [ ] 사이트에서 테스트

## 보안 주의사항

⚠️ **중요:** 새 API 키를 생성한 후:
- 절대 GitHub에 커밋하지 마세요
- 문서에 포함하지 마세요
- `.env.local`에만 저장하세요 (이미 `.gitignore`에 포함됨)

## 현재 상태

- ❌ API 키가 leaked로 표시됨
- ⏳ 새 API 키 생성 필요
- ⏳ 로컬 파일 업데이트 필요
- ⏳ Vercel 환경 변수 업데이트 필요

---

**새 API 키를 생성하셨다면 바로 알려주세요! 제가 즉시 처리하겠습니다.**
