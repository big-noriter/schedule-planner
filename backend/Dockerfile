# ==========================================
# 🏗️ 빌드 스테이지
# ==========================================
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm ci

# 소스 코드 복사
COPY . .

# TypeScript 빌드
RUN npm run build

# ==========================================
# 🚀 프로덕션 스테이지
# ==========================================
FROM node:18-alpine AS production

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사 및 프로덕션 의존성만 설치
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 빌드된 결과물 복사
COPY --from=builder /app/dist ./dist

# 포트 노출
EXPOSE $PORT

# 헬스체크 추가
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:${PORT:-3000}/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# 서버 시작
CMD ["npm", "start"] 