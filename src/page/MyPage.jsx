import React, { useState } from 'react';
import profile from '../assets/profile.svg?url';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/mypage.module.css';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { useAuth } from '../hooks/useAuth';
import setting from '../assets/setting.svg';
import RentingFarmCard from '../components/common/RentingFarmCard';
import FarmCard from '../components/common/FarmCard';
import CommunityPostCard from '../components/common/CommunityPostCard';

export const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [farmToggle, setFarmToggle] = useState('my');
  const [communityToggle, setCommunityToggle] = useState('written');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // === API 연동 시 받아올 데이터 (임시 더미) ===
  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const myFarms = [
    {
      id: 1,
      title: '텃밭 1',
      address: '서울 마포구',
      price: '50,000원',
      rentalPeriod: '3개월',
    },
    {
      id: 2,
      title: '텃밭 2',
      address: '서울 성동구',
      price: '70,000원',
      rentalPeriod: '6개월',
    },
    {
      id: 3,
      title: '텃밭 3',
      address: '서울 강남구',
      price: '90,000원',
      rentalPeriod: '1년',
    },
    {
      id: 4,
      title: '텃밭 4',
      address: '서울 종로구',
      price: '60,000원',
      rentalPeriod: '6개월',
    },
  ];

  const rentingFarms = [
    {
      id: 5,
      title: '대여텃밭 1',
      address: '서울 중구',
      price: '40,000원',
      rentalPeriod: '3개월',
    },
    {
      id: 6,
      title: '대여텃밭 2',
      address: '서울 동작구',
      price: '55,000원',
      rentalPeriod: '6개월',
    },
    {
      id: 7,
      title: '대여텃밭 3',
      address: '서울 서대문구',
      price: '80,000원',
      rentalPeriod: '1년',
    },
  ];

  const bookmarkedFarms = [
    {
      id: 8,
      title: '북마크 텃밭 1',
      address: '서울 은평구',
      price: '65,000원',
      rentalPeriod: '3개월',
    },
    {
      id: 9,
      title: '북마크 텃밭 2',
      address: '서울 송파구',
      price: '85,000원',
      rentalPeriod: '6개월',
    },
    {
      id: 10,
      title: '북마크 텃밭 3',
      address: '서울 강서구',
      price: '95,000원',
      rentalPeriod: '1년',
    },
  ];

  const writtenPosts = [
    {
      id: 1,
      title: '첫 글',
      content: '첫번째 글 내용',
      nickname: '사용자1',
      timeAgo: '1일 전',
    },
    {
      id: 2,
      title: '두번째 글',
      content: '두번째 글 내용',
      nickname: '사용자2',
      timeAgo: '2일 전',
    },
    {
      id: 3,
      title: '세번째 글',
      content: '세번째 글 내용',
      nickname: '사용자3',
      timeAgo: '3일 전',
    },
    {
      id: 4,
      title: '네번째 글',
      content: '네번째 글 내용',
      nickname: '사용자4',
      timeAgo: '4일 전',
    },
  ];

  const likedPosts = [
    {
      id: 5,
      title: '좋아요 글1',
      content: '좋아요 한 글',
      nickname: '사용자A',
      timeAgo: '5일 전',
    },
    {
      id: 6,
      title: '좋아요 글2',
      content: '좋아요 두번째',
      nickname: '사용자B',
      timeAgo: '6일 전',
    },
    {
      id: 7,
      title: '좋아요 글3',
      content: '좋아요 세번째',
      nickname: '사용자C',
      timeAgo: '7일 전',
    },
  ];

  return (
    <div>
      {/* 프로필 영역 */}
      <div className="flex pt-32">
        <div className="flex pt-12 pl-40 w-full h-[336px] relative">
          <img className="w-60 h-60" src={profile} alt="Profile" />
          <div className="flex flex-col pl-[46px] pt-[43px] items-start">
            <div className="flex items-center gap-4">
              <h1 className={styles.nickname}>닉네임</h1>
              <button
                onClick={handleLogoutClick}
                className="text-sm font-medium text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                로그아웃
              </button>
            </div>
            <p className={styles.location}>마포구 창전동</p>
            <div className="flex items-center gap-x-4 pt-1">
              <p className={styles.ecoScore}>친환경 점수</p>
              <p className={styles.ecoScoreValue}>83점</p>
            </div>
          </div>

          {/* 로그아웃 & 설정 버튼 */}
          <div className="absolute top-4 right-6 mt-12 flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold hover:underline"
            >
              로그아웃
            </button>
            <img
              src={setting}
              alt="설정"
              className="mr-40 w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="pl-40 pr-40 pt-18">
        {/* 거래 리뷰 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className={styles.tradeReviewTitle}>거래 리뷰</h1>
          <button className="text-green-600 hover:underline">전체보기</button>
        </div>

        <div className="flex gap-6 mb-16">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-lg w-1/3"
            >
              <img
                src={profile}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-black text-base">닉네임</p>
                  <p className="text-sm text-gray-400">1일 전</p>
                </div>
                <p className="text-sm text-gray-600">
                  어쩌고저쩌고해서 좋아요.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 텃밭 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className={styles.tradeReviewTitle}>텃밭</h1>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded ${
                farmToggle === 'my' ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setFarmToggle('my')}
            >
              내 텃밭
            </button>
            <button
              className={`px-4 py-2 rounded ${
                farmToggle === 'renting'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setFarmToggle('renting')}
            >
              대여중인 텃밭
            </button>
            <button
              className={`px-4 py-2 rounded ${
                farmToggle === 'bookmark'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setFarmToggle('bookmark')}
            >
              북마크한 텃밭
            </button>
          </div>
          <button className="text-green-600 hover:underline">전체보기</button>
        </div>

        <div className="flex gap-6 mb-16">
          {farmToggle === 'my'
            ? myFarms
                .slice(0, 3)
                .map((farm) => <FarmCard key={farm.id} farm={farm} />)
            : farmToggle === 'renting'
              ? rentingFarms
                  .slice(0, 3)
                  .map((farm) => <RentingFarmCard key={farm.id} farm={farm} />)
              : bookmarkedFarms
                  .slice(0, 3)
                  .map((farm) => <FarmCard key={farm.id} farm={farm} />)}
        </div>

        {/* 커뮤니티 */}
        <div className="pt-18">
          <div className="flex items-center justify-between mb-6">
            <h1 className={styles.tradeReviewTitle}>커뮤니티</h1>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded ${
                  communityToggle === 'written'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setCommunityToggle('written')}
              >
                작성글
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  communityToggle === 'liked'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setCommunityToggle('liked')}
              >
                좋아요 누른 글
              </button>
            </div>
            <button
              className="text-green-600 hover:underline"
              onClick={() => navigate('/community')}
            >
              전체보기
            </button>
          </div>

          <div className="flex gap-6 mb-24">
            {(communityToggle === 'written' ? writtenPosts : likedPosts)
              .slice(0, 3)
              .map((post) => (
                <CommunityPostCard key={post.id} post={post} />
              ))}
          </div>
        </div>
      </div>

      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};
