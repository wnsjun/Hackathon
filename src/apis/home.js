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
    console.log(isLoggedIn());
    // 로그인 상태에 따라 다른 데이터 반환
    if (isLoggedIn()) {
      return {
        farms: data.farms,
        message: data.message,
      };
    } else {
      return {
        farms: data.recommendedFarms,
        message: data.message,
      };
    }
  } catch (error) {
    console.error('매물 목록 조회 실패:', error);
    throw error;
  }
};

// 개별 텃밭 상세 정보 조회
export const fetchFarmById = async (id) => {
  try {
    const response = await instance.get(`/farm/${id}`);
    return response.data;
  } catch (error) {
    console.error('텃밭 상세 정보 조회 실패:', error);

    // 서버 오류 시 임시 데이터 반환
    if (error.response && error.response.status === 500) {
      return {
        id: parseInt(id),
        title: '마포구 창전동',
        address: '마포구 창전동',
        size: 16,
        price: 5000,
        rentalPeriod: 6,
        theme: '옥상',
        description: '시원하고 넓직한 옥상입니다.',
        imageUrls: [
          'https://example.com/detail_farm_image1.jpg',
          'https://example.com/detail_farm_image2.jpg',
        ],
        user: {
          id: 'user_123',
          nickname: '윤성님',
        },
        isBookmarked: false,
        createdAt: '2024-07-01T10:00:00Z',
      };
    }

    throw error;
  }
};
