import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Searchbar } from '../common/Searchbar';
import { CoinDisplay } from '../common/CoinDisplay';
import spacefarm_logo_image from '../../assets/spacefarm_logo_image.png?url';
import chatIcon from '../../assets/chaticon.svg';
import profileIcon from '../../assets/profile.svg';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

function LogoIcon() { 
  return (
  <img src={spacefarm_logo_image} alt="SpaceFarm Logo" width="48" height="48" />  );}

function UserIcon({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16.0003 16.0003C19.6837 16.0003 22.667 13.017 22.667 9.33366C22.667 5.65033 19.6837 2.66699 16.0003 2.66699C12.317 2.66699 9.33366 5.65033 9.33366 9.33366C9.33366 13.017 12.317 16.0003 16.0003 16.0003ZM16.0003 19.3337C11.5503 19.3337 2.66699 21.567 2.66699 26.0003V29.3337H29.3337V26.0003C29.3337 21.567 20.4503 19.3337 16.0003 19.3337Z" stroke="#111111" strokeWidth="1.5"/>
    </svg>
    );
  }
}

function ChatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="27" viewBox="0 0 31 27" fill="none">
      <path d="M19.0003 22.3334V21.5834H19.4639L19.6711 21.998L19.0003 22.3334ZM23.4448 21.4446H22.6948V20.9284L23.1768 20.744L23.4448 21.4446ZM26.1114 25.889L26.5275 25.265C26.8025 25.4483 26.925 25.79 26.8293 26.1063C26.7335 26.4227 26.4419 26.639 26.1114 26.639V25.889ZM8.33366 13.4446H9.08366C9.08366 17.8173 13.3897 21.5834 19.0003 21.5834V22.3334V23.0834C12.8289 23.0834 7.58366 18.8902 7.58366 13.4446H8.33366ZM29.667 13.4446H28.917C28.917 9.0718 24.611 5.30566 19.0003 5.30566V4.55566V3.80566C25.1717 3.80566 30.417 7.99891 30.417 13.4446H29.667ZM19.0003 4.55566V5.30566C13.3897 5.30566 9.08366 9.0718 9.08366 13.4446H8.33366H7.58366C7.58366 7.99891 12.8289 3.80566 19.0003 3.80566V4.55566ZM23.4448 21.4446L23.1768 20.744C26.642 19.4187 28.917 16.6404 28.917 13.4446H29.667H30.417C30.417 17.4235 27.5916 20.6615 23.7127 22.1451L23.4448 21.4446ZM23.4448 21.4446H24.1948C24.1948 22.128 24.6379 24.0052 26.5275 25.265L26.1114 25.889L25.6954 26.513C23.3183 24.9283 22.6948 22.5388 22.6948 21.4446H23.4448ZM26.1114 25.889V26.639C25.1431 26.639 23.6274 26.4485 22.1518 25.8773C20.6795 25.3074 19.1556 24.321 18.3295 22.6689L19.0003 22.3334L19.6711 21.998C20.2673 23.1903 21.4101 23.9817 22.6933 24.4785C23.9733 24.9739 25.302 25.139 26.1114 25.139V25.889Z" fill="#212428"/>
      <path d="M12.3337 18.7778C18.2247 18.7778 23.0003 14.7981 23.0003 9.88889C23.0003 4.97969 18.2247 1 12.3337 1C6.44262 1 1.66699 4.97969 1.66699 9.88889C1.66699 13.4763 4.21716 16.4844 7.88921 17.8889C7.88921 18.7778 7.35588 20.9111 5.22255 22.3333C7.00033 22.3333 10.9114 21.6222 12.3337 18.7778Z" fill="white"/>
      <path d="M12.3337 18.7778V18.0278H11.8701L11.6628 18.4424L12.3337 18.7778ZM7.88921 17.8889H8.63921V17.3728L8.15714 17.1884L7.88921 17.8889ZM5.22255 22.3333L4.80652 21.7093C4.53153 21.8926 4.40895 22.2344 4.50473 22.5507C4.6005 22.867 4.89205 23.0833 5.22255 23.0833V22.3333ZM23.0003 9.88889H22.2503C22.2503 14.2616 17.9443 18.0278 12.3337 18.0278V18.7778V19.5278C18.5051 19.5278 23.75 15.3345 23.75 9.88889H23.0003ZM1.66699 9.88889H2.41699C2.41699 5.51613 6.72299 1.75 12.3337 1.75V1V0.25C6.16225 0.25 0.916992 4.44325 0.916992 9.88889H1.66699ZM12.3337 1V1.75C17.9443 1.75 22.2503 5.51613 22.2503 9.88889H23.0003H23.7503C23.7503 4.44325 18.5051 0.25 12.3337 0.25V1ZM7.88921 17.8889L8.15714 17.1884C4.69195 15.863 2.41699 13.0848 2.41699 9.88889H1.66699H0.916992C0.916992 13.8678 3.74237 17.1058 7.62129 18.5894L7.88921 17.8889ZM7.88921 17.8889H7.13921C7.13921 18.5724 6.69609 20.4496 4.80652 21.7093L5.22255 22.3333L5.63857 22.9574C8.01568 21.3726 8.63921 18.9832 8.63921 17.8889H7.88921ZM5.22255 22.3333V23.0833C6.19092 23.0833 7.70661 22.8928 9.18218 22.3216C10.6545 21.7517 12.1784 20.7654 13.0045 19.1132L12.3337 18.7778L11.6628 18.4424C11.0667 19.6346 9.92391 20.4261 8.64069 20.9228C7.36071 21.4183 6.03196 21.5833 5.22255 21.5833V22.3333Z" fill="#212428"/>
    </svg>
  );
}

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, coinBalance } = useAuth();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearch = (query) => {
    if (location.pathname === '/community') {
      navigate(`/community?search=${encodeURIComponent(query)}`);
    } else {
      navigate(`/search?title=${encodeURIComponent(query)}`);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/home') {
      window.dispatchEvent(new CustomEvent('resetHomeFilters'));
    }
    navigate('/home');
  };

  const handleSearchIconClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleChatClick = () => {
    if (!isLoggedIn) {
      alert('로그인하세요');
      navigate('/login');
      return;
    }
    navigate('/chat');
  };

  const handleMyPageClick = () => {
    if (!isLoggedIn) {
      alert('로그인하세요');
      navigate('/login');
      return;
    }
    navigate('/mypage');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white text-black z-50">
        {/* Desktop/Tablet View */}
        <div className="hidden min-[361px]:block">
          <div className="box-border content-stretch flex flex-row items-center justify-between px-2 sm:px-4 md:px-8 lg:px-16 xl:px-40 py-2 sm:py-4 md:py-6 lg:py-8 relative w-full min-w-0">
            {/* Left Section: Logo + Navigation + Search */}
            <div className="box-border content-stretch flex flex-row gap-1 sm:gap-2 md:gap-4 lg:gap-8 items-center justify-start p-0 relative min-w-0 flex-1">
              {/* Logo Section */}
              <div className="box-border content-stretch flex flex-row gap-1 items-end justify-center p-0 relative shrink-0">
                <div onClick={handleHomeClick} className="cursor-pointer">
                  <LogoIcon />
                </div>
                <button onClick={handleHomeClick} className="hidden md:flex flex-col font-['Outfit:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1aa752] text-[16px] md:text-[20px] lg:text-[24px] text-left text-nowrap">
                  <p className="block leading-[1.6] whitespace-pre cursor-pointer">SpaceFarm</p>
                </button>
              </div>

              {/* Navigation Menu */}
              <div className="box-border content-stretch flex flex-row items-center justify-start leading-[0] p-0 relative shrink-0">
                <button onClick={handleHomeClick} className="cursor-pointer px-2 sm:px-4 py-2">
                  <p className="font-bold text-[12px] sm:text-[14px] lg:text-[16px] text-[#000000]">홈</p>
                </button>
                <Link to="/community" className="px-2 sm:px-4 py-2">
                  <p className="font-bold text-[12px] sm:text-[14px] lg:text-[16px] text-[#000000]">커뮤니티</p>
                </Link>
              </div>

              {/* Search Bar */}
              <div className="box-border content-stretch flex flex-row h-8 sm:h-10 lg:h-12 items-center justify-between pl-2 pr-2 py-0 relative flex-1 max-w-[200px] sm:max-w-[250px] lg:max-w-[357px] min-w-[100px]">
                <Searchbar onSearch={handleSearch} />
              </div>
            </div>

            {/* User Actions */}
            <div className="box-border content-stretch flex flex-row gap-1 sm:gap-2 md:gap-4 lg:gap-8 items-center justify-end p-0 relative shrink-0">
              {isLoggedIn ? (
                <>
                  <div onClick={() => navigate('/coin-charge')} className="cursor-pointer">
                    <CoinDisplay coinBalance={coinBalance} />
                  </div>
                  <Link to="/chat">
                    <ChatIcon />
                  </Link>
                  <Link to="/mypage" className="overflow-clip relative shrink-0 size-8">
                    <UserIcon isLoggedIn={isLoggedIn} />
                  </Link>
                </>
              ) : (
                <div className="box-border content-stretch flex flex-row gap-8 items-center justify-start p-0 relative shrink-0">
                  <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px]">
                    <Link 
                      to="/login" 
                      className="font-bold block leading-[1.5] whitespace-pre hover:text-gray-600 transition-colors"
                    >
                      로그인
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="block min-[361px]:hidden">
          <div className="box-border content-stretch flex flex-row items-center justify-between px-4 py-4 relative size-full">
            {/* Logo Section */}
            <div className="box-border content-stretch flex flex-row gap-1 items-end justify-center p-0 relative shrink-0">
              <div onClick={handleHomeClick} className="cursor-pointer">
                <LogoIcon />
              </div>
              <button onClick={handleHomeClick} className="flex flex-col font-['Outfit:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1aa752] text-[24px] text-left text-nowrap">
                <p className="block leading-[1.6] whitespace-pre cursor-pointer">SpaceFarm</p>
              </button>
            </div>

            {/* Search Icon */}
            <button onClick={handleSearchIconClick} className="flex items-center justify-center shrink-0 size-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#1AA752" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Expanded Search Bar */}
          {isSearchExpanded && (
            <div className="px-4 pb-4">
              <div className="box-border content-stretch flex flex-row h-12 items-center justify-between pl-2 pr-4 py-0 relative shrink-0">
                <Searchbar onSearch={handleSearch} />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white block min-[361px]:hidden z-50">
        <div className="box-border content-stretch flex items-end justify-center leading-[0] relative shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)] w-full h-24">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] bg-[#ffffff] h-24 ml-0 mt-0 rounded-tl-[24px] w-[72px]" />
            <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 items-center justify-start ml-6 mt-2 relative w-6">
              <button onClick={handleHomeClick} className="relative shrink-0 size-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BBB" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </button>
              <div className="font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#111111] text-[12px] text-center text-nowrap tracking-[-0.36px]">
                <p className="leading-[1.5] whitespace-pre">홈</p>
              </div>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] bg-[#ffffff] h-24 ml-0 mt-0 w-[72px]" />
            <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 items-center justify-start ml-6 mt-2 relative w-6">
              <button onClick={handleChatClick} className="relative shrink-0 size-6">
                <img alt="" className="block max-w-none size-full" src={chatIcon} />
              </button>
              <div className="font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#bbbbbb] text-[12px] text-center text-nowrap tracking-[-0.36px]">
                <p className="leading-[1.5] whitespace-pre">채팅</p>
              </div>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] bg-[#ffffff] h-24 ml-0 mt-4 w-[72px]" />
            <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 h-[71px] items-center justify-start ml-3 mt-0 relative w-12">
              <div className="relative shrink-0 size-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BBB" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
                <div className="absolute aspect-[360/360] bg-center bg-cover bg-no-repeat left-[12.5%] right-[12.5%] top-1.5" style={{ backgroundImage: `url('http://localhost:3845/assets/b01d6bc8fb30f9d04593f5add80b407a6cbb08bf.png')` }} />
              </div>
              <div className="font-['Pretendard:SemiBold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#bbbbbb] text-[12px] text-center tracking-[-0.36px]" style={{ width: "min-content" }}>
                <p className="leading-[1.5]">새싹이</p>
              </div>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] flex h-24 items-center justify-center ml-0 mt-0 relative w-[72px]">
              <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                <div className="bg-[#ffffff] h-24 w-[72px]" />
              </div>
            </div>
            <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 items-center justify-start ml-4 mt-2 relative w-[41px]">
              <button onClick={() => navigate('/community')} className="overflow-clip relative shrink-0 size-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BBB" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </button>
              <div className="font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#bbbbbb] text-[12px] text-center text-nowrap tracking-[-0.36px]">
                <p className="leading-[1.5] whitespace-pre">커뮤니티</p>
              </div>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] bg-[#ffffff] h-24 ml-0 mt-0 rounded-tr-[24px] w-[72px]" />
            <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 items-center justify-start ml-[11px] mt-2 relative">
              <button onClick={handleMyPageClick} className="overflow-clip relative shrink-0 size-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BBB" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>
              <div className="font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#bbbbbb] text-[12px] text-center text-nowrap tracking-[-0.36px]">
                <p className="leading-[1.5] whitespace-pre">마이페이지</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
