import { useState } from 'react';

const CommunityComment = ({ comments = [], onCommentSubmit, isSubmitting = false }) => {
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState('latest'); // 'register' or 'latest'

  // Assets from Figma design
  const imgEllipse83 = "http://localhost:3845/assets/08bc8f0fb0393f4fa955e7165c21fdf8b107680f.png";
  const imgVector = "http://localhost:3845/assets/1b193f7832bcdbddc1ce4e049b217cc1f504e158.svg";

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

  const handleSortChange = (order) => {
    setSortOrder(order);
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

  const safeComments = Array.isArray(comments) ? comments : [];

  return (
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
  );
};

export default CommunityComment;