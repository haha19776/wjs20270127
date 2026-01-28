# 🚀 Vercel 배포 완전 가이드

## 현재 상태

✅ GitHub 푸시 완료
✅ Next.js 프로젝트 준비됨
✅ vercel.json 설정 완료

## Vercel 배포 단계

### 1단계: Vercel 계정 및 프로젝트 생성

1. **Vercel 접속**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인 (또는 회원가입)

2. **새 프로젝트 추가**
   - 대시보드에서 **Add New...** → **Project** 클릭
   - **Import Git Repository** 선택
   - `haha19776/wjs20270127` 저장소 선택
   - **Import** 클릭

### 2단계: 프로젝트 설정

1. **프로젝트 이름**: `wjs20270127` (또는 원하는 이름)
2. **Framework Preset**: **Next.js** (자동 감지됨)
3. **Root Directory**: `./` (기본값)
4. **Build Command**: `npm run build` (자동 설정됨)
5. **Output Directory**: `.next` (자동 설정됨)
6. **Install Command**: `npm install` (자동 설정됨)

### 3단계: 환경 변수 설정 (중요!)

**GEMINI_API_KEY를 Vercel에 추가해야 합니다:**

1. 프로젝트 설정 화면에서 **Environment Variables** 섹션 찾기
2. **Add** 클릭
3. 다음 정보 입력:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyCXH-6EhzSsLZYkUUJddCTz2ye5Fa5KEKs`
   - **Environment**: 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
     (모두 체크)
4. **Save** 클릭

### 4단계: 배포 실행

1. **Deploy** 버튼 클릭
2. 배포 진행 상황 확인 (약 2-3분 소요)
3. 배포 완료 후 URL 확인 (예: `wjs20270127.vercel.app`)

## 배포 후 확인 사항

### ✅ 정상 작동 확인

1. 배포된 URL 접속
2. 뉴스 검색 기능 테스트
3. 요약 기능 테스트

### ❌ 오류 발생 시

#### 404 오류
- `vercel.json` 설정 확인
- Framework가 Next.js로 설정되었는지 확인

#### API 오류 (요약 안됨)
- 환경 변수 `GEMINI_API_KEY`가 제대로 설정되었는지 확인
- Vercel 대시보드 → Settings → Environment Variables 확인

#### 빌드 오류
- Vercel 대시보드 → Deployments → 해당 배포 클릭 → Build Logs 확인
- `package.json`의 `build` 스크립트 확인

## 환경 변수 확인 방법

Vercel 대시보드에서:
1. 프로젝트 선택
2. **Settings** → **Environment Variables**
3. `GEMINI_API_KEY`가 있는지 확인

## 자동 배포 설정

GitHub에 푸시하면 자동으로 배포됩니다:
- `main` 브랜치 푸시 → Production 배포
- 다른 브랜치 푸시 → Preview 배포

## 현재 프로젝트 정보

- **GitHub 저장소**: `https://github.com/haha19776/wjs20270127`
- **프로젝트명**: `wjs20270127`
- **Framework**: Next.js 14+ (App Router)
- **필수 환경 변수**: `GEMINI_API_KEY`

## 다음 단계

1. Vercel에 프로젝트 Import
2. 환경 변수 `GEMINI_API_KEY` 추가
3. Deploy 클릭
4. 배포 완료 후 URL로 접속하여 테스트

## 문제 해결

### 배포가 실패하는 경우

1. **Build Logs 확인**
   - Vercel 대시보드 → Deployments → 실패한 배포 클릭
   - Build Logs 탭에서 오류 메시지 확인

2. **일반적인 오류**
   - `npm install` 실패 → Node.js 버전 확인 (18+ 필요)
   - `Module not found` → `package.json` 의존성 확인
   - `Environment variable not found` → 환경 변수 설정 확인

3. **로컬에서 테스트**
   ```bash
   npm run build
   npm start
   ```
   로컬 빌드가 성공하면 Vercel에서도 성공할 가능성이 높습니다.
