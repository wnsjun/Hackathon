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

// hooks/useAuth.js

import { useMutation } from '@tanstack/react-query';
import { loginApi, signup2Api } from '../apis/authApi';

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      alert('로그인 성공!');
    },
    onError: (error) => {
      console.error(error);
      alert('로그인 실패! 이메일과 비밀번호를 확인하세요.');
    },
  });
};

export const useSignup2 = () => {
  return useMutation({
    mutationFn: signup2Api,
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
    },
    onError: (error) => {
      console.error(error);
      alert(error.response?.data?.message || '회원가입에 실패했습니다.');
    },
  });
};
