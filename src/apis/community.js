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

export const createPost = async (postData, imageFiles) => {
  try {
    console.log('게시글 작성 시작:', postData);
    
    // FormData 생성
    const formData = new FormData();
    
    // DTO 객체 생성 (백엔드 요구사항에 맞게)
    const postDto = {
      title: postData.title,
      content: postData.content,
      category: postData.category
    };
    
    // application/json 타입을 명시하여 Blob으로 감싸야 함
    formData.append('dto', new Blob([JSON.stringify(postDto)], { type: 'application/json' }));
    
    // 이미지 파일들 추가
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });
    }
    
    console.log('전송 데이터:', JSON.stringify(postDto, null, 2));
    console.log('이미지 파일 개수:', imageFiles ? imageFiles.length : 0);
    
    // FormData 전송 (채팅 API와 동일한 헤더 설정)
    const response = await axiosInstance.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('게시글 작성 성공:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    console.error('응답 상태:', error.response?.status);
    console.error('응답 데이터:', error.response?.data);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const response = await axiosInstance.delete(`/comment/${commentId}`);
    console.log('댓글 삭제 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    console.error('응답 상태:', error.response?.status);
    console.error('응답 데이터:', error.response?.data);
    throw error;
  }
};
