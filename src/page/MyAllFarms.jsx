import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmCard from '../components/common/Card/FarmCard';
import RentingFarmCard from '../components/common/Card/RentingFarmCard';
import { mockFarms } from '../data/mockFarms';



const MyAllFarms = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my');
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const allFarmsData = {
      my: mockFarms.slice(0, 6),
      renting: mockFarms.slice(3, 6),
      bookmark: mockFarms.slice(2, 5).map(farm => ({ ...farm, isBookmarked: true })),
    };

    setFarms(allFarmsData[activeTab] || []);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#ffffff] relative size-full">
      <div className="box-border content-stretch flex flex-col gap-6 items-center justify-start p-0 relative size-full pt-32 px-40">
        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
          <div className="flex items-center gap-4">
            {/*뒤로가기버튼*/}
            <button
              onClick={handleBackClick}
              className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex flex-col font-['Pretendard'] font-semibold justify-center leading-[1.5] not-italic relative shrink-0 text-[#000000] text-[32px] text-left tracking-[-0.64px]">
              <p className="block">텃밭</p>
            </div>
          </div>
          <div className="box-border content-stretch flex flex-row items-end justify-between p-0 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-row items-center justify-start leading-[0] p-0 relative shrink-0">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 relative w-60">
                  <div
                    aria-hidden="true"
                    className={`absolute border-solid inset-0 pointer-events-none ${
                      activeTab === 'my' 
                        ? 'border-[#1aa752] border-[0px_0px_4px]' 
                        : 'border-transparent'
                    }`}
                  />
                </div>
                <button
                  className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold h-[38.4px] justify-center leading-[0] ml-[87px] mt-[32.2px] not-italic relative text-[24px] text-left tracking-[-0.48px] translate-y-[-50%] w-[67px] cursor-pointer"
                  style={{ color: activeTab === 'my' ? '#000000' : '#bbbbbb' }}
                  onClick={() => handleTabClick('my')}
                >
                  <p className="block leading-[1.5] whitespace-pre">내 텃밭</p>
                </button>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 w-60">
                  <div
                    aria-hidden="true"
                    className={`absolute border-solid inset-0 pointer-events-none ${
                      activeTab === 'renting' 
                        ? 'border-[#1aa752] border-[0px_0px_4px]' 
                        : 'border-transparent'
                    }`}
                  />
                </div>
                <button
                  className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold justify-center leading-[0] ml-14 mt-8 not-italic relative text-[24px] text-left text-nowrap tracking-[-0.48px] translate-y-[-50%] cursor-pointer"
                  style={{ color: activeTab === 'renting' ? '#000000' : '#bbbbbb' }}
                  onClick={() => handleTabClick('renting')}
                >
                  <p className="block leading-[1.5] whitespace-pre">대여중인 텃밭</p>
                </button>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 w-60">
                  <div
                    aria-hidden="true"
                    className={`absolute border-solid inset-0 pointer-events-none ${
                      activeTab === 'bookmark' 
                        ? 'border-[#1aa752] border-[0px_0px_4px]' 
                        : 'border-transparent'
                    }`}
                  />
                </div>
                <button
                  className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold justify-center leading-[0] ml-14 mt-8 not-italic relative text-[24px] text-left text-nowrap tracking-[-0.48px] translate-y-[-50%] cursor-pointer"
                  style={{ color: activeTab === 'bookmark' ? '#000000' : '#bbbbbb' }}
                  onClick={() => handleTabClick('bookmark')}
                >
                  <p className="block leading-[1.5] whitespace-pre">북마크한 텃밭</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="box-border content-stretch flex flex-col gap-[25px] items-start justify-start p-0 relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-row gap-[25px] items-center justify-start leading-[0] p-0 relative shrink-0 w-full flex-wrap">
            {farms.map((farm, index) => (
              <div 
                key={farm.id} 
                className={`${index >= 3 ? 'mt-0' : ''} flex-none`}
                style={{ width: 'calc(33.333% - 16.67px)' }}
              >
                {activeTab === 'renting' ? (
                  <RentingFarmCard farm={farm} />
                ) : (
                  <FarmCard farm={farm} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAllFarms;