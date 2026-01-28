import { NextResponse } from "next/server";
import { summarizeText } from "@/app/lib/geminiClient";

/**
 * 요약 요청 Body 타입
 */
export interface SummarizeNewsRequest {
  text: string;
}

/**
 * 요약 응답 타입
 */
export interface SummarizeNewsResponse {
  summary: string;
}

/**
 * 뉴스 요약 API Route Handler
 * 
 * POST /api/summarize-news
 * 
 * Body: { text: string }
 * 응답: { summary: string }
 * 
 * ⚠️ 서버 사이드에서만 실행됩니다 (app/api/* 라우트)
 * 
 * 사용 예시:
 * ```typescript
 * const response = await fetch('/api/summarize-news', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ text: '뉴스 기사 본문...' })
 * });
 * const data = await response.json();
 * console.log(data.summary); // string
 * ```
 */
export async function POST(request: Request) {
  try {
    // Request Body 파싱
    const body: SummarizeNewsRequest = await request.json();
    const { text } = body;

    // text 파라미터 검증
    if (!text || typeof text !== "string" || text.trim() === "") {
      return NextResponse.json(
        { error: "text 필드가 필요하며 비어있을 수 없습니다." },
        { status: 400 }
      );
    }

    // Gemini API를 사용하여 요약 생성
    // geminiClient.summarizeText() 내부에서 이미 "한국어로 간결하게 요약해줘" 프롬프트가 적용됨
    const summary = await summarizeText(text.trim());

    // 응답 반환
    const response: SummarizeNewsResponse = {
      summary: summary,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("뉴스 요약 중 오류 발생:", error);

    // 에러 타입에 따라 적절한 메시지 반환
    const errorMessage =
      error instanceof Error
        ? error.message
        : "뉴스 요약 중 알 수 없는 오류가 발생했습니다.";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
