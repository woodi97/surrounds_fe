import { Button, Icon } from '@src/components/atom';
import InputBoxWithIcon from '@src/components/molecule/InputBoxWithIcon';
import { SocketMessageReceiveType } from '@src/core/types/message';
import React, { FunctionComponent, useState } from 'react';

const MessageSendSection: FunctionComponent<{
  myName: string;
  sendMessage: ({ name, text }: SocketMessageReceiveType) => void;
}> = ({ myName, sendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleClick = () => {
    if (message) {
      sendMessage({ name: myName, text: message });
      setMessage('');
    }
  };

  return (
    <div className="flex">
      <InputBoxWithIcon
        iconName="message"
        name="search"
        value={message}
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
      />
      <Button className="text-white h-full px-4" onClick={handleClick}>
        <Icon name="send" />
      </Button>
    </div>
  );
};

export default MessageSendSection;
