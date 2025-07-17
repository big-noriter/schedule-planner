/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Railway 배포 시 환경변수가 없을 경우를 대비한 fallback
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://schedule-planner-backend.up.railway.app' 
        : 'http://localhost:3000'),
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://schedule-planner-backend.up.railway.app' 
        : 'http://localhost:3000');
    
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig; 
