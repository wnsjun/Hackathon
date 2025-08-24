import { useState, useEffect, useRef } from 'react';
import { sendChatbotMessage, sendChatbotDiagnose } from '../../apis/chatbotApi';
import chatbotIcon from '../../assets/chatboticon.png?url';
import chatbotClickIcon from '../../assets/chatbotClickicon.png?url';

const ChatbotIcon = ({ isMobile = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const popupRef = useRef(null);
  const chatbotButtonRef = useRef(null);
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
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

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

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        time: getCurrentTime()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      const userQuery = inputMessage;
      setInputMessage("");

      try {
        const response = await sendChatbotMessage(userQuery);

        const botResponse = {
          id: messages.length + 2,
          text: response.response,
          sender: "bot",
          time: getCurrentTime()
        };
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        const errorResponse = {
          id: messages.length + 2,
          text: "죄송해요, 일시적인 오류가 발생했습니다. 다시 시도해주세요.",
          sender: "bot",
          time: getCurrentTime()
        };
        setMessages(prev => [...prev, errorResponse]);
      }
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSuggestedClick = async (text) => {
    if (text === "병해진단을 해줘") {
      const userMessage = { id: messages.length + 1, text, sender: "user", time: getCurrentTime() };
      setMessages(prev => [...prev, userMessage]);
      
      const botResponse = {
        id: messages.length + 2,
        text: "증상 사진을 업로드해 주세요. 📷",
        sender: "bot",
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, botResponse]);
      
      setTimeout(() => {
        fileInputRef.current?.click();
      }, 500);
      return;
    }

    const userMessage = { id: messages.length + 1, text, sender: "user", time: getCurrentTime() };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const response = await sendChatbotMessage(text);

      const botResponse = {
        id: messages.length + 2,
        text: response.response,
        sender: "bot",
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = {
        id: messages.length + 2,
        text: "죄송해요, 일시적인 오류가 발생했습니다. 다시 시도해주세요.",
        sender: "bot",
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setSelectedImage(file);
    
    // 이미지 URL 생성
    const imageUrl = URL.createObjectURL(file);
    
    const userMessage = { 
      id: messages.length + 1, 
      text: `이미지를 업로드했습니다: ${file.name}`, 
      sender: "user", 
      time: getCurrentTime(),
      image: imageUrl
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await sendChatbotDiagnose(file);

      const botResponse = {
        id: messages.length + 2,
        text: response.response,
        sender: "bot",
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = {
        id: messages.length + 2,
        text: "죄송해요, 병해진단 중 오류가 발생했습니다. 다시 시도해주세요.",
        sender: "bot",
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setSelectedImage(null);
      event.target.value = '';
      // URL 정리 (메모리 누수 방지)
      setTimeout(() => {
        URL.revokeObjectURL(imageUrl);
      }, 60000); // 1분 후 URL 해제
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && 
          !popupRef.current.contains(event.target) && 
          chatbotButtonRef.current && 
          !chatbotButtonRef.current.contains(event.target)) {
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

  useEffect(() => {
    const handleToggleChatbot = () => {
      setIsPopupOpen(!isPopupOpen);
      setIsClicked(!isClicked);
    };

    window.addEventListener('toggleChatbot', handleToggleChatbot);

    return () => {
      window.removeEventListener('toggleChatbot', handleToggleChatbot);
    };
  }, [isPopupOpen, isClicked]);

  // 메시지 변경 시 스크롤을 맨 아래로
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isMobile) {
    return (
      <div className="relative flex flex-col items-center gap-1">
        {/* 모바일용 팝업창 */}
        {isPopupOpen && (
          <div className="fixed inset-4 z-[60] flex items-center justify-center">
            <div 
              ref={popupRef}
              className="bg-white rounded-[24px] shadow-lg flex flex-col relative w-full h-full max-w-[640px] max-h-[640px] min-w-[320px] min-h-[480px]"
              style={{ 
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
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
                      className={`backdrop-blur-[5px] backdrop-filter flex flex-row items-start justify-center pb-5 pt-4 px-7 relative max-w-[400px] ${
                        message.sender === 'user' 
                          ? 'bg-[#1aa752] rounded-bl-[40px] rounded-br-[40px] rounded-tl-[40px]' 
                          : 'bg-[#f7f7f7] border border-[#bbbbbb] border-solid rounded-bl-[40px] rounded-br-[40px] rounded-tr-[40px]'
                      }`}
                    >
                      <div className="flex flex-col gap-1 items-start justify-start relative">
                        {message.image && (
                          <img 
                            src={message.image} 
                            alt="업로드된 이미지" 
                            className="max-w-full max-h-[200px] rounded-2xl object-contain mb-2"
                          />
                        )}
                        <div 
                          className={`font-['Pretendard:Regular',_sans-serif] leading-[1.5] not-italic relative text-[16px] text-left tracking-[-0.48px] break-words ${
                            message.sender === 'user' ? 'text-[#ffffff]' : 'text-[#000000]'
                          }`}
                          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
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
                <div ref={messagesEndRef} />
              </div>

              {/* 하단 입력 영역 */}
              <div className="p-6 flex flex-col gap-6">
                {/* 추천 질문 버튼들 */}
                <div className="flex flex-row gap-2 flex-wrap">
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
                  <button
                    onClick={() => handleSuggestedClick("병해진단을 해줘")}
                    className="flex items-center justify-center px-3 py-1.5 rounded-full border border-[#1AA752] flex-1 cursor-pointer"
                  >
                    <span className="font-semibold text-[#1AA752] text-[12px] text-nowrap tracking-[-0.36px]">
                      병해진단을 해줘
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

                {/* 숨겨진 파일 입력 */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* 모바일용 새싹이 버튼 */}
        <div 
          className="cursor-pointer relative shrink-0 size-12 rounded-full flex items-center justify-center transition-all duration-200"
          onClick={handleChatbotClick}
          ref={chatbotButtonRef}
          style={{
            backgroundColor: isClicked ? '#1AA752' : 'transparent'
          }}
        >
          <img 
            src={isClicked ? chatbotClickIcon : chatbotIcon} 
            alt="새싹이 아이콘" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className={`font-['Pretendard:SemiBold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[12px] text-center tracking-[-0.36px] ${isClicked ? 'text-[#111111]' : 'text-[#bbbbbb]'}`} style={{ width: "min-content" }}>
          <p className="leading-[1.5]">새싹이</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex-row items-end gap-4 hidden sm:flex">
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
                  className={`backdrop-blur-[5px] backdrop-filter flex flex-row items-start justify-center pb-5 pt-4 px-7 relative max-w-[400px] ${
                    message.sender === 'user' 
                      ? 'bg-[#1aa752] rounded-bl-[40px] rounded-br-[40px] rounded-tl-[40px]' 
                      : 'bg-[#f7f7f7] border border-[#bbbbbb] border-solid rounded-bl-[40px] rounded-br-[40px] rounded-tr-[40px]'
                  }`}
                >
                  <div className="flex flex-col gap-1 items-start justify-start relative">
                    {message.image && (
                      <img 
                        src={message.image} 
                        alt="업로드된 이미지" 
                        className="max-w-full max-h-[200px] rounded-2xl object-contain mb-2"
                      />
                    )}
                    <div 
                      className={`font-['Pretendard:Regular',_sans-serif] leading-[1.5] not-italic relative text-[16px] text-left tracking-[-0.48px] break-words ${
                        message.sender === 'user' ? 'text-[#ffffff]' : 'text-[#000000]'
                      }`}
                      style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
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
            <div ref={messagesEndRef} />
          </div>

          {/* 하단 입력 영역 */}
          <div className="p-6 flex flex-col gap-6">
            {/* 추천 질문 버튼들 */}
            <div className="flex flex-row gap-2 flex-wrap">
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
              <button
                onClick={() => handleSuggestedClick("병해진단을 해줘")}
                className="flex items-center justify-center px-3 py-1.5 rounded-full border border-[#1AA752] flex-1 cursor-pointer"
              >
                <span className="font-semibold text-[#1AA752] text-[12px] text-nowrap tracking-[-0.36px]">
                  병해진단을 해줘
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

            {/* 숨겨진 파일 입력 */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
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
        ref={chatbotButtonRef}
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