import instance from './instance';

// 매물 목록 조회
export const fetchAllFarms = async () => {
  try {
    const response = await instance.get('/farm');
    return response.data;
  } catch (error) {
    console.error('매물 목록 조회 실패:', error);
    throw error;
  }
};
