import constate from 'constate'
import Peer from 'peerjs'
import { useContext, useRef } from 'react'

const usePeerJS = () => {
  const peerInstance = useRef<Peer>(null)
  const peerID = useRef<string>(null)

  return {
    peerInstance,
    peerID,
  }
}

const [PeerJSProvider, getPeerInstance, getPeerId] = constate(
  usePeerJS,
  (value) => value.peerInstance.current,
  (value) => value.peerID.current
)

export { PeerJSProvider, getPeerInstance, getPeerId }
