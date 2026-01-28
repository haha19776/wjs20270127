# 🔧 Vercel 환경 변수 설정 상세 가이드

## 환경 변수 추가 위치

### 1단계: 프로젝트 설정 화면 접속

1. Vercel 대시보드 (https://vercel.com/dashboard) 접속
2. 배포하려는 프로젝트 클릭 (또는 새 프로젝트 Import 후)
3. 상단 메뉴에서 **Settings** 탭 클릭
4. 왼쪽 사이드바에서 **Environment Variables** 클릭

### 2단계: 환경 변수 추가

**Environment Variables** 페이지에서:

1. **Add New** 또는 **Add** 버튼 클릭
2. 모달 창 또는 폼이 나타남

### 3단계: Environment 체크박스 위치

환경 변수 추가 폼에서:

```
┌─────────────────────────────────────┐
│ Add Environment Variable            │
├─────────────────────────────────────┤
│ Name:                                │
│ [GEMINI_API_KEY              ]     │
│                                     │
│ Value:                              │
│ [AIzaSyCXH-6EhzSsLZYkUUJddCTz...]  │
│                                     │
│ Environment:                        │
│ ☑ Production                       │
│ ☑ Preview                          │
│ ☑ Development                      │
│                                     │
│ [Cancel]  [Save]                   │
└─────────────────────────────────────┘
```

**Environment 체크박스는 Name과 Value 입력 필드 아래에 있습니다.**

### 4단계: 체크박스 선택

- ✅ **Production**: 프로덕션 배포에 사용
- ✅ **Preview**: 프리뷰 배포에 사용  
- ✅ **Development**: 로컬 개발에 사용

**모두 체크하는 것을 권장합니다** (3개 모두 ✅)

### 5단계: 저장

- **Save** 또는 **Add** 버튼 클릭

## 화면 구성 설명

### Vercel Settings 페이지 구조

```
Settings
├── General
├── Domains
├── Environment Variables  ← 여기 클릭!
├── Git
├── Deployments
└── ...
```

### Environment Variables 페이지

```
Environment Variables

┌─────────────────────────────────────────────┐
│ Name              Value          Environment │
├─────────────────────────────────────────────┤
│ (비어있거나 기존 변수들)                      │
└─────────────────────────────────────────────┘

[Add New] 버튼
```

**Add New 버튼을 클릭하면** 모달 창이 나타나고, 그 안에 Environment 체크박스가 있습니다.

## 찾기 어려운 경우

### 방법 1: 프로젝트 Import 후

프로젝트를 처음 Import할 때:
1. Import 후 **Configure Project** 화면
2. **Environment Variables** 섹션 찾기
3. **Add** 버튼 클릭
4. Environment 체크박스 확인

### 방법 2: 기존 프로젝트

1. 프로젝트 대시보드 접속
2. 상단 **Settings** 탭
3. 왼쪽 메뉴 **Environment Variables**
4. **Add** 버튼 클릭

## 스크린샷 위치 참고

만약 화면이 다르게 보인다면:

1. **Name** 입력 필드 아래
2. **Value** 입력 필드 아래
3. **Add** 또는 **Save** 버튼 위

이 세 곳 중 한 곳에 Environment 선택 옵션이 있습니다.

## 빠른 확인 방법

1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Environment Variables** 찾기
4. **Add** 버튼 클릭
5. Name과 Value 입력 후, **아래쪽을 보면** Environment 체크박스가 있습니다

## 중요 사항

- Environment를 선택하지 않으면 환경 변수가 적용되지 않을 수 있습니다
- **3개 모두 체크하는 것을 강력히 권장합니다**
- 저장 후에는 **Redeploy**가 필요할 수 있습니다
