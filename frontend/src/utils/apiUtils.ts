/**
 * API Base URL을 환경에 따라 동적으로 결정하는 유틸리티
 */
export const getApiBaseUrl = (): string => {
  // 1. 환경변수가 설정된 경우 우선 사용
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // 2. Railway 환경 감지 (Vercel 배포 환경)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('vercel.app') || hostname.includes('schedule-planner')) {
      return 'https://schedule-planner-backend.up.railway.app';
    }
  }
  
  // 3. 개발 환경 fallback
  return 'http://localhost:3000';
};

/**
 * API 요청 헬퍼 함수
 */
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };
  
  console.log(`API 요청: ${url}`); // 디버깅용
  
  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API 요청 오류 (${url}):`, error);
    throw error;
  }
}; 