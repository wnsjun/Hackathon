import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 날짜 계산 함수
const getTimeAgo = (createdAt) => {
  if (!createdAt) return '시간 정보 없음';
  
  const now = new Date();
  const created = new Date(createdAt);
  
  // 날짜가 유효한지 확인
  if (isNaN(created.getTime())) {
    return '시간 정보 없음';
  }
  
  const diffInMs = now - created;
  
  // 음수인 경우 (미래 날짜)
  if (diffInMs < 0) {
    return '방금 전';
  }
  
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes <= 0 ? '방금 전' : `${diffInMinutes}분 전`;
    }
    return `${diffInHours}시간 전`;
  } else if (diffInDays === 1) {
    return '1일 전';
  } else {
    return `${diffInDays}일 전`;
  }
};

// Assets from Figma
const imgEllipse83 = "http://localhost:3845/assets/08bc8f0fb0393f4fa955e7165c21fdf8b107680f.png";

const ArrowIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
      <path d="M9 14.0498L15.5 8.00051L9 1.95121" stroke="#777777" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

const HeartIcon = ({ filled = false, className = "w-5 h-5" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "#ff6b6b" : "none"}
      stroke={filled ? "#ff6b6b" : "#6b7280"}
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
};

const HeartButton = ({ isLiked = false, onToggle }) => {
  return (
    <div 
      className="absolute top-3 right-3 w-8 h-8 cursor-pointer bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-sm hover:bg-opacity-100 transition-all"
      onClick={(e) => {
        e.stopPropagation();
        onToggle && onToggle();
      }}
    >
      <HeartIcon filled={isLiked} />
    </div>
  );
};

const CommunityPostCard = ({ id, image, username, title, content, initialLiked = false, createdAt }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const navigate = useNavigate();

  const checkLoginAndNavigate = () => {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (isLoggedIn) {
      navigate(`/community/${id}`);
    } else {
      alert('로그인해주세요');
      navigate('/login');
    }
  };

  const handleLikeToggle = () => {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (isLoggedIn) {
      setIsLiked(!isLiked);
    } else {
      alert('로그인해주세요');
      navigate('/login');
    }
  };

  const handleCardClick = () => {
    checkLoginAndNavigate();
  };

  const handleDetailClick = (e) => {
    e.stopPropagation();
    checkLoginAndNavigate();
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow duration-300 relative"
    >
      {/* 이미지 섹션 */}
      <div className="relative">
        <div
          className="w-full h-[284px] bg-cover bg-center rounded-t-2xl"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <HeartButton isLiked={isLiked} onToggle={handleLikeToggle} />
      </div>

      {/* 사용자 정보 */}
      <div className="bg-white flex items-center justify-between pt-6 pb-0 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              alt="profile"
              src={imgEllipse83}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-xl text-black tracking-[-0.6px]">
            {username}
          </span>
        </div>
        <span className="text-base text-black tracking-[-0.48px]">
          {getTimeAgo(createdAt) }
        </span>
      </div>

      {/* 카드 내용 */}
      <div className="bg-white rounded-b-2xl px-6 pt-4 pb-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl text-black tracking-[-0.6px]">
              {title}
            </h3>
            <div className="flex flex-col gap-2">
              <div className="text-base text-black tracking-[-0.48px] leading-6 overflow-ellipsis overflow-hidden line-clamp-3">
                {typeof content === 'string' ? content : 
                  <div className="overflow-hidden">{content}</div>
                }
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end w-full">
            {/*자세히보기 버튼*/}
            <button
              onClick={handleDetailClick}
              className="flex items-center gap-0 font-normal text-base text-[#777777] tracking-[-0.48px] leading-[1.5]"
            >
              자세히 보기
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostCard;