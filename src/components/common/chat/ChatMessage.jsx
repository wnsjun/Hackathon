import { memo } from 'react';

const ChatMessage = memo(({ msg, isMine }) => {
  console.log('ChatMessage 렌더링:', { msg, isMine, imageUrls: msg.imageUrls, hasImages: msg.imageUrls && msg.imageUrls.length > 0 });
  
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 rounded-xl max-w-[60%] ${isMine ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
      >
        {msg.imageUrls && msg.imageUrls.length > 0 ? (
          msg.imageUrls.map((url) => (
            <img
              key={url}
              src={url}
              alt="chat"
              className="w-40 h-40 object-cover rounded-lg mt-1"
            />
          ))
        ) : (
          <p>{msg.message}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {new Date(msg.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
