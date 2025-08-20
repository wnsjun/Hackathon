import instance from './instance';
import axiosInstance from './axiosInstance';
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
    console.log('텃밭 매물 등록 시작:', farmData);
    
    // API 명세에 정확히 맞는 JSON 데이터 (이미지는 일단 제외하고 테스트)
    const requestData = {
      title: farmData.title,
      description: farmData.description,
      address: farmData.address,
      price: parseInt(farmData.price),
      rentalPeriod: parseInt(farmData.rentalPeriod),
      size: parseInt(farmData.size),
      theme: farmData.theme
    };
    
    console.log('전송할 JSON:', JSON.stringify(requestData, null, 2));
    
    const token = localStorage.getItem('accessToken');
    console.log('토큰 있음:', !!token);
    
    // 다른 성공하는 API들과 같은 axiosInstance 사용
    const response = await axiosInstance.post('/farm', requestData);
    
    console.log('텃밭 등록 성공:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('텃밭 매물 등록 실패:', error);
    console.error('응답 상태:', error.response?.status);
    console.error('응답 데이터:', error.response?.data);
    throw error;
  }
};
