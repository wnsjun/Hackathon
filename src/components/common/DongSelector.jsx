import {useRef, useEffect } from 'react';
import CheckSquareContained from './CheckSquareContained';

const DongSelector = ({ isOpen, onClose, onDongSelect, selectedDong = '' }) => {
  const filterRef = useRef(null);

  const dongList = [
    '공덕동', '노고산동', '도화동',
    '동교동', '망원동', '상수동',
    '상암동', '서교동', '성산동',
    '아현동', '연남동', '창전동',
    '합정동'
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

  const handleDongSelect = (dong) => {
    onDongSelect(dong);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div
        ref={filterRef}
        className="bg-white box-border flex flex-col gap-3 items-start justify-start pb-4 pt-3 px-4 rounded-lg relative shadow-lg border border-gray-200 w-fit min-w-[320px] max-w-[350px]"
      >
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          <div className="grid grid-cols-3 gap-2 w-full">
            {dongList.map((dong) => (
              <div
                key={dong}
                className="flex items-center justify-center w-full"
              >
                <span className="text-black text-sm">{dong}</span>
                <button
                  onClick={() => handleDongSelect(dong)}
                  className="ml-1 size-6 flex-shrink-0"
                >
                  <CheckSquareContained check={selectedDong === dong ? "on" : "off"} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DongSelector;