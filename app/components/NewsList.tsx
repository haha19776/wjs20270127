"use client";

import { Article } from "@/app/types";

interface NewsListProps {
  articles: Article[];
  onSummarize: (article: Article, index: number) => void;
  summarizingArticleId: string | null;
  isSearching: boolean;
}

/**
 * 날짜 포맷팅 함수 (ISO 8601 -> 한국어 형식)
 */
const formatDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
};

/**
 * 뉴스 목록 컴포넌트
 */
export default function NewsList({
  articles,
  onSummarize,
  summarizingArticleId,
  isSearching,
}: NewsListProps) {
  if (articles.length === 0 && !isSearching) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <div className="mb-4 text-4xl">📰</div>
        <p className="text-sm md:text-base">검색어를 입력하여 뉴스를 찾아보세요.</p>
      </div>
    );
  }

  if (articles.length === 0 && isSearching) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          뉴스를 검색하고 있습니다...
        </p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 sticky top-0 bg-gray-50 dark:bg-gray-900 py-2 z-10">
        🔍 검색 결과 ({articles.length}개)
      </h2>
      <div className="space-y-3 md:space-y-4">
        {articles.map((article, index) => {
          const articleId = `article-${index}`;
          const isSummarizing = summarizingArticleId === articleId;

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                >
                  {article.title}
                </a>
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                {article.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <span>📅</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📰</span>
                    <span>{article.source}</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => onSummarize(article, index)}
                disabled={isSummarizing}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium text-sm md:text-base shadow-md hover:shadow-lg disabled:shadow-none"
              >
                {isSummarizing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    요약 중...
                  </span>
                ) : (
                  "🤖 요약 보기"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
