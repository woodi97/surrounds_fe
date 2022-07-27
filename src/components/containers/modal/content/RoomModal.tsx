import { usePeer, useRemoteStreams, useUserMedia } from '@src/hooks'
import React, { FC } from 'react'

import { Video } from '../../../atom'

type Props = {
  // modalOption: {
  //   roomInfo: RoomInfo
  // }
  modalOption: any
}

const RoomModal: FC<Props> = ({ modalOption }) => {
  const { roomInfo } = modalOption
  const localStream = useUserMedia()
  const [remoteStreams, addRemoteStream, removeRemoteStream] = useRemoteStreams()

  usePeer({
    addRemoteStream,
    removeRemoteStream,
    chatroom: roomInfo,
    localStream,
  })

  return (
    <div className="flex flex-wrap justify-around overflow-auto">
      <Video mediaStream={localStream} muted={true} />
      {Array.from(remoteStreams.values()).map((stream: MediaStream, index) => {
        return <Video key={`remote-videos-${index}`} mediaStream={stream} muted={false} />
      })}
    </div>
  )
}

export default RoomModal
