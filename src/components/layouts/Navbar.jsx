import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Searchbar } from '../common/Searchbar';
import { CoinDisplay } from '../common/CoinDisplay';
import spacefarm_logo_image from '../../assets/spacefarm_logo_image.png?url';
import chatIcon from '../../assets/chaticon.svg';
import ChatbotIcon from '../common/ChatbotIcon';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCoin } from '../../contexts/CoinContext';

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
  const { isLoggedIn } = useAuth();
  const { coinBalance } = useCoin();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [shouldHideMobileNavbar, setShouldHideMobileNavbar] = useState(false);

  // body 클래스 변화 감지
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setShouldHideMobileNavbar(document.body.classList.contains('hide-mobile-navbar'));
    });
    
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

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
        <div className="hidden sm:block">
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
        <div className="block sm:hidden">
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

            {/* Right Section - Coin + Search */}
            <div className="flex items-center gap-3">
              {/* Coin Display for Mobile */}
              {isLoggedIn && (
                <div onClick={() => navigate('/coin-charge')} className="cursor-pointer">
                  <CoinDisplay coinBalance={coinBalance} />
                </div>
              )}
              
              {/* Search Icon */}
              <button onClick={handleSearchIconClick} className="flex items-center justify-center shrink-0 size-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#1AA752" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
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
      <nav className={`fixed bottom-[-10px] left-0 right-0 bg-white sm:hidden z-50 ${shouldHideMobileNavbar ? 'hidden' : 'block'}`}>
        <div className="box-border content-stretch flex items-end justify-center leading-[0] relative shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)] w-full h-24">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] bg-[#ffffff] h-24 ml-0 mt-0 rounded-tl-[24px] w-[72px]" />
            <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 items-center justify-start ml-6 mt-2 relative w-6">
              <button onClick={handleHomeClick} className="relative shrink-0 size-6 cursor-pointer ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={location.pathname === '/home' ? '#111111' : '#BBB'} strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </button>
              <div className={`font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-center text-nowrap tracking-[-0.36px] ${location.pathname === '/home' ? 'text-[#111111]' : 'text-[#bbbbbb]'}`}>
                <p className="leading-[1.5] whitespace-pre">홈</p>
              </div>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] bg-[#ffffff] h-24 ml-0 mt-0 w-[72px]" />
            <div className=" [grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 items-center justify-start ml-6 mt-2 relative w-6">
              <button onClick={handleChatClick} className="relative shrink-0 size-6">
                <img alt="" className="cursor-pointer block max-w-none size-full" src={chatIcon} />
              </button>
              <div className={`font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-center text-nowrap tracking-[-0.36px] ${location.pathname === '/chat' ? 'text-[#111111]' : 'text-[#bbbbbb]'}`}>
                <p className="leading-[1.5] whitespace-pre">채팅</p>
              </div>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] bg-[#ffffff] h-24 ml-0 mt-4 w-[72px]" />
            <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 h-[71px] items-center justify-start ml-3 mt-0 relative w-12">
              <ChatbotIcon isMobile={true} />
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] flex h-24 items-center justify-center ml-0 mt-0 relative w-[72px]">
              <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                <div className="bg-[#ffffff] h-24 w-[72px]" />
              </div>
            </div>
            <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 items-center justify-start ml-4 mt-2 relative w-[41px]">
              <button onClick={() => navigate('/community')} className=" cursor-pointer  overflow-clip relative shrink-0 size-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M6.81471 12.864L4.35271 13.524C3.71263 13.6956 3.16686 14.1143 2.83534 14.6881C2.50382 15.2618 2.41367 15.9438 2.58471 16.584L2.97271 18.034C3.10871 18.5415 3.34333 19.0172 3.6632 19.4339C3.98306 19.8507 4.38189 20.2004 4.83692 20.463C5.29194 20.7256 5.79424 20.896 6.31512 20.9645C6.83601 21.0329 7.36528 20.9981 7.87271 20.862L7.90671 20.852M17.1067 20.854L17.1387 20.862C18.1632 21.1363 19.2548 20.9925 20.1733 20.4621C21.0918 19.9318 21.762 19.0584 22.0367 18.034L22.4247 16.584C22.5957 15.9438 22.5056 15.2618 22.1741 14.6881C21.8426 14.1143 21.2968 13.6956 20.6567 13.524L18.2007 12.864M9.00671 6.5C9.00671 6.04037 9.09724 5.58525 9.27313 5.16061C9.44902 4.73597 9.70683 4.35013 10.0318 4.02513C10.3568 3.70012 10.7427 3.44231 11.1673 3.26642C11.592 3.09053 12.0471 3 12.5067 3C12.9663 3 13.4215 3.09053 13.8461 3.26642C14.2707 3.44231 14.6566 3.70012 14.9816 4.02513C15.3066 4.35013 15.5644 4.73597 15.7403 5.16061C15.9162 5.58525 16.0067 6.04037 16.0067 6.5C16.0067 7.42826 15.638 8.3185 14.9816 8.97487C14.3252 9.63125 13.435 10 12.5067 10C11.5785 10 10.6882 9.63125 10.0318 8.97487C9.37546 8.3185 9.00671 7.42826 9.00671 6.5ZM5.00671 11C5.66975 11 6.30564 10.7366 6.77448 10.2678C7.24332 9.79893 7.50671 9.16304 7.50671 8.5C7.50671 7.83696 7.24332 7.20107 6.77448 6.73223C6.30564 6.26339 5.66975 6 5.00671 6C4.34367 6 3.70779 6.26339 3.23894 6.73223C2.7701 7.20107 2.50671 7.83696 2.50671 8.5C2.50671 9.16304 2.7701 9.79893 3.23894 10.2678C3.70779 10.7366 4.34367 11 5.00671 11ZM22.5067 8.5C22.5067 9.16304 22.2433 9.79893 21.7745 10.2678C21.3056 10.7366 20.6698 11 20.0067 11C19.3437 11 18.7078 10.7366 18.2389 10.2678C17.7701 9.79893 17.5067 9.16304 17.5067 8.5C17.5067 7.83696 17.7701 7.20107 18.2389 6.73223C18.7078 6.26339 19.3437 6 20.0067 6C20.6698 6 21.3056 6.26339 21.7745 6.73223C22.2433 7.20107 22.5067 7.83696 22.5067 8.5ZM11.0067 12C9.62671 12 8.50671 13.12 8.50671 14.5V17C8.50671 18.0609 8.92814 19.0783 9.67828 19.8284C10.4284 20.5786 11.4458 21 12.5067 21C13.5676 21 14.585 20.5786 15.3351 19.8284C16.0853 19.0783 16.5067 18.0609 16.5067 17V14.5C16.5067 13.12 15.3867 12 14.0067 12H11.0067Z" stroke={location.pathname === '/community' ? '#111111' : '#BBBBBB'} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              </button>
              <div className={`font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-center text-nowrap tracking-[-0.36px] ${location.pathname === '/community' ? 'text-[#111111]' : 'text-[#bbbbbb]'}`}>
                <p className="leading-[1.5] whitespace-pre">커뮤니티</p>
              </div>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] bg-[#ffffff] h-24 ml-0 mt-0 rounded-tr-[24px] w-[72px]" />
            <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-1 items-center justify-start ml-[11px] mt-2 relative">
              <button onClick={handleMyPageClick} className="cursor-pointer overflow-clip relative shrink-0 size-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M12.5 12C15.2625 12 17.5 9.7625 17.5 7C17.5 4.2375 15.2625 2 12.5 2C9.7375 2 7.5 4.2375 7.5 7C7.5 9.7625 9.7375 12 12.5 12ZM12.5 14.5C9.1625 14.5 2.5 16.175 2.5 19.5V22H22.5V19.5C22.5 16.175 15.8375 14.5 12.5 14.5Z" stroke={location.pathname === '/mypage' ? '#111111' : '#BBBBBB'} strokeWidth="1.5"/>
              </svg>
              </button>
              <div className={`font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-center text-nowrap tracking-[-0.36px] ${location.pathname === '/mypage' ? 'text-[#111111]' : 'text-[#bbbbbb]'}`}>
                <p className="leading-[1.5] whitespace-pre">마이페이지</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
