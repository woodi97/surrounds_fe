import React, { FC } from 'react'
import { useUserMedia, useRemoteStreams, usePeer } from '@src/hooks'
import { Video } from '../common'

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
      {remoteStreams?.map((remoteStream, index) => {
        return <Video key={index} mediaStream={remoteStream.stream} muted={false} />
      })}
    </div>
  )
}

export default RoomModal
