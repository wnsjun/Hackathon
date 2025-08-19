import { useState } from 'react';
import { fetchReviewsByFarmId } from '../../apis/reviewApi';

const FarmReview = ({ farmId, reviews = [], loading = false, onReviewsUpdate }) => {
  const [sortBy, setSortBy] = useState('latest');
  
  console.log('FarmReview 렌더링 - reviews:', reviews);
  console.log('FarmReview 렌더링 - reviews 길이:', reviews.length);

  const handleSortChange = async (type) => {
    if (sortBy === type) return;
    
    setSortBy(type);
    
    if (!farmId || !onReviewsUpdate) return;
    
    try {
      const sortByParam = type === 'latest' ? 'createdAt_desc' : 'createdAt_asc';
      const reviewsData = await fetchReviewsByFarmId(farmId, sortByParam);
      console.log('정렬 변경 - 받은 리뷰 데이터:', reviewsData);
      onReviewsUpdate(Array.isArray(reviewsData) ? reviewsData : []);
    } catch (error) {
      console.error('리뷰 정렬 실패:', error);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return '방금 전';
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInDays}일 전`;
    }
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 w-[333px]">
      <div className="flex flex-col font-['Pretendard:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[24px] text-left tracking-[-0.48px] w-full">
        <p className="block leading-[1.5]">텃밭 리뷰</p>
      </div>
      <div className="box-border content-stretch flex flex-col gap-16 items-start justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-end justify-start p-0 relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-[333px]">
            <div 
              className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 cursor-pointer"
              onClick={() => handleSortChange('latest')}
            >
              <div className="relative shrink-0 size-1">
                <div className={`w-1 h-1 rounded-full ${sortBy === 'latest' ? 'bg-neutral-900' : 'bg-[#bbbbbb]'}`}></div>
              </div>
              <div className={`font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-left text-nowrap tracking-[-0.42px] ${sortBy === 'latest' ? 'text-neutral-900' : 'text-[#bbbbbb]'}`}>
                <p className="[text-overflow:inherit] adjustLetterSpacing block leading-[1.5] overflow-inherit whitespace-pre">최신순</p>
              </div>
            </div>
            <div 
              className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 cursor-pointer"
              onClick={() => handleSortChange('oldest')}
            >
              <div className="relative shrink-0 size-1">
                <div className={`w-1 h-1 rounded-full ${sortBy === 'oldest' ? 'bg-neutral-900' : 'bg-[#bbbbbb]'}`}></div>
              </div>
              <div className={`font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-left text-nowrap tracking-[-0.42px] ${sortBy === 'oldest' ? 'text-neutral-900' : 'text-[#bbbbbb]'}`}>
                <p className="[text-overflow:inherit] adjustLetterSpacing block leading-[1.5] overflow-inherit whitespace-pre">등록순</p>
              </div>
            </div>
          </div>
              
          {/* Review items */}
          <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-[333px]">
            <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
              {loading ? (
                <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-center justify-center px-0 py-8 relative shrink-0 w-full">
                  <p className="text-[16px] text-[#777777]">리뷰를 불러오는 중...</p>
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={review.reviewId || index} className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-end justify-start px-0 py-4 relative shrink-0 w-full">
                    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0">
                        <div className="relative shrink-0 size-8">
                          <div className="w-8 h-8 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                            <span className="text-[14px] font-semibold text-[#777777]">
                              {review.nickname?.charAt(0) || '사'}
                            </span>
                          </div>
                        </div>
                        <div className="box-border content-stretch flex flex-row gap-2 items-end justify-center p-0 relative shrink-0">
                          <div className="font-['Pretendard:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-left text-neutral-900 text-nowrap tracking-[-0.48px]">
                            <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">{review.nickname || '사용자'}</p>
                          </div>
                          <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
                            <div className="font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#bbbbbb] text-[14px] text-left text-nowrap tracking-[-0.42px]">
                              <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">{formatTimeAgo(review.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="font-['Pretendard:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-left text-neutral-900 tracking-[-0.48px] w-[293px]">
                      <p className="adjustLetterSpacing block leading-[1.5]">
                        {review.content}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-center justify-center px-0 py-8 relative shrink-0 w-full">
                  <p className="font-['Pretendard:Regular',_sans-serif] text-[16px] text-[#777777] leading-[1.5]">리뷰가 존재하지 않습니다</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmReview;