import axiosInstance from './axiosInstance';

export const fetchReviews = async (farmId, sortBy = 'createdAt_desc') => {
  try {
    const response = await axiosInstance.get(
      `/reviews/${farmId}?sortBy=${sortBy}`
    );
    return response.data;
  } catch (error) {
    console.error('리뷰 조회 실패:', error);
    throw error;
  }
};

export const fetchReviewsByFarmId = async (
  farmId,
  sortBy = 'createdAt_desc'
) => {
  try {
    const response = await axiosInstance.get(
      `/reviews/${farmId}?sortBy=${sortBy}`
    );
    return response.data;
  } catch (error) {
    console.error('텃밭 리뷰 조회 실패:', error);
    throw error;
  }
};

export const submitReviewByFarmId = async (farmId, content) => {
  try {
    const response = await axiosInstance.post(`/reviews/${farmId}`, {
      content,
    });
    return response.data; // 서버에서 생성된 리뷰 객체 반환
  } catch (error) {
    console.error('리뷰 제출 실패:', error);
    throw error;
  }
};
