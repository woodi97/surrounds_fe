import { SocketMessageReceiveType } from '@src/core/types/message';
import { useCallback, useMemo } from 'react';
import { io } from 'socket.io-client';

export default function useSocketIo(url: string) {
  let socket = useMemo(() => io(url, { transports: ['websocket'] }), [url]);

  const initSocket = () => {
    if (socket) return;
    socket.connect();
  };

  const sendSocketMessage = useCallback(({ name, text }: SocketMessageReceiveType) => {
    if (socket == null || socket.connected == false) {
      initSocket();
    }
    socket.emit('message', {
      name,
      text,
    });
  }, []);

  const recvSocketMessage = useCallback((callback: (message: any) => void) => {
    if (socket == null || socket.connected == false) {
      initSocket();
    }
    socket.on('msgToClient', callback);
  }, []);

  const disconnectSocket = useCallback(() => {
    if (socket == null || socket.connected == false) {
      return;
    }
    socket.disconnect();
    socket = undefined;
  }, []);

  return [socket, initSocket, sendSocketMessage, recvSocketMessage, disconnectSocket] as const;
}
