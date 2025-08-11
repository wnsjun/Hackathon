import { useState } from 'react';

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#1AA752" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

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
      <button type="submit" className="flex items-center justify-center shrink-0 size-6">
        <SearchIcon />
      </button>
    </form>
  );
};
