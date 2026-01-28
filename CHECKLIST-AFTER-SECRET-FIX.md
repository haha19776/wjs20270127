# ✅ Secret 허용 후 확인 체크리스트

## 1단계: GitHub 푸시 확인

### 터미널에서 확인:
```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git push origin main
```

**성공 메시지:**
```
Enumerating objects: ...
Writing objects: ...
To https://github.com/haha19776/wjs20270127.git
   [커밋 해시] -> main
```

### GitHub 웹사이트에서 확인:
1. https://github.com/haha19776/wjs20270127 접속
2. 최신 커밋 확인:
   - "Remove API keys from documentation files for security"
   - "Add search debugging guides"
   - "Add debugging logs for search functionality"
3. 커밋이 5개 이상 보이면 성공 ✅

---

## 2단계: Vercel 자동 재배포 확인

### Vercel 대시보드에서 확인:
1. https://vercel.com/dashboard 접속
2. 프로젝트 `wjs20270127d` 선택
3. **Deployments** 탭 클릭
4. 최신 배포 확인:
   - 상태가 "Building" 또는 "Ready"인지 확인
   - 최근 5분 이내에 시작된 배포가 있으면 자동 재배포 성공 ✅

**자동 재배포가 안 되면:**
- Deployments 탭에서 최신 배포 옆 "..." 메뉴
- **Redeploy** 클릭

---

## 3단계: Vercel 환경 변수 확인 (중요!)

### Vercel 대시보드에서 확인:
1. 프로젝트 `wjs20270127d` 선택
2. **Settings** → **Environment Variables**
3. `GEMINI_API_KEY` 확인:
   - ✅ 값이 설정되어 있는지 확인
   - ✅ Production, Preview, Development 모두 체크되어 있는지 확인

**API 키가 없거나 잘못되었으면:**
- `GEMINI_API_KEY` 찾기 → **Edit** 클릭
- Value에 실제 API 키 입력
- Environment: Production, Preview, Development 모두 체크
- **Save** 클릭
- **Redeploy** 실행

---

## 4단계: 배포된 사이트 테스트

### 사이트 접속:
- URL: https://wjs20270127d.vercel.app

### 검색 기능 테스트:
1. 검색창에 "ai" 입력
2. "검색" 버튼 클릭
3. 확인 사항:
   - ✅ 로딩 표시가 나타났다가 사라짐
   - ✅ 왼쪽에 뉴스 5개 표시
   - ✅ 오른쪽 채팅에 검색 결과 메시지 표시

### 요약 기능 테스트:
1. 첫 번째 뉴스의 "요약 보기" 버튼 클릭
2. 확인 사항:
   - ✅ 로딩 표시가 나타났다가 사라짐
   - ✅ 요약이 한국어로 생성됨
   - ✅ 오류 메시지가 없음

### 브라우저 콘솔 확인 (F12):
1. **Console 탭** 클릭
2. 확인 사항:
   - ✅ `검색 시작: ai` 로그
   - ✅ `검색 API 호출: /api/search-news?query=ai` 로그
   - ✅ `API 응답 상태: 200 OK` 로그
   - ✅ `검색 결과: 5개` 로그
   - ❌ 오류 메시지가 없어야 함

---

## 5단계: 문제 발생 시 확인

### 검색이 안 되면:
1. 브라우저 콘솔 (F12) 확인
   - 오류 메시지 확인
   - Network 탭에서 `/api/search-news` 요청 확인
2. Vercel Runtime Logs 확인
   - Vercel → 프로젝트 → **Deployments** → 최신 배포 → **Runtime Logs**

### 요약이 안 되면:
1. "API key expired" 오류 → Vercel 환경 변수 확인
2. "요약 실패" 오류 → Vercel Runtime Logs 확인
3. Vercel 환경 변수 `GEMINI_API_KEY` 재설정 후 Redeploy

---

## 빠른 체크리스트

- [ ] GitHub 푸시 성공 확인
- [ ] GitHub 저장소에 최신 커밋 확인
- [ ] Vercel 자동 재배포 시작 확인
- [ ] Vercel 환경 변수 `GEMINI_API_KEY` 확인
- [ ] 배포 완료 확인 (Vercel Deployments)
- [ ] 사이트 접속 확인 (https://wjs20270127d.vercel.app)
- [ ] 검색 기능 테스트
- [ ] 요약 기능 테스트
- [ ] 브라우저 콘솔 오류 확인

---

## 예상 결과

✅ **모든 것이 정상이면:**
- 검색 버튼 클릭 시 뉴스 5개 표시
- "요약 보기" 클릭 시 한국어 요약 생성
- 오류 메시지 없음
- 브라우저 콘솔에 디버깅 로그 표시

❌ **문제가 있으면:**
- 브라우저 콘솔 오류 메시지 확인
- Vercel Runtime Logs 확인
- 오류 메시지를 공유해주세요
