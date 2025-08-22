import React from 'react';
import { fmtDateTime } from '../../../utils/date';
import profile from '../../../assets/profile.svg';
import { timeAgo } from '../../../utils/timeAgo';

const ChatRoomList = ({
  rooms,
  selectedId,
  onSelect,
  userId,
  userNickname,
}) => {
  if (!rooms?.length) {
    return (
      <p className="text-center mt-20 text-gray-400">채팅방이 없습니다.</p>
    );
  }

  return (
    <div className="mt-4">
      {rooms.map((room) => {
        const isSelected = selectedId === room.chatroomId;

        // 상대방 닉네임
        const nickname =
          room.participantNickname ??
          (room.provider?.nickname === userNickname
            ? room.consumer?.nickname
            : room.provider?.nickname);

        // 상대방 프로필 이미지
        const profileImg =
          room.participantProfile ??
          (room.provider?.nickname === userNickname
            ? room.consumer?.profileImage
            : room.provider?.profileImage) ??
          profile; // 없으면 기본 이미지 사용

        const lastAt =
          room.lastMessageCreatedAt ?? room.lastMessageAt ?? room.createdAt;
        const lastMsg = room.lastMessage ?? '메시지가 없습니다.';

        return (
          <div
            key={room.chatroomId}
            className={`mb-4 border-b border-gray-200 cursor-pointer p-2 rounded ${
              isSelected ? 'bg-gray-200' : ''
            }`}
            onClick={() => onSelect(room)}
          >
            <div className="flex justify-between items-center">
              {/* 프로필 이미지 + 닉네임 */}
              <div className="flex items-center gap-2 truncate max-w-[60%]">
                <img
                  src={profileImg}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-semibold truncate">{nickname}</span>
              </div>

              <span className="text-xs text-gray-500">{timeAgo(lastAt)}</span>
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
