import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from '../components/layouts/Navbar';
import ChatbotIcon from '../components/common/ChatbotIcon';
import FarmReview from '../components/common/FarmReview';
import { fetchFarmById } from '../apis/home';
import { fetchReviewsByFarmId, createReview } from '../apis/reviewApi';
import { toggleBookmark, removeBookmark } from '../apis/bookmark';
import { createChatRoom } from '../apis/chatApi';
import profile from '../assets/profile.png';
import ReviewModal from '../components/common/ReviewModal';

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmData, setFarmData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const location = useLocation();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      return diffHours === 0 ? '방금 전' : `${diffHours}시간 전`;
    }
    return `${diffDays}일 전`;
  };

  // location.state.openReviewModal 이 true면 모달 열기
  useEffect(() => {
    if (location.state?.openReviewModal) {
      setIsReviewModalOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setReviewsLoading(true);

        const farmData = await fetchFarmById(id);
        setFarmData(farmData);

        // 서버에서 받은 북마크 상태 사용
        setIsBookmarked(farmData.bookmarked);

        try {
          const reviewsData = await fetchReviewsByFarmId(id, 'createdAt_desc');
          setReviews(Array.isArray(reviewsData) ? reviewsData : []);
        } catch (reviewError) {
          console.warn('리뷰 데이터 로딩 실패:', reviewError);
          setReviews([]);
        }
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
        setReviewsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBookmarkToggle = async () => {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    const newBookmarkStatus = !isBookmarked;

    try {
      if (isBookmarked) {
        await removeBookmark(id);
      } else {
        await toggleBookmark(id);
      }

      // 서버 API 성공 시 상태 업데이트
      setIsBookmarked(newBookmarkStatus);
    } catch (error) {
      console.error('북마크 처리 실패:', error.message);
      alert(error.message);
    }
  };

  const handleChatButtonClick = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!farmData) {
      alert('매물 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      // 요청 데이터 확인
      console.log('farmData:', farmData);
      console.log('providerId:', farmData.owner?.userId);
      console.log('farmId:', farmData.id);

      // 채팅방 생성
      const response = await createChatRoom({
        providerId: farmData.owner.userId,
        farmId: farmData.id,
      });

      console.log('채팅방 생성 성공:', response);

      // 생성된 채팅방 ID와 함께 채팅 페이지로 이동
      navigate('/chat', {
        state: {
          chatRoomId: response.chatRoomId,
          farmData: farmData,
        },
      });
    } catch (error) {
      console.error('채팅방 생성 실패:', error);
      alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const LocationIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 22C12 22 4 16 4 10C4 5 8 2 12 2C16 2 20 5 20 10C20 16 12 22 12 22ZM12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13Z"
        stroke="#777777"
        strokeWidth="1.5"
      />
    </svg>
  );

  const BookmarkIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 2V22L12 19L19 22V2H5Z"
        fill={isBookmarked ? '#1aa752' : 'none'}
        stroke="#1aa752"
        strokeWidth="1.5"
      />
    </svg>
  );

  const SendIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="#1aa752" />
    </svg>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-white min-h-screen pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[20px] text-[#777777]">로딩 중...</p>
          </div>
        </div>
      </>
    );
  }

  if (!farmData) {
    return (
      <>
        <Navbar />
        <div className="bg-white min-h-screen pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[20px] text-[#777777]">
              텃밭 정보를 찾을 수 없습니다.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        {/* Mobile Layout */}
        <div className="md:hidden pt-20">
          {/* Farm image - 맨 위 */}
          <div className="w-full px-5">
            <div
              className="bg-center bg-cover bg-no-repeat h-64 rounded-lg w-full"
              style={{ 
                backgroundImage: farmData.imageUrls && farmData.imageUrls.length > 0 
                  ? `url('${farmData.imageUrls[0]}')` 
                  : 'none'
              }}
            >
              {(!farmData.imageUrls || farmData.imageUrls.length === 0) && (
                <div className="w-full h-full flex items-center justify-center text-[#777777] rounded-lg bg-[#f5f5f5]">
                  이미지가 없습니다
                </div>
              )}
            </div>
          </div>

          {/* User info + Bookmark - 사진 아래 */}
          <div className="w-full px-5 pt-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                  <div className="relative size-6">
                    <img alt className="block max-w-none size-full rounded-full object-cover" height="24" src={farmData.owner?.profileImage || profile} width="24" />
                  </div>
                  <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic text-[#000000] text-[16px] text-nowrap tracking-[-0.48px]">
                    <p className="leading-[1.5] whitespace-pre">{farmData.owner?.nickname || '윤성'}</p>
                  </div>
                </div>
                <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#777777] text-[12px] text-nowrap tracking-[-0.36px]">
                  <p className="leading-[1.5] whitespace-pre">{farmData?.createdAt ? getTimeDifference(farmData.createdAt) : '1일 전'}</p>
                </div>
              </div>
              <div 
                className="overflow-clip relative shrink-0 size-6 cursor-pointer"
                onClick={handleBookmarkToggle}
              >
                <BookmarkIcon />
              </div>
            </div>
          </div>

          {/* Farm description - User info 아래 */}
          <div className="w-full px-8 pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center text-[20px] tracking-[-0.6px] w-full">
                <p className="leading-[1.5]">{farmData.title}</p>
              </div>
              <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[1.5] text-[14px] tracking-[-0.42px] w-full">
                {farmData.description.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">{line || '\u00A0'}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Info Panel (title 제외) - Farm description 아래 */}
          <div className="w-full px-8 pt-10">
            <div className="flex flex-col gap-8">
              {/* Address */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#777777] text-[14px] tracking-[-0.42px] w-full">
                  <p className="leading-[1.5]">주소</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="overflow-clip relative shrink-0 size-6">
                    <LocationIcon />
                  </div>
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#000000] text-[16px] text-nowrap tracking-[-0.48px]">
                    <p className="leading-[1.5] whitespace-pre">{farmData.address}</p>
                  </div>
                </div>
              </div>

              {/* Rental cost */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#777777] text-[14px] tracking-[-0.42px] w-full">
                  <p className="leading-[1.5]">대여 비용</p>
                </div>
                <div className="flex gap-1 items-end">
                  <div className="flex gap-0.5 items-end leading-[0] not-italic">
                    <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center text-[#1aa752] text-[24px] text-nowrap tracking-[-0.48px]">
                      <p className="leading-[1.5] whitespace-pre">{farmData.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] h-8 justify-center text-[#000000] text-[20px] tracking-[-0.6px] w-[18px]">
                      <p className="leading-[1.5]">원</p>
                    </div>
                  </div>
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] h-[33px] justify-center leading-[0] not-italic text-[#000000] text-[20px] tracking-[-0.6px] w-[7px]">
                    <p className="leading-[1.5]">/</p>
                  </div>
                  <div className="flex gap-0.5 h-8 items-center leading-[0] not-italic text-[#000000] text-[20px] text-nowrap tracking-[-0.6px]">
                    <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center">
                      <p className="leading-[1.5] text-nowrap whitespace-pre">{farmData.rentalPeriod}</p>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center">
                      <p className="leading-[1.5] text-nowrap whitespace-pre">일</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Area and Theme */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-[104px]">
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#777777] text-[14px] tracking-[-0.42px] w-full">
                    <p className="leading-[1.5]">평수</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 items-start">
                      <div className="flex gap-1 items-center">
                        <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic text-[#000000] text-[20px] text-nowrap tracking-[-0.6px]">
                          <p className="leading-[1.5] whitespace-pre">{farmData.size}</p>
                        </div>
                      </div>
                      <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#000000] text-[20px] text-nowrap tracking-[-0.6px]">
                        <p className="leading-[1.5] whitespace-pre">㎡</p>
                      </div>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#777777] text-[12px] text-nowrap tracking-[-0.36px]">
                      <p className="leading-[1.5] whitespace-pre">교실 크기</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#777777] text-[14px] tracking-[-0.42px] w-full">
                    <p className="leading-[1.5]">테마</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-4 items-center">
                      <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic text-[#111111] text-[20px] text-nowrap tracking-[-0.6px]">
                        <p className="leading-[1.5] whitespace-pre">{farmData.theme}</p>
                      </div>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#777777] text-[12px] text-nowrap tracking-[-0.36px]">
                      <p className="leading-[1.5] whitespace-pre">아파트 및 건물 옥상, 지붕 위 공간</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews section - Info Panel 아래 */}
          <div className="w-full px-8 pt-12 ">
            <FarmReview 
              farmId={id}
              reviews={reviews} 
              loading={reviewsLoading}
              onReviewsUpdate={setReviews}
            />
          </div>

          {/* Chat button - 리뷰 바로 아래 */}
          <div className="w-full px-8 pt-8 pb-25">
            <button 
              className="w-full bg-[#1aa752] text-white text-[20px] font-semibold py-4 rounded-lg"
              onClick={handleChatButtonClick}
            >
              채팅하기
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative w-full min-h-screen">
          {/* 기존 데스크톱 레이아웃 유지 */}
          <div className="absolute box-border content-stretch flex flex-row items-center left-40 p-0 top-36">
            <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
              <div className="box-border content-stretch flex flex-row gap-3 items-center justify-center p-0 relative shrink-0">
                <div className="relative shrink-0 size-12">
                  <img
                    src={farmData.owner?.profileImage || profile}
                    alt="profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                  <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
                    {farmData.owner?.nickname}
                  </p>
                </div>
              </div>
              <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[16px] text-left text-nowrap tracking-[-0.48px]">
                <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
                  {farmData?.createdAt
                    ? getTimeDifference(farmData.createdAt)
                    : '1일 전'}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute box-border content-stretch flex flex-col gap-12 items-start justify-start left-40 p-0 top-56">
            {/* Farm image */}
            <div
              className="bg-center bg-cover bg-no-repeat h-[588px] rounded-2xl shrink-0 w-[739px]"
              style={{
                backgroundImage:
                  farmData.imageUrls && farmData.imageUrls.length > 0
                    ? `url('${farmData.imageUrls[0]}')`
                    : 'none',
              }}
            >
              {(!farmData.imageUrls || farmData.imageUrls.length === 0) && (
                <div className="w-full h-full flex items-center justify-center text-[#777777]">
                  이미지가 없습니다
                </div>
              )}
            </div>

            {/* Farm description */}
            <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#111111] text-left w-full">
              <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0 text-[36px] tracking-[-0.72px] w-full">
                <p className="block leading-[1.5]">{farmData.title}</p>
              </div>
              <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[1.5] relative shrink-0 text-[20px] tracking-[-0.6px] w-full">
                {farmData.description.split('\n').map((line, index) => (
                  <p key={index} className="block mb-0">
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Bookmark */}
          <div className="absolute top-36" style={{ left: "calc(83.333% - 30px)" }}>
            <div 
              className="overflow-clip relative shrink-0 size-6 cursor-pointer"
              onClick={handleBookmarkToggle}
            >
              <BookmarkIcon />
            </div>
          </div>

          {/* Right Column - Info Panel */}
          <div className="absolute box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 top-56 w-[338px]" style={{ left: "calc(66.667% - 18px)" }}>
            <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[32px] text-left tracking-[-0.64px] w-full">
              <p className="block leading-[1.5]">{farmData.title}</p>
            </div>
            <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-full">
              {/* Address */}
              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[273px]">
                <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[16px] text-left tracking-[-0.48px] w-full">
                  <p className="block leading-[1.5]">주소</p>
                </div>
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full">
                  <div className="overflow-clip relative shrink-0 size-6">
                    <LocationIcon />
                  </div>
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[20px] text-left tracking-[-0.6px]">
                    <p className="adjustLetterSpacing block leading-[1.5]">
                      {farmData.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rental cost */}
              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[181px]">
                <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[16px] text-left tracking-[-0.48px] w-full">
                  <p className="block leading-[1.5]">대여 비용</p>
                </div>
                <div className="box-border content-stretch flex flex-row gap-2 items-end justify-start p-0 relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-row gap-1 items-end justify-start leading-[0] not-italic p-0 relative shrink-0 text-left">
                    <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] h-[31px] justify-center relative shrink-0 text-[#1aa752] text-[32px] tracking-[-0.64px] w-[86px]">
                      <p className="adjustLetterSpacing block leading-[1.5]">
                        {farmData.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] h-8 justify-center relative shrink-0 text-[#000000] text-[24px] tracking-[-0.48px] w-[18px]">
                      <p className="adjustLetterSpacing block leading-[1.5]">
                        원
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] h-[33px] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[20px] text-left tracking-[-0.6px] w-[7px]">
                    <p className="adjustLetterSpacing block leading-[1.5]">/</p>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-1 h-8 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                    <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0">
                      <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                        {farmData.rentalPeriod}
                      </p>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center relative shrink-0">
                      <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                        일
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Area and Theme */}
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full">
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[104px]">
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[16px] text-left tracking-[-0.48px] w-full">
                    <p className="block leading-[1.5]">평수</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0">
                      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
                        <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                          <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
                            {farmData.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
                          ㎡
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                      <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
                        교실 크기
                      </p>
                    </div>
                  </div>
                </div>
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[213px]">
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[16px] text-left tracking-[-0.48px] w-full">
                    <p className="block leading-[1.5]">테마</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
                      <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
                          {farmData.theme}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                      <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">아파트 및 건물 옥상, 지붕 위 공간</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat button */}
          <div
            className="absolute bg-[#1aa752] box-border content-stretch flex flex-col gap-2.5 items-center justify-center pl-7 pr-6 py-3 rounded-[100px] top-[752px] cursor-pointer"
            style={{ left: 'calc(83.333% - 78px)' }}
            onClick={handleChatButtonClick}
          >
            <div className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0">
              <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">채팅하기</p>
              </div>
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[180deg]">
                  <div className="relative size-6">
                    <SendIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews section */}
          <div
            className="absolute top-[873px]"
            style={{ left: 'calc(66.667% - 13px)' }}
          >
            <FarmReview
              farmId={id}
              reviews={reviews}
              loading={reviewsLoading}
              onReviewsUpdate={setReviews}
            />
          </div>

          <ChatbotIcon />
        </div>
        {/* ✅ 리뷰 모달을 여기 추가 */}
        {/* <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={(reviewText) => {
            console.log('리뷰 제출:', reviewText);
            setReviews((prev) => [
              { id: Date.now(), content: reviewText, createdAt: new Date() },
              ...prev,
            ]);
          }}
        /> */}

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={async (reviewText) => {
            try {
              if (!id) return;

              // 서버에 리뷰 생성
              const newReview = await createReview(id, reviewText);
              console.log('리뷰 제출 성공:', newReview);

              // 화면에 바로 반영
              setReviews((prev) => [newReview, ...prev]);

              // 모달 닫기
              setIsReviewModalOpen(false);
            } catch (error) {
              console.error('리뷰 생성 실패:', error);
              alert('리뷰 등록에 실패했습니다.');
            }
          }}
        />

        {/* Bottom spacing */}
        <div className="h-32"></div>
      </div>
    </>
  );
};

export default PlantDetail;