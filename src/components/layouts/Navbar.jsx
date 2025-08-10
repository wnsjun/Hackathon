import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Searchbar } from '../common/Searchbar';

const imgImage3 = "http://localhost:3845/assets/b6df862180c1f60690c5918bbf0ffbdd9a7d8c64.png";
const imgVector = "http://localhost:3845/assets/747eb9418c39fe0ea8ada0911673f1cd281d2715.svg";
const img1 = "http://localhost:3845/assets/3878876ca7121d25b72cd075b57a56a22e489064.svg";

function UserIcon() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[8.333%]">
        <div className="absolute inset-[-3.75%]">
          <img alt="" className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>
    </div>
  );
}

function ChatIcon() {
  return (
    <div className="relative shrink-0 size-8">
      <div className="absolute inset-0" />
      <div className="absolute inset-[12.5%_4.17%_9.72%_8.33%]">
        <div className="absolute inset-[-3.01%_-2.68%]">
          <img alt="" className="block max-w-none size-full" src={img1} />
        </div>
      </div>
    </div>
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
          <div
            onClick={handleHomeClick}
            className="bg-center bg-cover bg-no-repeat shrink-0 size-12 cursor-pointer"
            style={{ backgroundImage: `url('${imgImage3}')` }}
          />
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
