import { useState, useRef, useEffect } from 'react';

const imgSliderHandle = "/assets/168b1d22bac2278116703d0c440fa50a541b3d4d.svg";

const PriceFilter = ({ isOpen, onClose, onApplyFilter }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (sliderRef.current && !sliderRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleMouseDown = (type) => {
    setIsDragging(type);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const value = Math.round((percent / 100) * 1000000);

    if (isDragging === 'min') {
      setMinPrice(Math.min(value, maxPrice - 1000));
    } else if (isDragging === 'max') {
      setMaxPrice(Math.max(value, minPrice + 1000));
    }
  };

  const handleApplyFilter = () => {
    onApplyFilter({ minPrice, maxPrice });
    onClose();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, minPrice, maxPrice]);

  const minPercent = (minPrice / 1000000) * 100;
  const maxPercent = (maxPrice / 1000000) * 100;

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div
        ref={sliderRef}
        className="bg-white box-border flex flex-col gap-2 items-start justify-center pb-5 pt-4 px-6 rounded-lg relative"
        style={{ 
          width: '310px',
          boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.1)',
          border: '1px solid #e5e5e5'
        }}
      >
        
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px]">
            <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
              가격
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="[grid-area:1_/_1] bg-[#f7f7f7] h-2 ml-0 mt-4 rounded-[1000px] w-[258px]" />
          
          <div 
            className="[grid-area:1_/_1] bg-[#1aa752] h-2 mt-4 rounded-[1000px]"
            style={{
              marginLeft: `${minPercent * 2.58}px`,
              width: `${(maxPercent - minPercent) * 2.58}px`
            }}
          />
          
          <div
            className="[grid-area:1_/_1] mt-0 relative size-10 cursor-pointer"
            style={{ marginLeft: `${minPercent * 2.58 - 20}px` }}
            onMouseDown={() => handleMouseDown('min')}
          >
            <div className="absolute inset-[-20%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgSliderHandle}
              />
            </div>
          </div>
          
          <div
            className="[grid-area:1_/_1] mt-0 relative size-10 cursor-pointer"
            style={{ marginLeft: `${maxPercent * 2.58 - 20}px` }}
            onMouseDown={() => handleMouseDown('max')}
          >
            <div className="absolute inset-[-20%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgSliderHandle}
              />
            </div>
          </div>
        </div>

        <div className="box-border flex flex-row gap-1 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px]">
          <div className="box-border flex flex-row font-['Pretendard:SemiBold',_sans-serif] gap-1 items-center justify-start p-0 relative shrink-0">
            <div className="flex flex-col justify-center relative shrink-0">
              <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                {minPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0">
              <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                ~
              </p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0">
              <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                {maxPrice.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center relative shrink-0">
            <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
              원 / 일
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full gap-2 mt-2">
          <button
            onClick={() => {
              setMinPrice(0);
              setMaxPrice(1000000);
            }}
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={handleApplyFilter}
            className="flex-1 px-3 py-1.5 bg-[#1AA752] text-white rounded text-xs hover:bg-green-600 transition-colors"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;