# Vercel 배포 오류 해결 가이드

## 🔧 수정된 파일

### 1. `vercel.json` - Vercel 설정 업데이트
- `api/index.py`를 serverless function으로 사용
- static 파일 라우팅 추가

### 2. `api/index.py` - Serverless Function 핸들러
- Flask 앱을 Vercel 형식에 맞게 래핑
- WSGI 환경 변수 처리

## 🚀 배포 방법

### 1단계: GitHub에 푸시

```bash
cd c:\Users\SD2-16\Desktop\chatbot3

git add .
git commit -m "Fix: Update Vercel configuration for Flask deployment"
git push
```

### 2단계: Vercel 환경 변수 확인

Vercel 대시보드에서:
1. **Settings** > **Environment Variables**
2. 다음 변수 확인:
   - `GEMINI_API_KEY` ✅
   - `SUPABASE_URL` (선택사항)
   - `SUPABASE_KEY` (선택사항)

### 3단계: 자동 재배포

GitHub에 푸시하면 Vercel이 자동으로 재배포합니다.

## ⚠️ 일반적인 오류 해결

### 오류 1: "ModuleNotFoundError"
**원인**: 패키지 설치 실패
**해결**: 
- Vercel 대시보드 > Deployments > 로그 확인
- `requirements.txt` 패키지 버전 확인

### 오류 2: "500 Internal Server Error"
**원인**: 환경 변수 미설정
**해결**:
- Vercel Settings > Environment Variables 확인
- `GEMINI_API_KEY` 설정 확인

### 오류 3: "Template not found"
**원인**: 템플릿 경로 문제
**해결**:
- `app.py`에서 `template_folder='templates'` 확인
- GitHub에 `templates/` 폴더가 올라갔는지 확인

### 오류 4: "Static files not found"
**원인**: static 파일 경로 문제
**해결**:
- `vercel.json`의 static 라우팅 확인
- GitHub에 `static/` 폴더가 올라갔는지 확인

## 📋 배포 확인 체크리스트

- [ ] `vercel.json` 파일이 올라갔는가?
- [ ] `api/index.py` 파일이 올라갔는가?
- [ ] `templates/` 폴더가 올라갔는가?
- [ ] `static/` 폴더가 올라갔는가?
- [ ] `requirements.txt`가 올라갔는가?
- [ ] Vercel 환경 변수가 설정되었는가?

## 🔍 Vercel 로그 확인

1. Vercel 대시보드 > **Deployments**
2. 최근 배포 클릭
3. **"Logs"** 탭에서 오류 확인

## 💡 추가 팁

### Python 버전 확인
`runtime.txt` 파일이 있으면 Python 버전이 명시됩니다:
```
python-3.9
```

### 함수 실행 시간
Vercel 무료 플랜은 10초 제한이 있습니다.
- Gemini API 응답이 느리면 타임아웃 가능
- 필요시 Vercel Pro 플랜 고려

## 🆘 여전히 문제가 있다면

1. **Vercel 로그 확인**: Deployments > Logs
2. **로컬 테스트**: `python app.py`로 정상 작동 확인
3. **환경 변수 재설정**: Settings > Environment Variables
4. **프로젝트 재배포**: Deployments > ... > Redeploy
