# 🔑 Google Gemini API 키 설정 가이드

## 문제
현재 `GEMINI_API_KEY` 환경변수가 설정되지 않아 뉴스 요약 기능이 작동하지 않습니다.

## 해결 방법

### 1단계: Google Gemini API 키 발급

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. Google 계정으로 로그인
3. "Create API Key" 버튼 클릭
4. 생성된 API 키를 복사

### 2단계: .env.local 파일에 API 키 입력

프로젝트 루트(`wjs20270127`)에 있는 `.env.local` 파일을 열고:

```env
GEMINI_API_KEY=여기에_실제_API_키_입력
```

예시:
```env
GEMINI_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
```

### 3단계: 개발 서버 재시작

`.env.local` 파일을 수정한 후에는 **반드시 개발 서버를 재시작**해야 합니다.

1. 현재 실행 중인 서버를 중지 (Ctrl+C)
2. 서버 재시작:
   ```cmd
   cmd /c npm run dev
   ```

또는 `quick-start.bat` 파일을 다시 실행하세요.

## 확인

서버 재시작 후:
1. 브라우저에서 http://localhost:3000 새로고침
2. 뉴스 검색 후 "요약 보기" 버튼 클릭
3. 오류 없이 요약이 표시되면 성공!

## 주의사항

- ⚠️ `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 .gitignore에 포함됨)
- ⚠️ API 키를 다른 사람과 공유하지 마세요
- ⚠️ API 키가 유출되면 [Google AI Studio](https://makersuite.google.com/app/apikey)에서 삭제하고 새로 발급받으세요

## 문제 해결

### 여전히 오류가 발생하는 경우

1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일 이름이 정확히 `.env.local`인지 확인 (`.env.local.txt` 아님)
3. API 키 앞뒤에 공백이나 따옴표가 없는지 확인
4. 개발 서버를 완전히 종료하고 재시작
5. 브라우저 캐시 삭제 후 새로고침
