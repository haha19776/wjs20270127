# Supabase 데이터베이스 설정 가이드

## 1. Supabase 프로젝트 생성

1. **Supabase 접속**: https://supabase.com
2. **"New Project"** 클릭
3. 프로젝트 정보 입력:
   - **Name**: news-chatbot (원하는 이름)
   - **Database Password**: 강력한 비밀번호 설정
   - **Region**: 가장 가까운 지역 선택
4. **"Create new project"** 클릭 (약 2분 소요)

## 2. 데이터베이스 스키마 생성

1. Supabase 대시보드에서 **"SQL Editor"** 클릭
2. **"New query"** 클릭
3. `supabase_setup.sql` 파일의 내용을 복사해서 붙여넣기
4. **"Run"** 클릭 (또는 Ctrl+Enter)

✅ 테이블 생성 확인:
- `news_searches` - 검색 기록 테이블
- `news_articles` - 뉴스 기사 테이블

## 3. API 키 및 URL 확인

1. Supabase 대시보드에서 **"Settings"** (⚙️) 클릭
2. **"API"** 탭 선택
3. 다음 정보 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 4. 환경 변수 설정

### 로컬 개발 (.env 파일)

`.env` 파일에 추가:
```env
# Supabase 설정
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Vercel 배포

1. Vercel 대시보드 > **Settings** > **Environment Variables**
2. 다음 변수 추가:
   - **Name**: `SUPABASE_URL`
   - **Value**: `https://xxxxx.supabase.co`
   - **Environment**: Production, Preview, Development 모두 체크
3. 다음 변수 추가:
   - **Name**: `SUPABASE_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Environment**: Production, Preview, Development 모두 체크
4. **Save** 클릭

## 5. 패키지 설치

```bash
cd c:\Users\SD2-16\Desktop\chatbot3
pip install -r requirements.txt
```

## 6. 테스트

서버 실행:
```bash
python app.py
```

서버 로그에서 확인:
```
[OK] Supabase 연결 성공: https://xxxxx.supabase.co...
```

## 7. API 엔드포인트

### 뉴스 검색 및 저장
```
POST /api/search
{
  "keyword": "인공지능"
}
```
→ 자동으로 DB에 저장됨

### 검색 기록 조회
```
GET /api/searches?limit=10
```
→ 최근 10개 검색 기록 반환

### 특정 검색의 뉴스 조회
```
GET /api/news/{search_id}
```
→ 검색 ID로 뉴스 기사 조회

### 키워드로 뉴스 조회
```
GET /api/news/keyword/{keyword}
```
→ 키워드로 최근 검색된 뉴스 조회

## 8. 데이터베이스 구조

### news_searches 테이블
- `id`: 검색 ID (자동 증가)
- `keyword`: 검색 키워드
- `search_date`: 검색 날짜
- `news_count`: 수집된 뉴스 개수
- `created_at`: 생성 시간

### news_articles 테이블
- `id`: 기사 ID (자동 증가)
- `search_id`: 검색 ID (외래키)
- `title`: 뉴스 제목
- `link`: 뉴스 링크
- `description`: 뉴스 설명
- `pub_date`: 발행 날짜
- `summary`: AI 요약 (선택사항)
- `created_at`: 생성 시간

## 9. 문제 해결

### 연결 실패 시
1. `.env` 파일에 URL과 KEY가 올바른지 확인
2. Supabase 프로젝트가 활성화되어 있는지 확인
3. API 키가 `anon public` 키인지 확인 (service_role 아님)

### 테이블이 없을 때
1. SQL Editor에서 `supabase_setup.sql` 다시 실행
2. Table Editor에서 테이블 존재 확인

### 권한 오류 시
1. Settings > API > Row Level Security 확인
2. `supabase_setup.sql`의 RLS 정책 확인

## 10. Supabase 대시보드 활용

- **Table Editor**: 저장된 데이터 확인/수정
- **SQL Editor**: 직접 쿼리 실행
- **API Docs**: 자동 생성된 API 문서 확인
- **Logs**: 실시간 로그 확인
