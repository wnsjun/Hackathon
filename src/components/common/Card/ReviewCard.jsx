// import React from 'react';

// const ReviewCard = ({ profileUrl, nickname, timeAgo, content }) => {
//   return (
//     <div className="flex flex-col border rounded-2xl p-4 bg-white shadow-sm w-[345px] h-[145px]">
//       {/* 상단: 프로필 + 닉네임 + 시간 */}
//       <div className="flex items-center mb-2">
//         <img
//           src={profileUrl}
//           alt="프로필"
//           className="w-10 h-10 rounded-full object-cover mr-3"
//         />
//         <span className="font-pretendard font-semibold text-[20px] leading-[150%] tracking-[-0.6px] text-black mr-2">
//           {nickname}
//         </span>
//         <span className="font-pretendard text-[16px] leading-[150%] tracking-[-0.5px] font-normal text-[#BBB]">
//           {timeAgo}
//         </span>
//       </div>

//       {/* 리뷰 내용 */}
//       <p className="overflow-hidden text-black font-pretendard text-[18px] font-normal leading-[150%] tracking-[-0.5px] w-full line-clamp-3">
//         {content}
//       </p>
//     </div>
//   );
// };

// export default ReviewCard;

import React from 'react';

const ReviewCard = ({ profileUrl, nickname, timeAgo, content }) => {
  return (
    <div className="relative flex flex-col rounded-2xl p-4 bg-white w-[345px] h-[145px]">
      {/* 상단: 프로필 + 닉네임 + 시간 */}
      <div className="flex items-center mb-2">
        <img
          src={profileUrl}
          alt="프로필"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <span className="font-pretendard font-semibold text-[20px] leading-[150%] tracking-[-0.6px] text-black mr-2">
          {nickname}
        </span>
        <span className="font-pretendard text-[16px] leading-[150%] tracking-[-0.5px] font-normal text-[#BBB]">
          {timeAgo}
        </span>
      </div>

      {/* 리뷰 내용 박스 (오른쪽 아래 고정) */}
      <div className="absolute bottom-4 pl-15 pt-[39px] w-[289px] h-[90px]">
        <p className="overflow-hidden text-black font-pretendard text-[18px] font-normal leading-[150%] tracking-[-0.5px] line-clamp-3">
          {content}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
