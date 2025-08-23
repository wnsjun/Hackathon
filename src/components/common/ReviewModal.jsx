import React, { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [review, setReview] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!review.trim()) return;
    onSubmit(review);
    setReview('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.33)]">
      <div className="bg-white w-[546px] h-[348px] rounded-2xl shadow-lg p-8 relative flex flex-col gap-6">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M20.334 1.66797L1.66732 20.3346"
              stroke="#777777"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M1.66732 1.66797L20.334 20.3346"
              stroke="#777777"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 className="text-black font-[Pretendard] text-2xl font-semibold leading-[150%] tracking-[-0.48px]">
          이 텃밭의 사용 경험이 어땠나요?
        </h2>

        {/* 리뷰 입력 영역 */}
        <div
          className="relative flex flex-col items-start gap-6 border border-[#1AA752] rounded-2xl p-6"
          style={{ width: '482px', height: '284px' }}
        >
          <textarea
            className="flex-1 w-full font-[Pretendard] text-base text-[#BBB] resize-none focus:outline-none placeholder-[#BBB] leading-[150%] tracking-[-0.48px] pr-24 pb-10"
            placeholder="리뷰를 작성하세요."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {/* 점수 + 아이콘 (textarea 내부 우측 하단 고정) */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <span className="text-[#1AA752] font-[Pretendard] text-base font-normal leading-[150%] tracking-[-0.48px]">
              친환경 점수 +10
            </span>
            <button onClick={handleSubmit} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 27 27"
                fill="none"
              >
                <path
                  d="M11.3334 15.6667L26.0001 1M11.3334 15.6667L16.0001 25C16.0586 25.1277 16.1525 25.2358 16.2707 25.3117C16.3889 25.3875 16.5263 25.4278 16.6668 25.4278C16.8072 25.4278 16.9446 25.3875 17.0628 25.3117C17.181 25.2358 17.2749 25.1277 17.3334 25L26.0001 1M11.3334 15.6667L2.00009 11C1.87244 10.9415 1.76426 10.8476 1.68842 10.7294C1.61258 10.6112 1.57227 10.4738 1.57227 10.3333C1.57227 10.1929 1.61258 10.0554 1.68842 9.93726C1.76426 9.81909 1.87244 9.72517 2.00009 9.66667L26.0001 1"
                  stroke="#1AA752"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
