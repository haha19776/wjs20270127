"use client";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

/**
 * 에러 메시지 컴포넌트
 */
export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between gap-4 flex-shrink-0 animate-fade-in">
      <div className="flex items-center gap-2 flex-1">
        <span className="text-red-600 dark:text-red-400 text-xl">⚠️</span>
        <p className="text-red-600 dark:text-red-400 text-sm md:text-base flex-1">
          {message}
        </p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors flex-shrink-0"
          aria-label="에러 메시지 닫기"
        >
          ✕
        </button>
      )}
    </div>
  );
}
