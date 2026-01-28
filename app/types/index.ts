/**
 * 공통 타입 정의
 */

/**
 * 뉴스 기사 타입
 */
export interface Article {
  title: string;
  url: string;
  description: string;
  publishedAt: string; // ISO 8601 형식
  source: string;
}

/**
 * 채팅 메시지 타입
 */
export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  articleTitle?: string; // 요약인 경우 원본 기사 제목
  timestamp: Date;
}

/**
 * API 에러 타입
 */
export interface ApiError {
  error: string;
  status?: number;
}
