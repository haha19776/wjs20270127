# Vercel 배포 오류 해결 가이드

## 현재 오류: "No Production Deployment"

이 오류는 배포가 실패했거나 완료되지 않았을 때 발생합니다.

## 해결 방법

### 1단계: Deployments 확인

Vercel 대시보드에서:
1. **"Deployments"** 탭 클릭
2. 최근 배포 상태 확인
3. 실패한 배포가 있다면 클릭해서 **로그 확인**

### 2단계: 환경 변수 재설정

1. Vercel 대시보드 > **Settings** > **Environment Variables**
2. 기존 `GEMINI_API_KEY` 삭제 (있다면)
3. 새로 추가:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyA9O71Deau_UvI5BlmBQQAbM7e8EAANAB0`
   - **Environment**: Production, Preview, Development 모두 체크
4. **Save** 클릭

### 3단계: 코드 재배포

```bash
cd c:\Users\SD2-16\Desktop\chatbot3

# 변경사항 추가
git add .

# 커밋
git commit -m "Fix: Update Vercel configuration"

# 푸시 (자동 재배포)
git push
```

### 4단계: 수동 재배포 (위 방법이 안되면)

Vercel 대시보드에서:
1. **Deployments** 탭
2. 가장 최근 배포 선택
3. 우측 상단 **"..."** 메뉴
4. **"Redeploy"** 클릭

## 일반적인 배포 실패 원인

### 1. Python 버전 문제
- 해결: `runtime.txt` 파일 추가됨 (python-3.9)

### 2. 환경 변수 미설정
- 해결: Settings > Environment Variables에서 API 키 설정

### 3. requirements.txt 패키지 오류
- 확인: Deployment 로그에서 패키지 설치 오류 확인
- 해결: 문제되는 패키지 버전 수정

### 4. 함수 실행 시간 초과 (10초 제한)
- Vercel 무료 플랜은 10초 제한
- Gemini API 응답이 느린 경우 문제 발생 가능

## 배포 성공 확인

배포가 성공하면:
1. **Deployments** 탭에서 ✅ "Ready" 상태 표시
2. **Visit** 버튼으로 사이트 접속 가능
3. URL: `https://your-project.vercel.app`

## 대안: Render 또는 Railway 사용

Vercel에서 계속 문제가 발생하면:
- **Render**: https://render.com (Python 앱에 더 적합)
- **Railway**: https://railway.app
- **PythonAnywhere**: https://www.pythonanywhere.com

## 디버깅 체크리스트

- [ ] GitHub에 모든 파일이 올라갔는가?
- [ ] main 브랜치에 푸시했는가?
- [ ] Vercel에서 올바른 저장소를 선택했는가?
- [ ] 환경 변수 `GEMINI_API_KEY`가 설정되었는가?
- [ ] Deployment 로그에 에러 메시지가 있는가?
- [ ] `requirements.txt` 파일이 있는가?

## 연락처

문제가 계속되면 다음 정보와 함께 문의:
1. Deployment 로그 스크린샷
2. Vercel 프로젝트 URL
3. 에러 메시지
