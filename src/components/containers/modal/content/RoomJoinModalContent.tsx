import { MessageSendSection, UserJoinView } from '@src/components/molecule';
import { socketConfig } from '@src/core/config/envConfig';
import { SocketMessageReceiveType } from '@src/core/types/message';
import { ModalContentType, RoomJoinModalContentOption } from '@src/core/types/modal-type';
import {
  usePeerClient,
  useRemoteStreams,
  useRootDispatch,
  useRootState,
  useScrollToBottom,
  useSocketIo,
  useUserMedia,
} from '@src/hooks';
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
  const [
    initSocket,
    disconnected,
    sendSocketMessage,
    recvSocketMessage,
    sendJoinMessage,
    recvJoinMessage,
    recvLeaveMessage,
    recvErrorMessage,
    disconnectSocket,
  ] = useSocketIo(socketConfig.url + roomOption.roomId);

  // Init peerclient with usermedia
  const localStream = useUserMedia();
  const [remoteStreams, addRemoteStream, removeRemoteStream] = useRemoteStreams();
  usePeerClient({
    localStream,
    addRemoteStream,
    removeRemoteStream,
    sendJoinMessage,
    recvJoinMessage,
    recvLeaveMessage,
    recvErrorMessage,
    disconnectSocket,
  });

  // message send & recv handler
  useEffect(() => {
    if (disconnected) {
      ToastError('서버와 연결이 끊어졌습니다.');
      dispatch(closeModal());
    }
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
  }, [disconnected]);

  useScrollToBottom(messageBoxRef, [messages]);

  return (
    <div className="h-full flex flex-col py-16 space-y-2">
      <UserJoinView
        myProfile={authState.profile_image}
        myUserName={authState.username}
        localStream={localStream}
        remoteStreams={remoteStreams}
      />
      <div
        ref={messageBoxRef}
        className={cx(
          'h-full overflow-scroll',
          'px-2 pt-2',
          'border-8 border-primary-50/30 rounded-xl'
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
