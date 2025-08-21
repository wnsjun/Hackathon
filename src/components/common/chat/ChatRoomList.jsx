import React from 'react';
import { fmtDateTime } from '../../../utils/date';

const ChatRoomList = ({ rooms, selectedId, onSelect, userId, userNickname }) => {
  if (!rooms?.length) {
    return (
      <p className="text-center mt-20 text-gray-400">채팅방이 없습니다.</p>
    );
  }

  return (
    <div className="mt-4">
      {rooms.map((room) => {
        const isSelected = selectedId === room.chatroomId;
        const nickname =
          room.participantNickname ??
          (room.provider?.nickname === userNickname
            ? room.consumer?.nickname
            : room.provider?.nickname);
        const lastAt =
          room.lastMessageCreatedAt ?? room.lastMessageAt ?? room.createdAt;
        const lastMsg = room.lastMessage ?? '메시지가 없습니다.';

        return (
          <div
            key={room.chatroomId}
            className={`mb-4 border-b border-gray-200 cursor-pointer p-2 rounded ${isSelected ? 'bg-gray-200' : ''}`}
            onClick={() => onSelect(room)}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold truncate max-w-[60%]">
                {nickname}
              </span>
              <span className="text-xs text-gray-500">
                {fmtDateTime(lastAt)}
              </span>
            </div>
            <div className="text-sm text-gray-700 truncate">{lastMsg}</div>
            {room.unreadCount > 0 && (
              <span className="inline-block mt-1 text-xs bg-red-500 text-white rounded-full px-2">
                {room.unreadCount}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatRoomList;
