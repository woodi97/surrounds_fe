import { SocketJoinReceiveType, SocketMessageReceiveType } from '@src/core/types/message';
import { useCallback, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

export default function useSocketIo(url: string) {
  const [disconnected, setDisconnected] = useState(false);
  let socket = useMemo(() => io(url, { transports: ['websocket'] }), [url]);

  const initSocket = () => {
    if (socket) return;
    socket.connect();
    setDisconnected(false);
  };

  const sendSocketMessage = useCallback(
    ({ name, text }: SocketMessageReceiveType) => {
      if (socket == null || socket.connected == false) {
        initSocket();
      }
      socket.emit('message', {
        name,
        text,
      });
    },
    [socket]
  );

  const recvSocketMessage = useCallback(
    (callback: (message: SocketMessageReceiveType) => void) => {
      if (socket == null || socket.connected == false) {
        initSocket();
      }
      socket.on('msgToClient', callback);
    },
    [socket]
  );

  const sendJoinMessage = useCallback(
    (peerId: string) => {
      if (socket == null || socket.connected == false) {
        initSocket();
      }
      socket.emit('join', {
        peerId,
      });
    },
    [socket]
  );

  const recvJoinMessage = useCallback(
    (callback: ({ peerId }: SocketJoinReceiveType) => void) => {
      if (socket == null || socket.connected == false) {
        initSocket();
      }
      socket.on('joinToClient', callback);
    },
    [socket]
  );

  const disconnectSocket = useCallback(() => {
    if (socket == null || socket.connected == false) {
      return;
    }
    socket.disconnect();
    socket = undefined;
    setDisconnected(true);
  }, [socket]);

  return [
    initSocket,
    disconnected,
    sendSocketMessage,
    recvSocketMessage,
    sendJoinMessage,
    recvJoinMessage,
    disconnectSocket,
  ] as const;
}
