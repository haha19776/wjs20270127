# 🔐 보안 설정 가이드

## 새로운 API 키 적용 완료!

GitHub에 노출되지 않도록 안전하게 설정되었습니다.

---

## 📋 로컬 개발 환경 설정

### 1. 패키지 재설치

```bash
cd c:\Users\SD2-16\Desktop\chatbot3
pip install -r requirements.txt
```

### 2. .env 파일 확인

`.env` 파일이 생성되었고 새 API 키가 설정되었습니다:
```
GEMINI_API_KEY=AIzaSyBzph2j-1O8FaCy7zFlzOTXGSFTdOaaaQM
```

⚠️ **이 파일은 절대 GitHub에 올리지 마세요!** (`.gitignore`에 이미 포함됨)

### 3. 로컬 서버 실행

```bash
python app.py
```

접속: `http://127.0.0.1:5000`

---

## ☁️ Vercel 배포 설정

### 1. 환경 변수 설정 (필수!)

Vercel 대시보드에서:

1. 프로젝트 선택
2. **Settings** 탭
3. **Environment Variables** 클릭
4. 기존 `GEMINI_API_KEY` **삭제** (구 API 키)
5. 새로 추가:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyBzph2j-1O8FaCy7zFlzOTXGSFTdOaaaQM`
   - **Environment**: Production, Preview, Development 모두 체크
6. **Save** 클릭

### 2. GitHub에 푸시

```bash
cd c:\Users\SD2-16\Desktop\chatbot3

# 변경사항 추가
git add .

# 커밋
git commit -m "Security: Remove hardcoded API key and update configuration"

# 푸시
git push
```

⚠️ **주의**: `.env` 파일은 `.gitignore`에 의해 자동으로 제외됩니다.

### 3. Vercel 재배포

GitHub에 푸시하면 Vercel이 자동으로 재배포합니다.

---

## ✅ 보안 체크리스트

- [x] 구 API 키 삭제됨 (Google AI Studio에서)
- [x] 새 API 키 발급됨
- [x] 코드에서 하드코딩된 API 키 제거
- [x] `.env` 파일로 로컬 관리
- [x] `.env`가 `.gitignore`에 포함
- [ ] Vercel 환경 변수 업데이트 필요
- [ ] GitHub에 푸시
- [ ] Vercel 재배포 확인

---

## 🔍 변경 사항

### 1. `app.py`
```python
# 기존 (위험!)
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyA9O71Deau_UvI5BlmBQQAbM7e8EAANAB0')

# 변경 (안전!)
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("환경 변수가 설정되지 않았습니다.")
```

### 2. 새로운 파일
- ✅ `.env` - 로컬 API 키 저장 (GitHub 제외)
- ✅ `python-dotenv` 추가 - 환경 변수 로드

### 3. 삭제된 파일
- ❌ `실행방법.txt` - 불필요
- ❌ `README_GITHUB.md` - 중복

---

## 🚀 다음 단계

1. **로컬 테스트**:
   ```bash
   python app.py
   ```

2. **Vercel 환경 변수 설정** (위 참조)

3. **GitHub 푸시**:
   ```bash
   git add .
   git commit -m "Security: Update API key configuration"
   git push
   ```

4. **Vercel 배포 확인**:
   - Deployments 탭에서 상태 확인
   - 환경 변수 설정 후 자동 재배포됨

---

## ⚠️ 중요 사항

- `.env` 파일은 **절대** GitHub에 올리지 마세요
- API 키가 노출되면 즉시 재발급하세요
- Vercel 환경 변수는 코드와 별도로 관리됩니다
