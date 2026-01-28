# Vercel 배포 가이드

## 1. GitHub에 코드 올리기

### 압축 없이 일반 파일로 올립니다!

```bash
# 1. Git 초기화
cd c:\Users\SD2-16\Desktop\chatbot3
git init

# 2. 모든 파일 추가
git add .

# 3. 커밋
git commit -m "Initial commit: News chatbot with Gemini API"

# 4. GitHub 저장소 생성 후 연결
# GitHub에서 새 저장소를 만든 후 (예: news-chatbot)
git remote add origin https://github.com/your-username/news-chatbot.git
git branch -M main
git push -u origin main
```

## 2. Vercel 배포하기

### 2-1. Vercel 가입 및 프로젝트 연결

1. **Vercel 접속**: https://vercel.com
2. **GitHub로 로그인**
3. **"Add New Project"** 클릭
4. **GitHub 저장소 선택** (news-chatbot)
5. **Import** 클릭

### 2-2. 환경 변수 설정 (중요!)

Vercel 프로젝트 설정에서:

1. **"Settings"** 탭 클릭
2. **"Environment Variables"** 선택
3. 다음 변수 추가:
   ```
   Name: GEMINI_API_KEY
   Value: AIzaSyA9O71Deau_UvI5BlmBQQAbM7e8EAANAB0
   ```
4. **Environment**: Production, Preview, Development 모두 체크
5. **"Save"** 클릭

### 2-3. 배포 설정

**Framework Preset**: Other (자동 감지됨)

**Build Settings**:
- Build Command: (비워둠)
- Output Directory: (비워둠)
- Install Command: `pip install -r requirements.txt`

**"Deploy"** 클릭!

## 3. 배포 완료

배포가 완료되면 Vercel이 자동으로 URL을 생성합니다:
```
https://your-project-name.vercel.app
```

## 4. 업데이트 방법

코드를 수정한 후:

```bash
git add .
git commit -m "Update: 수정 내용"
git push
```

GitHub에 푸시하면 **Vercel이 자동으로 재배포**합니다!

## 5. 주의사항

### ⚠️ API 키 보안
- GitHub에 `.env` 파일을 절대 올리지 마세요
- Vercel의 환경 변수 설정을 사용하세요
- 공개 저장소에서는 API 키가 코드에 노출되지 않도록 주의

### ⚠️ 무료 플랜 제한
- Vercel 무료 플랜: 월 100GB 대역폭
- 함수 실행 시간: 10초 제한
- Google Gemini API: 무료 할당량 확인 필요

## 6. 문제 해결

### 배포 실패 시
1. Vercel 대시보드에서 **"Logs"** 확인
2. `requirements.txt` 패키지 버전 확인
3. Python 버전 확인 (기본: 3.9)

### API 키 오류 시
1. Vercel Settings > Environment Variables 확인
2. API 키가 올바르게 입력되었는지 확인
3. 프로젝트 재배포 (Deployments > ... > Redeploy)

## 7. 로컬 테스트

배포 전 로컬에서 테스트:
```bash
python app.py
```

## 파일 구조 (GitHub에 올라갈 파일들)

```
chatbot3/
├── app.py                 ✅ 올림
├── wsgi.py               ✅ 올림 (Vercel용)
├── vercel.json           ✅ 올림 (Vercel 설정)
├── requirements.txt       ✅ 올림
├── README_GITHUB.md       ✅ 올림 (README.md로 변경)
├── DEPLOYMENT.md          ✅ 올림 (배포 가이드)
├── .gitignore            ✅ 올림
├── .env.example          ✅ 올림
├── templates/
│   └── index.html        ✅ 올림
└── static/
    ├── style.css         ✅ 올림
    └── script.js         ✅ 올림

❌ 올리지 않음:
├── .env                  ❌ 올리면 안됨!
├── __pycache__/          ❌ 자동 제외
├── venv/                 ❌ 자동 제외
└── 실행방법.txt          ❌ 선택사항
```
