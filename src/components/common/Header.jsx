import { useNavigate } from 'react-router-dom';

const Header = ({ title = "텃밭 매물 확인", showBackButton = true }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="absolute content-stretch left-0 top-[54px]">
      <div className="absolute bg-white h-[52px] left-0 top-[54px] w-[360px]">
        <div 
          aria-hidden="true" 
          className="absolute border-[#f7f7f7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" 
        />
      </div>
      <div className="absolute flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic text-[#000000] text-[16px] text-nowrap top-20 tracking-[-0.48px] translate-y-[-50%]" style={{ left: "calc(50% - 44px)" }}>
        <p className="leading-[1.5] whitespace-pre">{title}</p>
      </div>
      {showBackButton && (
        <div 
          className="absolute left-[19px] size-6 top-[68px] cursor-pointer"
          onClick={handleBackClick}
        >
          <div 
            aria-hidden="true" 
            className="absolute border-[#f7f7f7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" 
          />
          <div className="absolute inset-[12.19%_56.25%_12.19%_3.13%]">
            <div className="absolute inset-[-4.13%_-7.69%_-4.13%_-11.29%]" style={{ "--stroke-0": "rgba(17, 17, 17, 1)" }}>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M15 18L9 12L15 6" 
                  stroke="#111111" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="absolute inset-0" />
        </div>
      )}
    </div>
  );
};

export default Header;