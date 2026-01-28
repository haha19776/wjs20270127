"use client";

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  onClear: () => void;
  isSearching: boolean;
  hasContent: boolean;
}

/**
 * 검색 바 컴포넌트
 */
export default function SearchBar({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onClear,
  isSearching,
  hasContent,
}: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSearching) {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mb-4 flex-shrink-0">
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="검색어를 입력하세요 (예: 인공지능, 기술, 경제)"
          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all"
          disabled={isSearching}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onSearch}
          disabled={isSearching}
          className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium text-sm md:text-base shadow-md hover:shadow-lg disabled:shadow-none"
        >
          {isSearching ? (
            <span className="flex items-center gap-2">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              검색 중...
            </span>
          ) : (
            "🔍 검색"
          )}
        </button>
        {hasContent && (
          <button
            onClick={onClear}
            disabled={isSearching}
            className="px-4 md:px-6 py-2 md:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium text-sm md:text-base shadow-md hover:shadow-lg disabled:shadow-none"
          >
            🗑️ 초기화
          </button>
        )}
      </div>
    </div>
  );
}
