// /api/index.ts
import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터 설정 (토큰 관리 등)
api.interceptors.request.use(
  (config) => {
    // 요청 보내기 전 수행할 작업
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 오류 응답 처리
    if (error.response && error.response.status === 401) {
      // 인증 오류 처리 (로그아웃 등)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
