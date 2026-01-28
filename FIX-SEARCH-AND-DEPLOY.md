# 🔍 검색 기능 수정 및 배포 가이드

## 완료된 작업

✅ **API 엔드포인트 확인**
- `/api/search-news?query=test` 정상 작동 확인
- 더미 데이터 5개 정상 반환

✅ **디버깅 로그 추가**
- 검색 시작 로그
- API 호출 로그
- 응답 상태 로그
- 검색 결과 로그

✅ **코드 개선**
- 에러 처리 강화
- 네트워크 요청 옵션 추가

## 필요한 작업

### 1단계: GitHub에 푸시

**Cursor 터미널에서 실행:**

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127

# 프록시 제거
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null

# 푸시 실행
git push origin main
```

**인증 정보:**
- Username: `haha19776`
- Password: `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`

### 2단계: Vercel 환경 변수 업데이트

1. **Vercel 대시보드** → 프로젝트 `wjs20270127d` 선택
2. **Settings** → **Environment Variables**
3. `GEMINI_API_KEY` 찾기 → **Edit** 클릭
4. **Value** 입력: `YOUR_GEMINI_API_KEY` (실제 API 키는 Vercel 대시보드에서 직접 입력)
5. **Environment**: Production, Preview, Development 모두 체크
6. **Save** 클릭

### 3단계: Vercel 재배포

1. **Deployments** 탭
2. 최신 배포 옆 **"..."** 메뉴
3. **Redeploy** 클릭
4. 배포 완료 대기 (2-3분)

## 테스트 방법

### 배포 후 테스트:

1. **사이트 접속**: https://wjs20270127d.vercel.app
2. **개발자 도구 열기**: F12
3. **Console 탭** 클릭
4. **검색 테스트**:
   - 검색어 입력 (예: "ai")
   - "검색" 버튼 클릭
   - 콘솔에 다음 로그 확인:
     - `검색 시작: ai`
     - `검색 API 호출: /api/search-news?query=ai`
     - `API 응답 상태: 200 OK`
     - `검색 결과: 5개`
5. **결과 확인**:
   - 왼쪽에 뉴스 5개 표시
   - 오른쪽 채팅에 검색 결과 메시지 표시

## 예상 결과

✅ **정상 작동:**
- 검색 버튼 클릭 시 로딩 표시
- 뉴스 5개 표시
- 채팅에 검색 결과 메시지 표시
- 콘솔에 디버깅 로그 표시

❌ **오류 발생 시:**
- 콘솔에 오류 메시지 확인
- Network 탭에서 API 요청 확인
- 오류 메시지를 공유해주세요

## 현재 상태

- ✅ API 엔드포인트: 정상 작동
- ✅ 디버깅 로그: 추가됨
- ✅ 코드 개선: 완료
- ✅ 커밋: 완료
- ⏳ GitHub 푸시: 필요
- ⏳ Vercel 환경 변수: 업데이트 필요
- ⏳ Vercel 재배포: 필요

## 빠른 체크리스트

- [ ] GitHub 푸시 완료
- [ ] Vercel 환경 변수 `GEMINI_API_KEY` 업데이트
- [ ] Vercel Redeploy 실행
- [ ] 배포 완료 확인
- [ ] 사이트에서 검색 기능 테스트
- [ ] 브라우저 콘솔에서 로그 확인

## 문제 해결

### 검색이 여전히 안 되면:

1. **브라우저 콘솔 확인** (F12 → Console)
   - 오류 메시지 확인
   - 디버깅 로그 확인

2. **Network 탭 확인** (F12 → Network)
   - `/api/search-news` 요청 확인
   - 상태 코드 확인 (200이어야 함)

3. **오류 메시지 공유**
   - 콘솔 오류 메시지 전체 복사
   - Network 탭의 실패한 요청 확인
   - 오류 정보를 공유해주세요
