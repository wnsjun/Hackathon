import { useState } from 'react';

const img = "http://localhost:3845/assets/9ff9075c0576bb39508ceb1738aa90d1aecaf0a5.svg";

const ExchangeSuccessModal = ({ isOpen, onClose, exchangeAmount, receiveAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-6 items-start justify-start p-[20px] relative rounded-lg">
        <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-2.5 items-center justify-center relative shrink-0 w-[280px]">
            <div className="basis-0 flex flex-col font-['Pretendard:SemiBold',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[16px] tracking-[-0.48px]">
              <p className="leading-[1.5]">환전 완료</p>
            </div>
            <button 
              onClick={onClose}
              className="relative shrink-0 size-6 cursor-pointer"
            >
              <div className="absolute inset-0" />
              <div className="absolute inset-[20.833%]">
                <div className="absolute inset-[-5.357%]">
                  <img alt="닫기" className="block max-w-none size-full" src={img} />
                </div>
              </div>
            </button>
          </div>
          <div className="content-stretch flex gap-1 items-start justify-start relative shrink-0">
            <div className="content-stretch flex items-center justify-start leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap tracking-[-0.42px]">
              <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0 text-[#1aa752]">
                <p className="leading-[1.5] text-nowrap whitespace-pre">{exchangeAmount?.toLocaleString() || '0'}코인</p>
              </div>
              <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center relative shrink-0 text-[#000000]">
                <p className="leading-[1.5] text-nowrap whitespace-pre">이</p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-start leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-nowrap tracking-[-0.42px]">
              <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center relative shrink-0">
                <p className="leading-[1.5] text-nowrap whitespace-pre">{receiveAmount?.toLocaleString() || '0'}원</p>
              </div>
              <div className="flex flex-col font-['Pretendard:Regular',_sans-serif] justify-center relative shrink-0">
                <p className="leading-[1.5] text-nowrap whitespace-pre">으로 환전됐습니다.</p>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="bg-[#1aa752] box-border content-stretch flex gap-2.5 h-[52px] items-center justify-center p-[10px] relative rounded-lg shrink-0 w-[280px] cursor-pointer hover:bg-green-600 transition-colors"
        >
          <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-nowrap tracking-[-0.48px]">
            <p className="leading-[1.5] whitespace-pre">확인</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ExchangeSuccessModal;