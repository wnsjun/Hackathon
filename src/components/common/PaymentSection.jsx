import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoin } from '../../contexts/CoinContext';
import { processPayment } from '../../apis/paymentApi';

const PaymentSection = ({ farmData }) => {
  const [ecoPoints, setEcoPoints] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { coinBalance, updateCoinBalance } = useCoin();

  const FarmCoinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M12.8007 27.0677V17.105C9.94415 17.105 6.07622 16.5561 4.93359 9.73438C7.40928 9.99574 11.3486 10.8635 13.8298 14.7527C14.7275 12.8708 17.8616 9.73438 22.8891 9.73438C22.4811 13.2629 19.4939 17.105 15.054 17.105" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.6669 27.0881C6.02755 26.4199 0.844727 20.8148 0.844727 13.9993C0.844727 6.73369 6.73467 0.84375 14.0003 0.84375C21.2659 0.84375 27.1558 6.73369 27.1558 13.9993C27.1558 19.1568 24.188 23.6211 19.8669 25.7775" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const FarmCoinIcon2=()=>(
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
      <path d="M13.3007 27.0677V17.105C10.4442 17.105 6.57622 16.5561 5.43359 9.73438C7.90928 9.99574 11.8486 10.8635 14.3298 14.7527C15.2275 12.8708 18.3616 9.73438 23.3891 9.73438C22.9811 13.2629 19.9939 17.105 15.554 17.105" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.1669 27.0881C6.52755 26.4199 1.34473 20.8148 1.34473 13.9993C1.34473 6.73369 7.23467 0.84375 14.5003 0.84375C21.7659 0.84375 27.6558 6.73369 27.6558 13.9993C27.6558 19.1568 24.688 23.6211 20.3669 25.7775" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );

  const ChevronIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
      <path d="M9 14.0508L15.5 8.00149L9 1.95219" stroke="#777777" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const handlePayment = async () => {
    if (isProcessing) return;
    
    const totalPaymentAmount = farmData.price - parseInt(ecoPoints || 0);
    
    if (coinBalance < totalPaymentAmount) {
      alert('FarmCoin 잔액이 부족합니다. 충전 후 다시 시도해주세요.');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      const response = await processPayment(farmData, parseInt(ecoPoints || 0));
      
      // 결제 성공 후 코인 잔액 업데이트
      if (response.coin !== undefined) {
        updateCoinBalance(response.coin);
      }
      
      alert('결제가 완료되었습니다!');
      navigate('/mypage');
      
    } catch (error) {
      console.error('결제 처리 중 오류가 발생했습니다:', error);
      alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChargeClick = () => {
    navigate('/coin-charge');
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-16 items-start justify-start p-0 relative w-full">
      {/* Discount Methods */}
      <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
        <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[20px] text-left tracking-[-0.6px] w-full">
          <p className="block leading-[1.5]">할인 방법</p>
        </div>
        <div className="box-border content-stretch flex flex-col gap-2 h-20 items-start justify-start p-0 relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-row items-start justify-between leading-[0] not-italic p-0 relative shrink-0 text-[16px] text-left text-nowrap tracking-[-0.48px] w-full">
            <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center relative shrink-0 text-[#111111]">
              <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">친환경 점수 사용</p>
            </div>
            <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0 text-[#1aa752]">
              <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">83점</p>
            </div>
          </div>
          <div className="box-border content-stretch flex flex-row h-12 items-center justify-between px-2 py-0 relative shrink-0 w-full border-b border-[#bbbbbb]">
            <div className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-end p-0 relative shrink-0 flex-1">
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start pl-0 pr-4 py-0 relative shrink-0 border-r border-[#f7f7f7]">
                <input 
                  type="number" 
                  placeholder="사용금액 입력"
                  value={ecoPoints}
                  onChange={(e) => setEcoPoints(e.target.value)}
                  className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbbbbb] text-[16px] text-left text-nowrap tracking-[-0.48px] bg-transparent border-none outline-none"
                />
                <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-left text-nowrap tracking-[-0.48px]">
                  <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">점</p>
                </div>
              </div>
            </div>
            <button 
              className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1aa752] text-[16px] text-left text-nowrap tracking-[-0.48px] cursor-pointer"
              onClick={() => setEcoPoints(83)}
            >
              <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">모두 사용</p>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="box-border content-stretch flex flex-col gap-12 items-end justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[20px] text-left tracking-[-0.6px] w-full">
            <p className="block leading-[1.5]">결제 정보</p>
          </div>
          <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start pb-4 pt-0 px-0 relative shrink-0 w-full border-b border-[#bbbbbb]">
                <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                  <div className="font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.48px]">
                    <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">{farmData.title}</p>
                  </div>
                </div>
                <div className="box-border content-stretch flex flex-row font-['Pretendard:Regular',_sans-serif] items-center justify-between leading-[0] not-italic p-0 relative shrink-0 text-[14px] text-nowrap tracking-[-0.42px] w-full">
                  <div className="relative shrink-0 text-[#777777] text-left">
                    <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                      {farmData.rentalPeriod}일 (25.08.16 ~ 25.08.28)
                    </p>
                  </div>
                  <div className="relative shrink-0 text-[#111111] text-right">
                    <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">{farmData.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="box-border content-stretch flex flex-row font-['Pretendard:Regular',_sans-serif] items-center justify-between leading-[0] not-italic p-0 relative shrink-0 text-[14px] text-nowrap tracking-[-0.42px] w-full">
                  <div className="relative shrink-0 text-[#777777] text-left">
                    <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">총 주문 금액</p>
                  </div>
                  <div className="relative shrink-0 text-[#111111] text-right">
                    <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">{farmData.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="box-border content-stretch flex flex-row font-['Pretendard:Regular',_sans-serif] items-center justify-between leading-[0] not-italic p-0 relative shrink-0 text-[14px] text-nowrap tracking-[-0.42px] w-full">
                  <div className="relative shrink-0 text-[#777777] text-left">
                    <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                      친환경 점수 사용
                    </p>
                  </div>
                  <div className="relative shrink-0 text-[#111111] text-right">
                    <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">{ecoPoints}점</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row items-center justify-between leading-[0] not-italic p-0 relative shrink-0 text-nowrap w-full">
              <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center relative shrink-0 text-[#202528] text-[24px] text-left tracking-[-0.48px]">
                <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">총 결제 금액</p>
              </div>
              <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0 text-[#111111] text-[32px] text-right tracking-[-0.64px]">
                <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">{(farmData.price - parseInt(ecoPoints || 0)).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FarmCoin Section */}
        <div className="box-border content-stretch flex flex-col gap-6 items-end justify-start p-0 relative shrink-0 w-full">
          <div className="bg-[rgba(26,167,82,0.05)] box-border content-stretch flex flex-col gap-2 items-end justify-start pb-6 pt-4 px-6 relative rounded-2xl shrink-0 w-full border border-[#39bb6d]">
            <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
                <div className="relative shrink-0 size-8">
                  <FarmCoinIcon />
                </div>
                <div className="flex flex-col font-['Outfit:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1aa752] text-[24px] text-left text-nowrap">
                  <p className="block leading-[1.6] whitespace-pre">FarmCoin</p>
                </div>
              </div>
              <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1aa752] text-[32px] text-left text-nowrap tracking-[-0.64px]">
                <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">{coinBalance?.toLocaleString()}</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 cursor-pointer" onClick={handleChargeClick}>
              <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#777777] text-[16px] text-left text-nowrap tracking-[-0.48px]">
                <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">충전하기</p>
              </div>
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none">
                  <div className="relative size-4">
                    <ChevronIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <button 
            className={`${
              isProcessing 
                ? 'bg-[#aaaaaa] cursor-not-allowed' 
                : 'bg-[#1aa752] cursor-pointer'
            } box-border content-stretch flex flex-row gap-2.5 h-[62px] items-center justify-center px-5 py-2.5 relative rounded-lg shrink-0 w-full`}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            <div className="relative shrink-0 size-8">
              <FarmCoinIcon2 />
            </div>
            <div className="box-border content-stretch flex flex-row items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-[20px] text-center text-nowrap">
              <div className="flex flex-col font-['Outfit:Medium',_sans-serif] font-medium justify-center relative shrink-0">
                <p className="block leading-[1.6] text-nowrap whitespace-pre">FarmCoin</p>
              </div>
              <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center not-italic relative shrink-0 tracking-[-0.6px]">
                <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                  {isProcessing ? '처리 중...' : '으로 결제하기'}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;