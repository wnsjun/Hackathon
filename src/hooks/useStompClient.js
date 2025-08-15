import { useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';

const useStompClient = () => {
  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);

  const connect = useCallback(() => {
    return new Promise((resolve, reject) => {
      const stompClient = new Client({
        brokerURL: 'wss://spacefarm.shop/ws-chat',
        reconnectDelay: 5000,
        debug: (str) => console.log('[STOMP]', str),
      });

      stompClient.onConnect = () => {
        setConnected(true);
        setClient(stompClient);
        resolve();
      };

      stompClient.onStompError = (err) => {
        console.error('STOMP 에러:', err);
        setConnected(false);
        reject(err);
      };

      stompClient.activate();
    });
  }, []);

  const subscribeRoom = useCallback(
    (chatRoomId, callback) => {
      if (!client || !connected) return null;
      const sub = client.subscribe(`/sub/chat/room/${chatRoomId}`, (msg) => {
        callback(JSON.parse(msg.body));
      });
      return () => sub.unsubscribe();
    },
    [client, connected]
  );

  const unsubscribeRoom = useCallback((chatRoomId) => {
    // STOMP 구독 객체에서 unsubscribe 처리 필요
  }, []);

  const sendText = useCallback(
    (chatRoomId, message) => {
      if (!client || !connected) return;
      client.publish({
        destination: `/pub/chat/message`,
        body: JSON.stringify({ chatRoomId, message, messageType: 'TEXT' }),
      });
    },
    [client, connected]
  );

  return { connected, connect, subscribeRoom, unsubscribeRoom, sendText };
};

export default useStompClient;
