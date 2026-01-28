# 🚀 Vercel 배포 가이드

## Vercel 배포 방법

### 방법 1: GitHub 저장소 Import (권장)

1. **Vercel 로그인**
   - [Vercel](https://vercel.com) 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - 대시보드에서 "Add New..." → "Project" 클릭
   - 또는 "New Project" 버튼 클릭

3. **GitHub 저장소 Import**
   - "Import Git Repository" 섹션에서
   - GitHub 저장소 목록에서 `wjs20270127` 선택
   - "Import" 클릭

4. **프로젝트 설정**
   - **Framework Preset**: Next.js (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 설정됨)
   - **Output Directory**: `.next` (자동 설정됨)
   - **Install Command**: `npm install` (자동 설정됨)

5. **환경 변수 설정** (중요!)
   - "Environment Variables" 섹션 클릭
   - "Add New" 클릭
   - **Key**: `GEMINI_API_KEY`
   - **Value**: 실제 Google Gemini API 키 입력
   - **Environment**: Production, Preview, Development 모두 선택
   - "Save" 클릭

6. **배포 시작**
   - "Deploy" 버튼 클릭
   - 배포 진행 상황 확인
   - 완료되면 URL 제공됨

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서
cd c:\Users\SD2-16\Desktop\new\wjs20270127

# 배포
vercel

# 환경 변수 설정
vercel env add GEMINI_API_KEY
```

## ⚠️ 중요: 환경 변수 설정

**반드시 Vercel에서 환경 변수를 설정해야 합니다!**

1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. `GEMINI_API_KEY` 추가
4. 실제 API 키 값 입력
5. Production, Preview, Development 모두 선택
6. Save 클릭

**환경 변수를 설정하지 않으면 요약 기능이 작동하지 않습니다!**

## 배포 후 확인

1. **배포 완료 확인**
   - Vercel 대시보드에서 "Ready" 상태 확인
   - 제공된 URL 클릭

2. **기능 테스트**
   - 뉴스 검색 테스트
   - 요약 기능 테스트
   - 오류 발생 시 Vercel 로그 확인

## 문제 해결

### 환경 변수가 적용되지 않는 경우
- 배포를 다시 트리거 (Redeploy)
- 또는 환경 변수 수정 후 자동 재배포 대기

### 빌드 오류 발생 시
- Vercel 로그 확인
- 로컬에서 `npm run build` 테스트
- 오류 수정 후 다시 푸시

## 자동 배포

GitHub에 푸시하면 자동으로 재배포됩니다:
```bash
git push origin main
```

Vercel이 자동으로 감지하고 배포를 시작합니다.
