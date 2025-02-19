import axios from 'axios';

import { defaultConfig } from './defaultConfig';

export const authAPI = axios.create(defaultConfig);

authAPI.interceptors.request.use(
  (config) => {
    /** TODO
     * - accessToken변수에 토큰 저장
     */

    const accessToken = 'accessToken';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // TODO:
    // - 401 에러로 실패하면, 로그인 페이지로 리다이렉트하는 로직 추가
    // - 리다이렉트 전에 사용자에게 경고 메시지
    return Promise.reject(error);
  },
);

authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    /**
     * TODO:
     * - 토근 재발급 로직
     * - 에러코드 분류 후, 인증상태에 따른 리다이렉트트
     */
  },
);
