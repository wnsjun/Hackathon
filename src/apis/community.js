import axiosInstance from './axiosInstance';

export const fetchFeedPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts/feed');
    return response.data;
  } catch (error) {
    console.error('인증피드 게시글 조회 실패:', error);
    return [];
  }
};

export const fetchTipPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts/tip');
    return response.data;
  } catch (error) {
    console.error('재배팁 게시글 조회 실패:', error);
    return [];
  }
};

export const fetchPostDetail = async (postId) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
    throw error;
  }
};
