import React, { useState } from 'react';
import profile from '../assets/profile.svg?url';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/mypage.module.css';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { useAuth } from '../hooks/useAuth';

// FarmCard 간단 버전
const FarmCard = ({ farm }) => {
  return (
    <div className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col w-full max-w-xs">
      <div
        className="w-full h-48 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${farm.image})` }}
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{farm.title}</h3>
        <p className="text-gray-600 text-sm">{farm.address}</p>
        <div className="flex justify-between text-sm text-gray-700 font-medium">
          <span>가격: {farm.price}</span>
          <span>대여 기간: {farm.rentalPeriod}</span>
        </div>
      </div>
    </div>
  );
};

// CommunityCard: FarmCard와 동일한 사이즈로 재구성
const CommunityCard = ({ post }) => {
  return (
    <div className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col w-full max-w-xs">
      <div
        className="w-full h-48 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${post.image})` }}
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            src={post.profileImg}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <p className="font-medium text-sm">{post.nickname}</p>
          <span className="text-xs text-gray-400">{post.timeAgo}</span>
        </div>
        <h3 className="font-semibold text-base">{post.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
      </div>
    </div>
  );
};

export const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [farmToggle, setFarmToggle] = useState('my');
  const [communityToggle, setCommunityToggle] = useState('written');

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const farmData = [
    {
      id: 1,
      image: profile,
      title: '텃밭 1',
      address: '서울 마포구',
      price: '50,000원',
      rentalPeriod: '3개월',
    },
    {
      id: 2,
      image: profile,
      title: '텃밭 2',
      address: '서울 성동구',
      price: '70,000원',
      rentalPeriod: '6개월',
    },
    {
      id: 3,
      image: profile,
      title: '텃밭 3',
      address: '서울 강남구',
      price: '90,000원',
      rentalPeriod: '1년',
    },
  ];

  const communityData = [
    {
      id: 1,
      image: profile,
      profileImg: profile,
      nickname: '사용자1',
      timeAgo: '1일 전',
      title: '첫 번째 글 제목',
      content: '이곳은 첫 번째 글의 내용이 들어가는 부분입니다.',
    },
    {
      id: 2,
      image: profile,
      profileImg: profile,
      nickname: '사용자2',
      timeAgo: '2일 전',
      title: '두 번째 글 제목',
      content: '두 번째 글의 내용은 조금 더 길게 작성할 수도 있습니다.',
    },
    {
      id: 3,
      image: profile,
      profileImg: profile,
      nickname: '사용자3',
      timeAgo: '3일 전',
      title: '세 번째 글 제목',
      content: '세 번째 글 내용입니다. 간단하게 요약해서 보여줍니다.',
    },
  ];

  return (
    <div>
      {/* 프로필 영역 */}
      <div className="flex pt-20">
        <div className="flex pt-12 pl-40 w-full h-[336px]">
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
              className="flex items-center gap-3 p-4 border rounded-lg w-1/3"
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

        {/* 텃밭 토글 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className={styles.tradeReviewTitle}>텃밭</h1>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded ${farmToggle === 'my' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setFarmToggle('my')}
            >
              내 텃밭
            </button>
            <button
              className={`px-4 py-2 rounded ${farmToggle === 'renting' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setFarmToggle('renting')}
            >
              대여중인 텃밭
            </button>
          </div>
          <button className="text-green-600 hover:underline">전체보기</button>
        </div>

        <div className="flex gap-6 mb-16">
          {farmData.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>

        {/* 커뮤니티 영역 */}
        <div className="pt-18">
          <div className="flex items-center justify-between mb-6">
            <h1 className={styles.tradeReviewTitle}>커뮤니티</h1>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded ${communityToggle === 'written' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setCommunityToggle('written')}
              >
                작성글
              </button>
              <button
                className={`px-4 py-2 rounded ${communityToggle === 'liked' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
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
            {communityData.map((post) => (
              <CommunityCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};
