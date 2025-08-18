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
            <p className="text-[20px] text-[#777777]">텃밭 정보를 찾을 수 없습니다.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="relative w-full min-h-screen">
          
          {/* User info */}
          <div className="absolute box-border content-stretch flex flex-row items-center left-40 p-0 top-36">
            <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
              <div className="box-border content-stretch flex flex-row gap-3 items-center justify-center p-0 relative shrink-0">
                <div className="relative shrink-0 size-12">
                  <div className="w-12 h-12 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                    <span className="text-[20px] font-semibold text-[#777777]">
                      {farmData.user?.nickname?.charAt(0) || '농'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                  <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">{farmData.user?.nickname || '윤성'}</p>
                </div>
              </div>
              <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[16px] text-left text-nowrap tracking-[-0.48px]">
                <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">1일 전</p>
              </div>
            </div>
          </div>

          <div className="absolute box-border content-stretch flex flex-col gap-12 items-start justify-start left-40 p-0 top-56">
            {/* Farm image */}
            <div
              className="bg-center bg-cover bg-no-repeat h-[588px] rounded-2xl shrink-0 w-[739px]"
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
            <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#111111] text-left w-full">
              <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0 text-[36px] tracking-[-0.72px] w-full">
                <p className="block leading-[1.5]">{farmData.title}</p>
              </div>
              <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[1.5] relative shrink-0 text-[20px] tracking-[-0.6px] w-full">
                {farmData.description.split('\n').map((line, index) => (
                  <p key={index} className="block mb-0">{line || '\u00A0'}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Bookmark - Same line as user info, above right column */}
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
            {/* Title */}
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
                    <p className="adjustLetterSpacing block leading-[1.5]">{farmData.address}</p>
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
                      <p className="adjustLetterSpacing block leading-[1.5]">{farmData.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] h-8 justify-center relative shrink-0 text-[#000000] text-[24px] tracking-[-0.48px] w-[18px]">
                      <p className="adjustLetterSpacing block leading-[1.5]">원</p>
                    </div>
                  </div>
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] h-[33px] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[20px] text-left tracking-[-0.6px] w-[7px]">
                    <p className="adjustLetterSpacing block leading-[1.5]">/</p>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-1 h-8 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                    <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0">
                      <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">{farmData.rentalPeriod}</p>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center relative shrink-0">
                      <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">일</p>
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
                          <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">{farmData.size}</p>
                        </div>
                      </div>
                      <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">㎡</p>
                      </div>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                      <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">교실 크기</p>
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
                        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">{farmData.theme}</p>
                      </div>
                    </div>
                    <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                      <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
                        아파트 및 건물 옥상, 지붕 위 공간
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Chat button */}
          <div 
            className="absolute bg-[#1aa752] box-border content-stretch flex flex-col gap-2.5 items-center justify-center pl-7 pr-6 py-3 rounded-[100px] top-[752px] cursor-pointer"
            style={{ left: "calc(83.333% - 78px)" }}
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
          <div className="absolute box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 top-[873px] w-[333px]" style={{ left: "calc(66.667% - 13px)" }}>
            <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[24px] text-left tracking-[-0.48px] w-full">
              <p className="block leading-[1.5]">텃밭 리뷰</p>
            </div>
            <div className="box-border content-stretch flex flex-col gap-16 items-start justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-2 items-end justify-start p-0 relative shrink-0 w-full">
                <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-[333px]">
                  <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 cursor-pointer">
                    <div className="relative shrink-0 size-1">
                      <div className="w-1 h-1 bg-neutral-900 rounded-full"></div>
                    </div>
                    <div className="font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-left text-neutral-900 text-nowrap tracking-[-0.42px]">
                      <p className="[text-overflow:inherit] adjustLetterSpacing block leading-[1.5] overflow-inherit whitespace-pre">최신순</p>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 cursor-pointer">
                    <div className="relative shrink-0 size-1">
                      <div className="w-1 h-1 bg-[#bbbbbb] rounded-full"></div>
                    </div>
                    <div className="font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#bbbbbb] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                      <p className="[text-overflow:inherit] adjustLetterSpacing block leading-[1.5] overflow-inherit whitespace-pre">등록순</p>
                    </div>
                  </div>
                </div>
                    
                {/* Review items */}
                <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-[333px]">
                  <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-end justify-start px-0 py-4 relative shrink-0 w-full">
                      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0">
                          <div className="relative shrink-0 size-8">
                            <div className="w-8 h-8 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                              <span className="text-[14px] font-semibold text-[#777777]">준</span>
                            </div>
                          </div>
                          <div className="box-border content-stretch flex flex-row gap-2 items-end justify-center p-0 relative shrink-0">
                            <div className="font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-left text-neutral-900 text-nowrap tracking-[-0.48px]">
                              <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">준희</p>
                            </div>
                            <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
                              <div className="font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#bbbbbb] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                                <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">1시간 전</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#777777] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                          <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">삭제</p>
                        </div>
                      </div>
                      <div className="font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-left text-neutral-900 tracking-[-0.48px] w-[293px]">
                        <p className="adjustLetterSpacing block leading-[1.5]">
                          햇빛이 하루 종일 잘 들어서 상추가 쑥쑥 자라요! 물주기만 잘하면 채소 키우기 너무 쉬운 공간이었어요.
                          사장님도 친절하시고요.
                        </p>
                      </div>
                    </div>
                    <div className="box-border content-stretch flex flex-col gap-2 items-end justify-start px-0 py-4 relative shrink-0 w-full">
                      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0">
                          <div className="relative shrink-0 size-8">
                            <div className="w-8 h-8 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                              <span className="text-[14px] font-semibold text-[#777777]">승</span>
                            </div>
                          </div>
                          <div className="box-border content-stretch flex flex-row gap-2 items-end justify-center leading-[0] not-italic p-0 relative shrink-0 text-left text-nowrap">
                            <div className="font-['Pretendard:SemiBold',_sans-serif] relative shrink-0 text-[16px] text-neutral-900 tracking-[-0.48px]">
                              <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">승주</p>
                            </div>
                            <div className="font-['Pretendard:Regular',_sans-serif] relative shrink-0 text-[#bbbbbb] text-[14px] tracking-[-0.42px]">
                              <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">1일 전</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-left text-neutral-900 tracking-[-0.48px] w-[293px]">
                        <p className="adjustLetterSpacing block leading-[1.5]">
                          도심 한복판에 이런 곳이 있을 줄이야.. 회사 끝나고 들르기 좋은 위치라서 평일에도 종종 왔습니다.
                          덕분에 마음이 한결 편해졌어요.
                        </p>
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
      </div>
    </>
  );
};

export default PlantDetail;
