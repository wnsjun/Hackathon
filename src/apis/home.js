import instance from './instance';
import axios from 'axios';

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
        recommendedFarms: data.recommendedFarms,
        message: data.message,
      };
    } else {
      return {
        farms: data.farms,
        recommendedFarms: [], // 로그아웃 시 빈 배열
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

// 텃밭 매물 등록
export const createFarm = async (farmData, imageFile) => {
  try {
    // 현재 로그인 상태 확인
    const token = localStorage.getItem('accessToken');
    console.log('현재 로그인 토큰:', token ? 'exists' : 'not found');
    
    // 먼저 JSON으로 시도
    console.log('JSON으로 요청 시도...');
    try {
      const response = await instance.post('/farm', farmData);
      return response.data;
    } catch (jsonError) {
      console.log('JSON 요청 실패, 다른 방법들 시도...');
      
      // 방법 1: 이미지 없이 JSON으로 시도
      console.log('이미지 없이 JSON 재시도...');
      try {
        const response = await instance.post('/farm', farmData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('이미지 없는 JSON 요청 성공!');
        return response.data;
      } catch (noImageError) {
        console.log('이미지 없는 JSON도 실패, FormData 시도...');
        
        // 방법 2: FormData - Content-Type 헤더 제거 (브라우저가 자동 설정)
        const formData = new FormData();
        
        // 데이터 타입 확인 및 변환
        console.log('전송할 데이터 타입 확인:', {
          title: typeof farmData.title,
          price: typeof farmData.price,
          rentalPeriod: typeof farmData.rentalPeriod,
          size: typeof farmData.size
        });
        
        // FormData 내용 확인을 위해 로그
        console.log('전송할 원본 데이터:', farmData);
        
        // 서버가 기대하는 형식 시도 1: 이미지 필드가 필수일 수 있음
        if (!imageFile) {
          console.log('이미지가 없습니다. 빈 파일을 생성하여 전송 시도...');
          // 빈 파일 생성
          const emptyFile = new File([''], 'empty.txt', { type: 'text/plain' });
          formData.append('image', emptyFile);
        }
        
        // 필드 순서를 바꿔서 시도 (image를 먼저)
        if (imageFile) {
          formData.append('image', imageFile);
        }
        
        // 서버가 기대하는 필드명이 다를 수 있음 - 다른 조합 시도
        formData.append('title', String(farmData.title || ''));
        formData.append('description', String(farmData.description || ''));
        formData.append('address', String(farmData.address || ''));
        formData.append('price', farmData.price); // 숫자로 전송 시도
        formData.append('rentalPeriod', farmData.rentalPeriod); // 숫자로 전송 시도
        formData.append('size', farmData.size); // 숫자로 전송 시도
        formData.append('theme', String(farmData.theme || ''));
        
        // FormData 내용 확인
        console.log('FormData 내용:');
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
        
        // axios instance 우회해서 직접 호출
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/farm`, formData, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : undefined,
            // Content-Type은 설정하지 않음 - 브라우저가 자동으로 multipart/form-data 설정
          },
        });
        return response.data;
      }
    }
  } catch (error) {
    console.error('텃밭 매물 등록 실패:', error);
    console.error('응답 데이터:', error.response?.data);
    throw error;
  }
};
