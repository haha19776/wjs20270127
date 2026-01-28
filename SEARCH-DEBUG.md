# 🔍 검색 기능 디버깅 가이드

## 확인된 사항

✅ **API 엔드포인트 정상 작동**
- `/api/search-news?query=test` 정상 응답 확인
- 더미 데이터 5개 반환 확인

## 디버깅 단계

### 1단계: 브라우저 개발자 도구 확인

1. **사이트 접속**: https://wjs20270127d.vercel.app
2. **개발자 도구 열기**: F12 또는 Ctrl+Shift+I
3. **Console 탭** 클릭
4. **검색 시도**: 검색어 입력 후 "검색" 버튼 클릭
5. **콘솔 메시지 확인**:
   - `검색 시작: [검색어]` - 검색 함수 호출 확인
   - `검색 API 호출: /api/search-news?query=...` - API 호출 확인
   - `API 응답 상태: 200 OK` - 응답 성공 확인
   - `검색 결과: 5개` - 결과 확인

### 2단계: Network 탭 확인

1. **Network 탭** 클릭
2. **검색 버튼 클릭**
3. **`/api/search-news` 요청 확인**:
   - Status: 200 (성공)
   - Response: JSON 데이터 확인

### 3단계: 오류 확인

콘솔에 오류가 있다면:
- 오류 메시지 전체 복사
- Network 탭에서 실패한 요청 확인
- 오류 메시지를 공유해주세요

## 가능한 문제 및 해결

### 문제 1: 검색 버튼이 작동하지 않음

**증상**: 버튼 클릭해도 아무 반응 없음

**확인**:
- 브라우저 콘솔에 JavaScript 오류 확인
- `SearchBar` 컴포넌트의 `onClick` 이벤트 확인

### 문제 2: API 호출 실패

**증상**: 콘솔에 네트워크 오류

**확인**:
- Network 탭에서 요청 상태 확인
- CORS 오류 확인
- 404 오류 확인

### 문제 3: 결과가 표시되지 않음

**증상**: API 호출 성공하지만 UI에 표시 안 됨

**확인**:
- `setArticles` 함수 호출 확인
- `NewsList` 컴포넌트 렌더링 확인
- React 상태 업데이트 확인

## 빠른 테스트

브라우저 콘솔에서 직접 테스트:

```javascript
// 검색 API 직접 호출
fetch('/api/search-news?query=test')
  .then(res => res.json())
  .then(data => {
    console.log('검색 결과:', data);
    console.log('뉴스 개수:', data.articles?.length || 0);
  })
  .catch(err => console.error('오류:', err));
```

## 디버깅 로그 추가됨

다음 로그가 콘솔에 표시됩니다:
- `검색 시작: [검색어]`
- `검색 API 호출: /api/search-news?query=...`
- `API 응답 상태: [상태코드]`
- `검색 결과: [개수]개`

## 다음 단계

1. 브라우저 개발자 도구 열기
2. 검색 시도
3. 콘솔 메시지 확인
4. 오류 메시지 공유 (있는 경우)
