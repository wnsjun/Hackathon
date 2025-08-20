import axiosInstance from './axiosInstance';

// 로컬 스토리지에서 좋아요 상태 관리
const getLocalLikes = () => {
  try {
    const likes = localStorage.getItem('postLikes');
    return likes ? JSON.parse(likes) : [];
  } catch {
    return [];
  }
};

const saveLocalLikes = (likes) => {
  localStorage.setItem('postLikes', JSON.stringify(likes));
};

export const toggleLike = async (postId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }
    
    // 서버 API 호출 시도
    try {
      const response = await axiosInstance.post(`/like/${postId}`);
      return response.data;
    } catch (serverError) {
      console.warn('서버 좋아요 API 사용 불가, 로컬 저장소로 대체:', serverError.response?.status);
      
      // 서버 오류 시 로컬 스토리지로 대체
      const likes = getLocalLikes();
      const postIdStr = String(postId);
      
      if (!likes.includes(postIdStr)) {
        likes.push(postIdStr);
        saveLocalLikes(likes);
      }
      
      return { success: true, isLiked: true, source: 'local' };
    }
    
  } catch (error) {
    console.error('좋아요 API 에러:', error);
    
    if (error.message === '로그인이 필요합니다.') {
      throw error;
    }
    
    throw new Error('좋아요 처리 중 오류가 발생했습니다.');
  }
};

export const removeLike = async (postId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }
    
    // 서버 API 호출 시도
    try {
      const response = await axiosInstance.delete(`/like/${postId}`);
      return response.data;
    } catch (serverError) {
      console.warn('서버 좋아요 삭제 API 사용 불가, 로컬 저장소로 대체:', serverError.response?.status);
      
      // 서버 오류 시 로컬 스토리지로 대체
      const likes = getLocalLikes();
      const postIdStr = String(postId);
      const updatedLikes = likes.filter(id => id !== postIdStr);
      saveLocalLikes(updatedLikes);
      
      return { success: true, isLiked: false, source: 'local' };
    }
    
  } catch (error) {
    console.error('좋아요 삭제 API 에러:', error);
    
    if (error.message === '로그인이 필요합니다.') {
      throw error;
    }
    
    throw new Error('좋아요 삭제 중 오류가 발생했습니다.');
  }
};

// 로컬 스토리지에서 특정 게시물의 좋아요 상태 확인
export const isPostLiked = (postId) => {
  const likes = getLocalLikes();
  return likes.includes(String(postId));
};