import { Article } from "@/app/types";

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * 뉴스 검색 API 호출
 * 
 * @param query - 검색어
 * @returns 뉴스 기사 배열
 * @throws ApiError - API 호출 실패 시
 */
export async function searchNews(query: string): Promise<Article[]> {
  if (!query || query.trim() === "") {
    throw new ApiError("검색어가 필요합니다.", 400);
  }

  try {
    const response = await fetch(
      `/api/search-news?query=${encodeURIComponent(query.trim())}`
    );

    if (!response.ok) {
      let errorMessage = "뉴스 검색에 실패했습니다.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }
      throw new ApiError(errorMessage, response.status);
    }

    const data = await response.json();
    
    if (!data.articles || !Array.isArray(data.articles)) {
      throw new ApiError("잘못된 응답 형식입니다.", 500);
    }

    return data.articles;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 네트워크 오류 등 기타 오류
    throw new ApiError(
      "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
      0,
      error
    );
  }
}

/**
 * 뉴스 요약 API 호출
 * 
 * @param text - 요약할 텍스트
 * @returns 요약된 텍스트
 * @throws ApiError - API 호출 실패 시
 */
export async function summarizeNews(text: string): Promise<string> {
  if (!text || text.trim() === "") {
    throw new ApiError("요약할 텍스트가 필요합니다.", 400);
  }

  try {
    const response = await fetch("/api/summarize-news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.trim(),
      }),
    });

    if (!response.ok) {
      let errorMessage = "요약 생성에 실패했습니다.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }
      throw new ApiError(errorMessage, response.status);
    }

    const data = await response.json();
    
    if (!data.summary || typeof data.summary !== "string") {
      throw new ApiError("잘못된 응답 형식입니다.", 500);
    }

    return data.summary;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 네트워크 오류 등 기타 오류
    throw new ApiError(
      "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
      0,
      error
    );
  }
}
