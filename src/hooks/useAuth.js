import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../apis/authApi';

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 토큰 저장
      localStorage.setItem('accessToken', data.accessToken);
      alert('로그인 성공!');
    },
    onError: (error) => {
      console.error(error);
      alert('로그인 실패! 이메일과 비밀번호를 확인하세요.');
    },
  });
};
