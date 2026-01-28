# 🚀 개발 서버 시작 가이드

## localhost 연결 오류 해결 방법

### 방법 1: 배치 파일 사용 (가장 쉬움)

프로젝트 루트에서 `quick-start.bat` 파일을 더블클릭하거나:

```cmd
quick-start.bat
```

### 방법 2: PowerShell에서 실행

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127
cmd /c npm run dev
```

### 방법 3: CMD에서 직접 실행

```cmd
cd c:\Users\SD2-16\Desktop\new\wjs20270127
npm run dev
```

## 문제 해결

### 1. 포트 3000이 이미 사용 중인 경우

```powershell
# 포트 3000을 사용하는 프로세스 찾기
netstat -ano | findstr :3000

# 프로세스 종료 (PID를 위 명령어에서 확인)
taskkill /PID [PID번호] /F
```

### 2. node_modules가 없는 경우

```cmd
cd c:\Users\SD2-16\Desktop\new\wjs20270127
cmd /c npm install
```

### 3. 서버가 시작되지 않는 경우

1. 모든 Node.js 프로세스 종료:
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

2. 서버 재시작:
```cmd
cd c:\Users\SD2-16\Desktop\new\wjs20270127
cmd /c npm run dev
```

## 서버가 정상적으로 시작되면

브라우저에서 다음 주소를 열어주세요:
- **http://localhost:3000**

서버를 중지하려면 터미널에서 `Ctrl+C`를 누르세요.
