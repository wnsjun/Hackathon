import { useState, useRef, useEffect } from 'react';
import CheckSquareContained from './CheckSquareContained';

const LocationFilter = ({ isOpen, onClose, selectedLocations = [], onLocationToggle }) => {
  const filterRef = useRef(null);
  
  // 마포구 동 리스트 (Figma 디자인에 맞춰 조정)
  const locations = [
    ['공덕동', '도화동', '동교동'],
    ['망원동', '상수동', '상암동'], 
    ['서교동', '성산동', '아현동'],
    ['연남동', '창전동', '합정동']
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleLocationClick = (location) => {
    if (onLocationToggle) {
      onLocationToggle(location);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div
        ref={filterRef}
        className="bg-[#ffffff] box-border content-stretch flex flex-col gap-4 items-start justify-center pb-5 pt-4 px-6 relative rounded-2xl"
        style={{ 
          width: '400px',
          boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.1)',
          border: '1px solid #bbbbbb'
        }}
      >
        <div className="flex justify-between items-center w-full">
          <div
            className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[20px] text-left text-nowrap tracking-[-0.6px]"
          >
            <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
              위치
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
        <div
          className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0"
        >
        {locations.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0"
          >
            {column.map((location) => (
              <div
                key={location}
                className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0"
              >
                <div
                  className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px]"
                >
                  <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
                    {location}
                  </p>
                </div>
                <button
                  onClick={() => handleLocationClick(location)}
                  className="relative shrink-0 size-6"
                  data-name="check-square-contained"
                >
                  <CheckSquareContained check={selectedLocations.includes(location) ? "on" : "off"} />
                </button>
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;