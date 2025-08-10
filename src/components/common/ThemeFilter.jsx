import { useState, useRef, useEffect } from 'react';
import CheckSquareContained from './CheckSquareContained';

const ThemeFilter = ({ isOpen, onClose, onApplyFilter }) => {
  const [selectedThemes, setSelectedThemes] = useState([]);
  const filterRef = useRef(null);

  const themes = ['옥상', '화단', '공터', '공원'];

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

  const handleThemeToggle = (theme) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  const handleApplyFilter = () => {
    onApplyFilter(selectedThemes);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div
        ref={filterRef}
        className="bg-white box-border flex flex-col gap-3 items-start justify-start pb-4 pt-3 px-4 rounded-lg relative"
        style={{ 
          width: 'fit-content',
          minWidth: '280px',
          maxWidth: '320px',
          boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.1)',
          border: '1px solid #e5e5e5'
        }}
      >
        
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px]">
            <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
              테마
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
            {themes.map((theme) => (
              <div
                key={theme}
                className="box-border content-stretch flex flex-row gap-2 items-center justify-between p-0 relative shrink-0 w-full"
              >
                <div className="flex flex-col font-normal justify-center not-italic relative shrink-0 text-[#000000] text-[14px] text-left tracking-[-0.42px] max-w-[calc(100%-32px)]">
                  <div className="leading-[1.4]">{theme}</div>
                </div>
                <button
                  onClick={() => handleThemeToggle(theme)}
                  className="relative shrink-0 size-6 ml-auto"
                >
                  <CheckSquareContained check={selectedThemes.includes(theme) ? "on" : "off"} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between w-full gap-2 mt-2">
          <button
            onClick={() => setSelectedThemes([])}
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

export default ThemeFilter;