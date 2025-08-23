import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from '../components/layouts/Navbar';
import ChatbotIcon from '../components/common/ChatbotIcon';
import PaymentSection from '../components/common/PaymentSection';
import { getChatRoomFarm } from '../apis/chatApi';

const CreditPage = () => {
  const { chatRoomId } = useParams(); // URL에서 chatRoomId를 받음
  const navigate = useNavigate();
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (chatRoomId) {
          // 채팅방 텃밭 정보 조회 API 사용
          const response = await getChatRoomFarm(chatRoomId);
          // API 응답에서 farm 객체를 추출하고 필요한 필드 추가
          const farmData = {
            ...response.farm,
            // thumbnailUrl을 imageUrls 배열로 변환
            imageUrls: response.farm.thumbnailUrl ? [response.farm.thumbnailUrl] : [],
            // description이 null인 경우 기본값 설정
            description: response.farm.description || "텃밭에 대한 설명이 없습니다.",
            // owner 정보가 없는 경우 기본값 설정 (provider 정보 활용 가능)
            owner: response.provider || { userId: null, nickname: "농장주" },
            // 기본값들 설정
            createdAt: response.createdAt,
            updatedTime: null,
            bookmarked: false,
            isAvailable: true
          };
          setFarmData(farmData);
        } else {
          // chatRoomId가 없는 경우 임시 데이터 사용
          setFarmData({
            id: 1,
            title: "도심 속 힐링 텃밭",
            description: "도심에서 즐기는 작은 텃밭 체험\n직접 키운 채소를 수확하는 기쁨을 느껴보세요.\n친환경적이고 건강한 농업 체험이 가능합니다.",
            imageUrls: [],
            address: "서울특별시 강남구 테헤란로 123",
            price: 50000,
            rentalPeriod: 30,
            size: 10,
            theme: "옥상텃밭",
            owner: {
              userId: 1,
              nickname: "농부"
            },
            createdAt: new Date().toISOString(),
            updatedTime: null,
            bookmarked: false,
            isAvailable: true
          });
        }
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chatRoomId]);

  const handleChatButtonClick = () => {
    navigate('/chat');
  };

  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C12 22 4 16 4 10C4 5 8 2 12 2C16 2 20 5 20 10C20 16 12 22 12 22ZM12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13Z" stroke="#777777" strokeWidth="1.5"/>
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
          
          {/* Payment title */}
          <div className="absolute box-border content-stretch flex flex-row items-center left-40 p-0 top-36">
            <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap tracking-[-0.48px]">
              <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">결제하기</p>
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

            {/* Chat button - changed text */}
            <div 
              className="bg-[#1aa752] box-border content-stretch flex flex-col gap-2.5 items-center justify-center pl-7 pr-6 py-3 rounded-[100px] cursor-pointer"
              onClick={handleChatButtonClick}
            >
              <div className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0">
                <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left text-nowrap tracking-[-0.48px]">
                  <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">채팅으로 돌아가기</p>
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

            {/* Payment Section */}
            <div className="mt-8">
              <PaymentSection farmData={farmData} />
            </div>

          </div>

          {/* ChatbotIcon */}
          <ChatbotIcon />
        </div>
        
        {/* Bottom spacing */}
        <div className="h-32"></div>
      </div>
    </>
  );
};

export default CreditPage;