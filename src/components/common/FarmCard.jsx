import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const imgRectangle11 = "/assets/37f705c3a9bf70acf2b57b5052914cbdd64cd4ba.png";

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

const FarmCard = ({ farm }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(farm.isBookmarked || false);

  const handleCardClick = () => {
    navigate(`/plant/${farm.id}`, { state: { farm } });
  };

  const handleDetailClick = (e) => {
    e.stopPropagation();
    navigate(`/plant/${farm.id}`, { state: { farm } });
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const placeholder = imgRectangle11;

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] overflow-hidden"
    >

      {/* 이미지 섹션 */}
      <div className="relative">
        <div
          className="bg-center bg-cover bg-no-repeat h-[284px] rounded-tl-[16px] rounded-tr-[16px] w-full"
          style={{ backgroundImage: `url('${farm.thumbnailUrl || placeholder }')` }}
        />
        {/* 북마크 아이콘 - 사진 오른쪽 아래 */}
        <div className="absolute bottom-3 right-3">
          <BookmarkIcon isBookmarked={isBookmarked} onClick={handleBookmarkClick} />
        </div>
      </div>

      {/* 카드 내용 */}
      <div className="flex flex-col gap-6 pb-6 pt-4 px-6 w-full">
        <div className="flex flex-col gap-2 w-full">
          {/* 제목과 면적 */}
          <div className="flex items-start justify-between w-full">
            <div className="font-semibold text-2xl text-black tracking-[-0.48px] leading-[1.5]">
              {farm.title }
            </div>
            <div className="font-normal text-sm text-[#777777] tracking-[-0.42px] leading-[1.5] text-right w-8 h-[25px] flex items-center justify-center">
              {farm.size || '-'}㎡
            </div>
          </div>

          {/* 주소 */}
          <div className="flex items-center gap-2">
            <LocationIcon />
            <div className="font-normal text-base text-black tracking-[-0.48px] leading-[1.5]">
              {farm.address}
            </div>
          </div>
        </div>

        {/* 하단 가격 및 버튼 섹션 */}
        <div className="flex items-end justify-between w-full">
          {/* 가격 정보 */}
          <div className="flex items-end gap-2">
            <div className="flex items-end gap-1">
              <div className="font-semibold text-2xl text-[#1aa752] tracking-[-0.48px] leading-[1.5]">
                {farm.price?.toLocaleString()}
              </div>
              <div className="font-normal text-xl text-black tracking-[-0.6px] leading-[1.5] h-8 flex items-center w-[18px]">
                원
              </div>
            </div>
            <div className="font-normal text-xl text-black tracking-[-0.6px] leading-[1.5] h-[33px] flex items-center w-[7px]">
              /
            </div>
            <div className="flex items-center gap-1 h-8 text-xl text-black tracking-[-0.6px] leading-[1.5]">
              <div className="font-semibold">
                {farm.rentalPeriod}
              </div>
              <div className="font-normal">
                일
              </div>
            </div>
          </div>

          {/* 자세히 보기 버튼 */}
          <button
            onClick={handleDetailClick}
            className="flex items-center gap-0 font-normal text-base text-[#777777] tracking-[-0.48px] leading-[1.5]"
          >
            자세히 보기
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmCard;