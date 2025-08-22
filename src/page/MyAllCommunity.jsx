// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CommunityPostCard from '../components/common/Card/CommunityPostCard';
// import { mockCertificationPosts, mockTipPosts } from '../data/mockCommunity';

// const MyAllCommunity = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('written');
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const allPostsData = {
//       written: mockCertificationPosts,
//       liked: mockTipPosts,
//     };

//     setPosts(allPostsData[activeTab] || []);
//   }, [activeTab]);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="bg-[#ffffff] relative size-full">
//       <div className="box-border content-stretch flex flex-col gap-6 items-center justify-start p-0 relative size-full pt-32 px-40">
//         <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
//           <div className="flex items-center gap-4">
//             {/*뒤로가기버튼*/}
//             <button
//               onClick={handleBackClick}
//               className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
//             >
//               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12.5 15L7.5 10L12.5 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>
//             <div className="flex flex-col font-['Pretendard'] font-semibold justify-center leading-[1.5] not-italic relative shrink-0 text-[#000000] text-[32px] text-left tracking-[-0.64px]">
//               <p className="block">커뮤니티</p>
//             </div>
//           </div>
//           <div className="box-border content-stretch flex flex-row items-end justify-between p-0 relative shrink-0 w-full">
//             <div className="box-border content-stretch flex flex-row items-center justify-start leading-[0] p-0 relative shrink-0">
//               <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
//                 <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 relative w-60">
//                   <div
//                     aria-hidden="true"
//                     className={`absolute border-solid inset-0 pointer-events-none ${
//                       activeTab === 'written'
//                         ? 'border-[#1aa752] border-[0px_0px_4px]'
//                         : 'border-transparent'
//                     }`}
//                   />
//                 </div>
//                 <button
//                   className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold h-[38.4px] justify-center leading-[0] ml-[87px] mt-[32.2px] not-italic relative text-[24px] text-left tracking-[-0.48px] translate-y-[-50%] w-[67px] cursor-pointer"
//                   style={{ color: activeTab === 'written' ? '#000000' : '#bbbbbb' }}
//                   onClick={() => handleTabClick('written')}
//                 >
//                   <p className="block leading-[1.5] whitespace-pre">작성 글</p>
//                 </button>
//               </div>
//               <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
//                 <div className="[grid-area:1_/_1] bg-[#ffffff] h-16 ml-0 mt-0 w-60">
//                   <div
//                     aria-hidden="true"
//                     className={`absolute border-solid inset-0 pointer-events-none ${
//                       activeTab === 'liked'
//                         ? 'border-[#1aa752] border-[0px_0px_4px]'
//                         : 'border-transparent'
//                     }`}
//                   />
//                 </div>
//                 <button
//                   className="[grid-area:1_/_1] flex flex-col font-['Pretendard'] font-semibold justify-center leading-[0] ml-[54px] mt-8 not-italic relative text-[24px] text-left text-nowrap tracking-[-0.48px] translate-y-[-50%] cursor-pointer"
//                   style={{ color: activeTab === 'liked' ? '#000000' : '#bbbbbb' }}
//                   onClick={() => handleTabClick('liked')}
//                 >
//                   <p className="block leading-[1.5] whitespace-pre">좋아요 누른 글</p>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="box-border content-stretch flex flex-row gap-[21px] items-center justify-start leading-[0] p-0 relative shrink-0 w-full flex-wrap">
//           {posts.map((post, index) => (
//             <div
//               key={post.id}
//               className={`${index >= 3 ? 'mt-0' : ''} flex-none`}
//               style={{ width: 'calc(33.333% - 14px)' }}
//             >
//               <CommunityPostCard
//                 id={post.id}
//                 image={post.image}
//                 username={post.username}
//                 timeAgo={post.timeAgo}
//                 title={post.title}
//                 content={post.content}
//                 initialLiked={post.initialLiked}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAllCommunity;

// src/page/MyAllCommunity.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityPostCard from '../components/common/Card/CommunityPostCard';
import { useMyPosts, useLikedPosts } from '../hooks/useMyPage';

const MyAllCommunity = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('written');

  const { data: myPostsData, isLoading: myPostsLoading } = useMyPosts();
  const { data: likedPostsData, isLoading: likedPostsLoading } =
    useLikedPosts();

  const myPosts = myPostsData || [];
  const likedPosts = likedPostsData || [];

  const handleBackClick = () => navigate(-1);

  if (myPostsLoading || likedPostsLoading) {
    return <p className="pl-40 pt-20">로딩 중...</p>;
  }

  const posts = activeTab === 'written' ? myPosts : likedPosts;

  return (
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
        <h1 className="text-3xl font-semibold">커뮤니티</h1>
      </div>

      {/* 탭 */}
      <div className="flex gap-6 mb-10">
        <button
          className={`text-xl font-semibold ${
            activeTab === 'written'
              ? 'text-black border-b-4 border-green-600'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('written')}
        >
          작성 글
        </button>
        <button
          className={`text-xl font-semibold ${
            activeTab === 'liked'
              ? 'text-black border-b-4 border-green-600'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('liked')}
        >
          좋아요 누른 글
        </button>
      </div>

      {/* 카드 */}
      <div className="flex flex-wrap gap-6">
        {posts.map((post) => (
          <div key={post.id} className="flex-none w-[calc(33.333%-16px)]">
            <CommunityPostCard
              id={post.id}
              image={post.thumbnailUrl}
              username={post.authorNickname}
              title={post.title}
              likeCount={post.likeCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAllCommunity;
