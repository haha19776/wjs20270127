"use client";

import { useState } from "react";
import { Article, ChatMessage } from "@/app/types";
import { searchNews, summarizeNews, ApiError } from "@/app/utils/api";
import SearchBar from "@/app/components/SearchBar";
import NewsList from "@/app/components/NewsList";
import ChatArea from "@/app/components/ChatArea";
import ErrorMessage from "@/app/components/ErrorMessage";

/**
 * 메인 페이지 컴포넌트
 * wjs20270127 - 뉴스 검색 및 AI 요약 서비스
 */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [summarizingArticleId, setSummarizingArticleId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * 에러 메시지 표시 및 채팅에 추가
   */
  const handleError = (error: unknown, context: string) => {
    console.error(`${context}:`, error);
    
    let errorMessage = "오류가 발생했습니다.";
    
    if (error instanceof ApiError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    setError(errorMessage);

    const errorChatMessage: ChatMessage = {
      id: `assistant-error-${Date.now()}`,
      type: "assistant",
      content: `❌ ${context}: ${errorMessage}`,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, errorChatMessage]);
  };

  /**
   * 뉴스 검색 실행
   */
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("검색어를 입력해주세요.");
      return;
    }

    console.log('검색 시작:', searchQuery.trim());
    setIsSearching(true);
    setError(null);
    setArticles([]);

    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: `"${searchQuery.trim()}" 검색 중...`,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);

    try {
      console.log('searchNews 함수 호출 중...');
      const fetchedArticles = await searchNews(searchQuery.trim());
      console.log('검색 결과:', fetchedArticles.length, '개');

      if (fetchedArticles.length === 0) {
        const noResultMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          type: "assistant",
          content: "검색 결과가 없습니다. 다른 검색어를 시도해보세요.",
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, noResultMessage]);
        return;
      }

      setArticles(fetchedArticles);

      // 검색 결과 메시지 추가
      const resultMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        type: "assistant",
        content: `${fetchedArticles.length}개의 뉴스를 찾았습니다. 아래 목록에서 "요약 보기" 버튼을 클릭하면 AI 요약을 확인할 수 있습니다.`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, resultMessage]);
    } catch (error) {
      handleError(error, "검색 실패");
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * 뉴스 요약 요청
   */
  const handleSummarize = async (article: Article, index: number) => {
    const articleId = `article-${index}`;
    setSummarizingArticleId(articleId);
    setError(null);

    // 사용자 메시지 추가 (요약 요청)
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: `"${article.title}" 요약 요청`,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);

    try {
      // 요약할 텍스트 생성
      const textToSummarize = `제목: ${article.title}\n\n내용: ${article.description}`;

      const summary = await summarizeNews(textToSummarize);

      // 요약 결과 메시지 추가
      const summaryMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        type: "assistant",
        content: summary,
        articleTitle: article.title,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, summaryMessage]);
    } catch (error) {
      handleError(error, "요약 실패");
    } finally {
      setSummarizingArticleId(null);
    }
  };

  /**
   * 채팅 및 검색 결과 초기화
   */
  const handleClear = () => {
    setChatMessages([]);
    setArticles([]);
    setError(null);
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl h-screen flex flex-col">
        {/* 상단: 헤더 */}
        <header className="text-center mb-4 md:mb-6 flex-shrink-0">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            📰 wjs20270127
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            뉴스 검색 및 AI 요약 서비스
          </p>
        </header>

        {/* 검색 바 */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
          onClear={handleClear}
          isSearching={isSearching}
          hasContent={articles.length > 0 || chatMessages.length > 0}
        />

        {/* 에러 메시지 */}
        <ErrorMessage
          message={error || ""}
          onDismiss={() => setError(null)}
        />

        {/* 메인 컨텐츠 영역: 뉴스 목록 + 채팅 */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 overflow-hidden min-h-0">
          {/* 왼쪽: 뉴스 목록 */}
          <div className="overflow-y-auto">
            <NewsList
              articles={articles}
              onSummarize={handleSummarize}
              summarizingArticleId={summarizingArticleId}
              isSearching={isSearching}
            />
          </div>

          {/* 오른쪽: 채팅 영역 */}
          <ChatArea messages={chatMessages} />
        </div>
      </div>
    </main>
  );
}
