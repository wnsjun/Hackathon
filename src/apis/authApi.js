// authApi.js
import axiosInstance from './axiosInstance';

// 회원가입 1단계
export const signup1Api = async ({
  email,
  password,
  confirmPassword,
  name,
  phone,
  nickname,
  bank,
  accountNumber,
}) => {
  const payload = {
    email,
    password,
    confirmPassword,
    name,
    phone,
    nickname,
    bank,
    accountNumber,
  };

  console.log(
    'API 요청 URL:',
    axiosInstance.defaults.baseURL + '/api/auth/signup1'
  );
  console.log('API 요청 payload:', payload);

  const response = await axiosInstance.post('/api/auth/signup1', payload);
  return response.data;
};

// 회원가입 2단계 API (추가 정보)
export const signup2Api = async ({ preferredDong, themes }) => {
  const response = await axiosInstance.post('/api/auth/signup2', {
    preferredDong,
    themes,
  });
  return response.data;
};

// 로그인 API
export const loginApi = async ({ email, password }) => {
  const response = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });
  return response.data;
};
