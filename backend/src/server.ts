import app from './app';
import 'dotenv/config';

const PORT = parseInt(process.env['PORT'] || '3000', 10);

// 포트 번호 유효성 검사
if (isNaN(PORT) || PORT <= 0 || PORT > 65535) {
  console.error('❌ 잘못된 포트 번호:', process.env['PORT']);
  process.exit(1);
}

const startServer = async () => {
  try {
    // Railway 환경 체크
    console.log('🔍 환경변수 체크:');
    console.log('- NODE_ENV:', process.env['NODE_ENV']);
    console.log('- PORT:', PORT);
    console.log('- Railway:', process.env['RAILWAY_ENVIRONMENT'] ? '✅' : '❌');
    console.log('- Firebase Project:', process.env['FIREBASE_PROJECT_ID'] ? '✅' : '❌');
    console.log('- Firebase Client Email:', process.env['FIREBASE_CLIENT_EMAIL'] ? '✅' : '❌');
    console.log('- Firebase Private Key:', process.env['FIREBASE_PRIVATE_KEY'] ? '✅' : '❌');
    
    const HOST = process.env['NODE_ENV'] === 'production' ? '0.0.0.0' : 'localhost';
    
    const server = app.listen(PORT, HOST, () => {
      console.log('🚀 서버가 시작되었습니다!');
      console.log(`📍 서버 주소: http://${HOST}:${PORT}`);
      console.log(`🔍 헬스 체크: http://${HOST}:${PORT}/health`);
      console.log(`🌍 환경: ${process.env['NODE_ENV'] || 'development'}`);
      console.log(`⏰ 시작 시간: ${new Date().toISOString()}`);
      console.log(`🔧 Railway 포트: ${PORT}`);
    });

    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ 포트 ${PORT}가 이미 사용 중입니다.`);
      } else {
        console.error('❌ 서버 시작 오류:', error);
      }
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ 서버 시작 실패:', error);
    console.error('상세 오류:', error instanceof Error ? error.stack : error);
    process.exit(1);
  }
};

// 서버 시작
startServer();

// Graceful Shutdown 처리
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM 신호를 받았습니다. 서버를 종료합니다...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT 신호를 받았습니다. 서버를 종료합니다...');
  process.exit(0);
}); 