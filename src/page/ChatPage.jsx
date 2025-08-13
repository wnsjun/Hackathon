// import React, { useState } from 'react';
// import ChatIcon from '../assets/chaticon.svg';
// import profile from '../assets/profile.svg';
// import vector from '../assets/Vector.svg';
// import picture from '../assets/picture-icon.svg';
// import right from '../assets/right-icon.svg';

// export const ChatPage = () => {
//   // 채팅 메시지 배열 상태 (예시: 빈 배열이면 메시지 없음)
//   const [messages, setMessages] = useState([]);

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
//           <div key={i} className="mb-6 my-5 border-b border-gray-200">
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
//         className="flex flex-col pb-6 m-12 p-8 bg-white border border-[#BBB] rounded-[48px] shadow-[0_4px_20px_0_rgba(0,0,0,0.10)]"
//         style={{ height: '700px', width: '739px' }}
//       >
//         <div className="flex items-center gap-4 mb-6">
//           <img src={profile} alt="profile" className="w-48px h-48px" />
//           <span
//             className="font-bold text-lg"
//             style={{
//               fontFamily: 'Pretendard',
//               fontSize: '24px',
//               fontStyle: 'normal',
//               fontWeight: 600,
//               lineHeight: '150%',
//               letterSpacing: '-0.48px',
//             }}
//           >
//             닉네임
//           </span>
//           <button className="flex text-white items-center ml-auto bg-green-500 rounded-[100px] px-4 py-2 font-semibold cursor-pointer hover:bg-green-400">
//             결제하기
//             <img src={right} alt="right-icon" className="h-6 w-6 ml-2" />
//           </button>
//         </div>

//         {/* 채팅 메시지 영역 */}
//         <div className="flex flex-col gap-4 mb-6 my-10 flex-1 overflow-y-auto">
//           {messages.length === 0 ? (
//             <p className="text-center text-gray-400 mt-20">
//               채팅 기록이 없습니다.
//             </p>
//           ) : (
//             messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`flex justify-center items-start ${
//                   msg.isMine ? 'self-end w-1/3' : 'w-1/2'
//                 }`}
//                 style={{
//                   padding: '20px 28px 24px 28px',
//                   borderRadius: msg.isMine
//                     ? '40px 0 40px 40px'
//                     : '0 40px 40px 40px',
//                   border: '1px solid var(--300, #BBB)',
//                   background: 'var(--200, #F0F0F0)',
//                   backdropFilter: 'blur(5px)',
//                 }}
//               >
//                 {msg.text}
//               </div>
//             ))
//           )}
//         </div>

//         {/* 입력창 */}
//         <div className="mt-auto flex items-center border h-16 rounded-[100px] px-4 py-2 border-green-500">
//           <input
//             className="flex-1 pl-2 text-black outline-none text-[#BBB] font-pretendard text-[20px] font-normal leading-[30px] tracking-[-0.6px]"
//             placeholder="채팅을 입력하세요"
//           />

//           <button className="ml-2 cursor-pointer flex items-center">
//             <img src={picture} alt="picture-icon" className="w-48px h-48px" />
//             <img src={vector} alt="vector" className="w-48px h-48px pl-4" />
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../apis/axiosInstance'; // axiosInstance.js를 가져온다고 가정
import ChatIcon from '../assets/chaticon.svg';
import profile from '../assets/profile.svg';
import vector from '../assets/Vector.svg';
import picture from '../assets/picture-icon.svg';
import right from '../assets/right-icon.svg';

export const ChatPage = ({ userId }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // 1. 채팅방 목록 가져오기
  const fetchChatRooms = async () => {
    try {
      const res = await axiosInstance.get('/chat/room/list');
      setChatRooms(res.data);
      if (res.data.length > 0) {
        setSelectedRoom(res.data[0]);
      }
    } catch (error) {
      console.error('채팅방 목록 불러오기 실패:', error);
    }
  };

  // 2. 선택된 채팅방 메시지 불러오기
  const fetchMessages = async (chatRoomId) => {
    try {
      const res = await axiosInstance.get(`/chat/room/${chatRoomId}`);
      // 메시지는 최신이 마지막이니까 그대로 사용
      setMessages(res.data.content);
    } catch (error) {
      console.error('메시지 불러오기 실패:', error);
      setMessages([]);
    }
  };

  // 3. 메시지 읽음 처리 API 호출
  const markMessagesRead = async (chatRoomId) => {
    try {
      await axiosInstance.patch(
        `/chat/room/${chatRoomId}/read?userId=${userId}`
      );
      // unreadCount 0 처리 UI 반영
      setChatRooms((prev) =>
        prev.map((room) =>
          room.chatroomId === chatRoomId ? { ...room, unreadCount: 0 } : room
        )
      );
    } catch (error) {
      console.error('메시지 읽음 처리 실패:', error);
    }
  };

  // 채팅방 선택 핸들러
  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  // selectedRoom 변경될 때 메시지 불러오고 읽음 처리하기
  useEffect(() => {
    if (selectedRoom) {
      fetchMessages(selectedRoom.chatroomId);
      markMessagesRead(selectedRoom.chatroomId);
    }
  }, [selectedRoom]);

  // 처음 로드 시 채팅방 목록 가져오기
  useEffect(() => {
    fetchChatRooms();
  }, []);

  // 메시지 리스트 끝으로 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 메시지 전송 (API 명세서에 없어서 UI만 구현, 실제 API 필요 시 알려줘)
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    // TODO: 메시지 전송 API 호출 필요
    alert('메시지 전송 API 연동 필요합니다.');
    setInputMessage('');
  };

  return (
    <div className="flex flex-1 bg-white h-screen my-20">
      {/* 채팅 목록 */}
      <aside className="w-[331px] h-[774px] bg-white m-12 p-6 flex-shrink-0 overflow-y-auto">
        <div className="flex items-center gap-4 border-b border-gray-400">
          <img src={ChatIcon} alt="chat" className="w-7 h-6" />
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

        {chatRooms.length === 0 && (
          <p className="text-center mt-20 text-gray-400">채팅방이 없습니다.</p>
        )}

        {chatRooms.map((room) => (
          <div
            key={room.chatroomId}
            className={`mb-6 my-5 border-b border-gray-200 cursor-pointer p-2 ${
              selectedRoom?.chatroomId === room.chatroomId ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleSelectRoom(room)}
          >
            <div className="flex justify-between">
              <span className="font-semibold">
                {room.consumer.id === userId
                  ? room.provider.nickname
                  : room.consumer.nickname}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(room.lastMessageAt).toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-gray-700 truncate">
              {room.lastMessage || '메시지가 없습니다.'}
            </div>
            {room.unreadCount > 0 && (
              <span className="text-xs bg-red-500 text-white rounded-full px-2 ml-2">
                {room.unreadCount}
              </span>
            )}
          </div>
        ))}
      </aside>

      {/* 채팅방 영역 */}
      <section
        className="flex flex-col pb-6 m-12 p-8 bg-white border border-[#BBB] rounded-[48px] shadow-[0_4px_20px_0_rgba(0,0,0,0.10)]"
        style={{ height: '700px', width: '739px' }}
      >
        {selectedRoom ? (
          <>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={
                  selectedRoom.consumer.id === userId
                    ? selectedRoom.provider.profileImage || profile
                    : selectedRoom.consumer.profileImage || profile
                }
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
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
                {selectedRoom.consumer.id === userId
                  ? selectedRoom.provider.nickname
                  : selectedRoom.consumer.nickname}
              </span>
              <button className="flex text-white items-center ml-auto bg-green-500 rounded-[100px] px-4 py-2 font-semibold cursor-pointer hover:bg-green-400">
                결제하기
                <img src={right} alt="right-icon" className="h-6 w-6 ml-2" />
              </button>
            </div>

            {/* 메시지 영역 */}
            <div className="flex flex-col gap-4 mb-6 my-10 flex-1 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-center text-gray-400 mt-20">
                  채팅 기록이 없습니다.
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.messageId}
                    className={`flex justify-center items-start ${
                      msg.senderId === userId ? 'self-end w-1/3' : 'w-1/2'
                    }`}
                    style={{
                      padding: '20px 28px 24px 28px',
                      borderRadius:
                        msg.senderId === userId
                          ? '40px 0 40px 40px'
                          : '0 40px 40px 40px',
                      border: '1px solid var(--300, #BBB)',
                      background: 'var(--200, #F0F0F0)',
                      backdropFilter: 'blur(5px)',
                    }}
                  >
                    {msg.message}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력창 */}
            <div className="mt-auto flex items-center border h-16 rounded-[100px] px-4 py-2 border-green-500">
              <input
                className="flex-1 pl-2 text-black outline-none text-[#BBB] font-pretendard text-[20px] font-normal leading-[30px] tracking-[-0.6px]"
                placeholder="채팅을 입력하세요"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />

              <button
                className="ml-2 cursor-pointer flex items-center"
                onClick={handleSendMessage}
              >
                <img src={picture} alt="picture-icon" className="w-12 h-12" />
                <img src={vector} alt="vector" className="w-12 h-12 pl-4" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 mt-20">
            채팅방을 선택하세요.
          </p>
        )}
      </section>
    </div>
  );
};
