import React, { FC, useContext } from 'react'
import router from 'next/router'
import { SocketContext } from '@src/utils/socket'
import RoomMedia from './RoomMedia'
import { useUserMedia, useRemoteStreams, usePeer } from '@src/hooks'
import { deleteChatroom } from '@src/core/api/chatroom'
import { useUserProfile } from '@src/context/UserAuthContext'
import { RoomInfo } from '@src/core/interface/chatroom'
import { useUpdateChatrooms } from '@src/context/ChatroomContext'
import { useCloseModal } from '@src/context/ModalContext'

type Props = {
  // modalOption: {
  //   roomInfo: RoomInfo
  // }
  modalOption: any
}

const ChatroomModal: FC<Props> = ({ modalOption }) => {
  const { roomInfo } = modalOption
  const { email, profileImage } = useUserProfile()
  const updateRoom = useUpdateChatrooms()
  const localStream = useUserMedia()
  const socket = useContext(SocketContext)
  const [remoteStreams, addRemoteStream, removeRemoteStream] = useRemoteStreams()
  const [myPeer, myPeerID] = usePeer({
    addRemoteStream,
    removeRemoteStream,
    emailId: email,
    profileImage,
    chatroom: roomInfo,
    localStream,
  })

  const onExitButtonClick = async () => {
    if (remoteStreams?.length === 0) {
      try {
        await deleteChatroom(roomInfo.generator.email)
        socket.emit('leave-room', myPeerID)
        myPeer.disconnect()
        myPeer.destroy()
        await updateRoom()
      } catch (e) {
        console.log(e)
      }
    } else {
      socket.emit('leave-room', myPeerID)
      myPeer.disconnect()
      myPeer.destroy()
      await updateRoom()
    }
  }

  return (
    <div className="flex flex-wrap justify-around overflow-auto">
      <RoomMedia
        mediaStream={localStream}
        emailId={email}
        onClick={() => {}}
        muted={true}
        profileImage={profileImage}
      />
      {remoteStreams?.map((remoteStream, index) => {
        return (
          <RoomMedia
            key={index}
            mediaStream={remoteStream.stream}
            emailId={remoteStream.emailId}
            onClick={() => {}}
            muted={false}
            profileImage={remoteStream.profileImage}
          />
        )
      })}
    </div>
  )
}

export default ChatroomModal
