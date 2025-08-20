// 로컬 스토리지 변경 감지를 위한 이벤트 시스템

// 커스텀 이벤트 발생시키기
export const emitStorageEvent = (type, data) => {
  const event = new CustomEvent('localStorageChange', {
    detail: { type, data }
  });
  window.dispatchEvent(event);
};

// 북마크 상태 변경 이벤트
export const emitBookmarkChange = (farmId, isBookmarked) => {
  emitStorageEvent('bookmark', { farmId, isBookmarked });
};

// 좋아요 상태 변경 이벤트
export const emitLikeChange = (postId, isLiked) => {
  emitStorageEvent('like', { postId, isLiked });
};

// 로그아웃 이벤트
export const emitLogoutEvent = () => {
  emitStorageEvent('logout', {});
};

// 이벤트 리스너 등록
export const useStorageListener = (callback) => {
  const handleStorageChange = (event) => {
    callback(event.detail);
  };

  window.addEventListener('localStorageChange', handleStorageChange);
  
  // cleanup 함수 반환
  return () => {
    window.removeEventListener('localStorageChange', handleStorageChange);
  };
};