// import { memo } from 'react';

// const ChatMessage = memo(({ msg, isMine }) => {
//   const messageStyle = isMine
//     ? {
//         display: 'flex',
//         padding: '16px 28px 20px 28px',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         borderRadius: '40px 0 40px 40px',
//         border: '1px solid var(--main-varient, #39BB6D)',
//         background: 'rgba(26, 167, 82, 0.05)',
//         backdropFilter: 'blur(5px)',
//         color: 'var(--Main, #1AA752)',
//         fontFamily: 'Pretendard',
//         fontSize: '16px',
//         fontWeight: 400,
//         lineHeight: '150%',
//         letterSpacing: '-0.48px',
//       }
//     : {
//         display: 'flex',
//         padding: '16px 28px 20px 28px',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         borderRadius: '0 40px 40px 40px',
//         border: '1px solid #BBB',
//         background: 'var(--200, #F7F7F7)',
//         backdropFilter: 'blur(5px)',
//         color: '#000',
//         fontFamily: 'Pretendard',
//         fontSize: '16px',
//         fontWeight: 400,
//         lineHeight: '150%',
//         letterSpacing: '-0.48px',
//       };

//   return (
//     <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-2`}>
//       <div style={messageStyle}>
//         {msg.imageUrls && msg.imageUrls.length > 0 ? (
//           msg.imageUrls.map((url) => (
//             <img
//               key={url}
//               src={url}
//               alt="chat"
//               className="w-40 h-40 object-cover rounded-lg mt-1"
//             />
//           ))
//         ) : (
//           <p>{msg.message}</p>
//         )}
//         <p
//           className="text-xs mt-1"
//           style={{
//             color: isMine ? 'var(--Main, #1AA752)' : '#000',
//             fontFamily: 'Pretendard',
//             fontSize: '16px',
//             fontWeight: 400,
//             lineHeight: '150%',
//             letterSpacing: '-0.48px',
//           }}
//         >
//           {new Date(msg.createdAt).toLocaleTimeString()}
//         </p>
//       </div>
//     </div>
//   );
// });

// ChatMessage.displayName = 'ChatMessage';

// export default ChatMessage;

import { memo } from 'react';

const ChatMessage = memo(({ msg, isMine }) => {
  const time = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex items-end mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}
    >
      {/* 보낸 메시지 시간 왼쪽 */}
      {isMine && (
        <span className="text-xs text-gray-500 mr-2 self-end">{time}</span>
      )}

      <div
        className={`
          max-w-[60%] p-[16px_28px_20px_28px]
          flex flex-col
          ${
            isMine
              ? 'bg-green-50 border border-green-600 rounded-[40px_0_40px_40px] text-[#1AA752]'
              : 'bg-gray-200 border border-gray-400 rounded-[0_40px_40px_40px] text-black'
          }
        `}
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
          <p className="font-pretendard text-[16px] leading-[24px] tracking-[-0.48px]">
            {msg.message}
          </p>
        )}
      </div>

      {/* 받은 메시지 시간 오른쪽 */}
      {!isMine && (
        <span className="text-xs text-gray-500 ml-2 self-end">{time}</span>
      )}
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
