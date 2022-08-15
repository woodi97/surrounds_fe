import { MessageSendSection, UserJoinView } from '@src/components/molecule';
import { socketConfig } from '@src/core/config/envConfig';
import { SocketMessageReceiveType } from '@src/core/types/message';
import { ModalContentType, RoomJoinModalContentOption } from '@src/core/types/modal-type';
import { useRootDispatch, useRootState, useScrollToBottom, useSocketIo } from '@src/hooks';
import { closeModal } from '@src/store/modules/modal';
import { ToastError } from '@src/utils/toast';
import cx from 'classnames';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

const RoomJoinModalContent: FunctionComponent<ModalContentType> = ({ option }) => {
  const roomOption = option as RoomJoinModalContentOption;

  const messageBoxRef = useRef<HTMLDivElement>(null);

  const dispatch = useRootDispatch();
  const authState = useRootState((state) => state.auth);
  const [messages, setMessages] = useState<SocketMessageReceiveType[]>([]);
  const [socket, initSocket, sendSocketMessage, recvSocketMessage, disconnectSocket] = useSocketIo(
    socketConfig.url + roomOption.roomId
  );

  useEffect(() => {
    if (roomOption.roomId) {
      initSocket();
      recvSocketMessage((message) => {
        setMessages((messages) => [...messages, message]);
      });
      return () => {
        disconnectSocket();
      };
    } else {
      ToastError('There is no room id');
      dispatch(closeModal());
    }
  }, []);

  useScrollToBottom(messageBoxRef, [messages]);

  return (
    <div className="h-full flex flex-col">
      <UserJoinView myProfile={authState.profile_image} myUserName={authState.username} />
      <div
        ref={messageBoxRef}
        className={cx(
          'h-60 overflow-scroll',
          'px-2 pt-2',
          'border-2 border-secondary-500/20 bg-secondary-500/50 rounded-xl'
        )}
      >
        {messages.map((message, idx) => (
          <div key={`sample-message-${idx}`} className="w-full h-4 space-x-2">
            <span>{message.name}</span>:<span>{message.text}</span>
          </div>
        ))}
      </div>
      <MessageSendSection myName={authState.username} sendMessage={sendSocketMessage} />
    </div>
  );
};

export default RoomJoinModalContent;
