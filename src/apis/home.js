import instance from './instance';

// 로그인 상태 확인 함수
const isLoggedIn = () => {
  return !!localStorage.getItem('accessToken');
};

// 매물 목록 조회
export const fetchAllFarms = async () => {
  try {
    const response = await instance.get('/farm/all');
    const data = response.data;
    
    // 로그인 상태에 따라 다른 데이터 반환
    if (isLoggedIn()) {
      return {
        farms: data.recommendedFarms || [],
        message: data.message
      };
    } else {
      return {
        farms: data.farms || [],
        message: data.message
      };
    }
  } catch (error) {
    console.error('매물 목록 조회 실패:', error);
    throw error;
  }
};
