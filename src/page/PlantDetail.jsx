import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from '../components/layouts/Navbar';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { fetchFarmById } from '../apis/home';

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        setLoading(true);
        const data = await fetchFarmById(id);
        setFarmData(data);
        setIsBookmarked(data.isBookmarked || false);
      } catch (error) {
        console.error('텃밭 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFarmData();
    }
  }, [id]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleChatButtonClick = () => {
    navigate('/chat');
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      console.log('리뷰 제출:', reviewText);
      setReviewText('');
    }
  };

  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C12 22 4 16 4 10C4 5 8 2 12 2C16 2 20 5 20 10C20 16 12 22 12 22ZM12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13Z" stroke="#777777" strokeWidth="1.5"/>
    </svg>
  );

  const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path 
        d="M5 2V22L12 19L19 22V2H5Z"  
        fill={isBookmarked ? "#1aa752" : "none"}
        stroke="#1aa752"
        strokeWidth="1.5"
      />
    </svg>
  );

  const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="#1aa752"/>
    </svg>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-white min-h-screen pt-20 flex items-center justify-center">
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
        <div className="bg-white min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[20px] text-[#777777]">텃밭 정보를 찾을 수 없습니다.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen pt-20">
        <div className="max-w-[1440px] mx-auto px-40 py-8">
          
          {/* User info and bookmark */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative size-12">
                  <div className="w-12 h-12 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                    <span className="text-[20px] font-semibold text-[#777777]">
                      {farmData.user?.nickname?.charAt(0) || '농'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col font-semibold justify-center text-black text-[24px]">
                  <p className="block leading-[1.5]">{farmData.user?.nickname || '농부'}</p>
                </div>
              </div>
              <div className="flex flex-col font-normal justify-center text-[#777777] text-[16px]">
                <p className="block leading-[1.5]">
                  {new Date(farmData.createdAt).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div 
              className="cursor-pointer p-2"
              onClick={handleBookmarkToggle}
            >
              <BookmarkIcon />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="col-span-2 space-y-12">
              {/* Farm image */}
              <div
                className="bg-center bg-cover bg-no-repeat h-[588px] rounded-2xl w-full bg-[#f7f7f7]"
                style={{ 
                  backgroundImage: farmData.imageUrls && farmData.imageUrls.length > 0 
                    ? `url('${farmData.imageUrls[0]}')` 
                    : 'none'
                }}
              >
                {(!farmData.imageUrls || farmData.imageUrls.length === 0) && (
                  <div className="w-full h-full flex items-center justify-center text-[#777777]">
                    이미지가 없습니다
                  </div>
                )}
              </div>
              
              {/* Farm description */}
              <div className="space-y-8 text-[#111111]">
                <div className="font-semibold text-[36px] leading-[1.5] tracking-[-0.72px]">
                  <h1>{farmData.title}</h1>
                </div>
                <div className="font-normal text-[20px] leading-[1.5] tracking-[-0.6px]">
                  <p>{farmData.description}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Info Panel */}
            <div className="space-y-8">
              {/* Address */}
              <div className="space-y-2">
                <div className="font-normal text-[#777777] text-[16px] leading-[1.5] tracking-[-0.48px]">
                  <p>주소</p>
                </div>
                <div className="flex items-center gap-2">
                  <LocationIcon />
                  <div className="font-normal text-black text-[20px] leading-[1.5] tracking-[-0.6px]">
                    <p>{farmData.address}</p>
                  </div>
                </div>
              </div>

              {/* Rental cost */}
              <div className="space-y-2">
                <div className="font-normal text-[#777777] text-[16px] leading-[1.5] tracking-[-0.48px]">
                  <p>대여 비용</p>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex items-end gap-1">
                    <div className="font-semibold text-[#1aa752] text-[32px] leading-[1.5] tracking-[-0.64px]">
                      <p>{farmData.price.toLocaleString()}</p>
                    </div>
                    <div className="font-normal text-black text-[24px] leading-[1.5] tracking-[-0.48px]">
                      <p>원</p>
                    </div>
                  </div>
                  <div className="font-normal text-black text-[20px] leading-[1.5] tracking-[-0.6px]">
                    <p>/</p>
                  </div>
                  <div className="flex items-center gap-1 text-black text-[24px] leading-[1.5] tracking-[-0.48px]">
                    <div className="font-semibold">
                      <p>{farmData.rentalPeriod}</p>
                    </div>
                    <div className="font-normal">
                      <p>일</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Area and Theme */}
              <div className="flex gap-4">
                <div className="space-y-2 w-[104px]">
                  <div className="font-normal text-[#777777] text-[16px] leading-[1.5] tracking-[-0.48px]">
                    <p>평수</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <div className="font-semibold text-black text-[24px] leading-[1.5] tracking-[-0.48px]">
                        <p>{farmData.size}</p>
                      </div>
                      <div className="font-normal text-black text-[24px] leading-[1.5] tracking-[-0.48px]">
                        <p>㎡</p>
                      </div>
                    </div>
                    <div className="font-normal text-[#777777] text-[14px] leading-[1.5] tracking-[-0.42px]">
                      <p>교실 크기</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="font-normal text-[#777777] text-[16px] leading-[1.5] tracking-[-0.48px]">
                    <p>테마</p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-[#111111] text-[24px] leading-[1.5] tracking-[-0.48px]">
                      <p>{farmData.theme}</p>
                    </div>
                    <div className="font-normal text-[#777777] text-[14px] leading-[1.5] tracking-[-0.42px]">
                      <p>
                        {farmData.theme === '옥상' && '아파트 및 건물 옥상, 지붕 위 공간'}
                        {farmData.theme === '공터' && '건물 옆 자투리 공간, 쓰임 없는 부지'}
                        {farmData.theme === '화단' && '아파트 단지 내 화단, 빌라 현관 앞 꽃밭'}
                        {farmData.theme === '공원' && '공원 내 공공 텃밭, 산책로 옆 잔디'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat button */}
              <div 
                className="bg-[#1aa752] flex items-center justify-center gap-2 py-3 px-7 rounded-[100px] cursor-pointer"
                onClick={handleChatButtonClick}
              >
                <div className="font-normal text-white text-[24px] leading-[1.5] tracking-[-0.48px]">
                  <p>채팅하기</p>
                </div>
                <div className="rotate-180">
                  <SendIcon />
                </div>
              </div>

              {/* Reviews section */}
              <div className="space-y-8">
                <div className="font-semibold text-[#111111] text-[24px] leading-[1.5] tracking-[-0.48px]">
                  <p>텃밭 리뷰</p>
                </div>
                <div className="space-y-16">
                  <div className="space-y-2">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-neutral-900 rounded-full"></div>
                        <div className="font-normal text-[14px] text-neutral-900 leading-[1.5] tracking-[-0.42px]">
                          <p>등록순</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-[#bbbbbb] rounded-full"></div>
                        <div className="font-normal text-[#bbbbbb] text-[14px] leading-[1.5] tracking-[-0.42px]">
                          <p>최신순</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Review items */}
                    <div className="bg-white rounded-t-[8px] space-y-2">
                      <div className="py-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                              <span className="text-[14px] font-semibold text-[#777777]">준</span>
                            </div>
                            <div className="flex items-end gap-2">
                              <div className="font-semibold text-[16px] text-neutral-900 leading-[1.5] tracking-[-0.48px]">
                                <p>준희</p>
                              </div>
                              <div className="font-normal text-[#bbbbbb] text-[14px] leading-[1.5] tracking-[-0.42px]">
                                <p>1시간 전</p>
                              </div>
                            </div>
                          </div>
                          <div className="font-normal text-[#777777] text-[14px] leading-[1.5] tracking-[-0.42px]">
                            <p>삭제</p>
                          </div>
                        </div>
                        <div className="font-normal text-[16px] text-neutral-900 leading-[1.5] tracking-[-0.48px]">
                          <p>햇빛이 하루 종일 잘 들어서 상추가 쑥쑥 자라요! 물주기만 잘하면 채소 키우기 너무 쉬운 공간이었어요. 사장님도 친절하시고요.</p>
                        </div>
                      </div>
                      <div className="py-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                              <span className="text-[14px] font-semibold text-[#777777]">승</span>
                            </div>
                            <div className="flex items-end gap-2">
                              <div className="font-semibold text-[16px] text-neutral-900 leading-[1.5] tracking-[-0.48px]">
                                <p>승주</p>
                              </div>
                              <div className="font-normal text-[#bbbbbb] text-[14px] leading-[1.5] tracking-[-0.42px]">
                                <p>1일 전</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="font-normal text-[16px] text-neutral-900 leading-[1.5] tracking-[-0.48px]">
                          <p>도심 한복판에 이런 곳이 있을 줄이야.. 회사 끝나고 들르기 좋은 위치라서 평일에도 종종 왔습니다. 덕분에 마음이 한결 편해졌어요.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Review input */}
                  <div className="flex items-center justify-between h-14 pl-8 pr-6 rounded-[100px] border border-[#1aa752]">
                    <input
                      type="text"
                      placeholder="리뷰를 입력하세요."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="flex-1 font-normal text-[#bbbbbb] text-[16px] leading-[1.5] tracking-[-0.48px] bg-transparent outline-none placeholder-[#bbbbbb]"
                    />
                    <div 
                      className="cursor-pointer size-8 flex items-center justify-center"
                      onClick={handleReviewSubmit}
                    >
                      <SendIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ChatbotIcon */}
        <ChatbotIcon />
      </div>
    </>
  );
};

export default PlantDetail;
