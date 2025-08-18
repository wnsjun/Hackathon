import { useState, useRef, useEffect } from 'react';
import CheckSquareContained from '../CheckSquareContained';

const ThemeFilter = ({ isOpen, onClose, onThemeToggle, selectedThemes = [] }) => {
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
    onThemeToggle(theme);
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

      </div>
    </div>
  );
};

export default ThemeFilter;