import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityPostCard from '../components/common/CommunityPostCard';
import Button from '../components/common/Button';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { mockCommunityPosts } from '../data/mockCommunity';
import { fetchFeedPosts, fetchTipPosts } from '../apis/community';

export const Community = () => {
  const [activeTab, setActiveTab] = useState('certification');
  const [posts, setPosts] = useState({ certification: [], tips: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const [feedPosts, tipPosts] = await Promise.all([
          fetchFeedPosts(),
          fetchTipPosts()
        ]);
        
        const transformedFeedPosts = feedPosts.map(post => ({
          id: post.id,
          title: post.title,
          username: post.authorNickname,
          image: post.thumbnailUrl,
          likes: post.likeCount
        }));

        const transformedTipPosts = tipPosts.map(post => ({
          id: post.id,
          title: post.title,
          username: post.authorNickname,
          image: post.thumbnailUrl,
          likes: post.likeCount
        }));

        setPosts({
          certification: transformedFeedPosts,
          tips: transformedTipPosts
        });
      } catch (error) {
        console.error('게시글 로드 실패:', error);
        setPosts(mockCommunityPosts);
      }
    };

    loadPosts();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleWriteClick = () => {
    const type = activeTab === 'tips' ? 'tips' : 'certification';
    navigate(`/community/write?type=${type}`);
  };

  const postsToShow = posts[activeTab] || [];

  return (
    <div className="p-12 mt-24 mb-12">
      {/* 탭 네비게이션 */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <div className="flex">
          <button
            onClick={() => handleTabClick('certification')}
            className={`px-6 py-3 mr-4 text-2xl font-semibold border-b-4 transition-colors ${
              activeTab === 'certification' 
                ? 'text-black border-[#1aa752]' 
                : 'text-gray-400 border-transparent'
            }`}
          >
            인증 피드
          </button>
          <button
            onClick={() => handleTabClick('tips')}
            className={`px-6 py-3 text-2xl font-semibold border-b-4 transition-colors ${
              activeTab === 'tips' 
                ? 'text-black border-[#1aa752]' 
                : 'text-gray-400 border-transparent'
            }`}
          >
            재배 팁
          </button>
        </div>
        <Button onClick={handleWriteClick} variant="farm">작성하기</Button>
      </div>

      {/* 게시글 그리드 */}
      {postsToShow.length === 0 ? (
        <p className="text-center text-gray-500">등록된 게시글이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {postsToShow.map((post) => (
            <CommunityPostCard key={post.id} {...post} />
          ))}
        </div>
      )}
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};

