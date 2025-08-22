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
import { signup1Api, signup2Api, loginApi, logoutApi } from '../apis/authApi';
import { emitLogoutEvent } from '../utils/storageEvents';

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
    mutationFn: (payload) => signup2Api(payload),
    onSuccess: (res) => {
      alert('회원가입 2단계 완료!');
    },
    onError: (error) => {
      console.error('Signup2 error:', error);
      alert(
        error.response?.data?.message ||
          '회원가입 2단계 실패! 입력값을 확인해주세요.'
      );
    },
  });
};

// 로그인 상태 확인
export const useAuth = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('postLikes');
    localStorage.removeItem('farmBookmarks');
  };

  // userData에서 money 값을 coinBalance로 사용
  const getCoinBalance = () => {
    if (!isLoggedIn) return 0;
    
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const userInfo = JSON.parse(userData);
        return userInfo.money || 0;
      }
    } catch (error) {
      console.error('Error parsing userData:', error);
    }
    
    return 0;
  };

  const coinBalance = getCoinBalance();

  return { isLoggedIn, logout, coinBalance };
};

// 로그아웃
export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('postLikes');
      localStorage.removeItem('farmBookmarks');
      emitLogoutEvent();
      alert('로그아웃되었습니다.');
    },
    onError: (error) => {
      console.error('Logout error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('postLikes');
      localStorage.removeItem('farmBookmarks');
      emitLogoutEvent();
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
        // 전체 사용자 데이터를 userData로 저장
        localStorage.setItem('userData', JSON.stringify(res));
        alert('로그인 성공!');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      alert(error.response?.data?.message || '로그인 실패!');
    },
  });
};
