# ⚡ Vercel 배포 빠른 수정 가이드

## 🔴 현재 문제

Vercel에서 Flask 앱이 제대로 작동하지 않는 이유:
1. `api/index.py`가 Vercel 형식에 맞지 않음
2. `vercel.json` 설정이 불완전함

## ✅ 해결 방법

### 수정된 파일들

1. **`vercel.json`** - 올바른 라우팅 설정
2. **`api/index.py`** - Vercel serverless function 형식으로 수정

### GitHub에 푸시

```bash
git add .
git commit -m "Fix: Vercel deployment configuration"
git push
```

### Vercel 자동 재배포

GitHub에 푸시하면 Vercel이 자동으로 재배포합니다.

## 🔍 배포 확인

1. Vercel 대시보드 > **Deployments**
2. 최신 배포 상태 확인:
   - ✅ "Ready" → 성공
   - ❌ "Error" → 로그 확인

## ⚠️ 환경 변수 확인

Vercel Settings > Environment Variables:
- `GEMINI_API_KEY` ✅ 필수
- `SUPABASE_URL` (선택)
- `SUPABASE_KEY` (선택)

## 🐛 여전히 오류가 있다면

1. **Deployments > Logs** 확인
2. 에러 메시지 복사
3. `VERCEL_DEPLOY_FIX.md` 참고
