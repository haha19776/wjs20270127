# 🔐 자동 SSH 인증 설정

## 자동 설정 완료

✅ SSH 키 생성 완료
✅ 원격 저장소를 SSH로 변경 완료
✅ GitHub 호스트 키 추가 완료

## 다음 단계: GitHub에 SSH 키 추가

### 1단계: 공개 키 복사

위에 표시된 SSH 공개 키를 복사하세요 (ssh-ed25519로 시작하는 전체 내용)

### 2단계: GitHub에 추가

1. 브라우저에서 https://github.com/settings/keys 접속
2. **New SSH key** 버튼 클릭
3. **Title**: `wjs20270127` 입력
4. **Key**: 위에서 복사한 공개 키 붙여넣기
5. **Add SSH key** 클릭

### 3단계: 푸시 실행

PowerShell에서:

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git push -u origin main
```

## 자동 푸시 스크립트

GitHub에 SSH 키를 추가한 후, 아래 명령어로 자동 푸시:

```powershell
cd c:\Users\SD2-16\Desktop\new\wjs20270127
git push -u origin main
```

## 문제 해결

### "Permission denied (publickey)"
→ GitHub에 SSH 키가 추가되지 않았습니다. 위의 2단계를 다시 확인하세요.

### "Host key verification failed"
→ 다음 명령어 실행:
```powershell
ssh-keyscan github.com >> ~/.ssh/known_hosts
```
