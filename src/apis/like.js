import axiosInstance from './axiosInstance';

export const toggleLike = async (postId) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  
  const response = await axiosInstance.post(`/like/${postId}`);
  return response.data;
};

export const removeLike = async (postId) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  
  const response = await axiosInstance.delete(`/like/${postId}`);
  return response.data;
};