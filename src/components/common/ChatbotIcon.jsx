import { useState } from 'react';
import chatbotIcon from '../../assets/chatboticon.png';

const ChatbotIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleChatbotClick = () => {
    // 챗봇 기능 구현 (추후 구현)
    console.log('Chatbot clicked');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleChatbotClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 overflow-hidden ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        aria-label="챗봇 열기"
      >
        <img 
          src={chatbotIcon} 
          alt="챗봇 아이콘" 
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default ChatbotIcon;