// import { useMutation } from '@tanstack/react-query';
// import { loginApi } from '../apis/authApi';

// export const useLogin = () => {
//   return useMutation({
//     mutationFn: loginApi,
//     onSuccess: (data) => {
//       // 토큰 저장
//       localStorage.setItem('accessToken', data.accessToken);
//       alert('로그인 성공!');
//     },
//     onError: (error) => {
//       console.error(error);
//       alert('로그인 실패! 이메일과 비밀번호를 확인하세요.');
//     },
//   });
// };

import { useMutation } from '@tanstack/react-query';
import { signup1Api, signup2Api, loginApi } from '../apis/authApi';

// 회원가입 1단계
export const useSignup1 = () => {
  return useMutation({
    mutationFn: (payload) => signup1Api(payload),
    onSuccess: (res) => {
      const token = res?.accessToken;
      if (token) {
        localStorage.setItem('accessToken', token);
        alert('회원가입 1단계 완료!');
      }
    },
    onError: (error) => {
      console.error('Signup1 error:', error);
      alert(
        error.response?.data?.message ||
          '회원가입 1단계 실패! 입력값을 확인해주세요.'
      );
    },
  });
};

export const useSignup2 = () => {
  return useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('accessToken'); // signup1 완료 후 저장된 토큰
      return axios.post('https://spacefarm.shop/api/auth/signup2', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 토큰 필요 시
        },
      });
    },
  });
};

// 로그인
export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      const token = res?.accessToken;
      if (token) {
        localStorage.setItem('accessToken', token);
        alert('로그인 성공!');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      alert(error.response?.data?.message || '로그인 실패!');
    },
  });
};
