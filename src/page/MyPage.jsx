import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatbotIcon from '../components/common/ChatbotIcon';
import setting from '../assets/setting.svg';
import RentingFarmCard from '../components/common/Card/RentingFarmCard';
import FarmCard from '../components/common/Card/FarmCard';
import CommunityPostCard from '../components/common/Card/CommunityPostCard';
import { useCoin } from '../contexts/CoinContext';
import { Navbar } from '../components/layouts/Navbar';
import ReviewCard from '../components/common/Card/ReviewCard';
import { useMyReviews } from '../hooks/useMyPage';
import { timeAgo } from '../utils/timeAgo';
import profileImg from '../assets/profile.png';

import {
  useProfile,
  useMyFarms,
  useUsedFarms,
  useBookmarkedFarms,
  useMyPosts,
  useLikedPosts,
  useEcoScore,
} from '../hooks/useMyPage';

import { useAuth } from '../hooks/useAuth';

export const MyPage = () => {
  const navigate = useNavigate();
  const [farmToggle, setFarmToggle] = useState('my');
  const [communityToggle, setCommunityToggle] = useState('written');

  const { data: myReviews, isLoading: myReviewsLoading } = useMyReviews();

  const { coinBalance } = useCoin(); //코인 잔액

  // 디버깅을 위한 토큰 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(
      '🔍 MyPage - Current token:',
      token ? `${token.substring(0, 20)}...` : 'No token'
    );
    console.log('🔍 MyPage - User data:', localStorage.getItem('userData'));
  }, []);

  // React Query hooks
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useProfile();

  const { data: myFarmsData, isLoading: myFarmsLoading } = useMyFarms();
  const { data: usedFarmsData, isLoading: usedFarmsLoading } = useUsedFarms();
  const { data: bookmarkedFarmsData, isLoading: bookmarkedFarmsLoading } =
    useBookmarkedFarms();
  const { data: myPosts, isLoading: myPostsLoading } = useMyPosts();
  const { data: likedPosts, isLoading: likedPostsLoading } = useLikedPosts();
  const { data: ecoScoreData, isLoading: ecoScoreLoading } = useEcoScore();

  // 데이터 추출
  const myFarms = myFarmsData?.farms || [];
  const usedFarms = usedFarmsData?.farms || [];
  const bookmarkedFarms = bookmarkedFarmsData?.farms || [];
  const ecoScore = ecoScoreData?.ecoscore || 0;

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  // 로딩 상태 체크
  // if (
  //   profileLoading ||
  //   myFarmsLoading ||
  //   usedFarmsLoading ||
  //   bookmarkedFarmsLoading ||
  //   myPostsLoading ||
  //   likedPostsLoading ||
  //   ecoScoreLoading
  // ) {
  //   return (
  //     <p className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 pt-32">
  //       로딩 중...
  //     </p>
  //   );
  // }

  if (
    profileLoading ||
    myFarmsLoading ||
    usedFarmsLoading ||
    bookmarkedFarmsLoading ||
    myPostsLoading ||
    likedPostsLoading ||
    ecoScoreLoading ||
    myReviewsLoading
  ) {
    return (
      <p className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 pt-32">
        로딩 중...
      </p>
    );
  }

  if (profileError) {
    return (
      <p className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 pt-32 text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </p>
    );
  }

  if (!profile) {
    return (
      <p className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 pt-32">
        로그인이 필요합니다.
      </p>
    );
  }

  // Arrow icon component
  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M9 14.0498L15.5 8.00051L9 1.95121"
        stroke="#777777"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="min-h-screen ml-40 mr-40">
      <Navbar />
      {/* 프로필 영역 */}
      <div className="px-4 sm:px-8 md:px-16 pt-32 pb-8">
        <div className="relative">
          {/* 로그아웃 & 설정 버튼 */}
          <div className="absolute top-0 right-0 flex items-center gap-3 mb-4">
            <button
              onClick={handleLogout}
              className="text-red-500 text-sm md:text-base font-semibold cursor-pointer"
            >
              로그아웃
            </button>
            <img
              src={setting}
              alt="설정"
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
              onClick={() => navigate('/setting')}
            />
          </div>

          {/* 프로필 정보 */}
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 pt-12 md:pt-8">
            <img
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full mx-auto md:mx-0"
              src={profile.profileImage || profileImg}
              alt="Profile"
            />
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
                {profile.nickname}
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                {profile.address}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm md:text-base text-gray-700">
                  친환경 점수
                </p>
                <p className="text-lg md:text-xl font-semibold text-[#1aa752]">
                  {ecoScore}점
                </p>
              </div>
            </div>
          </div>

          {/* FarmCoin 카드 */}
          <div className="bg-[rgba(26,167,82,0.05)] border border-[#39bb6d] rounded-2xl p-4 md:p-6 mt-6 md:mt-8 w-full md:max-w-[320px] md:ml-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M12.8007 27.0677V17.105C9.94415 17.105 6.07622 16.5561 4.93359 9.73438C7.40928 9.99574 11.3486 10.8635 13.8298 14.7527C14.7275 12.8708 17.8616 9.73438 22.8891 9.73438C22.4811 13.2629 19.4939 17.105 15.054 17.105"
                      stroke="#1AA752"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.6669 27.0881C6.02755 26.4199 0.844727 20.8148 0.844727 13.9993C0.844727 6.73369 6.73467 0.84375 14.0003 0.84375C21.2659 0.84375 27.1558 6.73369 27.1558 13.9993C27.1558 19.1568 24.188 23.6211 19.8669 25.7775"
                      stroke="#1AA752"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-[#1aa752]">
                  FarmCoin
                </h3>
              </div>
              <div className="text-2xl md:text-3xl font-semibold text-[#1aa752] tracking-[-0.64px]">
                {coinBalance?.toLocaleString() || '0'}
              </div>
            </div>
            <button
              className="flex items-center justify-center gap-1 cursor-pointer w-full"
              onClick={() => navigate('/coin-charge')}
            >
              <span className="text-base font-semibold text-[#777777] tracking-[-0.48px]">
                충전하기
              </span>
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
      <div className=" pt-16 md:pt-16">
        {/* 거래 리뷰 */}
        {/* <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-black tracking-[-0.64px]">
            거래 리뷰
          </h2>
          <button
            className="cursor-pointer flex items-center gap-1 text-lg md:text-2xl text-[#777777] tracking-[-0.48px]"
            onClick={() => navigate('/my-all-reviews')}
          >
            전체보기 <ArrowIcon />
          </button>
        </div>
        {profile.reviews && profile.reviews.length > 0 ? (
          <div className="flex flex-col gap-4">
            {profile.reviews.slice(0, 3).map((review) => (
              <ReviewCard
                key={review.id}
                profileUrl={review.authorProfileUrl || '/assets/profile.svg'}
                nickname={review.authorNickname}
                timeAgo={review.timeAgo}
                content={review.content}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">아직 등록된 리뷰가 없습니다.</p>
        )}
      </div>*/}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-black tracking-[-0.64px]">
            거래 리뷰
          </h2>
          <button
            className="cursor-pointer flex items-center gap-1 text-lg md:text-2xl text-[#777777] tracking-[-0.48px]"
            onClick={() => navigate('/my-all-reviews')}
          >
            전체보기 <ArrowIcon />
          </button>
        </div>
        {/* {myReviews && myReviews.length > 0 ? (
          <div className="flex flex-col gap-4">
            {myReviews.slice(0, 3).map((review) => (
              <ReviewCard
                key={review.reviewId}
                profileUrl={'/assets/profile.svg'} // API에 프로필 이미지 없음 → 기본값
                nickname={review.nickname}
                timeAgo={new Date(review.createdAt).toLocaleDateString()} // 간단히 날짜 표시
                content={review.content}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">아직 등록된 리뷰가 없습니다.</p>
        )} */}

        {myReviews && myReviews.length > 0 ? (
          <div className="flex flex-row gap-6">
            {myReviews.slice(0, 3).map((review) => (
              <ReviewCard
                key={review.reviewId}
                profileUrl={review.profileImage || profileImg} // API에 프로필 이미지 없음 → 기본값
                nickname={review.nickname}
                timeAgo={timeAgo(review.createdAt)} // @@일 전
                content={review.content}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">아직 등록된 리뷰가 없습니다.</p>
        )}
      </div>
      {/* 텃밭 탭 & 카드 */}
      <div className="flex flex-col pt-18 gap-2 w-full">
        <h2 className="text-2xl md:text-3xl font-semibold text-black tracking-[-0.64px]">
          텃밭
        </h2>
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
            <div className="relative">
              <button
                className={`px-4 py-2 text-lg md:text-xl font-semibold tracking-[-0.48px] border-b-2 transition-colors ${
                  farmToggle === 'my'
                    ? 'text-black border-[#1aa752]'
                    : 'text-[#bbbbbb] border-transparent'
                }`}
                onClick={() => setFarmToggle('my')}
              >
                내 텃밭
              </button>
            </div>
            <div className="relative">
              <button
                className={`px-4 py-2 text-lg md:text-xl font-semibold tracking-[-0.48px] border-b-2 transition-colors whitespace-nowrap ${
                  farmToggle === 'renting'
                    ? 'text-black border-[#1aa752]'
                    : 'text-[#bbbbbb] border-transparent'
                }`}
                onClick={() => setFarmToggle('renting')}
              >
                대여중인 텃밭
              </button>
            </div>
            <div className="relative">
              <button
                className={`px-4 py-2 text-lg md:text-xl font-semibold tracking-[-0.48px] border-b-2 transition-colors whitespace-nowrap ${
                  farmToggle === 'bookmark'
                    ? 'text-black border-[#1aa752]'
                    : 'text-[#bbbbbb] border-transparent'
                }`}
                onClick={() => setFarmToggle('bookmark')}
              >
                북마크한 텃밭
              </button>
            </div>
          </div>
          <button
            className="cursor-pointer flex items-center gap-1 text-lg md:text-2xl text-[#777777] tracking-[-0.48px]"
            onClick={() => navigate('/my-all-farms')}
          >
            전체보기 <ArrowIcon />
          </button>
        </div>
      </div>
      <div className="h-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
        {farmToggle === 'my'
          ? myFarms.slice(0, 3).map((farm) => (
              <div key={farm.id}>
                <FarmCard farm={farm} />
              </div>
            ))
          : farmToggle === 'renting'
            ? usedFarms.slice(0, 3).map((farm) => (
                <div key={farm.id}>
                  <RentingFarmCard farm={farm} />
                </div>
              ))
            : bookmarkedFarms.slice(0, 3).map((farm) => (
                <div key={farm.id}>
                  <FarmCard farm={farm} />
                </div>
              ))}
      </div>
      {/* 커뮤니티 */}
      <div className="pt-16 md:pt-18">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-2xl md:text-3xl font-semibold text-black tracking-[-0.64px]">
            커뮤니티
          </h2>
          <div className="flex items-end justify-between w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
              <div className="relative">
                <button
                  className={`px-4 py-2 text-lg md:text-xl font-semibold tracking-[-0.48px] border-b-2 transition-colors ${
                    communityToggle === 'written'
                      ? 'text-black border-[#1aa752]'
                      : 'text-[#bbbbbb] border-transparent'
                  }`}
                  onClick={() => setCommunityToggle('written')}
                >
                  작성 글
                </button>
              </div>
              <div className="relative">
                <button
                  className={`px-4 py-2 text-lg md:text-xl font-semibold tracking-[-0.48px] border-b-2 transition-colors whitespace-nowrap ${
                    communityToggle === 'liked'
                      ? 'text-black border-[#1aa752]'
                      : 'text-[#bbbbbb] border-transparent'
                  }`}
                  onClick={() => setCommunityToggle('liked')}
                >
                  좋아요 누른 글
                </button>
              </div>
            </div>
            <button
              className="cursor-pointer flex items-center gap-1 text-lg md:text-2xl text-[#777777] tracking-[-0.48px]"
              onClick={() =>
                navigate('/my-all-community', {
                  state: { initialTab: communityToggle },
                })
              }
            >
              전체보기 <ArrowIcon />
            </button>
          </div>
        </div>
        <div className="h-6"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-24">
          {(communityToggle === 'written' ? myPosts : likedPosts)
            .slice(0, 3)
            .map((post) => (
              <div key={post.id}>
                <CommunityPostCard
                  id={post.id}
                  image={post.thumbnailUrl}
                  username={post.authorNickname}
                  title={post.title}
                  content={post.content}
                  initialLiked={post.liked}
                  createdAt={post.createdAt}
                />
              </div>
            ))}
        </div>
      </div>
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};
