import { useState, useRef, useEffect } from 'react';

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

    // 약간의 지연을 두어 클릭 이벤트와 충돌 방지
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      const newMinPrice = Math.min(value, maxPrice - 1000);
      setMinPrice(newMinPrice);
      onApplyFilter({ minPrice: newMinPrice, maxPrice });
    } else if (isDragging === 'max') {
      const newMaxPrice = Math.max(value, minPrice + 1000);
      setMaxPrice(newMaxPrice);
      onApplyFilter({ minPrice, maxPrice: newMaxPrice });
    }
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
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
              <g filter="url(#filter0_d_218_2061)">
              <circle cx="28" cy="28" r="20" fill="white"/>
              </g>
              <circle cx="28" cy="28" r="8" fill="#1AA752"/>
              <defs>
              <filter id="filter0_d_218_2061" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_218_2061"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_218_2061" result="shape"/>
              </filter>
              </defs>
            </svg>
            </div>
          </div>
          
          <div
            className="[grid-area:1_/_1] mt-0 relative size-10 cursor-pointer"
            style={{ marginLeft: `${maxPercent * 2.58 - 20}px` }}
            onMouseDown={() => handleMouseDown('max')}
          >
            <div className="absolute inset-[-20%]">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
              <g filter="url(#filter0_d_218_2061)">
              <circle cx="28" cy="28" r="20" fill="white"/>
              </g>
              <circle cx="28" cy="28" r="8" fill="#1AA752"/>
              <defs>
              <filter id="filter0_d_218_2061" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_218_2061"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_218_2061" result="shape"/>
              </filter>
              </defs>
            </svg>
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

      </div>
    </div>
  );
};

export default PriceFilter;