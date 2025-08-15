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
    const res = await axiosInstance.get(`/chat/message/${chatRoomId}`, {
      params: { page, size },
    });
    return res.data;
  } catch (err) {
    console.error('메시지 로드 실패:', err);
    throw err;
  }
};

// 읽음 처리
export const markRead = async ({ chatRoomId, userId }) => {
  if (!chatRoomId) return;
  try {
    await axiosInstance.post(`/chat/room/${chatRoomId}/read`, { userId });
  } catch (err) {
    console.error('읽음 처리 실패:', err);
  }
};

// 이미지 업로드
export const uploadImages = async ({ chatRoomId, files }) => {
  if (!chatRoomId || !files.length) return;
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  try {
    await axiosInstance.post(`/chat/message/${chatRoomId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (err) {
    console.error('이미지 업로드 실패:', err);
    throw err;
  }
};
