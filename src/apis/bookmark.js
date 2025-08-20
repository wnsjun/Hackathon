import axiosInstance from './axiosInstance';

export const toggleBookmark = async (farmId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }
    
    const response = await axiosInstance.post(`/farm/${farmId}/bookmark`);
    return response.data;
  } catch (error) {
    console.error('북마크 API 에러:', error);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    if (error.response?.status === 401) {
      throw new Error('로그인이 필요합니다.');
    }
    
    if (error.response?.status === 500) {
      throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    
    throw new Error(error.response?.data?.error || error.response?.data?.message || '북마크 처리 중 오류가 발생했습니다.');
  }
};

export const removeBookmark = async (farmId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }
    
    const response = await axiosInstance.delete(`/farm/${farmId}/bookmark`);
    return response.data;
  } catch (error) {
    console.error('북마크 삭제 API 에러:', error);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    if (error.response?.status === 401) {
      throw new Error('로그인이 필요합니다.');
    }
    
    if (error.response?.status === 500) {
      throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    
    throw new Error(error.response?.data?.error || error.response?.data?.message || '북마크 삭제 중 오류가 발생했습니다.');
  }
};