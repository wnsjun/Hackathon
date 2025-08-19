import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import plant from '../../../assets/plant.png?url';
import { checkLoginAndExecute } from '../../../utils/auth';

// Location icon component
const LocationIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8.00033 14.6663C8.00033 14.6663 2.66699 10.6663 2.66699 6.66634C2.66699 3.33301 5.33366 1.33301 8.00033 1.33301C10.667 1.33301 13.3337 3.33301 13.3337 6.66634C13.3337 10.6663 8.00033 14.6663 8.00033 14.6663ZM8.00033 8.66634C8.53076 8.66634 9.03947 8.45563 9.41454 8.08056C9.78961 7.70548 10.0003 7.19677 10.0003 6.66634C10.0003 6.13591 9.78961 5.6272 9.41454 5.25213C9.03947 4.87705 8.53076 4.66634 8.00033 4.66634C7.46989 4.66634 6.96118 4.87705 6.58611 5.25213C6.21104 5.6272 6.00033 6.13591 6.00033 6.66634C6.00033 7.19677 6.21104 7.70548 6.58611 8.08056C6.96118 8.45563 7.46989 8.66634 8.00033 8.66634Z" stroke="#777777" strokeWidth="1.5"/>
    </svg>
  );
};

// Arrow icon component
const ArrowIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
      <path d="M9 14.0498L15.5 8.00051L9 1.95121" stroke="#777777" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

// Bookmark icon component
const BookmarkIcon = ({ isBookmarked, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="p-1 rounded-full hover:bg-black/10 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path 
          d="M5 2V22L12 19L19 22V2H5Z" 
          fill={isBookmarked ? "#1aa752" : "none"}
          stroke="#1aa752"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
};

const RecommendFarmCard = ({ farm}) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(farm.isBookmarked || false);
  
  // 지역 정보 로직
  const getLocationInfo = () => {
    const userData = localStorage.getItem('userData');
    if (!userData) return { text: farm.district || '', suffix: '' };
    
    const { preferredThemes = [], preferredDong = '' } = JSON.parse(userData);
    
    const hasPreferredTheme = preferredThemes.includes(farm.theme);
    const hasPreferredDong = farm.address && farm.address.includes(preferredDong);
    
    if (hasPreferredTheme && hasPreferredDong) {
      return { 
        text: `${preferredThemes.find(theme => theme === farm.theme)} · ${preferredDong}`, 
        suffix: '에 해당해요' 
      };
    }
    
    if (hasPreferredTheme) {
      return { 
        text: preferredThemes.find(theme => theme === farm.theme), 
        suffix: ' 테마예요' 
      };
    }
    
    if (hasPreferredDong) {
      return { 
        text: preferredDong, 
        suffix: '에 있어요' 
      };
    }
    
    return { text: farm.district || '', suffix: '에 있어요' };
  };
  
  const locationInfo = getLocationInfo();

  const handleCardClick = () => {
    navigate(`/plant/${farm.id}`, { state: { farm } });
  };

  const handleDetailClick = (e) => {
    e.stopPropagation();
    navigate(`/plant/${farm.id}`, { state: { farm } });
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    checkLoginAndExecute(() => {
      setIsBookmarked(!isBookmarked);
      // 여기에 실제 북마크 API 호출 로직 추가
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] overflow-hidden"
    >
      {/* 이미지 섹션 */}
      <div className="relative">
        <div 
          className="w-full h-[284px] bg-cover bg-center rounded-t-2xl"
          style={{ backgroundImage: `url(${plant})` }}
        />
        {/* 북마크 아이콘 - 사진 오른쪽 아래 */}
        <div className="absolute bottom-3 right-3">
          <BookmarkIcon isBookmarked={isBookmarked} onClick={handleBookmarkClick} />
        </div>
      </div>

      {/* 카드 내용 */}
      <div className="px-6 pt-4 pb-6">
        {/* 상단 섹션 */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* 지역 정보 */}
            <div className="flex items-start text-base tracking-[-0.48px]">
              <span className="font-semibold text-[#1aa752]">{locationInfo.text}</span>
              <span className="font-normal text-black">{locationInfo.suffix}</span>
            </div>

            {/* 제목과 면적 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-2xl text-black tracking-[-0.48px] leading-[1.5]">
                  {farm.title}
                </h3>
                <span className="font-normal text-sm text-[#777777] tracking-[-0.42px] leading-[1.5]">
                  {farm.size || '-'}㎡
                </span>
              </div>

              {/* 주소 */}
              <div className="flex items-center gap-2">
                <LocationIcon />
                <span className="font-normal text-base text-black tracking-[-0.48px] leading-[1.5]">
                  {farm.address}
                </span>
              </div>
            </div>
          </div>

          {/* 하단 가격 및 버튼 섹션 */}
          <div className="flex justify-between items-end">
            {/* 가격 정보 */}
            <div className="flex items-end gap-2">
              <div className="flex items-end gap-1">
                <span className="font-semibold text-2xl text-[#1aa752] tracking-[-0.48px] leading-[1.5]">
                  {farm.price?.toLocaleString()}
                </span>
                <span className="font-normal text-xl text-black tracking-[-0.6px] leading-[1.5]">원</span>
              </div>
              <span className="font-normal text-xl text-black tracking-[-0.6px] leading-[1.5]">/</span>
              <div className="flex items-center gap-1 h-8">
                <span className="font-semibold text-xl text-black tracking-[-0.6px] leading-[1.5]">
                  {farm.rentalPeriod}
                </span>
                <span className="font-normal text-xl text-black tracking-[-0.6px] leading-[1.5]">일</span>
              </div>
            </div>

            {/* 자세히 보기 버튼 */}
            <button
              onClick={handleDetailClick}
              className="flex items-center gap-1 text-base text-[#777777] tracking-[-0.48px] leading-[1.5]"
            >
              <span>자세히 보기</span>
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendFarmCard;