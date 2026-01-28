# 🔧 Vercel 빌드 오류 해결 가이드

## 문제 상황

Vercel 배포 시 빌드가 실패하는 경우가 있습니다.

## 일반적인 원인 및 해결 방법

### 1. 환경 변수 누락

**증상**: 빌드 로그에 `GEMINI_API_KEY` 관련 오류

**해결**:
1. Vercel 대시보드 → 프로젝트 → Settings
2. Environment Variables 확인
3. `GEMINI_API_KEY`가 설정되어 있는지 확인
4. Production, Preview, Development 모두 체크되어 있는지 확인

### 2. TypeScript 오류

**증상**: 빌드 로그에 TypeScript 컴파일 오류

**해결**:
```bash
# 로컬에서 TypeScript 체크
npm run build
```

오류가 있으면 수정 후 다시 푸시

### 3. 의존성 문제

**증상**: `npm install` 실패 또는 패키지 누락

**해결**:
- `package.json`의 의존성 버전 확인
- `package-lock.json`이 Git에 포함되어 있는지 확인

### 4. Next.js 설정 문제

**증상**: Framework 감지 실패

**해결**:
- `next.config.js` 파일이 루트에 있는지 확인
- `package.json`에 `next` 의존성이 있는지 확인

## 빌드 로그 확인 방법

1. Vercel 대시보드 접속
2. 프로젝트 선택
3. **Deployments** 탭 클릭
4. 실패한 배포 클릭
5. **Build Logs** 탭에서 오류 메시지 확인

## 빠른 해결 체크리스트

- [ ] 환경 변수 `GEMINI_API_KEY` 설정됨
- [ ] `package.json`에 모든 의존성 포함
- [ ] `next.config.js` 파일 존재
- [ ] `app/page.tsx` 파일 존재
- [ ] `app/layout.tsx` 파일 존재
- [ ] TypeScript 오류 없음 (로컬 빌드 성공)
- [ ] Root Directory가 `./` (기본값)

## 재배포 방법

### 방법 1: 자동 재배포
```bash
# 빈 커밋으로 재배포 트리거
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

### 방법 2: Vercel에서 수동 재배포
1. Vercel 대시보드 → 프로젝트
2. Deployments 탭
3. 최신 배포 옆 "..." 메뉴
4. **Redeploy** 클릭

### 방법 3: 환경 변수 재설정 후 재배포
1. Settings → Environment Variables
2. `GEMINI_API_KEY` 확인/수정
3. Redeploy 실행

## 현재 프로젝트 상태

✅ `package.json` - 정상
✅ `next.config.js` - 정상
✅ `app/page.tsx` - 정상
✅ `app/layout.tsx` - 정상
✅ `vercel.json` - 정상

## 다음 단계

1. Vercel 빌드 로그에서 정확한 오류 메시지 확인
2. 위의 체크리스트 확인
3. 필요시 재배포
