// src/page/MyAllFarms.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmCard from '../components/common/Card/FarmCard';
import RentingFarmCard from '../components/common/Card/RentingFarmCard';
import {
  useMyFarms,
  useUsedFarms,
  useBookmarkedFarms,
} from '../hooks/useMyPage';

const MyAllFarms = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my');

  // API 훅
  const { data: myFarmsData, isLoading: myFarmsLoading } = useMyFarms();
  const { data: usedFarmsData, isLoading: usedFarmsLoading } = useUsedFarms();
  const { data: bookmarkedFarmsData, isLoading: bookmarkedFarmsLoading } =
    useBookmarkedFarms();

  const myFarms = myFarmsData?.farms || [];
  const usedFarms = usedFarmsData?.farms || [];
  const bookmarkedFarms = bookmarkedFarmsData?.farms || [];

  const handleBackClick = () => navigate(-1);

  if (myFarmsLoading || usedFarmsLoading || bookmarkedFarmsLoading) {
    return <p className="pl-40 pt-20">로딩 중...</p>;
  }

  const farms =
    activeTab === 'my'
      ? myFarms
      : activeTab === 'renting'
        ? usedFarms
        : bookmarkedFarms;

  return (
    <div className="bg-white relative w-full min-h-screen px-40 pt-32">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleBackClick}
          className="cursor-pointer w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="#374151"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-3xl font-semibold">텃밭</h1>
      </div>

      {/* 탭 */}
      <div className="flex gap-6 mb-10">
        <button
          className={`text-xl font-semibold ${
            activeTab === 'my'
              ? 'text-black border-b-4 border-green-600'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('my')}
        >
          내 텃밭
        </button>
        <button
          className={`text-xl font-semibold ${
            activeTab === 'renting'
              ? 'text-black border-b-4 border-green-600'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('renting')}
        >
          대여중인 텃밭
        </button>
        <button
          className={`text-xl font-semibold ${
            activeTab === 'bookmark'
              ? 'text-black border-b-4 border-green-600'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('bookmark')}
        >
          북마크한 텃밭
        </button>
      </div>

      {/* 카드 */}
      <div className="flex flex-wrap gap-6">
        {farms.map((farm) => (
          <div key={farm.id} className="flex-none w-[calc(33.333%-16px)]">
            {activeTab === 'renting' ? (
              <RentingFarmCard farm={farm} />
            ) : (
              <FarmCard farm={farm} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAllFarms;
