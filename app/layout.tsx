import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "뉴스 검색 및 요약 서비스",
  description: "검색어를 입력하면 최신 뉴스를 찾아주고 AI로 요약해주는 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
