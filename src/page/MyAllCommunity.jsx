import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityPostCard from '../components/common/Card/CommunityPostCard';
import { useMyPosts, useLikedPosts } from '../hooks/useMyPage';
import profile from '../assets/profile.png';

const MyAllCommunity = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('written');

  const { data: myPostsData, isLoading: myPostsLoading } = useMyPosts();
  const { data: likedPostsData, isLoading: likedPostsLoading } =
    useLikedPosts();

  const myPosts = myPostsData || [];
  const likedPosts = likedPostsData || [];

  const handleBackClick = () => navigate(-1);

  if (myPostsLoading || likedPostsLoading) {
    return <p className="pl-40 pt-20">로딩 중...</p>;
  }

  const posts = activeTab === 'written' ? myPosts : likedPosts;

  return (
    <div className="bg-white relative w-full min-h-screen px-40 pt-32">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleBackClick}
          className="cursor-pointer w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="#374151"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-3xl font-semibold">커뮤니티</h1>
      </div>

      {/* 탭 */}
      <div className="flex gap-6 mb-10">
        <button
          className={`text-xl font-semibold ${
            activeTab === 'written'
              ? 'text-black border-b-4 border-green-600'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('written')}
        >
          작성 글
        </button>
        <button
          className={`text-xl font-semibold ${
            activeTab === 'liked'
              ? 'text-black border-b-4 border-green-600'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('liked')}
        >
          좋아요 누른 글
        </button>
      </div>

      {/* 카드 */}
      <div className="flex flex-wrap gap-6">
        {posts.map((post) => (
          <div key={post.id} className="flex-none w-[calc(33.333%-16px)]">
            <CommunityPostCard
              id={post.id}
              image={post.thumbnailUrl}
              username={post.authorNickname}
              title={post.title}
              likeCount={post.likeCount}
              initialLiked={post.liked}
              createdAt={post.createdAt}
              profileImage={post.profileImage || profileImg}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAllCommunity;
