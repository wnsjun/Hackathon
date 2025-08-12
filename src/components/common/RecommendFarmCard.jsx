import { useNavigate } from 'react-router-dom';
import plant from '../../assets/plant.png';

// Location icon component
const LocationIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
      <path
        d="M8 0C5.243 0 3 2.243 3 5c0 4.25 5 11 5 11s5-6.75 5-11c0-2.757-2.243-5-5-5zm0 7.5c-1.381 0-2.5-1.119-2.5-2.5S6.619 2.5 8 2.5s2.5 1.119 2.5 2.5S9.381 7.5 8 7.5z"
        fill="currentColor"
      />
    </svg>
  );
};

// Arrow icon component
const ArrowIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0 rotate-180">
      <path
        d="M9.707 3.293L8.293 1.879L2.172 8l6.121 6.121L9.707 12.707L5.414 8.414H14V6.586H5.414l4.293-4.293z"
        fill="currentColor"
      />
    </svg>
  );
};

const RecommendFarmCard = ({ farm, isRecommended }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/plant/${farm.id}`, { state: { farm } });
  };

  const handleDetailClick = (e) => {
    e.stopPropagation();
    navigate(`/plant/${farm.id}`, { state: { farm } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] overflow-hidden"
    >
      {/* 이미지 섹션 */}
      <div 
        className="w-full h-[284px] bg-cover bg-center rounded-t-2xl"
        style={{ backgroundImage: `url(${plant})` }}
      />

      {/* 카드 내용 */}
      <div className="px-6 pt-4 pb-6">
        {/* 상단 섹션 */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* 지역 정보 */}
            <div className="flex items-start text-base tracking-[-0.48px]">
              <span className="font-semibold text-[#1aa752]">{farm.district}</span>
              <span className="font-normal text-black">에 있어요</span>
            </div>

            {/* 제목과 면적 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-2xl text-black tracking-[-0.48px] leading-[1.5]">
                  {farm.title}
                </h3>
                <span className="font-normal text-sm text-[#777777] tracking-[-0.42px] leading-[1.5]">
                  {farm.area}㎡
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
                  {farm.period }
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