import { NextResponse } from "next/server";

export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

/**
 * 뉴스 검색 API (더미 데이터)
 * 실제로는 뉴스 API를 호출하도록 구현 예정
 */
export async function searchNews(query: string): Promise<NewsItem[]> {
  // 실제 구현 시: 뉴스 API 호출
  // 예: NewsAPI, Naver News API, Google News RSS 등
  
  // 더미 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연 시뮬레이션

  const dummyNews: NewsItem[] = [
    {
      title: `${query} 관련 최신 동향 분석`,
      link: "https://example.com/news/1",
      description: `${query}에 대한 최신 뉴스와 동향을 분석한 기사입니다. 전문가들의 의견과 함께 최신 트렌드를 살펴봅니다.`,
      pubDate: new Date().toLocaleDateString("ko-KR"),
    },
    {
      title: `${query} 시장 전망과 기회`,
      link: "https://example.com/news/2",
      description: `${query} 시장의 미래 전망과 투자 기회에 대해 다루는 기사입니다. 시장 분석가들의 의견을 종합했습니다.`,
      pubDate: new Date().toLocaleDateString("ko-KR"),
    },
    {
      title: `${query} 기술 혁신 사례`,
      link: "https://example.com/news/3",
      description: `${query} 분야에서의 최신 기술 혁신 사례를 소개하는 기사입니다. 실제 적용 사례와 효과를 살펴봅니다.`,
      pubDate: new Date().toLocaleDateString("ko-KR"),
    },
    {
      title: `${query} 정책 변화와 영향`,
      link: "https://example.com/news/4",
      description: `${query}와 관련된 정책 변화와 그 영향에 대해 분석한 기사입니다. 이해관계자들의 반응도 함께 다룹니다.`,
      pubDate: new Date().toLocaleDateString("ko-KR"),
    },
    {
      title: `${query} 글로벌 트렌드`,
      link: "https://example.com/news/5",
      description: `${query}의 글로벌 트렌드와 각국의 대응 전략을 비교 분석한 기사입니다. 국제적 관점에서의 인사이트를 제공합니다.`,
      pubDate: new Date().toLocaleDateString("ko-KR"),
    },
  ];

  return dummyNews;
}

/**
 * API Route Handler (GET 요청)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "검색어가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const news = await searchNews(query);
    return NextResponse.json({ news });
  } catch (error) {
    return NextResponse.json(
      { error: "뉴스 검색 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
