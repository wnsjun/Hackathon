// import React, { useState } from 'react';
// import ChatIcon from '../assets/chaticon.svg';
// import profile from '../assets/profile.svg';
// import vector from '../assets/Vector.svg';
// import picture from '../assets/picture-icon.svg';
// import right from '../assets/right-icon.svg';

// export const ChatPage = () => {
//   return (
//     <div className="flex flex-1 bg-white h-screen my-20">
//       {/* 채팅 목록 */}
//       <aside className="w-[331px] h-[774px] bg-white m-12 p-6 flex-shrink-0">
//         <div className="flex items-center gap-4 border-b border-gray-400">
//           <img src={ChatIcon} alt="chat" className="w-28px h-24px" />
//           <h2
//             className="mb-4"
//             style={{
//               color: 'var(--400, #777)',
//               fontFamily: 'Pretendard',
//               fontSize: '24px',
//               fontStyle: 'normal',
//               fontWeight: 600,
//               lineHeight: '150%',
//               letterSpacing: '-0.48px',
//             }}
//           >
//             채팅 목록
//           </h2>
//         </div>

//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="mb-6 my-5 border-bottom: 1px solid var(--200, #F0F0F0);"
//           >
//             <div className="flex justify-between">
//               <span className="font-semibold">닉네임</span>
//               <span className="text-xs text-gray-500">22시간전</span>
//             </div>
//             <div className="text-sm text-gray-700">어쩌고저쩌고</div>
//           </div>
//         ))}
//       </aside>

//       {/* 채팅방 */}
//       <section
//         className="flex flex-col pb-6 m-12 p-8 bg-white border border-[#BBB]
//  rounded-[48px] shadow-[0_4px_20px_0_rgba(0,0,0,0.10)]"
//         style={{ width: '739px', height: '700px' }}
//       >
//         <div className="flex">
//           <img src={profile} alt="profile" className="w-48px h-48px" />
//           <span
//             className="font-bold text-lg"
//             style={{
//               fontFamily: 'Pretendard',
//               fontSize: '24px',
//               fontStyle: 'normal',
//               fontWeight: 600,
//               lineHeight: '150 %' /* 36px */,
//               letterSpacing: '-0.48px',
//             }}
//           >
//             닉네임
//           </span>
//           <button className="flex text-white items-center ml-220 bg-green-500 rounded-[100px] px-4 py-2 rounded font-semibold cursor-pointer hover:bg-green-400">
//             결제하기
//             <img src={right} alt="right-icon" className="h-6 w-6" />
//           </button>
//         </div>
//         {/* 채팅 메시지 예시 */}
//         <div className="flex flex-col gap-4 mb-6 my-10">
//           <div
//             className="flex justify-center items-start w-1/2 h-20"
//             style={{
//               padding: '20px 28px 24px 28px',
//               borderRadius: '0 40px 40px 40px',
//               border: '1px solid var(--300, #BBB)',
//               background: 'var(--200, #F0F0F0)',
//               backdropFilter: 'blur(5px)',
//             }}
//           />
//           <div
//             className="flex justify-center items-start w-1/3 self-end h-40"
//             style={{
//               padding: '20px 28px 24px 28px',
//               borderRadius: '40px 0 40px 40px',
//               border: '1px solid var(--300, #BBB)',
//               background: 'var(--200, #F0F0F0)',
//               backdropFilter: 'blur(5px)',
//             }}
//           />
//           <div
//             className="flex justify-center items-start w-1/4 h-20"
//             style={{
//               padding: '20px 28px 24px 28px',
//               borderRadius: '0 40px 40px 40px',
//               border: '1px solid var(--300, #BBB)',
//               background: 'var(--200, #F0F0F0)',
//               backdropFilter: 'blur(5px)',
//             }}
//           />
//           <div
//             className="flex justify-center items-start w-1/2 self-end h-30"
//             style={{
//               padding: '20px 28px 24px 28px',
//               borderRadius: '40px 0 40px 40px',
//               border: '1px solid var(--300, #BBB)',
//               background: 'var(--200, #F0F0F0)',
//               backdropFilter: 'blur(5px)',
//             }}
//           >
//             사진 보내주세요
//           </div>
//         </div>
//         {/* 입력창 */}
//         <div className="mt-auto flex items-center border h-16 rounded-[100px] pt-auto px-4 py-2 border-green-500">
//           <input
//             className="flex-1 pl-2 text-black outline-none text-[#BBB] font-pretendard text-[20px] font-normal leading-[30px] tracking-[-0.6px]"
//             placeholder="채팅을 입력하세요"
//           />

//           <button className="ml-2 cursor-pointer">
//             <div className="flex">
//               <img src={picture} alt="picture-icon" className="w-48px h-48px" />
//               <span role="img" aria-label="send">
//                 <img src={vector} alt="vector" className="w-48px h-48px pl-4" />
//               </span>
//             </div>
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

import React, { useState } from 'react';
import ChatIcon from '../assets/chaticon.svg';
import profile from '../assets/profile.svg';
import vector from '../assets/Vector.svg';
import picture from '../assets/picture-icon.svg';
import right from '../assets/right-icon.svg';

export const ChatPage = () => {
  // 채팅 메시지 배열 상태 (예시: 빈 배열이면 메시지 없음)
  const [messages, setMessages] = useState([]);

  return (
    <div className="flex flex-1 bg-white h-screen my-20">
      {/* 채팅 목록 */}
      <aside className="w-[331px] h-[774px] bg-white m-12 p-6 flex-shrink-0">
        <div className="flex items-center gap-4 border-b border-gray-400">
          <img src={ChatIcon} alt="chat" className="w-28px h-24px" />
          <h2
            className="mb-4"
            style={{
              color: 'var(--400, #777)',
              fontFamily: 'Pretendard',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '150%',
              letterSpacing: '-0.48px',
            }}
          >
            채팅 목록
          </h2>
        </div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6 my-5 border-b border-gray-200">
            <div className="flex justify-between">
              <span className="font-semibold">닉네임</span>
              <span className="text-xs text-gray-500">22시간전</span>
            </div>
            <div className="text-sm text-gray-700">어쩌고저쩌고</div>
          </div>
        ))}
      </aside>

      {/* 채팅방 */}
      <section
        className="flex flex-col pb-6 m-12 p-8 bg-white border border-[#BBB] rounded-[48px] shadow-[0_4px_20px_0_rgba(0,0,0,0.10)]"
        style={{ height: '700px', width: '739px' }}
      >
        <div className="flex items-center gap-4 mb-6">
          <img src={profile} alt="profile" className="w-48px h-48px" />
          <span
            className="font-bold text-lg"
            style={{
              fontFamily: 'Pretendard',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '150%',
              letterSpacing: '-0.48px',
            }}
          >
            닉네임
          </span>
          <button className="flex text-white items-center ml-auto bg-green-500 rounded-[100px] px-4 py-2 font-semibold cursor-pointer hover:bg-green-400">
            결제하기
            <img src={right} alt="right-icon" className="h-6 w-6 ml-2" />
          </button>
        </div>

        {/* 채팅 메시지 영역 */}
        <div className="flex flex-col gap-4 mb-6 my-10 flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 mt-20">
              채팅 기록이 없습니다.
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex justify-center items-start ${
                  msg.isMine ? 'self-end w-1/3' : 'w-1/2'
                }`}
                style={{
                  padding: '20px 28px 24px 28px',
                  borderRadius: msg.isMine
                    ? '40px 0 40px 40px'
                    : '0 40px 40px 40px',
                  border: '1px solid var(--300, #BBB)',
                  background: 'var(--200, #F0F0F0)',
                  backdropFilter: 'blur(5px)',
                }}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        {/* 입력창 */}
        <div className="mt-auto flex items-center border h-16 rounded-[100px] px-4 py-2 border-green-500">
          <input
            className="flex-1 pl-2 text-black outline-none text-[#BBB] font-pretendard text-[20px] font-normal leading-[30px] tracking-[-0.6px]"
            placeholder="채팅을 입력하세요"
          />

          <button className="ml-2 cursor-pointer flex items-center">
            <img src={picture} alt="picture-icon" className="w-48px h-48px" />
            <img src={vector} alt="vector" className="w-48px h-48px pl-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
