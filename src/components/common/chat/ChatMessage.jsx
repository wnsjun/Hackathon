import React from 'react';

const ChatMessage = ({ msg, isMine }) => {
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 rounded-xl max-w-[60%] ${isMine ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
      >
        {msg.messageType === 'TEXT' && <p>{msg.message}</p>}
        {msg.messageType === 'IMAGE' &&
          msg.imageUrls?.map((url) => (
            <img
              key={url}
              src={url}
              alt="chat"
              className="w-40 h-40 object-cover rounded-lg mt-1"
            />
          ))}
        <p className="text-xs text-gray-400 mt-1">
          {new Date(msg.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
