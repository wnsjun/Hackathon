// 로그인 상태 확인 유틸리티 함수
export const isLoggedIn = () => {
  // 실제 프로젝트에서는 토큰, 세션 등을 확인
  // 현재는 localStorage의 accessToken 또는 userData 정보로 확인
  const accessToken = localStorage.getItem('accessToken');
  const userData = localStorage.getItem('userData');
  
  return !!(accessToken || userData);
};

// 로그인 필요 알림창 표시
export const showLoginAlert = () => {
  alert('로그인을 해주세요.');
};

// 로그인 체크 후 액션 실행 또는 알림 표시
export const checkLoginAndExecute = (action) => {
  if (isLoggedIn()) {
    action();
  } else {
    showLoginAlert();
  }
};