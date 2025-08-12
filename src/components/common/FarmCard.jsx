import { useNavigate } from 'react-router-dom';

const imgRectangle11 = "http://localhost:3845/assets/37f705c3a9bf70acf2b57b5052914cbdd64cd4ba.png";
const imgVector = "http://localhost:3845/assets/a85e6e3c83b334db97a694b1d6d328be4f30afc4.svg";
const img = "http://localhost:3845/assets/2b8d64d7226c28c99184010bc380a1d664774ae0.svg";

// Location icon component
const LocationIcon = () => {
  return (
    <div className="relative size-4" data-name="grommet-icons:location">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-3.75%_-4.69%_-4.69%_-4.69%]">
          <img alt="" className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>
    </div>
  );
};

// Arrow icon component
const ArrowIcon = () => {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="flex-none rotate-[180deg]">
        <div className="relative size-4">
          <div className="absolute inset-[12.19%_56.25%_12.19%_3.13%]">
            <div className="absolute inset-[-6.2%_-11.54%_-6.2%_-16.94%]">
              <img alt="" className="block max-w-none size-full" src={img} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FarmCard = ({ farm }) => {
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
        className="bg-center bg-cover bg-no-repeat h-[284px] rounded-tl-[16px] rounded-tr-[16px] w-full"
        style={{ backgroundImage: `url('${imgRectangle11}')` }}
      />

      {/* 카드 내용 */}
      <div className="flex flex-col gap-6 pb-6 pt-4 px-6 w-full">
        <div className="flex flex-col gap-2 w-full">
          {/* 제목과 면적 */}
          <div className="flex items-start justify-between w-full">
            <div className="font-semibold text-2xl text-black tracking-[-0.48px] leading-[1.5]">
              {farm.title }
            </div>
            <div className="font-normal text-sm text-[#777777] tracking-[-0.42px] leading-[1.5] text-right w-8 h-[25px] flex items-center justify-center">
              {farm.area }㎡
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
                {farm.period}
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