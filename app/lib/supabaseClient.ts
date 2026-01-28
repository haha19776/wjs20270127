/**
 * Supabase 클라이언트 설정
 * 
 * 검색 키워드 기록을 저장하기 위한 Supabase 연동
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 디버깅용 로그
console.log("=== Supabase 설정 확인 ===");
console.log("SUPABASE_URL 설정됨:", !!supabaseUrl);
console.log("SUPABASE_ANON_KEY 설정됨:", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase 환경 변수가 설정되지 않았습니다.");
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

/**
 * 검색 기록 타입 정의
 */
export interface SearchHistory {
  id: string;
  keyword: string;
  searched_at: string;
  result_count: number;
}

/**
 * 검색 키워드를 Supabase에 저장
 */
export async function saveSearchHistory(
  keyword: string,
  resultCount: number
): Promise<void> {
  console.log("=== saveSearchHistory 호출됨 ===");
  console.log("키워드:", keyword);
  console.log("결과 수:", resultCount);
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Supabase가 설정되지 않아 검색 기록을 저장하지 않습니다.");
    return;
  }

  try {
    console.log("Supabase에 저장 시도 중...");
    const { data, error } = await supabase.from("search_history").insert({
      keyword: keyword.trim(),
      result_count: resultCount,
    }).select();

    if (error) {
      console.error("❌ 검색 기록 저장 실패:", error.message);
      console.error("에러 상세:", error);
    } else {
      console.log("✅ 검색 기록 저장 완료:", keyword);
      console.log("저장된 데이터:", data);
    }
  } catch (error) {
    console.error("❌ 검색 기록 저장 중 오류:", error);
  }
}

/**
 * 최근 검색 기록 조회
 */
export async function getRecentSearchHistory(
  limit: number = 10
): Promise<SearchHistory[]> {
  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("search_history")
      .select("*")
      .order("searched_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("검색 기록 조회 실패:", error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("검색 기록 조회 중 오류:", error);
    return [];
  }
}
