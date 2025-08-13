import { useState } from 'react';

const imgEllipse83 = "/assets/08bc8f0fb0393f4fa955e7165c21fdf8b107680f.png";
const imgIcon = "/assets/51e16bae4ba6aa22f935249b1e06b165f15e09d5.svg";
const imgIconStroke = "/assets/db1bd2d126a7247a5da9b519ecec8e6f06df568b.svg";

const HeartButton = ({ isLiked = false, onToggle }) => {
  return (
    <div 
      className="absolute top-3 right-3 w-8 h-8 cursor-pointer bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-sm"
      onClick={(e) => {
        e.stopPropagation();
        onToggle && onToggle();
      }}
    >
      <img 
        alt="heart" 
        className="w-5 h-5" 
        src={isLiked ? imgIcon : imgIconStroke} 
      />
    </div>
  );
};

const CommunityPostCard = ({ image, username, timeAgo, title, content, initialLiked = false }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    // 게시글 상세 페이지로 이동
    console.log('Navigate to post detail');
  };

  const handleDetailClick = (e) => {
    e.stopPropagation();
    console.log('Navigate to post detail');
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      {/* 이미지 섹션 */}
      <div className="relative">
        <div
          className="w-full h-60 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <HeartButton isLiked={isLiked} onToggle={handleLikeToggle} />
      </div>

      {/* 카드 내용 */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-semibold text-gray-900 flex-1">
            {title}
          </h3>
          <span className="text-xs text-gray-500 ml-2">{timeAgo}</span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img
              alt="profile"
              src={imgEllipse83}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-gray-600">{username}</span>
        </div>

        <div className="text-sm text-gray-600 mb-3 line-clamp-2">
          {typeof content === 'string' ? content : 
            <div className="overflow-hidden">{content}</div>
          }
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleDetailClick}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            자세히 보기 〉
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostCard;