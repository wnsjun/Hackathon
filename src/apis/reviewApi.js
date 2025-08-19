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
