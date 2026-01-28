# ⚙️ Vercel Framework Preset 설정 가이드

## 🎯 Flask Python 앱 설정

### Framework Preset: **Other** (또는 자동 감지)

Vercel에서 Flask Python 애플리케이션의 경우:

1. **Framework Preset**: **"Other"** 선택
   - 또는 **"None"**
   - 또는 자동 감지되도록 두기

2. **Build Settings**:
   - **Build Command**: (비워둠 또는 `pip install -r requirements.txt`)
   - **Output Directory**: (비워둠)
   - **Install Command**: `pip install -r requirements.txt`

---

## 📋 Vercel 프로젝트 설정

### 새 프로젝트 생성 시

1. **GitHub 저장소 선택**
2. **Framework Preset**: **"Other"** 선택
3. **Root Directory**: (비워둠 - 루트 사용)
4. **Build and Output Settings**:
   - Build Command: (비워둠)
   - Output Directory: (비워둠)
   - Install Command: `pip install -r requirements.txt`

### 기존 프로젝트 수정 시

1. Vercel 대시보드 > **Settings**
2. **General** 탭
3. **Framework Preset**: **"Other"** 선택
4. **Build & Development Settings**:
   - Build Command: (비워둠)
   - Output Directory: (비워둠)
   - Install Command: `pip install -r requirements.txt`

---

## ✅ 현재 설정 확인

현재 `vercel.json` 파일이 있으므로:

- ✅ Vercel이 자동으로 설정을 읽습니다
- ✅ Framework Preset은 **"Other"** 또는 자동 감지로 설정
- ✅ `vercel.json`의 설정이 우선 적용됩니다

---

## 🔧 vercel.json 설정

현재 `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "api/index.py"
    }
  ]
}
```

이 설정이 있으면 Framework Preset은 자동으로 감지됩니다!

---

## 💡 중요 사항

### Framework Preset 선택

- ❌ **Next.js** - Next.js 전용
- ❌ **React** - React 전용
- ❌ **Vue** - Vue 전용
- ✅ **Other** - Python Flask 앱에 적합
- ✅ **None** - 수동 설정

### vercel.json이 있으면

- Framework Preset은 **"Other"**로 자동 설정됨
- `vercel.json`의 설정이 우선 적용됨
- 추가 설정 불필요

---

## 🎯 결론

**Framework Preset: "Other"** 선택하거나 자동 감지로 두세요!

`vercel.json` 파일이 이미 있으므로 Vercel이 자동으로 설정을 읽습니다.

---

## 📝 체크리스트

- [ ] Framework Preset: **"Other"** 선택
- [ ] Build Command: (비워둠)
- [ ] Output Directory: (비워둠)
- [ ] Install Command: `pip install -r requirements.txt`
- [ ] `vercel.json` 파일 확인
- [ ] 환경 변수 `GEMINI_API_KEY` 설정 확인

---

**Framework Preset은 "Other"로 설정하세요!** ✅
