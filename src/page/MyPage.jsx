// src/page/MyPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/mypage.module.css';
import ChatbotIcon from '../components/common/ChatbotIcon';
import setting from '../assets/setting.svg';
import RentingFarmCard from '../components/common/Card/RentingFarmCard';
import FarmCard from '../components/common/Card/FarmCard';
import CommunityPostCard from '../components/common/Card/CommunityPostCard';

import {
  useProfile,
  useMyFarms,
  useUsedFarms,
  useBookmarkedFarms,
  useMyPosts,
  useLikedPosts,
  useEcoScore,
} from '../hooks/useMyPage';

export const MyPage = () => {
  const navigate = useNavigate();
  const [farmToggle, setFarmToggle] = useState('my');
  const [communityToggle, setCommunityToggle] = useState('written');

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
  if (
    profileLoading ||
    myFarmsLoading ||
    usedFarmsLoading ||
    bookmarkedFarmsLoading ||
    myPostsLoading ||
    likedPostsLoading ||
    ecoScoreLoading
  ) {
    return <p className="pl-40 pt-20">로딩 중...</p>;
  }

  if (profileError) {
    return (
      <p className="pl-40 pt-20 text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </p>
    );
  }

  if (!profile) {
    return <p className="pl-40 pt-20">로그인이 필요합니다.</p>;
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
    <div>
      {/* 프로필 영역 */}
      <div className="flex pt-32">
        <div className="flex pt-12 pl-40 w-full h-[336px] relative">
          <img
            className="w-60 h-60 rounded-full"
            src={profile.imageUrl || '/assets/profile.svg'}
            alt="Profile"
          />
          <div className="flex flex-col pl-[46px] pt-[43px] items-start">
            <div className="flex items-center gap-4">
              <h1 className={styles.nickname}>{profile.nickname}</h1>
            </div>
            <p className={styles.location}>{profile.address}</p>
            <div className="flex items-center gap-x-4 pt-1">
              <p className={styles.ecoScore}>친환경 점수</p>
              <p className={styles.ecoScoreValue}>{ecoScore}점</p>
            </div>
          </div>

          {/* 로그아웃 & 설정 버튼 */}
          <div className="absolute top-4 right-6 mt-12 flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold cursor-pointer"
            >
              로그아웃
            </button>
            <img
              src={setting}
              alt="설정"
              className="mr-40 w-6 h-6 cursor-pointer"
              onClick={() => navigate('/setting')}
            />
          </div>
        </div>
      </div>

      <div className="pl-40 pr-40 pt-18">
        {/* 거래 리뷰 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className={styles.tradeReviewTitle}>거래 리뷰</h1>
          <button
            className="cursor-pointer flex items-center gap-1"
            style={{
              color: '#777777',
              fontFamily: 'Pretendard',
              fontSize: '24px',
              fontWeight: 400,
              lineHeight: '150%',
              letterSpacing: '-0.48px',
            }}
            onClick={() => navigate('/my-all-reviews')}
          >
            전체보기 <ArrowIcon />
          </button>
        </div>
        <p className="text-gray-500 mb-16">아직 등록된 리뷰가 없습니다.</p>

        {/* 텃밭 탭 & 카드 */}
        <div className="box-border flex flex-col gap-2 items-start w-full">
          <div className="flex flex-col font-['Pretendard'] font-semibold text-[#000000] text-[32px] tracking-[-0.64px] w-full">
            <p className="block">텃밭</p>
          </div>
          <div className="box-border content-stretch flex flex-row items-end justify-between p-0 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-row items-center justify-start leading-[0] p-0 relative shrink-0">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 relative w-60">
                  <div
                    aria-hidden="true"
                    className={`absolute border-solid inset-0 pointer-events-none ${
                      farmToggle === 'my'
                        ? 'border-[#1aa752] border-[0px_0px_4px]'
                        : 'border-transparent'
                    }`}
                  />
                </div>
                <button
                  className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold h-[38.4px] justify-center leading-[0] ml-[87px] mt-[32.2px] not-italic relative text-[24px] text-left tracking-[-0.48px] translate-y-[-50%] w-[67px] cursor-pointer"
                  style={{ color: farmToggle === 'my' ? '#000000' : '#bbbbbb' }}
                  onClick={() => setFarmToggle('my')}
                >
                  <p className="block leading-[1.5] whitespace-pre">내 텃밭</p>
                </button>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 w-60">
                  <div
                    aria-hidden="true"
                    className={`absolute border-solid inset-0 pointer-events-none ${
                      farmToggle === 'renting'
                        ? 'border-[#1aa752] border-[0px_0px_4px]'
                        : 'border-transparent'
                    }`}
                  />
                </div>
                <button
                  className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold justify-center leading-[0] ml-14 mt-8 not-italic relative text-[24px] text-left text-nowrap tracking-[-0.48px] translate-y-[-50%] cursor-pointer"
                  style={{
                    color: farmToggle === 'renting' ? '#000000' : '#bbbbbb',
                  }}
                  onClick={() => setFarmToggle('renting')}
                >
                  <p className="block leading-[1.5] whitespace-pre">
                    대여중인 텃밭
                  </p>
                </button>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 w-60">
                  <div
                    aria-hidden="true"
                    className={`absolute border-solid inset-0 pointer-events-none ${
                      farmToggle === 'bookmark'
                        ? 'border-[#1aa752] border-[0px_0px_4px]'
                        : 'border-transparent'
                    }`}
                  />
                </div>
                <button
                  className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold justify-center leading-[0] ml-14 mt-8 not-italic relative text-[24px] text-left text-nowrap tracking-[-0.48px] translate-y-[-50%] cursor-pointer"
                  style={{
                    color: farmToggle === 'bookmark' ? '#000000' : '#bbbbbb',
                  }}
                  onClick={() => setFarmToggle('bookmark')}
                >
                  <p className="block leading-[1.5] whitespace-pre">
                    북마크한 텃밭
                  </p>
                </button>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
              <button
                className="cursor-pointer flex items-center gap-1"
                style={{
                  color: '#777777',
                  fontFamily: 'Pretendard',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '150%',
                  letterSpacing: '-0.48px',
                }}
                onClick={() => navigate('/my-all-farms')}
              >
                전체보기 <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="h-6"></div>

        <div className="flex gap-6 mb-16">
          {farmToggle === 'my'
            ? myFarms.slice(0, 3).map((farm) => (
                <div
                  key={farm.id}
                  className="flex-none"
                  style={{ width: 'calc(33.333% - 16px)' }}
                >
                  <FarmCard farm={farm} />
                </div>
              ))
            : farmToggle === 'renting'
              ? usedFarms.slice(0, 3).map((farm) => (
                  <div
                    key={farm.id}
                    className="flex-none"
                    style={{ width: 'calc(33.333% - 16px)' }}
                  >
                    <RentingFarmCard farm={farm} />
                  </div>
                ))
              : bookmarkedFarms.slice(0, 3).map((farm) => (
                  <div
                    key={farm.id}
                    className="flex-none"
                    style={{ width: 'calc(33.333% - 16px)' }}
                  >
                    <FarmCard farm={farm} />
                  </div>
                ))}
        </div>

        {/* 커뮤니티 */}
        <div className="pt-18">
          <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="flex flex-col font-['Pretendard'] font-semibold justify-center leading-[1.5] not-italic relative shrink-0 text-[#000000] text-[32px] text-left tracking-[-0.64px] w-full">
              <p className="block">커뮤니티</p>
            </div>
            <div className="box-border content-stretch flex flex-row items-end justify-between p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-row items-center justify-start leading-[0] p-0 relative shrink-0">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                  <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 relative w-60">
                    <div
                      aria-hidden="true"
                      className={`absolute border-solid inset-0 pointer-events-none ${
                        communityToggle === 'written'
                          ? 'border-[#1aa752] border-[0px_0px_4px]'
                          : 'border-transparent'
                      }`}
                    />
                  </div>
                  <button
                    className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold h-[38.4px] justify-center leading-[0] ml-[87px] mt-[32.2px] not-italic relative text-[24px] text-left tracking-[-0.48px] translate-y-[-50%] w-[67px] cursor-pointer"
                    style={{
                      color:
                        communityToggle === 'written' ? '#000000' : '#bbbbbb',
                    }}
                    onClick={() => setCommunityToggle('written')}
                  >
                    <p className="block leading-[1.5] whitespace-pre">
                      작성 글
                    </p>
                  </button>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                  <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 w-60">
                    <div
                      aria-hidden="true"
                      className={`absolute border-solid inset-0 pointer-events-none ${
                        communityToggle === 'liked'
                          ? 'border-[#1aa752] border-[0px_0px_4px]'
                          : 'border-transparent'
                      }`}
                    />
                  </div>
                  <button
                    className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold justify-center leading-[0] ml-14 mt-8 not-italic relative text-[24px] text-left text-nowrap tracking-[-0.48px] translate-y-[-50%] cursor-pointer"
                    style={{
                      color:
                        communityToggle === 'liked' ? '#000000' : '#bbbbbb',
                    }}
                    onClick={() => setCommunityToggle('liked')}
                  >
                    <p className="block leading-[1.5] whitespace-pre">
                      좋아요 누른 글
                    </p>
                  </button>
                </div>
              </div>
              <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
                <button
                  className="cursor-pointer flex items-center gap-1"
                  style={{
                    color: '#777777',
                    fontFamily: 'Pretendard',
                    fontSize: '24px',
                    fontWeight: 400,
                    lineHeight: '150%',
                    letterSpacing: '-0.48px',
                  }}
                  onClick={() => navigate('/my-all-community')}
                >
                  전체보기 <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="h-6"></div>

          <div className="flex gap-6 mb-24">
            {(communityToggle === 'written' ? myPosts : likedPosts)
              .slice(0, 3)
              .map((post) => (
                <div
                  key={post.id}
                  className="flex-none"
                  style={{ width: 'calc(33.333% - 16px)' }}
                >
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
      </div>

      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};
