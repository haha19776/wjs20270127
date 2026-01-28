# 📁 Vercel Root Directory 설정 가이드

## ✅ 올바른 설정

**Root Directory: `./` (기본값, 비워두기)**

또는

**Root Directory: 빈 값 (기본값 사용)**

## ❌ 잘못된 설정

**Root Directory: `app` ← 이렇게 하면 안 됩니다!**

## 이유

### 프로젝트 구조

```
wjs20270127/              ← 이것이 루트 디렉토리
├── package.json          ← Next.js 설정 파일
├── next.config.js        ← Next.js 설정 파일
├── tsconfig.json         ← TypeScript 설정
├── tailwind.config.ts    ← Tailwind 설정
├── vercel.json           ← Vercel 설정
└── app/                  ← Next.js App Router 디렉토리 (하위 폴더)
    ├── page.tsx
    ├── layout.tsx
    └── ...
```

### 왜 `./` (기본값)이어야 하나?

1. **`package.json`이 루트에 있음**
   - Vercel은 `package.json`을 찾아서 프로젝트를 인식합니다
   - `package.json`이 있는 곳이 루트 디렉토리입니다

2. **`next.config.js`가 루트에 있음**
   - Next.js 설정 파일도 루트에 있습니다

3. **`app`은 하위 디렉토리**
   - `app`은 Next.js App Router의 디렉토리일 뿐
   - 프로젝트 루트가 아닙니다

### Vercel 설정 화면에서

```
Root Directory: [./]  ← 이렇게 비워두거나 ./ 입력
```

또는

```
Root Directory: [  ]  ← 아무것도 입력하지 않기 (기본값)
```

## 확인 방법

Root Directory가 올바르게 설정되었는지 확인:

1. Vercel 프로젝트 설정에서
2. **Root Directory** 필드가 비어있거나 `./`인지 확인
3. **Framework Preset**이 `Next.js`로 자동 감지되는지 확인

## 만약 `app`을 선택했다면?

- ❌ `package.json`을 찾을 수 없음
- ❌ 빌드 실패
- ❌ Next.js 설정 파일을 찾을 수 없음

**해결**: Root Directory를 `./` 또는 빈 값으로 변경

## 요약

| 설정 | 값 |
|------|-----|
| Root Directory | `./` 또는 **비워두기** (기본값) |
| Framework Preset | `Next.js` (자동 감지) |
| Build Command | `npm run build` (자동 설정) |
| Output Directory | `.next` (자동 설정) |

**결론: Root Directory는 기본값(`./`)을 사용하세요!**
