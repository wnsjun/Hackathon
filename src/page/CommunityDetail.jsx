import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { mockCertificationPosts, mockTipPosts } from '../data/mockCommunity';
import { fetchPostDetail } from '../apis/community';

const CommunityDetail = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [sortOrder, setSortOrder] = useState('register'); // 'register' or 'latest'
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assets from Figma design
  const imgEllipse82 = "http://localhost:3845/assets/03eab3ed8c78bad7cdec7c3357374c5806558d02.png";
  const imgRectangle161125945 = "http://localhost:3845/assets/99ed4a5b97b53e3180927bfe5bd3f23c7540750f.png";
  const imgEllipse83 = "http://localhost:3845/assets/08bc8f0fb0393f4fa955e7165c21fdf8b107680f.png";
  const imgIconStroke = "http://localhost:3845/assets/fcf78ba651ba6c64f9aef73aba247eaf75c7443b.svg";
  const imgVector = "http://localhost:3845/assets/1b193f7832bcdbddc1ce4e049b217cc1f504e158.svg";
  const img = "http://localhost:3845/assets/7cf7e64aface95ddfb54c919d250b988a81ec18c.svg";
  const img1 = "http://localhost:3845/assets/3afd11aeb6e0ae97fee730309097f997072316f4.svg";

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
          comments: response.comments?.map(comment => ({
            id: comment.userId,
            username: comment.authorNickname,
            timeAgo: formatTimeAgo(comment.createdAt),
            content: comment.content,
            isAuthor: comment.authorNickname === response.authorNickname
          })) || [],
          likeCount: response.likeCount || 0
        };
        
        setPostData(transformedPost);
      } catch (error) {
        console.error('게시글 상세 로드 실패:', error);
        setError('게시글을 불러올 수 없습니다.');
        
        // Fallback to mock data
        const allPosts = [...mockCertificationPosts, ...mockTipPosts];
        const mockPost = allPosts.find(post => post.id === parseInt(id));
        if (mockPost) {
          setPostData(mockPost);
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
    image: imgRectangle161125945,
    comments: []
  };

  const currentPost = postData || defaultPostData;
  
  // comments가 배열인지 확인하고, 아니면 빈 배열로 설정
  const safeComments = Array.isArray(currentPost.comments) ? currentPost.comments : [];

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      console.log('새 댓글:', newComment);
      setNewComment('');
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
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

  const SendIcon = () => {
    return (
      <div className="relative size-8">
        <div className="absolute inset-[12.5%_12.5%_11.16%_11.16%]">
          <div className="absolute inset-[-3.07%]">
            <img alt="전송" className="block max-w-none size-full" src={imgVector} />
          </div>
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
      <div className="absolute top-40 w-[333px] h-[496px] flex flex-col justify-between" style={{ left: "calc(66.667% - 13px)" }}>
        <div className="flex flex-col gap-2 items-end w-full">
          {/* Sort Options */}
          <div className="flex flex-row gap-4 items-center w-[333px]">
            <div 
              className="flex flex-row gap-1 items-center cursor-pointer"
              onClick={() => handleSortChange('latest')}
            >
              <div className="relative size-1">
                <img alt="최신순" className="block max-w-none size-full" src={img} />
              </div>
              <div className={`font-normal text-sm tracking-[-0.42px] ${
                sortOrder === 'latest' ? 'text-neutral-900' : 'text-[#bbbbbb]'
              }`}>
                최신순
              </div>
            </div>
            <div 
              className="flex flex-row gap-1 items-center cursor-pointer"
              onClick={() => handleSortChange('register')}
            >
              <div className="relative size-1">
                <img alt="등록순" className="block max-w-none size-full" src={img1} />
              </div>
              <div className={`font-normal text-sm tracking-[-0.42px] ${
                sortOrder === 'register' ? 'text-neutral-900' : 'text-[#bbbbbb]'
              }`}>
                등록순
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="bg-white flex flex-col gap-2 rounded-tl-lg rounded-tr-lg w-[333px]">
            <div className="flex flex-col w-full">
              {safeComments.map((comment) => (
                <div key={comment.id} className="bg-white flex flex-col gap-2 items-end px-0 py-4 w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="size-8">
                        <img alt="" className="block max-w-none size-full" height="32" src={imgEllipse83} width="32" />
                      </div>
                      <div className="flex flex-row gap-2 items-end">
                        <div className="font-semibold text-base text-neutral-900 tracking-[-0.48px]">
                          {comment.username}
                        </div>
                        <div className="flex flex-row gap-1 items-center text-sm tracking-[-0.42px]">
                          {comment.isAuthor && (
                            <>
                              <div className="text-[#1aa752]">작성자</div>
                              <div className="text-[#bbbbbb]">·</div>
                            </>
                          )}
                          <div className="text-[#bbbbbb]">{comment.timeAgo}</div>
                        </div>
                      </div>
                    </div>
                    {comment.isAuthor && (
                      <div className="text-[#777777] text-sm tracking-[-0.42px] cursor-pointer">
                        삭제
                      </div>
                    )}
                  </div>
                  <div className="text-base text-neutral-900 tracking-[-0.48px] leading-[1.5] w-[293px]">
                    {comment.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex flex-row items-center justify-between pl-8 pr-6 py-0 h-14 rounded-full border border-[#1aa752] w-full">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요."
            className="flex-1 bg-transparent text-base text-[#bbbbbb] tracking-[-0.48px] border-none outline-none"
          />
          <div className="cursor-pointer" onClick={handleCommentSubmit}>
            <SendIcon />
          </div>
        </div>
      </div>
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};

export default CommunityDetail;