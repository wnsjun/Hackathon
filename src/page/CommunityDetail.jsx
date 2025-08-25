import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import ChatbotIcon from '../components/common/ChatbotIcon';
import CommunityComment from '../components/common/CommunityComment';
import { mockCertificationPosts, mockTipPosts } from '../data/mockCommunity';
import { fetchPostDetail, fetchComments, createComment, deleteComment } from '../apis/community';
import profileImage from '../assets/profile.png';
import { toggleLike, removeLike } from '../apis/like';

const CommunityDetail = () => {
  const { id } = useParams();
  
  // 서버 응답의 liked 상태와 로컬 스토리지 상태 확인 후 초기화
  const [isLiked, setIsLiked] = useState(false);
  
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // Assets from Figma design
  const imgEllipse82 = profileImage;
  const imgRectangle161125945 = "http://localhost:3845/assets/99ed4a5b97b53e3180927bfe5bd3f23c7540750f.png";
  const loadComments = async (sortOrder = 'desc') => {
    try {
      const commentsResponse = await fetchComments(id, sortOrder);
      console.log('댓글 API 응답:', commentsResponse);
      
      // API 응답이 직접 배열을 반환
      const commentsArray = Array.isArray(commentsResponse) ? commentsResponse : [];
      
      // 첫 번째 댓글의 구조 확인
      if (commentsArray.length > 0) {
        console.log('첫 번째 댓글 구조:', commentsArray[0]);
      }
      
      const transformedComments = commentsArray.map((comment, index) => ({
        id: comment.id || comment.commentId || `${comment.userId}-${comment.postId}-${index}-${comment.createdAt}`, // 실제 댓글 ID 사용
        userId: comment.userId,
        username: comment.authorNickname || '사용자',
        profileImage: comment.authorProfileImage || comment.profileImage || imgEllipse82,
        timeAgo: formatTimeAgo(comment.createdAt),
        content: comment.content,
        isAuthor: false // This would need to be determined based on current user
      }));
      
      console.log('변환된 댓글:', transformedComments);
      setComments(transformedComments);
    } catch (error) {
      console.error('댓글 로드 실패:', error);
      setComments([]);
    }
  };

  useEffect(() => {
    const loadPostDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchPostDetail(id);
        
        const transformedPost = {
          id: response.id,
          title: response.title,
          content: response.content,
          username: response.authorNickname,
          profileImage: response.authorProfileImage || response.profileImage || imgEllipse82,
          images: response.imageUrls || [imgRectangle161125945],
          timeAgo: formatTimeAgo(response.createdAt),
          likeCount: response.likeCount || 0
        };
        
        // 서버에서 받은 liked 상태로 초기화
        setIsLiked(response.liked || false);
        
        setPostData(transformedPost);
        
        // Load comments separately
        await loadComments('desc');
        
      } catch (error) {
        console.error('게시글 상세 로드 실패:', error);
        setError('게시글을 불러올 수 없습니다.');
        
        // Fallback to mock data
        const allPosts = [...mockCertificationPosts, ...mockTipPosts];
        const mockPost = allPosts.find(post => post.id === parseInt(id));
        if (mockPost) {
          setPostData(mockPost);
          setComments(mockPost.comments || []);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPostDetail();
    }
  }, [id]);

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  const defaultPostData = {
    id: 0,
    username: '알 수 없음',
    timeAgo: '방금 전',
    title: '게시글을 찾을 수 없습니다',
    content: '요청하신 게시글을 찾을 수 없습니다.',
    images: [imgRectangle161125945],
    likeCount:0
  };

  const currentPost = postData || defaultPostData;

  // 캐러셀 네비게이션 함수들
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? currentPost.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === currentPost.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageIndexChange = (index) => {
    setCurrentImageIndex(index);
  };

  // 게시글이 변경될 때 이미지 인덱스 초기화
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [postData]);

  const handleLikeToggle = async () => {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    const newLikeStatus = !isLiked;

    try {
      if (isLiked) {
        // 이미 좋아요 상태면 삭제
        await removeLike(id);
      } else {
        // 좋아요 추가
        await toggleLike(id);
      }
      
      // 서버 API 성공 시 상태 업데이트
      setIsLiked(newLikeStatus);
    } catch (error) {
      console.error('좋아요 처리 실패:', error.message);
      alert(error.message);
    }
  };


  const handleCommentSubmit = async (commentText) => {
    try {
      setIsSubmittingComment(true);
      await createComment(id, commentText);
      
      // Reload comments after successful submission - 최신순으로 불러오기
      const commentsResponse = await fetchComments(id, 'desc');
      const commentsArray = Array.isArray(commentsResponse) ? commentsResponse : [];
      const transformedComments = commentsArray.map((comment, index) => ({
        id: comment.id || comment.commentId || `${comment.userId}-${comment.postId}-${index}-${comment.createdAt}`, // 실제 댓글 ID 사용
        userId: comment.userId,
        username: comment.authorNickname || '사용자',
        profileImage: comment.authorProfileImage || comment.profileImage || imgEllipse82,
        timeAgo: formatTimeAgo(comment.createdAt),
        content: comment.content,
        isAuthor: false
      }));
      
      setComments(transformedComments);
      return true;
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      return false;
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteComment(commentId);
      
      // 댓글 삭제 후 댓글 목록 새로고침
      const commentsResponse = await fetchComments(id, 'desc');
      const commentsArray = Array.isArray(commentsResponse) ? commentsResponse : [];
      const transformedComments = commentsArray.map((comment, index) => ({
        id: comment.id || comment.commentId || `${comment.userId}-${comment.postId}-${index}-${comment.createdAt}`, // 실제 댓글 ID 사용
        userId: comment.userId,
        username: comment.authorNickname || '사용자',
        profileImage: comment.authorProfileImage || comment.profileImage || imgEllipse82,
        timeAgo: formatTimeAgo(comment.createdAt),
        content: comment.content,
        isAuthor: false
      }));
      
      setComments(transformedComments);
      alert('댓글이 삭제되었습니다.');
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      if (error.response?.status === 500) {
        alert('서버 오류로 댓글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.response?.status === 403) {
        alert('댓글을 삭제할 권한이 없습니다.');
      } else if (error.response?.status === 404) {
        alert('삭제하려는 댓글을 찾을 수 없습니다.');
      } else {
        alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const HeartIcon = ({ isLiked }) => {
    if (isLiked) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ff6b6b"/>
        </svg>
      );
    }
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21.5 8.43164C21.5 7.85228 21.3833 7.27841 21.1572 6.74219C20.9593 6.27284 20.6808 5.83988 20.333 5.46289L20.1797 5.30469C19.7603 4.89232 19.2613 4.56399 18.7109 4.33984C18.1604 4.11569 17.5695 4 16.9727 4C16.3758 4 15.7849 4.11569 15.2344 4.33984C14.7529 4.53592 14.3107 4.81133 13.9268 5.15332L13.7656 5.30469L12 7.04004L10.2344 5.30469C9.38672 4.47167 8.23251 4.00098 7.02637 4.00098C5.82037 4.00109 4.66689 4.47177 3.81934 5.30469C2.97248 6.13704 2.50006 7.26224 2.5 8.43164C2.5 10.5525 3.62994 12.7131 5.51855 14.7734C7.2745 16.689 9.60381 18.4254 11.999 19.8428C16.7975 17.0009 19.5916 13.8351 21.1572 10.1221C21.3834 9.58573 21.5 9.01114 21.5 8.43164ZM23.5 8.43164C23.5 9.27875 23.3305 10.1178 23.001 10.8994C21.1765 15.2264 17.8932 18.7842 12.4961 21.8682L12 22.1514L11.5039 21.8682C8.82209 20.3356 6.10415 18.3725 4.04395 16.125C1.99512 13.8899 0.5 11.2652 0.5 8.43164C0.500061 6.72035 1.19214 5.08259 2.41797 3.87793C3.64315 2.67398 5.30114 2.00109 7.02637 2.00098C8.75177 2.00098 10.4105 2.67384 11.6357 3.87793L11.999 4.23535L12.3633 3.87793C12.97 3.28138 13.6898 2.80925 14.4805 2.4873C15.2711 2.16539 16.1179 2 16.9727 2C17.8274 2 18.6743 2.1654 19.4648 2.4873C20.2555 2.80924 20.9753 3.28139 21.582 3.87793C22.1891 4.47424 22.6714 5.18327 23.001 5.96484C23.3304 6.74633 23.5 7.58468 23.5 8.43164Z" fill="#777777"/>
      </svg>
    );
  };


  if (loading) {
    return (
      <div className="bg-white relative min-h-screen font-pretendard pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-spin">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
          </div>
          <p className="text-gray-500 text-lg">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && !postData) {
    return (
      <div className="bg-white relative min-h-screen font-pretendard pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-400">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <p className="text-red-600 text-lg mb-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white relative min-h-screen font-pretendard pt-20 pb-24 md:pb-12">
      
      {/* Unified Responsive Layout */}
      <div className="px-4 sm:px-6 md:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-col gap-6 pt-8">
            {/* Post Header */}
            <div className="flex flex-row items-end justify-between w-full">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-row gap-3 items-center">
                    <div className="size-12">
                      <img alt="" className="block max-w-none size-full rounded-full" height="48" src={currentPost.profileImage || imgEllipse82} width="48" />
                    </div>
                    <div className="font-semibold text-2xl text-black tracking-[-0.48px]">
                      {currentPost.username}
                    </div>
                  </div>
                  <div className="font-normal text-xl text-[#777777] tracking-[-0.6px]">
                    {currentPost.timeAgo}
                  </div>
                </div>
                <div className="cursor-pointer text-center" onClick={handleLikeToggle}>
                  <HeartIcon isLiked={isLiked} />
                  {currentPost.likeCount}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="flex flex-col gap-12 w-full">
              {/* Image Carousel */}
              <div className="relative w-full max-w-[739px]">
                <div className="relative h-[588px] rounded-2xl overflow-hidden">
                  {/* Images */}
                  <div 
                    className="flex transition-transform duration-300 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {currentPost.images.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="w-full h-full flex-shrink-0 bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: `url('${imageUrl}')` }}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation Buttons - only show if more than 1 image */}
                  {currentPost.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {/* Image Indicators - only show if more than 1 image */}
                  {currentPost.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {currentPost.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleImageIndexChange(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? 'bg-white' 
                              : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-8 w-full max-w-[739px]">
                <div className="flex flex-row gap-8 items-center w-full">
                  <div className="font-semibold text-4xl text-[#111111] tracking-[-0.72px] overflow-hidden">
                    {currentPost.title}
                  </div>
                </div>
                <div className="flex flex-row gap-8 items-end w-full">
                  <div className="font-normal text-xl text-black tracking-[-0.6px] leading-[1.5] whitespace-pre-line">
                    {currentPost.content}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="flex flex-col gap-4">
              {/* Image Carousel at the top */}
              <div className="relative w-full">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  {/* Images */}
                  <div 
                    className="flex transition-transform duration-300 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {currentPost.images.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="w-full h-full flex-shrink-0 bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: `url('${imageUrl}')` }}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation Buttons - only show if more than 1 image */}
                  {currentPost.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {/* Image Indicators - only show if more than 1 image */}
                  {currentPost.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                      {currentPost.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleImageIndexChange(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? 'bg-white' 
                              : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Post Header */}
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row gap-3 items-center">
                  <div className="size-10">
                    <img alt="" className="block max-w-none size-full rounded-full" height="40" src={currentPost.profileImage || imgEllipse82} width="40" />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-semibold text-lg text-black tracking-[-0.36px]">
                      {currentPost.username}
                    </div>
                    <div className="font-normal text-sm text-[#777777] tracking-[-0.42px]">
                      {currentPost.timeAgo}
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer text-center" onClick={handleLikeToggle}>
                  <HeartIcon isLiked={isLiked} />
                  {currentPost.likeCount}
                </div>
              </div>

              {/* Title and Content */}
              <div className="flex flex-col gap-4 w-full">
                <div className="font-semibold text-2xl text-[#111111] tracking-[-0.48px] break-words">
                  {currentPost.title}
                </div>
                <div className="font-normal text-base text-black tracking-[-0.48px] leading-[1.5] whitespace-pre-line break-words">
                  {currentPost.content}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Comments Section */}
      <CommunityComment 
        comments={comments} 
        onCommentSubmit={handleCommentSubmit}
        isSubmitting={isSubmittingComment}
        onSortChange={loadComments}
        onCommentDelete={handleCommentDelete}
      />
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};

export default CommunityDetail;