// authApi.js
import axiosInstance from './axiosInstance';

// 로그인 API
export const loginApi = async ({ email, password }) => {
  const response = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });
  return response.data;
};

// 회원가입 2단계 API (추가 정보)
export const signup2Api = async ({ address, themes }) => {
  const response = await axiosInstance.post('/api/auth/signup2', {
    address,
    themes,
  });
  return response.data;
};
