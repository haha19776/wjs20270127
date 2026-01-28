# 📰 wjs20270127 - 뉴스 검색 및 AI 요약 서비스

검색어를 입력하면 최신 뉴스 5개를 찾아주고, 각 뉴스를 Google Gemini API로 요약해주는 웹 기반 챗봇형 서비스입니다.

## ✨ 주요 기능

- 🔍 **뉴스 검색**: 검색어를 입력하여 최신 뉴스 5개 검색
- 🤖 **AI 요약**: Google Gemini API를 사용한 뉴스 요약
- 💬 **채팅 인터페이스**: 검색 및 요약 결과를 채팅 형식으로 표시
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- 🌙 **다크 모드**: 시스템 설정에 따른 다크 모드 자동 전환
- ⚡ **실시간 피드백**: 로딩 상태 및 에러 메시지 표시

## 🛠 기술 스택

### 프론트엔드
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript 5+**
- **Tailwind CSS 3+**

### 백엔드
- **Next.js API Routes**
- **Google Gemini API** (`@google/generative-ai`)

### 개발 도구
- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 처리
- **Autoprefixer** - 브라우저 호환성

## 📁 프로젝트 구조

```
wjs20270127/
├── app/
│   ├── api/                          # API 라우트
│   │   ├── search-news/
│   │   │   └── route.ts             # 뉴스 검색 API (GET)
│   │   └── summarize-news/
│   │       └── route.ts             # 뉴스 요약 API (POST)
│   ├── components/                   # React 컴포넌트
│   │   ├── SearchBar.tsx            # 검색 바 컴포넌트
│   │   ├── NewsList.tsx             # 뉴스 목록 컴포넌트
│   │   ├── ChatArea.tsx             # 채팅 영역 컴포넌트
│   │   └── ErrorMessage.tsx         # 에러 메시지 컴포넌트
│   ├── lib/                          # 라이브러리/유틸리티
│   │   └── geminiClient.ts          # Google Gemini API 클라이언트
│   ├── types/                        # TypeScript 타입 정의
│   │   └── index.ts                 # 공통 타입 (Article, ChatMessage 등)
│   ├── utils/                        # 유틸리티 함수
│   │   └── api.ts                   # API 호출 함수 (searchNews, summarizeNews)
│   ├── globals.css                   # 전역 스타일 (Tailwind 포함)
│   ├── layout.tsx                    # 루트 레이아웃
│   └── page.tsx                     # 메인 페이지
├── .env.local.example                # 환경 변수 예시 파일
├── .gitignore                        # Git 제외 파일 목록
├── next.config.js                    # Next.js 설정
├── package.json                      # 프로젝트 의존성 및 스크립트
├── postcss.config.js                 # PostCSS 설정
├── tailwind.config.ts               # Tailwind CSS 설정
├── tsconfig.json                     # TypeScript 설정
└── README.md                         # 프로젝트 문서
```

## 🚀 시작하기

### 사전 요구사항

- **Node.js** 18.0 이상
- **npm** 9.0 이상 (또는 yarn, pnpm)

### 1. 저장소 클론

```bash
git clone <repository-url>
cd wjs20270127
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local.example` 파일을 참고하여 `.env.local` 파일을 생성하고 Google Gemini API 키를 설정하세요.

```bash
# .env.local 파일 생성
cp .env.local.example .env.local
```

`.env.local` 파일 내용:
```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

**Google Gemini API 키 발급 방법:**
1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. Google 계정으로 로그인
3. "Create API Key" 버튼 클릭
4. 생성된 API 키를 복사하여 `.env.local` 파일에 입력

⚠️ **보안 주의사항:**
- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함됨)
- API 키는 서버 사이드에서만 사용됩니다 (`app/api/*`, `app/lib/*`)
- 프로덕션 배포 시 환경 변수를 안전하게 관리하세요

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📜 사용 가능한 스크립트

### 개발

```bash
npm run dev
```

개발 모드로 서버를 실행합니다. 파일 변경 시 자동으로 새로고침됩니다.

### 빌드

```bash
npm run build
```

프로덕션용 빌드를 생성합니다. `.next` 폴더에 최적화된 빌드 파일이 생성됩니다.

### 프로덕션 실행

```bash
npm start
```

프로덕션 모드로 서버를 실행합니다. 먼저 `npm run build`를 실행해야 합니다.

### 린트

```bash
npm run lint
```

ESLint를 사용하여 코드 품질을 검사합니다.

## 🎯 사용 방법

1. **뉴스 검색**
   - 검색어를 입력창에 입력 (예: "인공지능", "기술", "경제")
   - "검색" 버튼 클릭 또는 Enter 키 입력
   - 검색 결과가 왼쪽 패널에 표시됩니다

2. **뉴스 요약**
   - 검색 결과 목록에서 원하는 뉴스의 "🤖 요약 보기" 버튼 클릭
   - AI가 뉴스를 요약하여 채팅 영역에 표시됩니다

3. **채팅 확인**
   - 모든 검색 및 요약 결과는 오른쪽 채팅 영역에 표시됩니다
   - 사용자 메시지와 AI 응답이 구분되어 표시됩니다

## 🏗 아키텍처

### API 구조

#### GET `/api/search-news?query=검색어`
뉴스 검색 API

**요청:**
```
GET /api/search-news?query=인공지능
```

**응답:**
```json
{
  "articles": [
    {
      "title": "뉴스 제목",
      "url": "https://example.com/news/1",
      "description": "뉴스 설명",
      "publishedAt": "2026-01-28T11:00:00Z",
      "source": "뉴스 출처"
    }
  ]
}
```

#### POST `/api/summarize-news`
뉴스 요약 API

**요청:**
```json
{
  "text": "제목: 뉴스 제목\n\n내용: 뉴스 본문..."
}
```

**응답:**
```json
{
  "summary": "요약된 내용..."
}
```

### 컴포넌트 구조

- **SearchBar**: 검색어 입력 및 검색 실행
- **NewsList**: 검색된 뉴스 목록 표시 및 요약 요청
- **ChatArea**: 채팅 메시지 표시 (자동 스크롤)
- **ErrorMessage**: 에러 메시지 표시 및 닫기

### 상태 관리

- `articles[]`: 검색된 뉴스 목록
- `chatMessages[]`: 채팅 메시지 목록
- `isSearching`: 검색 로딩 상태
- `summarizingArticleId`: 요약 중인 기사 ID
- `error`: 에러 메시지

## 🔧 기술 구현 상세

### Google Gemini API 연동

- **모델**: `gemini-1.5-flash` (빠른 응답 속도)
- **클라이언트**: `app/lib/geminiClient.ts`
- **프롬프트**: "한국어로 간결하게 요약해줘. 핵심 내용만 2-3문장으로 정리해주세요."
- **보안**: API 키는 서버 사이드에서만 사용 (`process.env.GEMINI_API_KEY`)

### 에러 처리

- **ApiError 클래스**: 통일된 에러 처리
- **네트워크 오류**: 사용자 친화적 메시지 표시
- **API 오류**: HTTP 상태 코드 기반 에러 처리
- **에러 UI**: 에러 메시지 컴포넌트 및 채팅에 표시

### 타입 안정성

- **TypeScript**: 모든 컴포넌트 및 함수에 타입 정의
- **인터페이스**: `Article`, `ChatMessage` 등 공통 타입 정의
- **타입 추론**: API 응답 타입 자동 추론

## 🚢 배포

### Vercel 배포 (권장)

1. **GitHub에 푸시**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Vercel에서 프로젝트 연결**
   - [Vercel](https://vercel.com)에 로그인
   - "New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정 확인

3. **환경 변수 설정**
   - Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
   - "Add New" 클릭
   - Key: `GEMINI_API_KEY`
   - Value: 실제 Google Gemini API 키
   - Environment: Production, Preview, Development 모두 선택
   - "Save" 클릭

4. **배포 완료**
   - 자동으로 빌드 및 배포가 시작됩니다
   - 배포 완료 후 제공되는 URL로 접속 가능합니다

⚠️ **중요**: Vercel 배포 시 반드시 환경 변수를 설정해야 합니다. 설정하지 않으면 요약 기능이 작동하지 않습니다.

### 기타 배포 플랫폼

- **Netlify**: Vercel과 유사한 설정
- **AWS Amplify**: AWS 환경 변수 설정 필요
- **Docker**: Dockerfile 작성 후 컨테이너 배포

## 🐛 문제 해결

### API 키 오류

**증상**: "GEMINI_API_KEY 환경변수가 설정되지 않았습니다" 오류

**해결 방법**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. `GEMINI_API_KEY` 값이 올바르게 설정되었는지 확인
3. 개발 서버를 재시작 (`npm run dev`)

### 빌드 오류

**증상**: `npm run build` 실패

**해결 방법**:
1. TypeScript 오류 확인: `npm run lint`
2. 의존성 재설치: `rm -rf node_modules package-lock.json && npm install`
3. Next.js 캐시 삭제: `rm -rf .next`

### 네트워크 오류

**증상**: "네트워크 오류가 발생했습니다" 메시지

**해결 방법**:
1. 인터넷 연결 확인
2. API 엔드포인트가 올바른지 확인
3. 브라우저 콘솔에서 상세 오류 확인

## 📝 향후 개선 계획

- [ ] 실제 뉴스 API 연동 (NewsAPI, Naver News API 등)
- [ ] 검색 결과 캐싱 (로컬 스토리지 또는 Redis)
- [ ] 요약 결과 저장 기능
- [ ] 검색 히스토리 기능
- [ ] 북마크 기능
- [ ] 다국어 지원
- [ ] PWA 지원
- [ ] 단위 테스트 및 통합 테스트 추가

## 📄 라이선스

MIT License

## 👥 기여

이슈 및 풀 리퀘스트를 환영합니다! 프로젝트를 개선하는 데 도움을 주시면 감사하겠습니다.

## 📧 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해주세요.

---

**Made with ❤️ using Next.js and Google Gemini API**
