import { useState } from 'react';
import { Navbar } from '../components/layouts/Navbar';
import { useAuth } from '../hooks/useAuth';
import { useCharge, useExchange } from '../hooks/usePayment';
import tossImage from '../assets/tosspay.png';

const CoinChargePage = () => {
  const { coinBalance } = useAuth();
  const chargeMutation = useCharge();
  const exchangeMutation = useExchange();
  const [chargeAmount, setChargeAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('신한');
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);

  const FarmCoinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M12.8007 27.0677V17.105C9.94415 17.105 6.07622 16.5561 4.93359 9.73438C7.40928 9.99574 11.3486 10.8635 13.8298 14.7527C14.7275 12.8708 17.8616 9.73438 22.8891 9.73438C22.4811 13.2629 19.4939 17.105 15.054 17.105" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.6669 27.0881C6.02755 26.4199 0.844727 20.8148 0.844727 13.9993C0.844727 6.73369 6.73467 0.84375 14.0003 0.84375C21.2659 0.84375 27.1558 6.73369 27.1558 13.9993C27.1558 19.1568 24.188 23.6211 19.8669 25.7775" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ExclamationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#777777" strokeWidth="1.5"/>
      <path d="M12 8v4" stroke="#777777" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 16h.01" stroke="#777777" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14" stroke="#bbbbbb" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 12h14" stroke="#bbbbbb" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const CheckCircleOn = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#1aa752" stroke="#1aa752" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CheckCircleOff = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#bbbbbb" strokeWidth="1.5"/>
    </svg>
  );

  const handleChargeAmountChange = (e) => {
    const value = e.target.value;
    setChargeAmount(value);
  };

  const calculateFarmCoin = (amount) => {
    if (!amount || amount === '') return '0';
    return Math.floor(parseFloat(amount) * 0.9).toLocaleString();
  };

  const handleExchangeAmountChange = (e) => {
    const value = e.target.value;
    setExchangeAmount(value);
  };

  const calculateReceiveAmount = (farmCoinAmount) => {
    if (!farmCoinAmount || farmCoinAmount === '') return '0';
    return parseFloat(farmCoinAmount).toLocaleString();
  };

  const handleAllExchange = () => {
    setExchangeAmount(coinBalance?.toString() || '0');
  };

  const handlePaymentMethodClick = () => {
    setIsPaymentSelected(!isPaymentSelected);
  };

  const handleChargeClick = () => {
    if (!chargeAmount || parseFloat(chargeAmount) <= 0) {
      alert('유효한 충전 금액을 입력해주세요.');
      return;
    }
    
    // 입력된 충전 금액을 FarmCoin으로 변환 (90%)
    const farmCoinAmount = Math.floor(parseFloat(chargeAmount) * 0.9);
    
    if (farmCoinAmount <= 0) {
      alert('충전할 수 있는 최소 금액을 입력해주세요.');
      return;
    }

    // API 호출
    chargeMutation.mutate(farmCoinAmount);
  };

  const handleExchangeClick = () => {
    if (!exchangeAmount || parseFloat(exchangeAmount) <= 0) {
      alert('유효한 환전 금액을 입력해주세요.');
      return;
    }

    const exchangeAmountNumber = parseFloat(exchangeAmount);
    
    if (exchangeAmountNumber > coinBalance) {
      alert('보유한 FarmCoin보다 많은 금액을 환전할 수 없습니다.');
      return;
    }

    // API 호출 - 환전할 FarmCoin 금액을 그대로 전송
    exchangeMutation.mutate(exchangeAmountNumber);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen pt-20 pb-20">
        <div className="flex flex-col items-center gap-12 w-full">
          {/* Title */}
          <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic text-[#000000] text-[32px] text-left text-nowrap tracking-[-0.64px] self-start ml-40 mt-8">
            <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">충전·환전</p>
          </div>

          {/* FarmCoin Balance & Info */}
          <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 w-[423px]">
            {/* Balance Card */}
            <div className="bg-[rgba(26,167,82,0.05)] box-border content-stretch flex flex-col gap-2 items-end justify-start pb-5 pt-4 px-6 relative rounded-2xl shrink-0 w-full border border-[#39bb6d]">
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
                  <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">{coinBalance?.toLocaleString() || '0'}</p>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="box-border content-stretch flex flex-row gap-2 items-start justify-end p-0 relative shrink-0 w-[294px]">
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[180deg]">
                  <div className="relative size-6">
                    <ExclamationIcon />
                  </div>
                </div>
              </div>
              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#777777] text-left w-[250px]">
                <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0 text-[16px] tracking-[-0.48px] w-full">
                  <p className="block leading-[1.5]">FarmCoin 이란?</p>
                </div>
                <div className="font-['Pretendard:Regular',_sans-serif] leading-[1.5] relative shrink-0 text-[14px] tracking-[-0.42px] w-full">
                <p className="block mb-0">SpaceFarm에서 사용되는 전용 재화로</p>
                <p className="block mb-0">서비스 내에서 현금처럼 사용할 수 있습니다.</p>
                <p className="block">현금으로 충전·환전이 가능합니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Charge & Exchange Cards */}
          <div className="box-border content-stretch flex flex-row gap-16 items-start justify-start p-0">
            
            {/* Charge Card */}
            <div className="bg-[#ffffff] box-border content-stretch flex flex-col h-[650px] items-center justify-between p-[32px] relative rounded-3xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] shrink-0">
              <div className="box-border content-stretch flex flex-col gap-12 items-start justify-start p-0 relative shrink-0">
                {/* Charge Section */}
                <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-[359px]">
                  <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[20px] text-left tracking-[-0.6px] w-full">
                    <p className="block leading-[1.5]">충전</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
                    {/* Charge Amount Input */}
                    <div className="box-border content-stretch flex flex-col gap-2 h-20 items-start justify-start p-0 relative shrink-0 w-[359px]">
                      <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-left tracking-[-0.48px] w-full">
                        <p className="block leading-[1.5]">충전 금액</p>
                      </div>
                      <div className="box-border content-stretch flex flex-row gap-1 h-12 items-center justify-start px-2 py-0 relative shrink-0 w-full border-b border-black">
                        <input
                          type="number"
                          placeholder="충전 금액 입력"
                          value={chargeAmount}
                          onChange={handleChargeAmountChange}
                          className="basis-0 flex flex-col font-['Pretendard:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0  text-black text-[16px] text-right tracking-[-0.48px] bg-transparent border-none outline-none"
                        />
                        <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-left text-nowrap tracking-[-0.48px]">
                          <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">원</p>
                        </div>
                      </div>
                    </div>

                    {/* FarmCoin Display */}
                    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                      <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#111111] text-[16px] text-left tracking-[-0.48px]" style={{ width: "min-content" }}>
                        <p className="block leading-[1.5]">FarmCoin</p>
                      </div>
                      <div className="box-border content-stretch flex flex-row gap-1 h-12 items-center justify-start px-2 py-0 relative shrink-0 w-full border-b border-[#bbbbbb]">
                        <div className="basis-0 flex flex-col font-['Pretendard:SemiBold',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1aa752] text-[20px] text-right tracking-[-0.6px]">
                          <p className="block leading-[1.5]">{calculateFarmCoin(chargeAmount)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-[359px]">
                  <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[20px] text-left tracking-[-0.6px] w-full">
                    <p className="block leading-[1.5]">결제 수단</p>
                  </div>
                  <button 
                    onClick={handlePaymentMethodClick}
                    className={`bg-[#ffffff] box-border content-stretch flex flex-row gap-3 h-[62px] items-center justify-center px-5 py-2.5 relative rounded-lg shrink-0 w-full transition-colors cursor-pointer ${
                      isPaymentSelected ? 'border-2 border-[#1aa752]' : 'border border-[#bbbbbb]'
                    }`}
                  >
                    <img src={tossImage} alt="Toss Pay" className="h-6 object-contain" />
                  </button>
                </div>
              </div>

              {/* Charge Button */}
              <button 
                onClick={handleChargeClick}
                disabled={!chargeAmount || chargeAmount === '' || parseFloat(chargeAmount) <= 0 || chargeMutation.isPending}
                className={`box-border content-stretch flex flex-col gap-2.5 h-[62px] items-center justify-center px-5 py-2.5 relative rounded-lg shrink-0 w-[359px] transition-colors cursor-pointer ${
                  chargeAmount && chargeAmount !== '' && parseFloat(chargeAmount) > 0 && !chargeMutation.isPending
                    ? 'bg-[#1aa752] text-white'
                    : 'bg-[#f7f7f7] text-[#bbbbbb] cursor-not-allowed'
                }`}
              >
                <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center tracking-[-0.6px] w-full">
                  <p className="adjustLetterSpacing block leading-[1.5]">
                    {chargeMutation.isPending ? '처리중...' : '결제하기'}
                  </p>
                </div>
              </button>
            </div>

            {/* Exchange Card */}
            <div className="bg-[#ffffff] box-border content-stretch flex flex-col h-[650px] gap-12 items-end justify-start p-[32px] relative rounded-3xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] shrink-0">
              {/* Exchange Section */}
              <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-[358px]">
                <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[20px] text-left tracking-[-0.6px] w-full">
                    <p className="block leading-[1.5]">환전</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-2 h-20 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="box-border content-stretch flex flex-row items-start justify-between leading-[0] not-italic p-0 relative shrink-0 text-[16px] text-left text-nowrap tracking-[-0.48px] w-[350px]">
                      <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center relative shrink-0 text-[#111111]">
                        <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">FarmCoin</p>
                      </div>
                      <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0 text-[#1aa752]">
                        <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">{coinBalance?.toLocaleString() || '0'}</p>
                      </div>
                    </div>
                    <div className="box-border content-stretch flex flex-row h-12 items-center justify-between px-2 py-0 relative shrink-0 w-full border-b border-[#bbbbbb]">
                      <div className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-end p-0 relative shrink-0 w-[268px]">
                        <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start pl-0 pr-4 py-0 relative shrink-0 border-r border-[#f7f7f7]">
                          <input
                            type="number"
                            placeholder="환전 금액 입력"
                            value={exchangeAmount}
                            onChange={handleExchangeAmountChange}
                            className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1aa752] text-[16px] text-left text-nowrap tracking-[-0.48px] bg-transparent border-none outline-none"
                          />
                        </div>
                      </div>
                      <button 
                        className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1aa752] text-[16px] text-left text-nowrap tracking-[-0.48px] cursor-pointer"
                        onClick={handleAllExchange}
                      >
                        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">모두 환전</p>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Receive Amount */}
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#111111] text-[16px] text-left tracking-[-0.48px]" style={{ width: "min-content" }}>
                    <p className="block leading-[1.5]">받는 금액</p>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-1 h-12 items-center justify-start px-2 py-0 relative shrink-0 w-full border-b border-[#bbbbbb]">
                    <div className="basis-0 flex flex-col font-['Pretendard:SemiBold',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-black text-[20px] text-right tracking-[-0.6px]">
                      <p className="block leading-[1.5]">{calculateReceiveAmount(exchangeAmount)}</p>
                    </div>
                    <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[20px] text-left text-nowrap tracking-[-0.6px]">
                      <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">원</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Selection */}
              <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-[358px]">
                <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
                    <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[20px] text-left text-nowrap tracking-[-0.6px]">
                      <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">받는 계좌</p>
                    </div>
                  </div>
                  <div className="overflow-clip relative shrink-0 size-6 cursor-pointer">
                    <PlusIcon />
                  </div>
                </div>

                {/* Account List */}
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                  {/* Selected Account */}
                  <div className="bg-[#f7f7f7] box-border content-stretch flex flex-row gap-4 h-[72px] items-center justify-start px-6 py-4 relative rounded-2xl shrink-0 w-full border border-[#1aa752]">
                    <div className="relative shrink-0 size-6">
                      <CheckCircleOn />
                    </div>
                    <div className="box-border content-stretch flex flex-row font-['Pretendard:Regular',_sans-serif] gap-2 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#000000] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                      <div className="flex flex-col justify-center relative shrink-0">
                        <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">신한</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0">
                        <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">110-345-434154</p>
                      </div>
                    </div>
                  </div>

                  {/* Other Account */}
                  <div className="box-border content-stretch flex flex-row gap-4 h-[72px] items-center justify-start px-6 py-4 relative rounded-2xl shrink-0 w-full border border-[#bbbbbb] cursor-pointer">
                    <div className="relative shrink-0 size-6">
                      <CheckCircleOff />
                    </div>
                    <div className="box-border content-stretch flex flex-row font-['Pretendard:Regular',_sans-serif] gap-2 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#000000] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                      <div className="flex flex-col justify-center relative shrink-0">
                        <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">우리</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0">
                        <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">110-345-434154</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exchange Button */}
              <button 
                onClick={handleExchangeClick}
                disabled={!exchangeAmount || exchangeAmount === '' || parseFloat(exchangeAmount) <= 0 || exchangeMutation.isPending}
                className={`box-border content-stretch flex flex-col gap-2.5 h-[62px] items-center justify-center px-5 py-2.5 relative rounded-lg shrink-0 w-[358px] transition-colors cursor-pointer ${
                  exchangeAmount && exchangeAmount !== '' && parseFloat(exchangeAmount) > 0 && !exchangeMutation.isPending
                    ? 'bg-[#1aa752] text-white'
                    : 'bg-[#f7f7f7] text-[#bbbbbb] cursor-not-allowed'
                }`}
              >
                <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center tracking-[-0.6px] w-full">
                  <p className="adjustLetterSpacing block leading-[1.5]">
                    {exchangeMutation.isPending ? '처리중...' : '환전하기'}
                  </p>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CoinChargePage;