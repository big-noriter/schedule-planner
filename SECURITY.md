# 🔒 Security Guidelines

## 민감한 파일 보호

이 프로젝트는 다음과 같은 민감한 정보를 포함할 수 있습니다:

### 🚫 절대 Git에 올리면 안 되는 파일들

```
.env                    # 환경변수
*.key                   # 개인키/API키
*.pem                   # 인증서
service-account.json    # Firebase 서비스 계정
backend/kms/           # KMS 관리 문서
*.pdf                  # 리포트 (민감한 데이터 포함)
```

### ✅ 현재 적용된 보안 조치

1. **포괄적인 .gitignore**: 200개 이상의 패턴으로 민감한 파일 차단
2. **.gitattributes**: 추가적인 Git 레벨 보안
3. **환경변수 분리**: 모든 API 키와 설정을 .env 파일로 분리

### 🔧 환경변수 설정 방법

#### Backend (.env 파일 생성)

```bash
# backend 폴더에 .env 파일 생성
cd backend
touch .env  # 또는 notepad .env

# 다음 내용 추가:
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
OPENAI_API_KEY=sk-your-openai-key
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

#### Frontend (.env.local 파일 생성)

```bash
# frontend 폴더에 .env.local 파일 생성
cd frontend
touch .env.local  # 또는 notepad .env.local

# 다음 내용 추가:
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

### 🚨 보안 체크리스트

#### 커밋 전 확인사항

- [ ] `git status`로 .env 파일이 추적되지 않는지 확인
- [ ] `git check-ignore .env`로 무시되는지 확인
- [ ] API 키나 비밀번호가 소스코드에 하드코딩되지 않았는지 확인

#### API 키 관리

- [ ] Firebase 서비스 계정 키를 안전한 곳에 보관
- [ ] Google OAuth 클라이언트 시크릿을 팀원과 안전하게 공유
- [ ] OpenAI API 키를 주기적으로 로테이션
- [ ] 불필요한 권한은 제거

### 🔄 Git에서 민감한 파일 제거하기

이미 .env 파일이 Git에 추적되고 있다면:

```bash
# 1. Git 추적에서 제거
git rm --cached .env
git rm --cached backend/.env
git rm --cached frontend/.env.local

# 2. .gitignore에 추가 (이미 완료됨)

# 3. 커밋
git commit -m "Remove sensitive files from tracking"

# 4. 푸시
git push origin main
```

### 📞 보안 이슈 신고

보안 관련 문제를 발견하면:

1. **즉시 해당 API 키 비활성화**
2. **새로운 키 재발급**
3. **팀에 알리기**
4. **.env 파일 다시 확인**

## 팀원 온보딩

새로운 팀원이 프로젝트를 설정할 때:

1. 이 문서 읽기
2. .env 파일 생성 (템플릿 참고)
3. API 키 요청 및 설정
4. `git status`로 .env 파일이 무시되는지 확인
5. 첫 커밋 전 보안 체크리스트 확인

---

**⚠️ 주의: 이 가이드라인을 따르지 않으면 중요한 정보가 유출될 수 있습니다.** 