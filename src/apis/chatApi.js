import axiosInstance from './axiosInstance';

// 채팅방 목록 조회
export const getChatRooms = async () => {
  try {
    const res = await axiosInstance.get('/chat/room/list');
    return res.data;
  } catch (err) {
    console.error('채팅방 목록 로드 실패:', err);
    throw err;
  }
};

// 메시지 조회
export const getMessages = async ({ chatRoomId, page = 0, size = 30 }) => {
  try {
    const res = await axiosInstance.get(`/chat/room/${chatRoomId}`, {
      params: { page, size },
    });
    return res.data;
  } catch (err) {
    console.error('메시지 로드 실패:', err);
    throw err;
  }
};

// 메시지 읽음 처리
export const markAsRead = async (chatRoomId) => {
  try {
    const res = await axiosInstance.patch(`/chat/room/${chatRoomId}/read`);
    console.log('읽음 처리 성공:', res.data);
    return res.data;
  } catch (err) {
    if (err.code === 'ERR_NETWORK' && err.message === 'Network Error') {
      console.warn('읽음 처리 CORS 에러 (무시됨):', err.message);
    } else {
      console.error('읽음 처리 실패:', err);
    }
  }
};

// 이미지 업로드
export const uploadImages = async ({ chatRoomId, files }) => {
  if (!chatRoomId || !files.length) return;
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  try {
    const res = await axiosInstance.post(
      `/chat/room/${chatRoomId}/images`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return res.data;
  } catch (err) {
    console.error('이미지 업로드 실패:', err);
    throw err;
  }
};

// 채팅방 생성 또는 조회
export const createOrGetRoom = async ({ consumerId, providerId, farmId }) => {
  try {
    const res = await axiosInstance.post('/chat/room', {
      consumerId,
      providerId,
      farmId,
    });
    return res.data;
  } catch (err) {
    console.error('채팅방 생성/조회 실패:', err);
    throw err;
  }
};
