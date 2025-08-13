import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Searchbar } from '../common/Searchbar';
import spacefarm_logo_image from '../../assets/spacefarm_logo_image.png?url';

function LogoIcon() { 
  return (
  <img src={spacefarm_logo_image} alt="SpaceFarm Logo" width="48" height="48" />  );}

function UserIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16Z" fill="#666666"/>
      <path d="M16 20C10.4772 20 6 24.4772 6 30H26C26 24.4772 21.5228 20 16 20Z" fill="#666666"/>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6C4 4.89543 4.89543 4 6 4H26C27.1046 4 28 4.89543 28 6V18C28 19.1046 27.1046 20 26 20H10L4 26V6Z" fill="#666666"/>
      <circle cx="10" cy="12" r="2" fill="white"/>
      <circle cx="16" cy="12" r="2" fill="white"/>
      <circle cx="22" cy="12" r="2" fill="white"/>
    </svg>
  );
}

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <nav className="fixed top-0 left-0 right-0 bg-white text-black z-50 px-6 sm:px-12 lg:px-20 xl:px-32">
      <div className="box-border content-stretch flex flex-row gap-[75px] items-center justify-start p-0 relative w-full h-20">
        {/* Logo Section */}
        <div className="box-border content-stretch flex flex-row gap-1 items-end justify-center p-0 relative shrink-0">
          <div onClick={handleHomeClick} className="cursor-pointer">
            <LogoIcon />
          </div>
          <button onClick={handleHomeClick} className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#1aa752] text-[24px] text-left text-nowrap">
            <p className="block leading-[1.6] whitespace-pre cursor-pointer">SpaceFarm</p>
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="box-border content-stretch flex flex-row font-semibold gap-[65px] items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px] w-[133px]">
          <button onClick={handleHomeClick} className="flex flex-col justify-center relative shrink-0">
            <p className="cursor-pointer block leading-[1.5] text-nowrap whitespace-pre">홈</p>
          </button>
          <Link to="/community" className="flex flex-col justify-center relative shrink-0">
            <p className="block leading-[1.5] text-nowrap whitespace-pre">커뮤니티</p>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1">
          <Searchbar onSearch={handleSearch} />
        </div>

        {/* User Actions */}
        <div className="box-border content-stretch flex flex-row gap-8 items-center justify-start p-0 relative shrink-0">
          <Link to="/chat">
            <ChatIcon />
          </Link>
          <Link to="/login" className="overflow-clip relative shrink-0 size-8">
            <UserIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
};
