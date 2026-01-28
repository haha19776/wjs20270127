# 📊 Supabase 데이터베이스 연동 완료!

뉴스 검색 키워드, 수집한 뉴스 제목, 링크, 내용을 Supabase 데이터베이스에 자동으로 저장하고 관리할 수 있습니다.

## ✅ 구현된 기능

### 1. 자동 데이터 저장
- 뉴스 검색 시 자동으로 DB에 저장
- 검색 키워드, 뉴스 제목, 링크, 설명, 발행일 저장
- AI 요약도 함께 저장

### 2. 데이터 조회 API
- **검색 기록 조회**: `/api/searches`
- **특정 검색의 뉴스**: `/api/news/{search_id}`
- **키워드로 뉴스 조회**: `/api/news/keyword/{keyword}`

### 3. 데이터베이스 구조
- `news_searches`: 검색 기록 테이블
- `news_articles`: 뉴스 기사 테이블

## 🚀 빠른 시작

### 1단계: Supabase 프로젝트 생성
1. https://supabase.com 접속
2. "New Project" 클릭
3. 프로젝트 생성 (약 2분 소요)

### 2단계: 데이터베이스 스키마 생성
1. Supabase 대시보드 > **SQL Editor**
2. `supabase_setup.sql` 파일 내용 복사/실행

### 3단계: API 키 설정
1. Supabase Settings > API
2. Project URL과 anon public key 복사
3. `.env` 파일에 추가:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 4단계: 패키지 설치
```bash
pip install -r requirements.txt
```

### 5단계: 서버 실행
```bash
python app.py
```

## 📝 사용 방법

### 뉴스 검색 (자동 저장)
```javascript
POST /api/search
{
  "keyword": "인공지능"
}
```

응답:
```json
{
  "news": [...],
  "summary": "...",
  "search_id": 1,
  "saved_to_db": true
}
```

### 검색 기록 조회
```javascript
GET /api/searches?limit=10
```

### 특정 검색의 뉴스 조회
```javascript
GET /api/news/1
```

### 키워드로 뉴스 조회
```javascript
GET /api/news/keyword/인공지능
```

## 📁 생성된 파일

- ✅ `supabase_config.py` - Supabase 연결 설정
- ✅ `supabase_setup.sql` - 데이터베이스 스키마
- ✅ `SUPABASE_SETUP.md` - 상세 설정 가이드
- ✅ `app.py` - Supabase 연동 코드 추가

## 🔧 환경 변수

### 로컬 (.env)
```env
GEMINI_API_KEY=your_key
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_key
```

### Vercel
Settings > Environment Variables에서 설정:
- `SUPABASE_URL`
- `SUPABASE_KEY`

## 📊 데이터베이스 테이블

### news_searches
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | BIGSERIAL | 검색 ID |
| keyword | VARCHAR(255) | 검색 키워드 |
| search_date | TIMESTAMP | 검색 날짜 |
| news_count | INTEGER | 뉴스 개수 |

### news_articles
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | BIGSERIAL | 기사 ID |
| search_id | BIGINT | 검색 ID (외래키) |
| title | TEXT | 뉴스 제목 |
| link | TEXT | 뉴스 링크 |
| description | TEXT | 뉴스 설명 |
| pub_date | TIMESTAMP | 발행일 |
| summary | TEXT | AI 요약 |

## 🎯 다음 단계

1. Supabase 프로젝트 생성
2. `supabase_setup.sql` 실행
3. `.env` 파일에 Supabase 정보 추가
4. 서버 재시작
5. 뉴스 검색 테스트 (자동 저장 확인)

자세한 내용은 `SUPABASE_SETUP.md` 파일을 참고하세요!
