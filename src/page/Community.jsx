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
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get('search') || '';

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
          username: post.authorNickname,
          image: post.thumbnailUrl,
          likes: post.likeCount,
          createdAt: post.createdAt,
          initialLiked: post.liked || false
        }));

        setSearchResults({
          certification: transformSearchResults(feedResponse.data || []),
          tips: transformSearchResults(tipsResponse.data || [])
        });
        setIsSearching(true);
      } else {
        // 결과가 없으면 빈 배열로 설정
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
          username: post.authorNickname,
          image: post.thumbnailUrl,
          likes: post.likeCount,
          createdAt: post.createdAt,
          initialLiked: post.liked || false
        }));

        const transformedTipPosts = (tipPosts || []).map(post => ({
          id: post.id,
          title: post.title,
          username: post.authorNickname,
          image: post.thumbnailUrl,
          likes: post.likeCount,
          createdAt: post.createdAt,
          initialLiked: post.liked || false
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

  // 검색 중이면 검색 결과를, 아니면 일반 게시글을 표시
  const postsToShow = (isSearching ? searchResults[activeTab] || [] : posts[activeTab] || [])
    .sort((a, b) => {
      // createdAt 기준 최신순 정렬
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      // createdAt이 없으면 id 기준으로 정렬
      return (b.id || 0) - (a.id || 0);
    });
  
  // 검색 결과가 전체적으로 있는지 확인 (탭 네비게이션 표시 여부 결정)
  const hasAnySearchResults = isSearching && (
    (searchResults.certification && searchResults.certification.length > 0) ||
    (searchResults.tips && searchResults.tips.length > 0)
  );

  return (
    <div className="p-12 mt-24 mb-12">
      {/* 검색 중이고 결과가 없으면 탭 네비게이션 숨김 */}
      {(!isSearching || hasAnySearchResults) && (
        <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
          <div className="flex">
            <button
              onClick={() => handleTabClick('certification')}
              className={`cursor-pointer px-6 py-3 mr-4 text-2xl font-semibold border-b-4 transition-colors ${
                activeTab === 'certification' 
                  ? 'text-black border-[#1aa752]' 
                  : 'text-gray-400 border-transparent'
              }`}
            >
              인증 피드
            </button>
            <button
              onClick={() => handleTabClick('tips')}
              className={`cursor-pointer px-6 py-3 text-2xl font-semibold border-b-4 transition-colors ${
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
      )}

      {/* 게시글 그리드 */}
      {searchLoading ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-spin">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
          </div>
          <p className="text-gray-500 text-lg">검색 중...</p>
        </div>
      ) : postsToShow.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            {isSearching && !hasAnySearchResults
              ? `'${searchQuery}'로 커뮤니티에서 검색한 결과가 없습니다.`
              : isSearching 
                ? `${activeTab === 'certification' ? '인증 피드' : '재배 팁'}에서 검색 결과가 없습니다.`
                : '등록된 게시글이 없습니다.'
            }
          </p>
        </div>
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

