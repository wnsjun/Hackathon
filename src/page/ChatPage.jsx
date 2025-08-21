// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import useStompClient from '../hooks/useStompClient';
// import {
//   getChatRooms,
//   getMessages,
//   markRead,
//   uploadImages,
// } from '../apis/chatApi';
// import ChatRoomList from '../components/common/chat/ChatRoomList';
// import ChatMessage from '../components/common/chat/ChatMessage';

// import ChatIcon from '../assets/chaticon.svg';
// import profile from '../assets/profile.svg';
// import right from '../assets/right-icon.svg';
// import picture from '../assets/picture-icon.svg';

// const ChatPage = ({ userId }) => {
//   const [rooms, setRooms] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [page, setPage] = useState(0);
//   const [last, setLast] = useState(true);
//   const [input, setInput] = useState('');
//   const [stompConnected, setStompConnected] = useState(false);

//   const listRef = useRef(null);
//   const endRef = useRef(null);
//   const topSentinelRef = useRef(null);
//   const loadingRef = useRef(false);

//   const { connected, subscribeRoom, unsubscribeRoom, sendText, connect } =
//     useStompClient();

//   /** STOMP 연결 */
//   useEffect(() => {
//     if (!stompConnected) {
//       connect()
//         .then(() => setStompConnected(true))
//         .catch((err) => {
//           console.error('STOMP 연결 실패:', err);
//           setTimeout(() => setStompConnected(false), 5000);
//         });
//     }
//   }, [stompConnected, connect]);

//   /** 채팅방 목록 로드 */
//   const refreshRooms = useCallback(async () => {
//     try {
//       const data = await getChatRooms();
//       setRooms(Array.isArray(data) ? data : []);
//       if (!selected && data?.length) setSelected(data[0]);
//     } catch (e) {
//       console.error('채팅방 목록 로드 실패:', e);
//       setRooms([]);
//     }
//   }, [selected]);

//   /** 메시지 초기/재입장 로드 */
//   const loadInitialMessages = useCallback(
//     async (chatRoomId) => {
//       if (!chatRoomId) return;
//       loadingRef.current = true;
//       try {
//         const data = await getMessages({ chatRoomId, page: 0, size: 30 });
//         const sorted = [...(data?.content || [])].sort(
//           (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//         );
//         setMessages(sorted);
//         setPage(0);
//         setLast(data?.last ?? true);

//         await markRead({ chatRoomId, userId });
//         setRooms((prev) =>
//           prev.map((r) =>
//             r.chatroomId === chatRoomId ? { ...r, unreadCount: 0 } : r
//           )
//         );

//         setTimeout(
//           () => endRef.current?.scrollIntoView({ behavior: 'auto' }),
//           0
//         );
//       } catch (e) {
//         console.error('메시지 로드 실패:', e);
//         setMessages([]);
//       } finally {
//         loadingRef.current = false;
//       }
//     },
//     [userId]
//   );

//   /** 이전 페이지 무한 스크롤 */
//   const loadMore = useCallback(async () => {
//     if (!selected || last || loadingRef.current) return;
//     loadingRef.current = true;
//     try {
//       const nextPage = page + 1;
//       const data = await getMessages({
//         chatRoomId: selected.chatroomId,
//         page: nextPage,
//         size: 30,
//       });
//       const sorted = [...(data?.content || [])].sort(
//         (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//       );
//       const listEl = listRef.current;
//       const prevScrollHeight = listEl?.scrollHeight ?? 0;

//       setMessages((prev) => [...sorted, ...prev]);
//       setPage(nextPage);
//       setLast(data?.last ?? true);

//       setTimeout(() => {
//         const newScrollHeight = listEl?.scrollHeight ?? 0;
//         listEl.scrollTop =
//           newScrollHeight - prevScrollHeight + (listEl.scrollTop || 0);
//       }, 0);
//     } catch (e) {
//       console.error('이전 메시지 로드 실패:', e);
//     } finally {
//       loadingRef.current = false;
//     }
//   }, [selected, page, last]);

//   /** 상단 sentinel 옵저버 */
//   useEffect(() => {
//     const el = topSentinelRef.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => entry.isIntersecting && loadMore(),
//       {
//         root: listRef.current,
//         threshold: 1,
//       }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [loadMore]);

//   /** 방 선택 시 메시지 로드 + STOMP 구독 */
//   useEffect(() => {
//     if (!selected || !connected) return;

//     loadInitialMessages(selected.chatroomId);

//     const unsub = subscribeRoom(selected.chatroomId, (incoming) => {
//       setMessages((prev) => [...prev, incoming]);
//       setRooms((prev) =>
//         prev.map((r) =>
//           r.chatroomId === selected.chatroomId
//             ? {
//                 ...r,
//                 lastMessage:
//                   incoming.messageType === 'TEXT' ? incoming.message : '사진',
//                 lastMessageCreatedAt: incoming.createdAt,
//               }
//             : r
//         )
//       );
//       setTimeout(
//         () => endRef.current?.scrollIntoView({ behavior: 'smooth' }),
//         0
//       );
//     });

//     return () => {
//       if (unsub) unsub();
//       else if (selected?.chatroomId) unsubscribeRoom(selected.chatroomId);
//     };
//   }, [
//     selected,
//     connected,
//     subscribeRoom,
//     unsubscribeRoom,
//     loadInitialMessages,
//   ]);

//   /** 초기 목록 로드 */
//   useEffect(() => {
//     refreshRooms();
//   }, [refreshRooms]);

//   const handleSend = () => {
//     if (!input.trim() || !selected) return;
//     try {
//       sendText(selected.chatroomId, input.trim());
//       setInput('');
//     } catch (e) {
//       console.error('메시지 전송 실패:', e);
//       alert('메시지 전송 실패');
//     }
//   };

//   const onPickImages = async (e) => {
//     const files = Array.from(e.target.files || []);
//     if (!files.length || !selected) return;
//     try {
//       const saved = await uploadImages({
//         chatRoomId: selected.chatroomId,
//         files,
//       });
//       if (saved) {
//         setMessages((prev) => [...prev, saved]);
//         setTimeout(
//           () => endRef.current?.scrollIntoView({ behavior: 'smooth' }),
//           0
//         );
//       }
//     } catch (err) {
//       console.error('이미지 전송 실패:', err);
//       alert('이미지 전송 실패');
//     } finally {
//       e.target.value = '';
//     }
//   };

//   return (
//     <div className="flex flex-1 bg-white h-screen my-20">
//       <aside className="w-[331px] h-[774px] bg-white m-12 p-6 flex-shrink-0 overflow-y-auto">
//         <div className="flex items-center gap-4 border-b border-gray-400">
//           <img src={ChatIcon} alt="chat" className="w-7 h-6" />
//           <h2 className="mb-4 text-2xl font-semibold text-gray-700">
//             채팅 목록
//           </h2>
//         </div>

//         <ChatRoomList
//           rooms={rooms}
//           selectedId={selected?.chatroomId}
//           onSelect={setSelected}
//           userId={userId}
//         />
//       </aside>

//       <section
//         className="flex flex-col pb-6 m-12 p-8 bg-white border border-[#BBB] rounded-[48px] shadow-[0_4px_20px_0_rgba(0,0,0,0.10)]"
//         style={{ height: '700px', width: '739px' }}
//       >
//         {selected ? (
//           <>
//             <div className="flex items-center gap-4 mb-6">
//               <img
//                 src={
//                   selected.consumer?.id === userId
//                     ? selected.provider?.profileImage || profile
//                     : selected.consumer?.profileImage || profile
//                 }
//                 alt="profile"
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <span className="font-bold text-lg">
//                 {selected.consumer?.id === userId
//                   ? selected.provider?.nickname
//                   : selected.consumer?.nickname}
//               </span>

//               <button className="ml-auto flex items-center bg-green-500 text-white px-3 py-1 rounded font-semibold">
//                 채팅하기
//                 <img src={right} alt="right" className="ml-2 w-3 h-3" />
//               </button>
//             </div>

//             <div ref={listRef} className="flex-1 overflow-y-auto mb-4">
//               <div ref={topSentinelRef} />
//               {messages.map((msg) => (
//                 <ChatMessage
//                   key={msg.messageId || msg.id || msg.createdAt}
//                   msg={msg}
//                   isMine={msg.senderId === userId}
//                 />
//               ))}
//               <div ref={endRef} />
//             </div>

//             <div className="flex gap-2">
//               <input
//                 className="flex-1 p-3 border rounded-lg focus:outline-none"
//                 placeholder="메시지를 입력하세요..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               />
//               <label className="flex items-center px-3 bg-gray-200 rounded cursor-pointer">
//                 <img src={picture} alt="img" className="w-6 h-6" />
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   className="hidden"
//                   onChange={onPickImages}
//                 />
//               </label>
//               <button
//                 className="px-4 py-2 bg-green-500 text-white rounded"
//                 onClick={handleSend}
//               >
//                 전송
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-400 mt-20">
//             채팅방을 선택해주세요.
//           </p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ChatPage;

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import useStompClient from '../hooks/useStompClient';
import {
  getChatRooms,
  getMessages,
  markAsRead,
  uploadImages,
} from '../apis/chatApi';
import ChatRoomList from '../components/common/chat/ChatRoomList';
import ChatMessage from '../components/common/chat/ChatMessage';

import ChatIcon from '../assets/chaticon.svg';
import profile from '../assets/profile.svg';
import right from '../assets/right-icon.svg';
import picture from '../assets/picture-icon.svg';

const ChatPage = () => {
  // JWT 토큰에서 사용자 ID 추출 함수 (메모이제이션)
  const getUserIdFromToken = useCallback((token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // console.log('JWT payload:', payload);
      return payload.userId || payload.sub || payload.id;
    } catch (error) {
      console.error('JWT 파싱 실패:', error);
      return null;
    }
  }, []);

  // 로컬스토리지에서 사용자 정보 가져오기 (메모이제이션)
  const { userData, userId } = useMemo(() => {
    const data = JSON.parse(localStorage.getItem('userData') || '{}');
    const tokenUserId = data.accessToken ? getUserIdFromToken(data.accessToken) : null;
    const finalUserId = data.id || tokenUserId || 1;
    
    console.log('사용자 정보 디버깅:', {
      localStorage_userData: data,
      tokenUserId: tokenUserId,
      finalUserId: finalUserId
    });
    
    return {
      userData: data,
      userId: finalUserId
    };
  }, [getUserIdFromToken]);
  
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(true);
  const [input, setInput] = useState('');

  const listRef = useRef(null);
  const endRef = useRef(null);
  const topSentinelRef = useRef(null);
  const loadingRef = useRef(false);

  const { connected, subscribeRoom, unsubscribeRoom, sendText, connect } =
    useStompClient();

  /** STOMP 연결 - 페이지 진입 시 한 번만 실행 */
  useEffect(() => {
    if (!connected) {
      console.log('STOMP 연결 시작...');
      connect()
        .then(() => {
          console.log('STOMP 연결 성공');
        })
        .catch((err) => {
          console.error('STOMP 연결 실패:', err);
        });
    }
  }, [connect, connected]);

  /** 컴포넌트 언마운트 시 정리 */
  useEffect(() => {
    return () => {
      console.log('채팅 페이지 정리 중...');
      // STOMP 연결 정리는 useStompClient에서 처리
    };
  }, []);

  /** 채팅방 목록 로드 */
  const refreshRooms = useCallback(async () => {
    try {
      const data = await getChatRooms();
      setRooms(Array.isArray(data) ? data : []);
      if (!selected && data?.length) setSelected(data[0]);
    } catch (e) {
      console.error('채팅방 목록 로드 실패:', e);
      setRooms([]);
    }
  }, [selected]);

  /** 메시지 초기/재입장 로드 */
  const loadInitialMessages = useCallback(
    async (chatRoomId) => {
      if (!chatRoomId) return;
      loadingRef.current = true;
      try {
        const data = await getMessages({ chatRoomId, page: 0, size: 30 });
        console.log('메시지 로드 응답:', data);
        const sorted = [...(data?.content || [])].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        console.log('정렬된 메시지:', sorted);
        setMessages(sorted);
        setPage(0);
        setLast(data?.last ?? true);

        await markAsRead(chatRoomId);
        setRooms((prev) =>
          prev.map((r) =>
            r.chatroomId === chatRoomId ? { ...r, unreadCount: 0 } : r
          )
        );

        setTimeout(
          () => endRef.current?.scrollIntoView({ behavior: 'auto' }),
          0
        );
      } catch (e) {
        console.error('메시지 로드 실패:', e);
        setMessages([]);
      } finally {
        loadingRef.current = false;
      }
    },
    [userId]
  );

  /** 이전 페이지 무한 스크롤 */
  const loadMore = useCallback(async () => {
    if (!selected || last || loadingRef.current) return;
    loadingRef.current = true;
    try {
      const nextPage = page + 1;
      const data = await getMessages({
        chatRoomId: selected.chatroomId,
        page: nextPage,
        size: 30,
      });
      const sorted = [...(data?.content || [])].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      const listEl = listRef.current;
      const prevScrollHeight = listEl?.scrollHeight ?? 0;

      setMessages((prev) => [...sorted, ...prev]);
      setPage(nextPage);
      setLast(data?.last ?? true);

      setTimeout(() => {
        const newScrollHeight = listEl?.scrollHeight ?? 0;
        listEl.scrollTop =
          newScrollHeight - prevScrollHeight + (listEl.scrollTop || 0);
      }, 0);
    } catch (e) {
      console.error('이전 메시지 로드 실패:', e);
    } finally {
      loadingRef.current = false;
    }
  }, [selected, page, last]);

  /** 상단 sentinel 옵저버 */
  useEffect(() => {
    const el = topSentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      {
        root: listRef.current,
        threshold: 1,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  /** 방 선택 시 메시지 로드 + STOMP 구독 */
  useEffect(() => {
    if (!selected) return;
    
    console.log('선택된 방:', selected.chatroomId, 'STOMP 연결:', connected);
    
    // STOMP 연결 여부와 관계없이 메시지 로드
    loadInitialMessages(selected.chatroomId);

    return () => {
      // cleanup 필요시 처리
    };
  }, [
    selected,
    loadInitialMessages,
  ]);
  
  // STOMP 연결 후 구독 처리를 분리
  useEffect(() => {
    if (!selected || !connected) return;
    
    const unsub = subscribeRoom(selected.chatroomId, (incoming) => {
      console.log('받은 메시지:', incoming);

      const msg = {
        messageId: incoming.messageId || incoming.id || Date.now(),
        message: incoming.message || incoming.text || '',
        senderId: incoming.senderId || incoming.userId,
        createdAt: incoming.createdAt || new Date().toISOString(),
        messageType: incoming.messageType || 'TEXT',
      };

      // 내가 보낸 메시지가 아닌 경우에만 추가 (중복 방지)
      if (String(msg.senderId) !== String(userId)) {
        setMessages((prev) => [...prev, msg]);
      }

      setRooms((prev) =>
        prev.map((r) =>
          r.chatroomId === selected.chatroomId
            ? {
                ...r,
                lastMessage: msg.messageType === 'TEXT' ? msg.message : '사진',
                lastMessageCreatedAt: msg.createdAt,
              }
            : r
        )
      );

      setTimeout(
        () => endRef.current?.scrollIntoView({ behavior: 'smooth' }),
        0
      );
    });

    return () => {
      if (unsub) unsub();
    };
  }, [selected, connected, subscribeRoom]);

  /** 초기 목록 로드 */
  useEffect(() => {
    refreshRooms();
  }, [refreshRooms]);

  /** 메시지 전송 */
  const handleSend = useCallback(() => {
    if (!input.trim() || !selected || !userId) {
      console.log('전송 실패 - input:', input.trim(), 'selected:', !!selected, 'userId:', userId);
      return;
    }

    console.log('메시지 전송 중...', input.trim(), '연결상태:', connected);

    // STOMP 연결 확인
    if (!connected) {
      console.warn('STOMP 연결 안됨 - 연결 재시도');
      connect().then(() => {
        console.log('재연결 후 메시지 전송 시도');
      });
      alert('채팅 서버에 연결 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const messageText = input.trim();
    const newMsg = {
      messageId: Date.now(),
      message: messageText,
      senderId: userId,
      senderNickname: userData.nickname || '나',
      createdAt: new Date().toISOString(),
      messageType: 'TEXT',
    };

    // 화면에 바로 표시 (낙관적 업데이트)
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    try {
      sendText(selected.chatroomId, messageText);
      console.log('STOMP 메시지 전송 완료');
      
      // 채팅방 목록의 최근 메시지 업데이트
      setRooms((prev) =>
        prev.map((r) =>
          r.chatroomId === selected.chatroomId
            ? {
                ...r,
                lastMessage: messageText,
                lastMessageAt: newMsg.createdAt,
              }
            : r
        )
      );
    } catch (e) {
      console.error('메시지 전송 실패:', e);
      alert('메시지 전송 실패');
      // 실패 시 화면에서 제거
      setMessages((prev) => prev.filter((msg) => msg.messageId !== newMsg.messageId));
      setInput(messageText); // 입력값 복원
    }

    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
  }, [input, selected, userId, connected, sendText, userData.nickname]);

  /** 이미지 전송 */
  const onPickImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !selected) return;
    try {
      const saved = await uploadImages({
        chatRoomId: selected.chatroomId,
        files,
      });
      if (saved) {
        setMessages((prev) => [
          ...prev,
          ...(Array.isArray(saved) ? saved : [saved]),
        ]);
        setTimeout(
          () => endRef.current?.scrollIntoView({ behavior: 'smooth' }),
          0
        );
      }
    } catch (err) {
      console.error('이미지 전송 실패:', err);
      alert('이미지 전송 실패');
    } finally {
      e.target.value = '';
    }
  };

  /** 메시지 렌더링 최적화 */
  const renderedMessages = useMemo(() => 
    messages.map((msg) => (
      <ChatMessage
        key={msg.messageId || msg.id || msg.createdAt}
        msg={msg}
        isMine={String(msg.senderId) === String(userId) || msg.senderId === 1}
      />
    )), [messages, userId]
  );

  return (
    <div className="flex flex-1 bg-white h-screen my-20">
      <aside className="w-[331px] h-[774px] bg-white m-12 p-6 flex-shrink-0 overflow-y-auto">
        <div className="flex items-center gap-4 border-b border-gray-400">
          <img src={ChatIcon} alt="chat" className="w-7 h-6" />
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            채팅 목록
          </h2>
        </div>

        <ChatRoomList
          rooms={rooms}
          selectedId={selected?.chatroomId}
          onSelect={setSelected}
          userId={userId}
        />
      </aside>

      <section
        /*채팅창*/
        className="flex flex-col pb-6 m-12 p-8 bg-white border border-[#BBB] rounded-[48px] shadow-[0_4px_20px_0_rgba(0,0,0,0.10)]"
        style={{ height: '700px', width: '739px' }}
      >
        {selected ? (
          <>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={
                  selected.consumer?.id === userId
                    ? selected.provider?.profileImage || profile
                    : selected.consumer?.profileImage || profile
                }
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-bold text-lg">
                {selected.consumer?.id === userId
                  ? selected.provider?.nickname
                  : selected.consumer?.nickname}
              </span>

              <button className="ml-auto flex items-center bg-green-500 text-white px-3 py-1 rounded font-semibold">
                채팅하기
                <img src={right} alt="right" className="ml-2 w-3 h-3" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto mb-4">
              <div ref={topSentinelRef} />
              {renderedMessages}
              <div ref={endRef} />
            </div>

            <div className="flex gap-2">
              <input
                className="flex-1 p-3 border rounded-lg focus:outline-none"
                placeholder="메시지를 입력하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <label className="flex items-center px-3 bg-gray-200 rounded cursor-pointer">
                <img src={picture} alt="img" className="w-6 h-6" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={onPickImages}
                />
              </label>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleSend}
              >
                전송
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 mt-20">
            채팅방을 선택해주세요.
          </p>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
