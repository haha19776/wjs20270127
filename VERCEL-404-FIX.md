# 🔧 Vercel 404 오류 해결 가이드

## Vercel 404 NOT_FOUND 오류 해결 방법

### 1. Vercel 프로젝트 설정 확인

Vercel 대시보드에서 다음을 확인하세요:

1. **프로젝트 설정 (Settings)**
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (기본값, 변경하지 않음)
   - **Build Command**: `npm run build` (자동 감지됨)
   - **Output Directory**: `.next` (자동 감지됨)
   - **Install Command**: `npm install` (자동 감지됨)

2. **환경 변수 확인**
   - Settings → Environment Variables
   - `GEMINI_API_KEY`가 설정되어 있는지 확인
   - Production, Preview, Development 모두 선택되어 있는지 확인

### 2. 빌드 로그 확인

Vercel 대시보드에서:
1. 프로젝트 선택
2. "Deployments" 탭 클릭
3. 최신 배포 클릭
4. "Build Logs" 확인
5. 오류 메시지 확인

### 3. 일반적인 해결 방법

#### 방법 1: 프로젝트 재배포
1. Vercel 대시보드 → 프로젝트
2. "Deployments" 탭
3. 최신 배포 옆 "..." 메뉴
4. "Redeploy" 클릭

#### 방법 2: GitHub에 푸시하여 자동 재배포
```bash
# 작은 변경사항 커밋
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

#### 방법 3: Vercel 프로젝트 삭제 후 재생성
1. Vercel 대시보드에서 프로젝트 삭제
2. "New Project" 클릭
3. GitHub 저장소 다시 Import
4. 환경 변수 다시 설정
5. Deploy

### 4. 확인 사항 체크리스트

- [ ] GitHub 저장소가 올바르게 연결되었는가?
- [ ] `package.json`에 `build` 스크립트가 있는가?
- [ ] `app/page.tsx` 파일이 존재하는가?
- [ ] `app/layout.tsx` 파일이 존재하는가?
- [ ] 환경 변수 `GEMINI_API_KEY`가 설정되었는가?
- [ ] 빌드 로그에 오류가 없는가?

### 5. Next.js App Router 확인

프로젝트 구조가 올바른지 확인:
```
app/
  ├── page.tsx      ✅ 필수
  ├── layout.tsx    ✅ 필수
  └── ...
```

### 6. Vercel 로그에서 확인할 오류

빌드 로그에서 다음을 확인:
- `Module not found` 오류
- `Build failed` 오류
- `Environment variable` 오류
- `TypeScript` 오류

### 7. 빠른 해결 방법

1. **Vercel 대시보드에서:**
   - Settings → General
   - "Clear Build Cache" 클릭
   - "Redeploy" 클릭

2. **또는 GitHub에 빈 커밋 푸시:**
   ```bash
   git commit --allow-empty -m "Fix Vercel deployment"
   git push origin main
   ```

## 문제가 계속되면

Vercel 지원팀에 문의하거나:
- 빌드 로그 전체 내용 확인
- 오류 메시지의 전체 내용 확인
- 프로젝트 설정 스크린샷 제공
