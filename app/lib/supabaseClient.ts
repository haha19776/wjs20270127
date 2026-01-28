/**
 * Supabase 클라이언트 설정
 * 
 * 검색 키워드 기록을 저장하기 위한 Supabase 연동
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// 디버깅용 로그
console.log("=== Supabase 설정 확인 ===");
console.log("SUPABASE_URL 설정됨:", !!supabaseUrl);
console.log("SUPABASE_ANON_KEY 설정됨:", !!supabaseAnonKey);

let supabase: SupabaseClient | null = null;

// URL과 Key가 유효한 경우에만 클라이언트 생성
if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("https://")) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("✅ Supabase 클라이언트 생성 성공");
  } catch (error) {
    console.error("❌ Supabase 클라이언트 생성 실패:", error);
  }
} else {
  console.warn("⚠️ Supabase 환경 변수가 올바르지 않습니다.");
}

export { supabase };

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
  
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
  
  console.log("URL 길이:", url.length);
  console.log("Key 길이:", key.length);
  
  if (!url || !key || url.length < 10 || key.length < 10) {
    console.warn("⚠️ Supabase 환경 변수가 없거나 유효하지 않습니다.");
    return;
  }

  try {
    console.log("Supabase REST API로 저장 시도 중...");
    console.log("요청 URL:", `${url}/rest/v1/search_history`);
    
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("apikey", key);
    headers.set("Authorization", "Bearer " + key);
    headers.set("Prefer", "return=representation");
    
    const response = await fetch(`${url}/rest/v1/search_history`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        keyword: keyword.trim(),
        result_count: resultCount,
        searched_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ 검색 기록 저장 실패:", response.status, errorText);
    } else {
      const data = await response.json();
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
  if (!supabase) {
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
