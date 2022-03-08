import { SocketContext } from '@src/hooks/useSocket'
import constate from 'constate'
import Peer from 'peerjs'
import { useContext, useRef } from 'react'

const usePeerJS = () => {
  const socket = useContext(SocketContext)
  const peerInstance = useRef<Peer>(null)
  const peerID = useRef<string>(null)

  return {
    socket,
    peerInstance,
    peerID,
  }
}

const [PeerJSProvider, getSocket, getPeerInstance, getPeerId] = constate(
  usePeerJS,
  (state) => state.socket,
  (value) => value.peerInstance.current,
  (value) => value.peerID.current
)

export { PeerJSProvider, getSocket, getPeerInstance, getPeerId }
