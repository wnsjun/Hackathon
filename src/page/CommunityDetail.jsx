import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import ChatbotIcon from '../components/common/ChatbotIcon';
import CommunityComment from '../components/common/CommunityComment';
import { mockCertificationPosts, mockTipPosts } from '../data/mockCommunity';
import { fetchPostDetail, fetchComments, createComment } from '../apis/community';

const CommunityDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Assets from Figma design
  const imgEllipse82 = "http://localhost:3845/assets/03eab3ed8c78bad7cdec7c3357374c5806558d02.png";
  const imgRectangle161125945 = "http://localhost:3845/assets/99ed4a5b97b53e3180927bfe5bd3f23c7540750f.png";
  const imgIconStroke = "http://localhost:3845/assets/fcf78ba651ba6c64f9aef73aba247eaf75c7443b.svg";

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
          image: response.imageUrls?.[0] || imgRectangle161125945,
          timeAgo: formatTimeAgo(response.createdAt),
          likeCount: response.likeCount || 0
        };
        
        setPostData(transformedPost);
        
        // Load comments separately
        await loadComments();
        
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

    const loadComments = async () => {
      try {
        const commentsResponse = await fetchComments(id);
        const commentsArray = commentsResponse.comments || [];
        const transformedComments = Array.isArray(commentsArray) ? 
          commentsArray.map(comment => ({
            id: comment.userId,
            username: comment.authorNickname || '사용자',
            timeAgo: formatTimeAgo(comment.createdAt),
            content: comment.content,
            isAuthor: false // This would need to be determined based on current user
          })) : [];
        
        setComments(transformedComments);
      } catch (error) {
        console.error('댓글 로드 실패:', error);
        setComments([]);
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
    image: imgRectangle161125945
  };

  const currentPost = postData || defaultPostData;

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = async (commentText) => {
    try {
      setIsSubmittingComment(true);
      await createComment(id, commentText);
      
      // Reload comments after successful submission
      const commentsResponse = await fetchComments(id);
      const commentsArray = commentsResponse.comments || [];
      const transformedComments = Array.isArray(commentsArray) ? 
        commentsArray.map(comment => ({
          id: comment.userId,
          username: comment.authorNickname || '사용자',
          timeAgo: formatTimeAgo(comment.createdAt),
          content: comment.content,
          isAuthor: false
        })) : [];
      
      setComments(transformedComments);
      return true;
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      return false;
    } finally {
      setIsSubmittingComment(false);
    }
  };


  const HeartIcon = ({ isLiked }) => {
    return (
      <div className="relative size-6">
        <div className="absolute inset-[8.33%_2.08%_7.7%_2.08%]">
          <img alt={isLiked ? "좋아요 해제" : "좋아요"} className="block max-w-none size-full" src={imgIconStroke} />
        </div>
      </div>
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
    <div className="bg-white relative min-h-screen font-pretendard pt-32">{/* pt-32 added for navbar space */}

      {/* Main Content */}
      <div className="absolute left-40 top-32 w-[739px] flex flex-col gap-6">
        {/* Post Header */}
        <div className="flex flex-row items-end justify-between w-full">
          <div className="flex flex-row items-center justify-between w-[1120px]">
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-row gap-3 items-center">
                <div className="size-12">
                  <img alt="" className="block max-w-none size-full" height="48" src={imgEllipse82} width="48" />
                </div>
                <div className="font-semibold text-2xl text-black tracking-[-0.48px]">
                  {currentPost.username}
                </div>
              </div>
              <div className="font-normal text-xl text-[#777777] tracking-[-0.6px]">
                {currentPost.timeAgo}
              </div>
            </div>
            <div className="cursor-pointer" onClick={handleLikeToggle}>
              <HeartIcon isLiked={isLiked} />
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="flex flex-col gap-12 w-full">
          <div
            className="bg-center bg-cover bg-no-repeat h-[588px] rounded-2xl w-[739px]"
            style={{ backgroundImage: `url('${currentPost.image}')` }}
          />
          <div className="flex flex-col gap-8 w-[739px]">
            <div className="flex flex-row gap-8 items-center w-full">
              <div className="font-semibold text-4xl text-[#111111] tracking-[-0.72px] overflow-hidden w-[691px]">
                {currentPost.title}
              </div>
            </div>
            <div className="flex flex-row gap-8 items-end w-full">
              <div className="font-normal text-xl text-black tracking-[-0.6px] leading-[1.5] w-[739px] whitespace-pre-line">
                {currentPost.content}
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
      />
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};

export default CommunityDetail;