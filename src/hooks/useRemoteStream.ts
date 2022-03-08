import { useState, useCallback } from 'react'

export default function useRemoteStreams() {
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map())

  const addRemoteStream = ({ peerId, stream }: { peerId: string; stream: MediaStream }) => {
    setRemoteStreams((prev) => {
      return new Map(prev).set(peerId, stream)
    })
  }

  const removeRemoteStream = useCallback((peerId) => {
    setRemoteStreams((prev) => {
      const tempMap = new Map(prev)
      tempMap.delete(peerId)
      return tempMap
    })
  }, [])

  return [remoteStreams, addRemoteStream, removeRemoteStream] as const
}
