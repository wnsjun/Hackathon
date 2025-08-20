import axiosInstance from './axiosInstance';

export const fetchFeedPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts/feed');
    // 서버 응답에 isLiked 정보가 포함되어 있어야 함
    return response.data;
  } catch (error) {
    console.error('인증피드 게시글 조회 실패:', error);
    return [];
  }
};

export const fetchTipPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts/tip');
    // 서버 응답에 isLiked 정보가 포함되어 있어야 함
    return response.data;
  } catch (error) {
    console.error('재배팁 게시글 조회 실패:', error);
    return [];
  }
};

export const fetchPostDetail = async (postId) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
    // 서버 응답에 isLiked 정보가 포함되어 있어야 함
    return response.data;
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
    throw error;
  }
};

export const fetchComments = async (postId, sortOrder = 'asc') => {
  try {
    // sortOrder가 'desc' 또는 'new'면 최신순, 그 외는 등록순
    const endpoint = sortOrder === 'desc' || sortOrder === 'new' 
      ? `/comment/${postId}/new` 
      : `/comment/${postId}`;
    
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('댓글 조회 실패:', error);
    throw error;
  }
};

export const createComment = async (postId, content) => {
  try {
    const response = await axiosInstance.post(`/comment/${postId}`, {
      content
    });
    return response.data;
  } catch (error) {
    console.error('댓글 작성 실패:', error);
    throw error;
  }
};
