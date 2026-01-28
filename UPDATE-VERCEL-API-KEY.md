# 🔑 Vercel API 키 업데이트 가이드

## 새 API 키

```
AIzaSyCErZL3fnk5J8s2Sk_LRD3wwj0cTAemu40
```

## Vercel 환경 변수 업데이트 (필수!)

### 1단계: Vercel 대시보드 접속
1. https://vercel.com/dashboard 접속
2. 프로젝트 `wjs20270127d` 선택

### 2단계: 환경 변수 수정
1. 상단 메뉴에서 **Settings** 탭 클릭
2. 왼쪽 사이드바에서 **Environment Variables** 클릭
3. `GEMINI_API_KEY` 찾기
4. **Edit** 또는 **...** 메뉴 클릭
5. **Value** 필드에 다음 키 입력:
   ```
   AIzaSyCErZL3fnk5J8s2Sk_LRD3wwj0cTAemu40
   ```
6. **Environment**: Production, Preview, Development 모두 체크 확인
7. **Save** 클릭

### 3단계: 재배포
1. **Deployments** 탭 클릭
2. 최신 배포 옆 **"..."** 메뉴 클릭
3. **Redeploy** 클릭
4. 배포 완료 대기 (2-3분)

## 로컬 환경 변수

✅ 로컬 `.env.local` 파일이 이미 업데이트되었습니다.

로컬에서 테스트하려면:
```bash
npm run dev
```

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

## 빠른 체크리스트

- [x] 로컬 `.env.local` 파일 업데이트 완료
- [ ] Vercel → Settings → Environment Variables
- [ ] `GEMINI_API_KEY` 값 업데이트: `AIzaSyCErZL3fnk5J8s2Sk_LRD3wwj0cTAemu40`
- [ ] Production, Preview, Development 모두 체크 확인
- [ ] Save 클릭
- [ ] Deployments → Redeploy 실행
- [ ] 배포 완료 후 사이트에서 요약 기능 테스트

## 중요 사항

⚠️ **Vercel 환경 변수를 반드시 업데이트해야 합니다!**
- 로컬 파일만 업데이트하면 Vercel 배포에는 적용되지 않습니다
- Vercel은 자체 환경 변수를 사용합니다
- 환경 변수 업데이트 후 **반드시 Redeploy** 해야 합니다
