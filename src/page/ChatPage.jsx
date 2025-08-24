import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useStompClient from '../hooks/useStompClient';
import {
  getChatRooms,
  getMessages,
  markAsRead,
  uploadImages,
} from '../apis/chatApi';
import ChatRoomList from '../components/common/chat/ChatRoomList';
import ChatMessage from '../components/common/chat/ChatMessage';
import ChatFarmInfo from '../components/common/chat/ChatFarmInfo';

import ChatIcon from '../assets/chaticon.svg';
import profile from '../assets/profile.svg';
import right from '../assets/right-icon.svg';

const ChatPage = () => {
  const navigate = useNavigate();

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
  const { userData, userId, userNickname } = useMemo(() => {
    const data = JSON.parse(localStorage.getItem('userData') || '{}');
    const tokenUserId = data.accessToken
      ? getUserIdFromToken(data.accessToken)
      : null;
    const finalUserId = data.id || tokenUserId || 1;
    const finalNickname = data.nickname || '';

    console.log('사용자 정보 디버깅:', {
      localStorage_userData: data,
      tokenUserId: tokenUserId,
      finalUserId: finalUserId,
      finalNickname: finalNickname,
    });

    return {
      userData: data,
      userId: finalUserId,
      userNickname: finalNickname,
    };
  }, [getUserIdFromToken]);

  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(true);
  const [input, setInput] = useState('');
  const [isMobileView, setIsMobileView] = useState(false); // 모바일에서 채팅 상세 보기 상태
  const [showFarmInfo, setShowFarmInfo] = useState(false); // 모바일에서 농장 정보 보기 상태

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
        console.log(
          '이미지 메시지 체크:',
          sorted.filter((msg) => msg.imageUrls && msg.imageUrls.length > 0)
        );
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
  }, [selected, loadInitialMessages]);

  // STOMP 연결 후 구독 처리를 분리
  useEffect(() => {
    if (!selected || !connected) return;

    const unsub = subscribeRoom(selected.chatroomId, (incoming) => {
      console.log('받은 메시지:', incoming);

      const msg = {
        messageId: incoming.messageId || incoming.id || Date.now(),
        message: incoming.message || incoming.text || '',
        senderId: incoming.senderId || incoming.userId,
        senderNickname: incoming.senderNickname || '',
        createdAt: incoming.createdAt || new Date().toISOString(),
        messageType: incoming.messageType || 'TEXT',
        imageUrls: incoming.imageUrls || null,
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
      console.log(
        '전송 실패 - input:',
        input.trim(),
        'selected:',
        !!selected,
        'userId:',
        userId
      );
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
      setMessages((prev) =>
        prev.filter((msg) => msg.messageId !== newMsg.messageId)
      );
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
  const renderedMessages = useMemo(
    () =>
      messages.map((msg, index) => (
        <ChatMessage
          key={`${msg.messageId || msg.id || msg.createdAt}-${index}`}
          msg={msg}
          isMine={msg.senderNickname === userNickname}
        />
      )),
    [messages, userNickname]
  );

  // 모바일에서 채팅 선택 시 상세 뷰로 전환
  const handleChatSelect = (room) => {
    setSelected(room);
    // 모바일에서는 채팅 상세 화면으로 전환
    setIsMobileView(true);
  };

  // 뒤로가기 버튼 클릭 시
  const handleBackToList = () => {
    setIsMobileView(false);
    setSelected(null);
    setShowFarmInfo(false); // 농장 정보 모달도 닫기
  };

  // body에 클래스 추가/제거로 navbar 제어
  useEffect(() => {
    if (isMobileView) {
      document.body.classList.add('hide-mobile-navbar');
    } else {
      document.body.classList.remove('hide-mobile-navbar');
    }

    return () => {
      document.body.classList.remove('hide-mobile-navbar');
    };
  }, [isMobileView]);

  return (
    <div className="flex flex-col pr-40 pl-40 lg:flex-row flex-1 bg-white h-screen pt-20">
      {/* 모바일: 채팅 목록만 보이거나 채팅 상세만 보임 */}
      {/* 데스크톱: 항상 둘 다 보임 */}

      {/* 채팅 목록 - 모바일에서는 상세뷰가 아닐 때만, 데스크톱에서는 항상 */}
      <aside
        className={`${
          isMobileView ? 'hidden lg:flex' : 'flex'
        } w-full lg:w-[331px] flex-col bg-white ${isMobileView ? '' : 'px-4 pt-4 pb-4'} lg:m-12 lg:p-6 lg:h-[774px] flex-shrink-0 overflow-y-auto`}
      >
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-4">
          <img src={ChatIcon} alt="chat" className="w-7 h-6" />
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-700">
            채팅 목록
          </h2>
        </div>

        <ChatRoomList
          rooms={rooms}
          selectedId={selected?.chatroomId}
          onSelect={handleChatSelect}
          userId={userId}
          userNickname={userNickname}
        />

        {/* 선택된 채팅방의 텃밭 정보 - 데스크톱에서만 */}
        {selected?.chatroomId && (
          <div className="hidden lg:block">
            <ChatFarmInfo chatRoomId={selected.chatroomId} />
          </div>
        )}
      </aside>

      {/* 채팅 상세 화면 */}
      <section
        className={`${
          !isMobileView ? 'hidden lg:flex' : 'flex'
        } flex-col bg-white flex-1 h-screen`}
      >
        {selected ? (
          <>
            {/* 모바일 헤더 (뒤로가기 버튼 포함) */}
            <div className="lg:hidden fixed top-20 left-0 right-0 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-200 z-40">
              <button onClick={handleBackToList} className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#111111"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h1 className="text-base font-semibold text-black tracking-[-0.48px]">
                채팅
              </h1>
              <div className="w-10 h-10 flex items-center justify-center">
                <button
                  className="p-2"
                  onClick={() => setShowFarmInfo(!showFarmInfo)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#BBBBBB"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12 8v4M12 16h.01"
                      stroke="#BBBBBB"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 데스크톱 헤더 */}
            <div className="hidden lg:flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 flex-wrap px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
              <img
                src={
                  selected.provider?.nickname === userNickname
                    ? selected.consumer?.profileImage || profile
                    : selected.provider?.profileImage || profile
                }
                alt="profile"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover"
              />
              <span className="text-black font-pretendard text-[16px] sm:text-[20px] lg:text-[24px] font-semibold leading-[1.5] tracking-[-0.48px] flex-1 min-w-0">
                {selected.provider?.nickname === userNickname
                  ? selected.consumer?.nickname
                  : selected.provider?.nickname}
              </span>

              <button
                onClick={() => navigate(`/credit/${selected.chatroomId}`)}
                className="flex flex-row justify-center items-center gap-2 sm:gap-[10px] px-4 sm:px-[20px] lg:px-[28px] pr-3 sm:pr-[18px] lg:pr-[24px] py-2 sm:py-[8px] lg:py-[12px] rounded-full bg-[#1AA752]"
              >
                <span className="text-white font-pretendard text-[14px] sm:text-[18px] lg:text-[24px] font-normal leading-[1.5] tracking-[-0.48px] whitespace-nowrap">
                  결제하기
                </span>
                <img
                  src={right}
                  alt="right"
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                />
              </button>
            </div>

            {/* 모바일 채팅 상대방 정보 */}
            <div className="lg:hidden fixed top-[134px] left-0 right-0 bg-white flex items-center justify-between px-5 py-4 border-b border-gray-100 z-30">
              <div className="flex items-center gap-2">
                <img
                  src={
                    selected.provider?.nickname === userNickname
                      ? selected.consumer?.profileImage || profile
                      : selected.provider?.profileImage || profile
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-black font-semibold text-xl leading-[1.5] tracking-[-0.6px]">
                  {selected.provider?.nickname === userNickname
                    ? selected.consumer?.nickname
                    : selected.provider?.nickname}
                </span>
              </div>
              <button
                onClick={() => navigate(`/credit/${selected.chatroomId}`)}
                className="flex items-center gap-1 text-[#1aa752] font-semibold text-base tracking-[-0.48px]"
              >
                결제하기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#1AA752"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* 채팅 메시지 영역 */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-5 pt-[120px] lg:pt-0 lg:px-4 lg:mb-4"
            >
              <div ref={topSentinelRef} />
              <div className="flex flex-col gap-4 pt-6">{renderedMessages}</div>
              <div ref={endRef} />
            </div>

            {/* 채팅 입력 바 */}
            <div className="px-5 py-3 lg:px-4 lg:py-0">
              <div className="flex h-[48px] sm:h-[56px] lg:h-[64px] px-6 lg:px-[32px] pr-4 lg:pr-[24px] justify-between items-center rounded-full border border-[#1AA752]">
                {/* placeholder 텍스트 */}
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none 
                placeholder:text-[#BBB] placeholder:font-pretendard 
                placeholder:text-[14px] sm:placeholder:text-[16px] lg:placeholder:text-[20px] placeholder:font-normal 
                placeholder:leading-[1.5] placeholder:tracking-[-0.6px]"
                  placeholder="채팅을 입력하세요."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />

                {/* 이미지 버튼 */}
                <label className="flex items-center ml-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                      fill="#1AA752"
                    />
                  </svg>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={onPickImages}
                  />
                </label>

                {/* 전송 버튼 */}
                <button
                  className="ml-2 text-[#1AA752] font-semibold cursor-pointer"
                  onClick={handleSend}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.912 12H3L2.023 4.135A.662.662 0 0 1 2.5 3.2L21.5 11.5A.75.75 0 0 1 21.5 12.5L2.5 20.8A.662.662 0 0 1 2.023 19.865L3 12Z"
                      fill="#1AA752"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <p className="text-center text-gray-400">채팅방을 선택해주세요.</p>
          </div>
        )}
      </section>

      {/* 모바일 농장 정보 팝업 - 헤더 아래 드롭다운 형태 */}
      {showFarmInfo && selected?.chatroomId && (
        <div className="fixed top-[188px] left-0 right-0 bg-white shadow-lg z-50 lg:hidden max-h-[60vh] overflow-y-auto">
          {/* 안내 텍스트 */}
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-sm text-gray-600">
              현재 대화를 나누고 있는 텃밭이에요.
            </p>
          </div>

          {/* 농장 정보 */}
          <div className="px-5 py-4">
            <ChatFarmInfo chatRoomId={selected.chatroomId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
