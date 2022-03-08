import { useState, useCallback } from 'react'
//import interface
import { RemoteMediaShape } from '@src/core/interface/media-stream'

export default function useRemoteStreams() {
  const [remoteStreams, setRemoteStreams] = useState<RemoteMediaShape[]>([])

  const addRemoteStream = useCallback(({ peerId, stream }: RemoteMediaShape) => {
    setRemoteStreams((prev) => {
      if (prev.some((remoteMediaInfo) => remoteMediaInfo.peerId === peerId)) return [...prev]
      return [
        ...prev,
        {
          peerId,
          stream,
        },
      ]
    })
  }, [])

  const removeRemoteStream = useCallback((peerId) => {
    setRemoteStreams((prev) => {
      const index = prev.findIndex((remote) => remote.peerId === peerId)
      if (index < 0) return [...prev]
      prev.splice(index, 1)
      return [...prev]
    })
  }, [])

  return [remoteStreams, addRemoteStream, removeRemoteStream] as const
}
