-- Supabase 데이터베이스 스키마 설정
-- Supabase 대시보드 > SQL Editor에서 실행하세요

-- 1. 뉴스 검색 기록 테이블
CREATE TABLE IF NOT EXISTS news_searches (
    id BIGSERIAL PRIMARY KEY,
    keyword VARCHAR(255) NOT NULL,
    search_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    news_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 뉴스 기사 테이블
CREATE TABLE IF NOT EXISTS news_articles (
    id BIGSERIAL PRIMARY KEY,
    search_id BIGINT REFERENCES news_searches(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    link TEXT NOT NULL,
    description TEXT,
    pub_date TIMESTAMP WITH TIME ZONE,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(link) -- 중복 뉴스 방지
);

-- 3. 인덱스 생성 (검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_news_searches_keyword ON news_searches(keyword);
CREATE INDEX IF NOT EXISTS idx_news_searches_date ON news_searches(search_date);
CREATE INDEX IF NOT EXISTS idx_news_articles_search_id ON news_articles(search_id);
CREATE INDEX IF NOT EXISTS idx_news_articles_title ON news_articles(title);

-- 4. 최근 검색 조회 뷰 (선택사항)
CREATE OR REPLACE VIEW recent_searches AS
SELECT 
    ns.id,
    ns.keyword,
    ns.search_date,
    ns.news_count,
    COUNT(na.id) as actual_count
FROM news_searches ns
LEFT JOIN news_articles na ON ns.id = na.search_id
GROUP BY ns.id, ns.keyword, ns.search_date, ns.news_count
ORDER BY ns.search_date DESC;

-- 5. RLS (Row Level Security) 설정 (선택사항)
-- 공개 읽기, 인증된 사용자만 쓰기
ALTER TABLE news_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "Allow public read access" ON news_searches FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON news_articles FOR SELECT USING (true);

-- 인증된 사용자만 쓰기 가능 (필요시)
-- CREATE POLICY "Allow authenticated insert" ON news_searches FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "Allow authenticated insert" ON news_articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
