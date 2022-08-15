import { Button } from '@src/components/atom';
import { socketConfig } from '@src/core/config/envConfig';
import { useSocketIo } from '@src/hooks';
import React, { useEffect, useState } from 'react';

const RoomJoinModalContent = () => {
  const [socket, initSocket, sendSocketMessage, recvSocketMessage, disconnectSocket] = useSocketIo(
    socketConfig.url + 'abc'
  );

  const [messages, setMessages] = useState<
    {
      name: string;
      text: string;
    }[]
  >([]);

  useEffect(() => {
    initSocket();
    recvSocketMessage((message) => {
      setMessages((messages) => [...messages, message]);
    });
    return () => {
      disconnectSocket();
    };
  }, []);

  const handleClick = () => {
    sendSocketMessage({ name: 'user', text: 'hello' });
  };

  return (
    <div className="w-full h-full border-white border-2 border-solid overflow-scroll">
      <Button onClick={handleClick}>Send Sample Message</Button>
      {messages.map((message, idx) => (
        <div
          key={`sample-message-${idx}`}
          className="w-full h-16 border-b-white border-[1px] border-solid"
          onClick={handleClick}
        >
          <span>{message.name}</span>
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
};

export default RoomJoinModalContent;
