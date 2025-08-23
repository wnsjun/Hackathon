// component/common/Card/ReviewCard.jsx

import React from 'react';

const ReviewCard = ({ profileUrl, nickname, timeAgo, content }) => {
  return (
    <div className="flex flex-col border rounded-2xl p-4 w-[400px] bg-white shadow-sm">
      {/* 상단: 프로필 + 닉네임 + 시간 */}
      <div className="flex items-center mb-2">
        <img
          src={profileUrl}
          alt="프로필"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <span
          className="font-[Pretendard] font-semibold"
          style={{
            fontSize: '20px',
            lineHeight: '150%',
            letterSpacing: '-0.6px',
            color: '#000',
          }}
        >
          {nickname}
        </span>
        <span
          className="font-[Pretendard]"
          style={{
            fontSize: '20px',
            lineHeight: '150%',
            letterSpacing: '-0.6px',
            fontWeight: 400,
            color: '#BBB',
          }}
        >
          {timeAgo}
        </span>
      </div>

      {/* 리뷰 내용 */}
      <p
        className="overflow-hidden"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          width: '289px',
          color: '#000',
          fontFamily: 'Pretendard',
          fontSize: '20px',
          fontWeight: 400,
          lineHeight: '150%',
          letterSpacing: '-0.6px',
        }}
      >
        {content}
      </p>
    </div>
  );
};

export default ReviewCard;
