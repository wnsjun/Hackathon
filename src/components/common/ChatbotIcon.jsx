import { useState, useEffect, useRef } from 'react';
import chatbotIcon from '../../assets/chatboticon.png?url';
import chatbotClickIcon from '../../assets/chatbotClickicon.png?url';

const ChatbotIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const popupRef = useRef(null);
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? '오후' : '오전';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${period} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  const [messages, setMessages] = useState([
    { id: 1, text: "AI 챗봇 새싹이입니다. 무엇을 도와드릴까요?🌱", sender: "bot", time: getCurrentTime() }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleChatbotClick = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsClicked(!isClicked);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        time: getCurrentTime()
      };
      
      setMessages([...messages, newUserMessage]);
      setInputMessage("");

      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getBotResponse(inputMessage),
          sender: "bot",
          time: getCurrentTime()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSuggestedClick = (text) => {
    const userMessage = { id: messages.length + 1, text, sender: "user", time: getCurrentTime()  };
    setMessages([...messages, userMessage]);
    
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(text),
        sender: "bot",
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("대여 방법")) {
      return "텃밭 대여 방법을 안내드릴게요!\n\n원하는 텃밭 매물을 선택하고 위치, 가격, 평수 등을 확인합니다.\n텃밭을 올린 사용자와 채팅을 나눈 뒤 텃밭 대여를 확정할 수 있습니다.\n더 궁금한 게 있으신가요?"; 
    }
    if (lowerMessage.includes("재배 방법")) {
      return "작물 재배 방법을 알려드릴게요! 🌱\n\n기본 재배 단계:\n1. 토양 준비: 배수가 잘 되는 비옥한 토양\n2. 씨앗 파종: 작물별 적정 심기 깊이 유지\n3. 물주기: 토양이 마르지 않도록 적절히 급수\n4. 관리: 잡초 제거, 병충해 방지\n5. 수확: 작물이 충분히 자란 후 수확\n\n어떤 작물을 기르실 계획인가요?";
    }
    if (lowerMessage.includes("작물") && lowerMessage.includes("추천")) {
      return "초보자에게 추천하는 작물들이에요! 🥬\n\n🌿 쉬운 작물:\n• 상추, 시금치 - 빨리 자라고 관리 쉬움\n• 무, 배추 - 병충해에 강함\n• 토마토 - 수확량이 많음\n\n🌱 계절별 추천:\n• 봄: 상추, 시금치, 완두콩\n• 여름: 토마토, 오이, 호박\n• 가을: 무, 배추, 당근\n\n어떤 계절에 시작하실 예정인가요?";
    }
    
    return "죄송해요, 잘 이해하지 못했어요 😅\n\n아래 질문들을 클릭해보시거나 구체적으로 질문해주세요!\n• 대여 방법을 알려줘\n• 재배 방법을 알려줘\n• 기를 작물을 추천해줘";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
        setIsClicked(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);


  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-row items-end gap-4">
      {/* 챗봇 팝업창 */}
      {isPopupOpen && (
        <div 
          ref={popupRef}
          className="bg-white rounded-[24px] shadow-lg flex flex-col relative"
          style={{ 
            width: '640px', 
            height: '640px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
            flexShrink: 0
          }}
        >
          {/* 팝업창 헤더 */}
          <div className="flex flex-row items-center gap-3 p-6 border-b border-gray-100">
            <img 
              src={chatbotIcon}
              alt="챗봇 아이콘"
              className="w-9 h-9"
            />
            <span className="text-black text-2xl font-semibold">새싹이</span>
          </div>

          {/* 채팅 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-6 gap-8 flex flex-col">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'user' && (
                  <div 
                    className="font-['Pretendard:Regular',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#bbbbbb] text-[14px] text-left text-nowrap tracking-[-0.42px]"
                  >
                    {message.time}
                  </div>
                )}
                <div 
                  className={`backdrop-blur-[5px] backdrop-filter flex flex-row items-start justify-center pb-5 pt-4 px-7 relative shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-[#1aa752] rounded-bl-[40px] rounded-br-[40px] rounded-tl-[40px]' 
                      : 'bg-[#f7f7f7] border border-[#bbbbbb] border-solid rounded-bl-[40px] rounded-br-[40px] rounded-tr-[40px]'
                  }`}
                >
                  <div className="flex flex-col gap-1 items-start justify-start relative shrink-0">
                    <div 
                      className={`font-['Pretendard:Regular',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-left tracking-[-0.48px] ${
                        message.sender === 'user' ? 'text-[#ffffff]' : 'text-[#000000]'
                      }`}
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
                {message.sender === 'bot' && (
                  <div 
                    className="font-['Pretendard:Regular',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#bbbbbb] text-[14px] text-left text-nowrap tracking-[-0.42px]"
                  >
                    {message.time}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 하단 입력 영역 */}
          <div className="p-6 flex flex-col gap-6">
            {/* 추천 질문 버튼들 */}
            <div className="flex flex-row gap-2 ">
              <button
                onClick={() => handleSuggestedClick("대여 방법을 알려줘")}
                className="flex items-center justify-center px-3 py-1.5 rounded-full border border-[#1AA752] flex-1 cursor-pointer"
              >
                <span className="font-semibold text-[#1AA752] text-[12px] text-nowrap tracking-[-0.36px]">
                  대여 방법을 알려줘
                </span>
              </button>
              <button
                onClick={() => handleSuggestedClick("재배 방법을 알려줘")}
                className="flex items-center justify-center px-3 py-1.5 rounded-full border border-[#1AA752] flex-1 cursor-pointer"
              >
                <span className="font-semibold text-[#1AA752] text-[12px] text-nowrap tracking-[-0.36px]">
                  재배 방법을 알려줘
                </span>
              </button>
              <button
                onClick={() => handleSuggestedClick("기를 작물을 추천해줘")}
                className="flex items-center justify-center px-3 py-1.5 rounded-full border border-[#1AA752] flex-1 cursor-pointer"
              >
                <span className="font-semibold text-[#1AA752] text-[12px] text-nowrap tracking-[-0.36px]">
                  작물을 추천해줘
                </span>
              </button>
            </div>

            {/* 입력창 */}
            <form onSubmit={handleMessageSubmit} className="relative">
              <div className="flex flex-row h-16 items-center justify-between pl-8 pr-6 py-0 rounded-full border border-[#1AA752] w-full">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={handleInputChange}
                  placeholder="채팅을 입력하세요."
                  className="flex-1 bg-transparent outline-none text-[20px] text-black placeholder-[#BBBBBB] tracking-[-0.6px]"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}
                />
                <button
                  type="submit"
                  className="overflow-clip relative shrink-0 size-8 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M13.3334 18.6667L28.0001 4M13.3334 18.6667L18.0001 28C18.0586 28.1277 18.1525 28.2358 18.2707 28.3117C18.3889 28.3875 18.5263 28.4278 18.6668 28.4278C18.8072 28.4278 18.9446 28.3875 19.0628 28.3117C19.181 28.2358 19.2749 28.1277 19.3334 28L28.0001 4M13.3334 18.6667L4.00009 14C3.87244 13.9415 3.76426 13.8476 3.68842 13.7294C3.61258 13.6112 3.57227 13.4738 3.57227 13.3333C3.57227 13.1929 3.61258 13.0554 3.68842 12.9373C3.76426 12.8191 3.87244 12.7252 4.00009 12.6667L28.0001 4" stroke="#1AA752" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 호버 툴팁 */}
      {isHovered && !isPopupOpen && (
        <div className="bg-white text-black px-4 py-2 rounded-2xl text-sm shadow-lg">
          <span className="text-black font-normal" style={{ fontSize: '16px', lineHeight: '150%', letterSpacing: '-0.48px', fontFamily: 'Pretendard' }}>
            AI 챗봇
          </span>
          <span> </span>
          <span className="text-green-600 font-semibold" style={{ fontSize: '16px', lineHeight: '150%', letterSpacing: '-0.48px', fontFamily: 'Pretendard' }}>
            새싹이 
          </span>
          <span> </span>
          <span className="text-black font-normal" style={{ fontSize: '16px', lineHeight: '150%', letterSpacing: '-0.48px', fontFamily: 'Pretendard' }}>
            와 대화해보세요!
          </span>
        </div>
      )}
      
      <button
        onClick={handleChatbotClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`cursor-pointer w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 overflow-hidden ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        style={{
          backgroundColor: isClicked ? '#1AA752' : 'transparent'
        }}
        aria-label="챗봇 열기"
      >
        <img 
          src={isClicked ? chatbotClickIcon : chatbotIcon} 
          alt="챗봇 아이콘" 
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default ChatbotIcon;