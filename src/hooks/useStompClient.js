import { useState, useCallback, useRef } from 'react';
import { Client } from '@stomp/stompjs';

const useStompClient = () => {
  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const activatingRef = useRef(false);

  const connect = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (connected) {
        resolve();
        return;
      }
      if (activatingRef.current) {
        resolve();
        return;
      }
      activatingRef.current = true;
      const token = localStorage.getItem('accessToken');
      const buildWsUrl = () => {
        const isHttps = window.location.protocol === 'https:';
        const scheme = isHttps ? 'wss' : 'ws';
        const isDev = import.meta.env.DEV;
        const base = isDev
          ? `${scheme}://${window.location.host}`
          : 'wss://spacefarm.shop';
        return `${base}/ws-chat${token ? `?token=${encodeURIComponent(token)}` : ''}`;
      };

      const stompClient = new Client({
        // 네이티브 WebSocket 사용 (Vite 프록시를 통해 Origin 우회)
        webSocketFactory: () => new WebSocket(buildWsUrl()),
        reconnectDelay: 5000,
        debug: (str) => console.log('[STOMP]', str),
        // Authorization 헤더에 Bearer 접두어 포함
        connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
      });

      stompClient.onConnect = () => {
        setConnected(true);
        setClient(stompClient);
        activatingRef.current = false;
        resolve();
      };

      stompClient.onStompError = (err) => {
        console.error('STOMP 에러:', err);
        setConnected(false);
        activatingRef.current = false;
        reject(err);
      };

      stompClient.onWebSocketClose = (evt) => {
        console.error('STOMP 소켓 종료:', evt);
      };
      stompClient.onWebSocketError = (evt) => {
        console.error('STOMP 소켓 에러:', evt);
      };

      stompClient.activate();
    });
  }, []);

  const subscribeRoom = useCallback(
    (chatRoomId, callback) => {
      if (!client || !connected) return null;
      const sub = client.subscribe(`/topic/chat/${chatRoomId}`, (msg) => {
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
        destination: `/app/chat/${chatRoomId}/send`,
        body: JSON.stringify({ messageType: 'TEXT', message }),
      });
    },
    [client, connected]
  );

  return { connected, connect, subscribeRoom, unsubscribeRoom, sendText };
};

export default useStompClient;
