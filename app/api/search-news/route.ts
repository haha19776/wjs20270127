import { NextResponse } from "next/server";

/**
 * 뉴스 기사 타입 정의
 */
export interface Article {
  title: string;
  url: string;
  description: string;
  publishedAt: string; // ISO 8601 형식 (예: "2026-01-28T11:00:00Z")
  source: string; // 출처 (예: "뉴스사 이름")
}

/**
 * 뉴스 검색 응답 타입
 */
export interface SearchNewsResponse {
  articles: Article[];
}

/**
 * 뉴스 제공자로부터 뉴스를 가져오는 함수
 * 
 * 현재는 더미 데이터를 반환하지만, 나중에 실제 뉴스 API로 교체 가능합니다.
 * 
 * @param query - 검색어
 * @returns 뉴스 기사 배열
 * 
 * 실제 API 연동 예시:
 * - NewsAPI: https://newsapi.org/
 * - Naver News API: https://developers.naver.com/docs/serviceapi/search/news/news.md
 * - Google News RSS: https://news.google.com/rss
 */
async function fetchNewsFromProvider(query: string): Promise<Article[]> {
  // TODO: 실제 뉴스 API 연동
  // 예시:
  // const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${process.env.NEWS_API_KEY}`);
  // const data = await response.json();
  // return data.articles.map(...);

  // 더미 데이터 반환 (API 호출 시뮬레이션을 위한 약간의 지연)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const now = new Date();
  const dummyArticles: Article[] = [
    {
      title: `${query} 관련 최신 동향 및 시장 분석`,
      url: "https://example.com/news/1",
      description: `${query}에 대한 최신 뉴스와 동향을 전문가들이 분석한 기사입니다. 시장 전망과 함께 최신 트렌드를 상세히 살펴봅니다.`,
      publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
      source: "테크뉴스",
    },
    {
      title: `${query} 시장 전망과 투자 기회`,
      url: "https://example.com/news/2",
      description: `${query} 시장의 미래 전망과 투자 기회에 대해 다루는 기사입니다. 시장 분석가들의 의견을 종합하여 제공합니다.`,
      publishedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5시간 전
      source: "경제일보",
    },
    {
      title: `${query} 기술 혁신 사례와 실제 적용 현황`,
      url: "https://example.com/news/3",
      description: `${query} 분야에서의 최신 기술 혁신 사례를 소개하는 기사입니다. 실제 적용 사례와 그 효과를 구체적으로 살펴봅니다.`,
      publishedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8시간 전
      source: "IT매거진",
    },
    {
      title: `${query} 정책 변화와 산업에 미치는 영향`,
      url: "https://example.com/news/4",
      description: `${query}와 관련된 정책 변화와 그 영향에 대해 분석한 기사입니다. 이해관계자들의 반응과 전문가 의견도 함께 다룹니다.`,
      publishedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(), // 12시간 전
      source: "정책뉴스",
    },
    {
      title: `${query} 글로벌 트렌드와 각국의 대응 전략`,
      url: "https://example.com/news/5",
      description: `${query}의 글로벌 트렌드와 각국의 대응 전략을 비교 분석한 기사입니다. 국제적 관점에서의 인사이트를 제공합니다.`,
      publishedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 24시간 전
      source: "글로벌뉴스",
    },
  ];

  return dummyArticles;
}

/**
 * 뉴스 검색 API Route Handler
 * 
 * GET /api/search-news?query=검색어
 * 
 * @param request - Next.js Request 객체
 * @returns 뉴스 기사 배열을 포함한 JSON 응답
 * 
 * 사용 예시:
 * ```typescript
 * const response = await fetch('/api/search-news?query=인공지능');
 * const data = await response.json();
 * console.log(data.articles); // Article[]
 * ```
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    // query 파라미터 검증
    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "query 파라미터가 필요합니다." },
        { status: 400 }
      );
    }

    // 뉴스 검색 실행
    const articles = await fetchNewsFromProvider(query.trim());

    // 응답 반환
    const response: SearchNewsResponse = {
      articles: articles,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("뉴스 검색 중 오류 발생:", error);

    // 에러 타입에 따라 적절한 메시지 반환
    const errorMessage =
      error instanceof Error
        ? error.message
        : "뉴스 검색 중 알 수 없는 오류가 발생했습니다.";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
