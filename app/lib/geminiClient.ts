/**
 * Google Gemini API 클라이언트
 * 
 * ⚠️ 주의: 이 모듈은 서버 사이드에서만 사용되어야 합니다.
 * - app/api/* 라우트 핸들러에서만 사용
 * - 클라이언트 컴포넌트에서는 절대 import하지 마세요
 * - API 키는 process.env를 통해서만 접근합니다
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Gemini API 클라이언트 인스턴스를 생성합니다.
 * 환경변수 GEMINI_API_KEY가 없으면 에러를 throw합니다.
 */
function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    throw new Error(
      "GEMINI_API_KEY 환경변수가 설정되지 않았습니다. .env.local 파일 또는 Vercel 환경 변수를 확인하세요."
    );
  }

  return new GoogleGenerativeAI(apiKey);
}

/**
 * 텍스트를 Gemini API를 사용하여 한국어로 요약합니다.
 * 
 * @param text - 요약할 텍스트 (뉴스 기사 본문 등)
 * @returns 요약된 텍스트
 * @throws API 호출 실패 시 에러를 throw합니다
 * 
 * 사용 예시 (서버 사이드에서만):
 * ```ts
 * // app/api/summarize/route.ts
 * import { summarizeText } from "@/app/lib/geminiClient";
 * const summary = await summarizeText(newsArticle);
 * ```
 */
export async function summarizeText(text: string): Promise<string> {
  const genAI = getGeminiClient();
  
  // 사용 가능한 모델 목록 (우선순위 순서)
  // API에서 확인한 실제 사용 가능한 모델들
  const modelsToTry = [
    "gemini-2.5-flash",        // 최신 빠른 모델
    "gemini-2.0-flash",        // 안정적인 2.0 모델
    "gemini-flash-latest",      // 최신 Flash (자동 업데이트)
    "gemini-pro-latest",        // 최신 Pro (자동 업데이트)
    "gemini-2.5-pro",          // 최신 Pro 모델
    "gemini-2.0-flash-001",    // 특정 버전
  ];

  let lastError: Error | null = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`시도 중: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `아래 뉴스 기사를 한국어로 간결하게 요약해줘. 핵심 내용만 2-3문장으로 정리해주세요.

${text}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const summary = response.text();

      console.log(`성공: ${modelName} 모델 사용`);
      return summary.trim();
    } catch (error) {
      console.error(`${modelName} 모델 실패:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      // 다음 모델 시도
      continue;
    }
  }

  // 모든 모델 실패 시
  console.error("모든 모델 시도 실패");
  if (lastError) {
    throw new Error(`뉴스 요약 중 오류가 발생했습니다: ${lastError.message}`);
  }
  
  throw new Error("뉴스 요약 중 알 수 없는 오류가 발생했습니다. 사용 가능한 모델이 없습니다.");
}
