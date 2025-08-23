import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CommunityPostCard from '../components/common/Card/CommunityPostCard';
import Button from '../components/common/Button';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { mockCommunityPosts } from '../data/mockCommunity';
import { fetchFeedPosts, fetchTipPosts } from '../apis/community';
import instance from '../apis/instance';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Community = () => {
  const [activeTab, setActiveTab] = useState('certification');
  const [posts, setPosts] = useState({ certification: [], tips: [] });
  const [searchResults, setSearchResults] = useState({ certification: [], tips: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showTab, setShowTab] = useState(true); // 👈 스크롤에 따라 탭 노출 여부 제어
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get('search') || '';

  // 스크롤 방향 감지
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        // 스크롤 올릴 때 → 보이기
        setShowTab(true);
      } else {
        // 스크롤 내릴 때 → 숨기기
        setShowTab(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchPosts = async (searchTerm) => {
    try {
      setSearchLoading(true);

      // 전체 커뮤니티에서 검색 (결과 있는지 확인용)
      const allResponse = await instance.get(`/posts/search?title=${encodeURIComponent(searchTerm)}`);
      const hasResults = allResponse.data && allResponse.data.length > 0;

      if (hasResults) {
        // 결과가 있으면 각 카테고리별로 검색
        const [tipsResponse, feedResponse] = await Promise.all([
          instance.get(`/posts/search?title=${encodeURIComponent(searchTerm)}&category=TIP`),
          instance.get(`/posts/search?title=${encodeURIComponent(searchTerm)}&category=FEED`)
        ]);

        // 검색 결과 데이터 변환
        const transformSearchResults = (results) => (results || []).map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          username: post.authorNickname,
          image: post.thumbnailUrl,
          likes: post.likeCount,
          createdAt: post.createdAt,
          initialLiked: post.liked || false,
          profileImage: post.profileImage
        }));

        setSearchResults({
          certification: transformSearchResults(feedResponse.data || []),
          tips: transformSearchResults(tipsResponse.data || [])
        });
        setIsSearching(true);
      } else {
        setSearchResults({ certification: [], tips: [] });
        setIsSearching(true);
      }
    } catch (error) {
      console.error('검색 실패:', error);
      setSearchResults({ certification: [], tips: [] });
      setIsSearching(true);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const [feedPosts, tipPosts] = await Promise.all([
          fetchFeedPosts(),
          fetchTipPosts()
        ]);

        const transformedFeedPosts = (feedPosts || []).map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          username: post.authorNickname,
          image: post.thumbnailUrl,
          likes: post.likeCount,
          createdAt: post.createdAt,
          initialLiked: post.liked || false,
          profileImage: post.profileImage
        }));

        const transformedTipPosts = (tipPosts || []).map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          username: post.authorNickname,
          image: post.thumbnailUrl,
          likes: post.likeCount,
          createdAt: post.createdAt,
          initialLiked: post.liked || false,
          profileImage: post.profileImage
        }));

        if (transformedFeedPosts.length === 0 && transformedTipPosts.length === 0) {
          setPosts(mockCommunityPosts);
        } else {
          setPosts({
            certification: transformedFeedPosts.length > 0 ? transformedFeedPosts : mockCommunityPosts.certification,
            tips: transformedTipPosts.length > 0 ? transformedTipPosts : mockCommunityPosts.tips
          });
        }
      } catch (error) {
        console.error('게시글 로드 실패:', error);
        setPosts(mockCommunityPosts);
      }
    };

    loadPosts();
  }, []);

  // 검색어가 있을 때 검색 실행
  useEffect(() => {
    if (searchQuery) {
      searchPosts(searchQuery);
    } else {
      setIsSearching(false);
      setSearchResults({ certification: [], tips: [] });
    }
  }, [searchQuery]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleWriteClick = () => {
    const type = activeTab === 'tips' ? 'tips' : 'certification';
    navigate(`/community/write?type=${type}`);
  };

  const postsToShow = (isSearching ? searchResults[activeTab] || [] : posts[activeTab] || [])
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return (b.id || 0) - (a.id || 0);
    });

  const hasAnySearchResults = isSearching && (
    (searchResults.certification && searchResults.certification.length > 0) ||
    (searchResults.tips && searchResults.tips.length > 0)
  );

  return (
    <div className="px-4 sm:px-6 md:px-12 py-6 pt-50 md:pt-32 pb-24 md:pb-12 ">
      {/* 검색 중이고 결과가 없으면 탭 네비게이션 숨김 */}
      {(!isSearching || hasAnySearchResults) && (
        <div
          className={`
            fixed top-16 left-0 w-full bg-white z-30 px-4 py-3
            md:static md:bg-transparent md:translate-y-0
            transform transition-transform duration-300
            ${showTab ? 'translate-y-0' : '-translate-y-full'}
          `}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-6xl mx-auto gap-4">
            <div className="flex w-full md:w-auto">
              <button
                onClick={() => handleTabClick('certification')}
                className={`cursor-pointer px-3 md:px-6 py-2 md:py-3 mr-2 md:mr-4 text-lg md:text-2xl font-semibold border-b-2 md:border-b-4 transition-colors flex-1 md:flex-none ${
                  activeTab === 'certification'
                    ? 'text-black border-[#1aa752]'
                    : 'text-gray-400 border-transparent'
                }`}
              >
                인증 피드
              </button>
              <button
                onClick={() => handleTabClick('tips')}
                className={`cursor-pointer px-3 md:px-6 py-2 md:py-3 text-lg md:text-2xl font-semibold border-b-2 md:border-b-4 transition-colors flex-1 md:flex-none ${
                  activeTab === 'tips'
                    ? 'text-black border-[#1aa752]'
                    : 'text-gray-400 border-transparent'
                }`}
              >
                재배 팁
              </button>
            </div>
            
            <div className="flex justify-end ml-auto">
              <Button
              onClick={handleWriteClick}
              variant="farm"
              className="text-base md:text-lg
              text-[#1aa752]
              font-bold
              text-[16px]"
              > 작성하기 + </Button>
            </div>
          </div>
        </div>

      )}

      {/* 게시글 그리드 */}
      {searchLoading ? (
        <div className="text-center py-12 md:py-16">
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-spin">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400 md:w-6 md:h-6">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
          </div>
          <p className="text-gray-500 text-base md:text-lg">검색 중...</p>
        </div>
      ) : postsToShow.length === 0 ? (
        <div className="text-center py-12 md:py-16">
          <p className="text-gray-500 text-base md:text-lg px-4">
            {isSearching && !hasAnySearchResults
              ? `'${searchQuery}'로 커뮤니티에서 검색한 결과가 없습니다.`
              : isSearching 
                ? `${activeTab === 'certification' ? '인증 피드' : '재배 팁'}에서 검색 결과가 없습니다.`
                : '등록된 게시글이 없습니다.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
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
