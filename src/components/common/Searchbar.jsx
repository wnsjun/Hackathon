import { useState } from 'react';

const imgSearchIcon = "http://localhost:3845/assets/82b0aaded2db2f51ecd3fc655f11bcded1989ca7.svg";

export const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="basis-0 box-border content-stretch flex flex-row grow h-12 items-center justify-between min-h-px min-w-px pl-2 pr-4 py-0 relative shrink-0"
    >
      <div className="absolute border-[#1aa752] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={query}
        onChange={handleInputChange}
        className="basis-0 flex flex-col font-semibold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#bbbbbb] text-[16px] text-left tracking-[-0.48px] bg-transparent border-none outline-none placeholder-[#bbbbbb]"
      />
      <button type="submit" className="relative shrink-0 size-6">
        <div className="absolute inset-0" />
        <div className="absolute contents inset-[8.33%]">
          <div className="absolute inset-[8.33%]">
            <div className="absolute inset-[-5%]">
              <img alt="" className="block max-w-none size-full" src={imgSearchIcon} />
            </div>
          </div>
        </div>
      </button>
    </form>
  );
};
