import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 환경변수 사용
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS 처리를 위해 추가
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 추가 - 401 오류 처리
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log(
        '🚨 401 Unauthorized Error - Token might be invalid or expired'
      );
      console.log('🚨 Response data:', error.response.data);

      // 토큰이 유효하지 않으면 localStorage에서 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');

      // 로그인 페이지로 리다이렉트
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
