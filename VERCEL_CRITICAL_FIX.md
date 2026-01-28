# 🔴 Vercel 배포 오류 긴급 수정

## 문제 원인

`FUNCTION_INVOCATION_FAILED` 오류는 앱 시작 시점에 발생하는 오류입니다.

**주요 원인:**
1. `app.py`에서 `GEMINI_API_KEY`가 없으면 즉시 `raise ValueError` → 앱 시작 실패
2. `supabase_config` import 오류 가능성
3. Vercel 환경 변수가 설정되지 않았을 때 앱이 시작조차 안 됨

## ✅ 수정 사항

### 1. `app.py` - API 키 검증 지연
- 앱 시작 시 즉시 에러를 내지 않음
- 실제 사용 시점에 검증
- 환경 변수가 없어도 앱은 실행됨

### 2. `app.py` - Supabase 선택적 로드
- Supabase가 없어도 앱이 실행되도록
- import 오류 시에도 앱 실행 가능

## 🚀 배포 방법

### 1단계: GitHub에 푸시

```bash
cd C:\Users\SD2-16\Desktop\chatbot3
git add .
git commit -m "Fix: Make app startup more resilient for Vercel"
git push
```

### 2단계: Vercel 환경 변수 확인

**중요!** Vercel Settings > Environment Variables에서:
- `GEMINI_API_KEY` ✅ **반드시 설정 필요**
- `SUPABASE_URL` (선택)
- `SUPABASE_KEY` (선택)

### 3단계: 자동 재배포 대기

GitHub에 푸시하면 Vercel이 자동으로 재배포합니다 (1-2분 소요)

## 🔍 배포 확인

1. **Vercel 대시보드** > Deployments
2. 최신 배포 상태 확인:
   - ✅ "Ready" → 성공
   - ❌ "Error" → 로그 확인

3. **사이트 접속**:
   ```
   https://newschat-green.vercel.app/
   ```

## ⚠️ 여전히 오류가 있다면

Vercel 로그에서 확인:
1. Deployments > 최신 배포 > Logs
2. 에러 메시지 복사
3. 알려주시면 추가 수정하겠습니다

## 📋 체크리스트

- [ ] `GEMINI_API_KEY` 환경 변수 설정 확인
- [ ] GitHub에 푸시 완료
- [ ] Vercel 자동 재배포 확인
- [ ] 배포 상태 확인
- [ ] 사이트 접속 테스트
