import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Searchbar } from '../common/Searchbar';
import { CoinDisplay } from '../common/CoinDisplay';
import spacefarm_logo_image from '../../assets/spacefarm_logo_image.png?url';
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

  const handleSearch = (query) => {
    if (location.pathname !== '/home') {
      navigate(`/home?query=${encodeURIComponent(query)}`);
    } else {
      navigate({
        pathname: '/home',
        search: `?query=${encodeURIComponent(query)}`,
      });
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/home') {
      window.dispatchEvent(new CustomEvent('resetHomeFilters'));
    }
    navigate('/home');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-black z-50">
      <div className="box-border content-stretch flex flex-row items-center justify-between px-40 py-8 relative size-full">
        {/* Left Section: Logo + Navigation + Search */}
        <div className="box-border content-stretch flex flex-row gap-8 items-center justify-start p-0 relative shrink-0">
          {/* Logo Section */}
          <div className="box-border content-stretch flex flex-row gap-1 items-end justify-center p-0 relative shrink-0">
            <div onClick={handleHomeClick} className="cursor-pointer">
              <LogoIcon />
            </div>
            <button onClick={handleHomeClick} className="flex flex-col font-['Outfit:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1aa752] text-[24px] text-left text-nowrap">
              <p className="block leading-[1.6] whitespace-pre cursor-pointer">SpaceFarm</p>
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="box-border content-stretch flex flex-row items-center justify-start leading-[0] p-0 relative shrink-0">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <div className="[grid-area:1_/_1] h-12 ml-0 mt-0 w-[97px]" />
              <div className="[grid-area:1_/_1] flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] ml-[42px] mt-6 not-italic relative text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px] translate-y-[-50%]">
                <button onClick={handleHomeClick} className="cursor-pointer">
                  <p className="font-bold block leading-[1.5] whitespace-pre">홈</p>
                </button>
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <div className="[grid-area:1_/_1] h-12 ml-0 mt-0 w-[97px]" />
              <div className="[grid-area:1_/_1] flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] ml-[22px] mt-6 not-italic relative text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px] translate-y-[-50%]">
                <Link to="/community">
                  <p className="font-bold block leading-[1.5] whitespace-pre">커뮤니티</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="box-border content-stretch flex flex-row h-12 items-center justify-between pl-2 pr-4 py-0 relative shrink-0 w-[357px]">
            <Searchbar onSearch={handleSearch} />
          </div>
        </div>

        {/* User Actions */}
        <div className="box-border content-stretch flex flex-row gap-8 items-center justify-end p-0 relative shrink-0">
          {isLoggedIn ? (
            <>
              <CoinDisplay coinBalance={coinBalance} />
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
    </nav>
  );
};
