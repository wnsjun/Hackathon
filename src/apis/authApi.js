import axiosInstance from './axiosinstance';

// 로그인 API
export const loginApi = async ({ email, password }) => {
  const response = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });
  return response.data; // { accessToken: "..." }
};
