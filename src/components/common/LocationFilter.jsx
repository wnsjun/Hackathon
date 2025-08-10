import { useState, useEffect, useRef } from 'react';
import CheckSquareContained from './CheckSquareContained';

const LocationFilter = ({ isOpen, onClose, farms, onApplyFilter }) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const popupRef = useRef(null);

  // 농장 데이터에서 위치 정보를 추출 (구, 동 형태)
  const extractLocations = (farmData) => {
    const locations = farmData.map(farm => {
      const addressParts = farm.address.split(' ');
      // "서울 마포구 창전동" -> "마포구 창전동"
      if (addressParts.length >= 3) {
        const district = addressParts[1];
        const dong = addressParts[2];
        return `${district} ${dong}`;
      } else if (addressParts.length >= 2) {
        // 동 정보가 없는 경우 예시 동들을 생성
        const district = addressParts[1];
        const dongList = ['창전동', '서교동', '서강동', '합정동'];
        return dongList.map(dong => `${district} ${dong}`);
      }
      return [];
    });
    
    // 중복 제거 및 평탄화
    return [...new Set(locations.flat())].sort();
  };

  const locations = extractLocations(farms);

  const handleLocationToggle = (location) => {
    setSelectedLocations(prev => {
      if (prev.includes(location)) {
        return prev.filter(loc => loc !== location);
      } else {
        return [...prev, location];
      }
    });
  };

  const handleApply = () => {
    onApplyFilter(selectedLocations);
    onClose();
  };

  const handleReset = () => {
    setSelectedLocations([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div
        ref={popupRef}
        className="bg-[#ffffff] box-border content-stretch flex flex-col gap-3 items-start justify-start pb-4 pt-3 px-4 relative rounded-lg w-fit min-w-[360px] max-w-[400px] max-h-80 overflow-y-auto"
        style={{
          boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.1)',
          border: '1px solid #e5e5e5'
        }}
      >
        <div className="flex justify-between items-center w-full">
          <div
            className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px]"
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
        
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          <div className="grid grid-cols-2 gap-2 w-full">
            {locations.map((location) => (
              <div
                key={location}
                className="box-border content-stretch flex flex-row gap-2 items-center justify-between p-0 relative shrink-0 w-full"
              >
                <div className="flex flex-col font-normal justify-center not-italic relative shrink-0 text-[#000000] text-[14px] text-left tracking-[-0.42px] max-w-[calc(100%-32px)]">
                  <div className="leading-[1.4]">{location}</div>
                </div>
                <button
                  onClick={() => handleLocationToggle(location)}
                  className="relative shrink-0 size-6 ml-auto"
                  data-name="check-square-contained"
                >
                  <CheckSquareContained check={selectedLocations.includes(location) ? "on" : "off"} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between w-full gap-2 mt-2">
          <button
            onClick={handleReset}
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-3 py-1.5 bg-[#1AA752] text-white rounded text-xs hover:bg-green-600 transition-colors"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;