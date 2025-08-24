import { useState } from 'react';
import profile from '../../assets/profile.png'

const CommunityComment = ({ comments = [], onCommentSubmit, isSubmitting = false, onSortChange, onCommentDelete }) => {
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState('latest'); // 'register' or 'latest'

  // 현재 로그인한 사용자 정보
  const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
  const currentUserNickname = currentUser.nickname;

  // Assets from Figma design
  const imgEllipse83 =profile;

  const handleCommentSubmit = async () => {
    if (newComment.trim() && !isSubmitting) {
      if (onCommentSubmit) {
        const success = await onCommentSubmit(newComment);
        if (success) {
          setNewComment('');
        }
      }
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    if (onSortChange) {
      onSortChange(order === 'latest' ? 'new' : 'asc');
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (onCommentDelete && window.confirm('댓글을 삭제하시겠습니까?')) {
      await onCommentDelete(commentId);
    }
  };

  const SendIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M13.3334 18.6667L28.0001 4M13.3334 18.6667L18.0001 28C18.0586 28.1277 18.1525 28.2358 18.2707 28.3117C18.3889 28.3875 18.5263 28.4278 18.6668 28.4278C18.8072 28.4278 18.9446 28.3875 19.0628 28.3117C19.181 28.2358 19.2749 28.1277 19.3334 28L28.0001 4M13.3334 18.6667L4.00009 14C3.87244 13.9415 3.76426 13.8476 3.68842 13.7294C3.61258 13.6112 3.57227 13.4738 3.57227 13.3333C3.57227 13.1929 3.61258 13.0554 3.68842 12.9373C3.76426 12.8191 3.87244 12.7252 4.00009 12.6667L28.0001 4" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  const safeComments = Array.isArray(comments) ? comments : [];

  return (
    <div className="px-4 sm:px-6 md:px-12 py-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="absolute top-40 w-[333px] h-[496px] flex flex-col justify-between" style={{ left: "calc(66.667% - 13px)" }}>
            <div className="flex flex-col gap-2 items-end w-full">
              {/* Sort Options */}
              <div className="flex flex-row gap-4 items-center w-[333px]">
                <div 
                  className="flex flex-row gap-1 items-center cursor-pointer"
                  onClick={() => handleSortChange('latest')}
                >
                  <div className="relative size-1">
                    <div className={`w-1 h-1 rounded-full ${sortOrder === 'latest' ? 'bg-neutral-900' : 'bg-[#bbbbbb]'}`}></div>
                  </div>
                  <div className={`font-['Pretendard:Regular',_sans-serif] text-sm tracking-[-0.42px] ${
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
                    <div className={`w-1 h-1 rounded-full ${sortOrder === 'register' ? 'bg-neutral-900' : 'bg-[#bbbbbb]'}`}></div>
                  </div>
                  <div className={`font-['Pretendard:Regular',_sans-serif] text-sm tracking-[-0.42px] ${
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
                            <img alt="" className="block max-w-none size-full object-cover rounded-full" height="32" src={comment.profileImage || imgEllipse83} width="32" />
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
                        {(comment.isAuthor || comment.username === currentUserNickname) && (
                          <div 
                            className="text-[#777777] text-sm tracking-[-0.42px] cursor-pointer hover:text-red-500"
                            onClick={() => handleCommentDelete(comment.id)}
                          >
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
                onKeyPress={handleKeyPress}
                placeholder="댓글을 입력하세요."
                disabled={isSubmitting}
                className="flex-1 bg-transparent text-base text-[#bbbbbb] tracking-[-0.48px] border-none outline-none disabled:opacity-50"
              />
              <div 
                className={`cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={handleCommentSubmit}
              >
                <SendIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex flex-col gap-4 w-full">
            {/* Sort Options */}
            <div className="flex flex-row gap-4 items-center px-4">
              <div 
                className="flex flex-row gap-1 items-center cursor-pointer"
                onClick={() => handleSortChange('latest')}
              >
                <div className="relative size-1">
                  <div className={`w-1 h-1 rounded-full ${sortOrder === 'latest' ? 'bg-neutral-900' : 'bg-[#bbbbbb]'}`}></div>
                </div>
                <div className={`font-['Pretendard:Regular',_sans-serif] text-sm tracking-[-0.42px] ${
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
                  <div className={`w-1 h-1 rounded-full ${sortOrder === 'register' ? 'bg-neutral-900' : 'bg-[#bbbbbb]'}`}></div>
                </div>
                <div className={`font-['Pretendard:Regular',_sans-serif] text-sm tracking-[-0.42px] ${
                  sortOrder === 'register' ? 'text-neutral-900' : 'text-[#bbbbbb]'
                }`}>
                  등록순
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="bg-white flex flex-col gap-2 rounded-lg w-full">
              <div className="flex flex-col w-full">
                {safeComments.map((comment) => (
                  <div key={comment.id} className="bg-white flex flex-col gap-2 px-4 py-4 w-full border-b border-gray-100 last:border-b-0">
                    <div className="flex flex-row items-start justify-between w-full">
                      <div className="flex flex-row gap-3 items-start flex-1">
                        <div className="size-8 flex-shrink-0">
                          <img alt="" className="block max-w-none size-full object-cover rounded-full" height="32" src={comment.profileImage || imgEllipse83} width="32" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <div className="flex flex-row gap-2 items-center flex-wrap">
                            <div className="font-semibold text-sm text-neutral-900 tracking-[-0.42px]">
                              {comment.username}
                            </div>
                            <div className="flex flex-row gap-1 items-center text-xs tracking-[-0.36px]">
                              {comment.isAuthor && (
                                <>
                                  <div className="text-[#1aa752]">작성자</div>
                                  <div className="text-[#bbbbbb]">·</div>
                                </>
                              )}
                              <div className="text-[#bbbbbb]">{comment.timeAgo}</div>
                            </div>
                          </div>
                          <div className="text-sm text-neutral-900 tracking-[-0.42px] leading-[1.4] break-words">
                            {comment.content}
                          </div>
                        </div>
                      </div>
                      {(comment.isAuthor || comment.username === currentUserNickname) && (
                        <div 
                          className="text-[#777777] text-xs tracking-[-0.36px] cursor-pointer hover:text-red-500 ml-2 flex-shrink-0"
                          onClick={() => handleCommentDelete(comment.id)}
                        >
                          삭제
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Input */}
            <div className="mx-4">
              <div className="flex flex-row items-center justify-between pl-4 pr-3 py-0 h-12 rounded-full border border-[#1aa752] w-full">
              <input
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                onKeyPress={handleKeyPress}
                placeholder="댓글을 입력하세요."
                disabled={isSubmitting}
                className="flex-1 bg-transparent text-sm text-[#bbbbbb] tracking-[-0.42px] border-none outline-none disabled:opacity-50"
              />
              <div 
                className={`cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={handleCommentSubmit}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path d="M13.3334 18.6667L28.0001 4M13.3334 18.6667L18.0001 28C18.0586 28.1277 18.1525 28.2358 18.2707 28.3117C18.3889 28.3875 18.5263 28.4278 18.6668 28.4278C18.8072 28.4278 18.9446 28.3875 19.0628 28.3117C19.181 28.2358 19.2749 28.1277 19.3334 28L28.0001 4M13.3334 18.6667L4.00009 14C3.87244 13.9415 3.76426 13.8476 3.68842 13.7294C3.61258 13.6112 3.57227 13.4738 3.57227 13.3333C3.57227 13.1929 3.61258 13.0554 3.68842 12.9373C3.76426 12.8191 3.87244 12.7252 4.00009 12.6667L28.0001 4" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommunityComment;