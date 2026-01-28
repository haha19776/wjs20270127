import { NextResponse } from "next/server";
import { summarizeText } from "@/app/lib/geminiClient";

export interface SummaryResult {
  title: string;
  summary: string;
}

/**
 * 뉴스 요약 함수
 * Google Gemini API를 사용하여 뉴스 기사를 요약합니다.
 * 
 * ⚠️ 내부 함수입니다. export하지 않습니다.
 * ⚠️ 서버 사이드에서만 실행됩니다 (app/api/* 라우트)
 */
async function summarizeNews(
  title: string,
  description: string
): Promise<SummaryResult> {
  // 제목과 설명을 결합하여 요약할 텍스트 생성
  const fullText = `제목: ${title}\n\n내용: ${description}`;
  
  // Gemini API를 사용하여 요약 생성
  const summary = await summarizeText(fullText);

  return {
    title: title,
    summary: summary,
  };
}

/**
 * API Route Handler (POST 요청)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "제목과 설명이 필요합니다." },
        { status: 400 }
      );
    }

    const summary = await summarizeNews(title, description);
    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json(
      { error: "요약 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
