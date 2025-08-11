import React from "react";
import ChatIcon from '../assets/chaticon.svg';
import profile from '../assets/profile.svg';
import vector from '../assets/Vector.svg';
import ChatbotIcon from '../components/common/ChatbotIcon';

export const ChatPage = () => {
  return (
    <div className="flex flex-1 bg-white h-screen my-20">
      {/* 채팅 목록 */}
      <aside
        className="w-[331px] h-[774px] bg-white m-12 p-6 flex-shrink-0 border rounded"
      >
        <div className="flex items-center gap-4">
          <img src={ChatIcon} alt="chat" className="w-28px h-24px" />
          <h2
            className="mb-4"
            style={{
              color: "var(--400, #777)",
              fontFamily: "Pretendard",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "150%",
              letterSpacing: "-0.48px",
            }}
          >
            채팅 목록
          </h2>
        </div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6 my-5 border-bottom: 1px solid var(--200, #F0F0F0);">
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
        className="flex flex-col m-12 p-8 bg-white border rounded"
        style={{ height: "774px" }}
      >
        <div className="flex">
          <img src={profile} alt="profile" className="w-48px h-48px" />
          <span className="font-bold text-lg"
            style={{
              fontFamily: "Pretendard",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "150 %", /* 36px */
              letterSpacing: "-0.48px",
            }}>닉네임</span>
          <button className=" ml-220 bg-green-500 border-radius-100px px-4 py-2 rounded font-semibold cursor-pointer hover:bg-green-400">결제하기</button>
        </div>
        {/* 채팅 메시지 예시 */}
        <div className="flex flex-col gap-4 mb-6 my-10">
          <div
            className="flex justify-center items-start w-1/2 h-20"
            style={{
              padding: "20px 28px 24px 28px",
              borderRadius: "0 40px 40px 40px",
              border: "1px solid var(--300, #BBB)",
              background: "var(--200, #F0F0F0)",
              backdropFilter: "blur(5px)",
            }}
          />
          <div
            className="flex justify-center items-start w-1/3 self-end h-40"
            style={{
              padding: "20px 28px 24px 28px",
              borderRadius: "0 40px 40px 40px",
              border: "1px solid var(--300, #BBB)",
              background: "var(--200, #F0F0F0)",
              backdropFilter: "blur(5px)",
            }}
          />
          <div
            className="flex justify-center items-start w-1/4 h-20"
            style={{
              padding: "20px 28px 24px 28px",
              borderRadius: "0 40px 40px 40px",
              border: "1px solid var(--300, #BBB)",
              background: "var(--200, #F0F0F0)",
              backdropFilter: "blur(5px)",
            }}
          />
          <div
            className="flex justify-center items-start w-1/2 self-end h-30"
            style={{
              padding: "20px 28px 24px 28px",
              borderRadius: "0 40px 40px 40px",
              border: "1px solid var(--300, #BBB)",
              background: "var(--200, #F0F0F0)",
              backdropFilter: "blur(5px)",
            }}
          />
        </div>
        {/* 입력창 */}
        <div className="mt-auto flex items-center border rounded px-4 py-2 border-green-500">
          <input
            className="flex-1 outline-none"
            placeholder="메시지를 입력하세요"
          />
          <button className="ml-2 cursor-pointer">
            <span role="img" aria-label="send">
              <img src={vector} alt="vector" className="w-48px h-48px" />
            </span>
          </button>
        </div>
      </section>
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};
