# ⚡ Vercel 빠른 시작 (3단계)

## 🚀 지금 바로 배포하기

### 1단계: Vercel 접속 및 프로젝트 Import

1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. **Add New...** → **Project** 클릭
4. `haha19776/wjs20270127` 저장소 선택
5. **Import** 클릭
6. **Configure Project** 화면에서:
   - **Root Directory**: `./` 또는 **비워두기** (기본값 사용)
   - **Framework Preset**: `Next.js` (자동 감지됨)
   - ⚠️ **Root Directory에 `app`을 입력하지 마세요!**

### 2단계: 환경 변수 추가 (필수!)

프로젝트 설정 화면에서:

1. 상단 메뉴에서 **Settings** 탭 클릭
2. 왼쪽 사이드바에서 **Environment Variables** 클릭
3. **Add New** 또는 **Add** 버튼 클릭
4. 모달 창에서 입력:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyCXH-6EhzSsLZYkUUJddCTz2ye5Fa5KEKs`
   - **Environment** (Name/Value 입력 필드 아래에 있음):
     - ✅ Production 체크
     - ✅ Preview 체크
     - ✅ Development 체크
5. **Save** 또는 **Add** 버튼 클릭

**💡 Environment 체크박스는 Name과 Value 입력 필드 아래에 있습니다!**

### 3단계: 배포 실행

1. **Deploy** 버튼 클릭
2. 2-3분 대기
3. 배포 완료! 🎉

## ✅ 배포 완료 후

- 배포된 URL로 접속 (예: `wjs20270127.vercel.app`)
- 뉴스 검색 및 요약 기능 테스트

## ❌ 문제 발생 시

- **404 오류**: Framework가 Next.js로 설정되었는지 확인
- **요약 안됨**: 환경 변수 `GEMINI_API_KEY` 확인
- **빌드 실패**: Build Logs에서 오류 확인

## 📋 체크리스트

- [ ] Vercel에 프로젝트 Import 완료
- [ ] 환경 변수 `GEMINI_API_KEY` 추가 완료
- [ ] Deploy 버튼 클릭
- [ ] 배포 완료 확인
- [ ] 웹사이트 동작 테스트

## 🔄 자동 배포

이제부터 GitHub에 푸시하면 자동으로 배포됩니다!
