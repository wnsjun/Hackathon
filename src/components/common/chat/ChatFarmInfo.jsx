import { useState, useEffect } from 'react';
import { getChatRoomFarm } from '../../../apis/chatApi';
import { useNavigate } from 'react-router-dom';

const ChatFarmInfo = ({ chatRoomId }) => {
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarmInfo = async () => {
      if (!chatRoomId) return;
      
      try {
        setLoading(true);
        const data = await getChatRoomFarm(chatRoomId);
        console.log('텃밭 정보 조회 결과:', data);
        // farm 객체가 중첩되어 있으므로 farm 필드를 사용
        setFarmData(data.farm || data);
      } catch (error) {
        console.error('텃밭 정보 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmInfo();
  }, [chatRoomId]);

  const handleFarmClick = () => {
    if (farmData?.id) {
      navigate(`/plant/${farmData.id}`);
    }
  };

  console.log('ChatFarmInfo 렌더링:', { chatRoomId, farmData, loading });

  if (loading) {
    return (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">텃밭 정보 로딩 중...</p>
      </div>
    );
  }

  if (!farmData) {
    console.log('farmData가 없어서 null 반환');
    return null;
  }

  return (
    <div className="mt-4 mb-2 bg-[#f8f9fa] p-4 rounded-2xl">
      <div className="text-sm text-[#6c757d] mb-3">
        현재 대화를 나누고 있는 텃밭이에요.
      </div>
      
      <div 
        className="flex gap-3 cursor-pointer"
        onClick={handleFarmClick}
      >
        {/* 텃밭 이미지 */}
        <div className="relative shrink-0">
          <div 
            className="w-24 h-24 bg-cover bg-center bg-gray-200 rounded-xl"
            style={{ 
              backgroundImage: farmData.thumbnailUrl ? `url(${farmData.thumbnailUrl})` : 'none' 
            }}
          >
            {!farmData.thumbnailUrl && (
              <div className="w-full h-full flex items-center justify-center text-gray-400 rounded-xl">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
            )}
          </div>
          
          {/* 북마크 아이콘 */}
          <div className="absolute bottom-1 right-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path 
                d="M5 2V22L12 19L19 22V2H5Z" 
                fill="none"
                stroke="#1aa752"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* 텃밭 정보 */}
        <div className="flex-1 min-w-0">
          {/* 제목 */}
          <h3 className="font-semibold text-lg text-black leading-tight mb-1">
            {farmData.title}
          </h3>
          
          {/* 주소 */}
          <p className="text-sm text-[#6c757d] mb-2">
            {farmData.address}
          </p>

          {/* 가격 정보 */}
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-lg text-[#1aa752]">
              {farmData.price?.toLocaleString()}
            </span>
            <span className="text-sm text-[#1aa752] font-medium">원</span>
            <span className="text-sm text-[#6c757d]">/</span>
            <span className="text-sm text-[#6c757d] font-medium">
              {farmData.rentalPeriod}일
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFarmInfo;