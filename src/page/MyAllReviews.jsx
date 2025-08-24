// pages/MyAllReviews.jsx
import { Navbar } from '../components/layouts/Navbar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmCard from '../components/common/Card/FarmCard';
import ReviewCard from '../components/common/Card/ReviewCard';
import { useMyFarms, useMyReviews } from '../hooks/useMyPage';
import { timeAgo } from '../utils/timeAgo';
import profileImg from '../assets/profile.png';

// 모달 컴포넌트
const ReviewModal = ({ isOpen, onClose, reviews }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-50 bg-opacity-50 flex justify-center items-start z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-[800px] max-h-[80vh] overflow-y-auto p-6 mt-32 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-6">모든 리뷰</h2>
        <div className="grid grid-cols-2 gap-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.reviewId}
              profileUrl={review.profileImage || profileImg}
              nickname={review.nickname}
              timeAgo={timeAgo(review.createdAt)}
              content={review.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MyAllReviews = () => {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);

  const [modalFarmReviews, setModalFarmReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: myFarmsData, isLoading: myFarmsLoading } = useMyFarms();
  const { data: myReviews, isLoading: myReviewsLoading } = useMyReviews();

  const myFarms = myFarmsData?.farms || [];

  if (myFarmsLoading || myReviewsLoading) {
    return <p className="px-40 pt-32">로딩 중...</p>;
  }

  const openModal = (farmId) => {
    const farmReviews = myReviews.filter((r) => r.farmId === farmId);
    if (farmReviews.length === 0) return;
    setModalFarmReviews(farmReviews);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar />

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
          <h1 className="text-3xl font-semibold">리뷰</h1>
        </div>

        {/* 내 텃밭 + 리뷰 */}
        <div className="flex flex-col gap-12">
          {myFarms.length === 0 && (
            <p className="text-gray-500">텃밭 정보가 없습니다.</p>
          )}

          {myFarms.map((farm) => {
            const farmReviews = myReviews.filter((r) => r.farmId === farm.id);
            const visibleReviews = farmReviews.slice(0, 4);

            return (
              <div key={farm.id} className="flex gap-6 items-start">
                {/* FarmCard */}
                <div className="w-[300px] shrink-0">
                  <FarmCard farm={farm} />
                </div>

                {/* 리뷰 (2x2 grid) + 리뷰 더보기 버튼 */}
                <div className="flex flex-col flex-1 relative min-h-[160px]">
                  {/* 리뷰 그리드 */}
                  <div className="grid grid-cols-2 gap-4">
                    {visibleReviews.length > 0 ? (
                      visibleReviews.map((review) => (
                        <ReviewCard
                          key={review.reviewId}
                          profileUrl={review.profileImage || profileImg}
                          nickname={review.nickname}
                          timeAgo={timeAgo(review.createdAt)}
                          content={review.content}
                        />
                      ))
                    ) : (
                      <p className="col-span-2 text-gray-500">
                        등록된 리뷰가 없습니다.
                      </p>
                    )}
                  </div>

                  {/* 리뷰 더보기 버튼: 항상 오른쪽 아래 */}
                  <button
                    onClick={() => openModal(farm.id)}
                    className="absolute bottom-0 mb-1 right-0 text-[#777] font-normal text-[16px] leading-[24px] tracking-[-0.48px] hover:underline"
                  >
                    리뷰 더보기 &gt;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 리뷰 모달 */}
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          reviews={modalFarmReviews}
        />
      </div>
    </div>
  );
};

export default MyAllReviews;
