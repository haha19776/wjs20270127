"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/app/types";

interface ChatAreaProps {
  messages: ChatMessage[];
}

/**
 * 메시지 시간 포맷팅
 */
const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * 채팅 영역 컴포넌트
 */
export default function ChatArea({ messages }: ChatAreaProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  /**
   * 채팅 영역 자동 스크롤
   */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
          💬 채팅
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="mb-4 text-4xl">💭</div>
            <p className="text-sm md:text-base">
              검색을 시작하면 대화가 여기에 표시됩니다.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              <div
                className={`max-w-[80%] md:max-w-[75%] rounded-lg p-3 md:p-4 ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                } shadow-sm`}
              >
                {message.articleTitle && (
                  <div className="text-xs md:text-sm font-semibold mb-2 opacity-90 border-b border-gray-300 dark:border-gray-600 pb-2">
                    📰 {message.articleTitle}
                  </div>
                )}
                <p className="text-sm md:text-base whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <p className="text-xs mt-2 opacity-70">
                  {formatMessageTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
