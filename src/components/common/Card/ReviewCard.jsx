import React from 'react';

const ReviewCard = ({ profileUrl, nickname, timeAgo, content }) => {
  return (
    <div className="flex flex-col rounded-2xl  p-4 bg-white w-full sm:w-[345px] shadow-sm">
      {/* 상단: 프로필 + 닉네임 + 시간 */}
      <div className="flex items-center mb-2">
        <img
          src={profileUrl}
          alt="profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-pretendard font-semibold text-base md:text-lg leading-[1.4] text-black ml-2">
          {nickname}
        </span>
        <span className="font-pretendard text-sm md:text-base text-gray-400 ml-2">
          {timeAgo}
        </span>
      </div>

      {/* 리뷰 내용 박스 (오른쪽 아래 고정) */}
      <p className="text-sm md:text-base text-black font-pretendard leading-[1.5]">
        {content}
      </p>
    </div>
  );
};

export default ReviewCard;
