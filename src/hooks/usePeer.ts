import { useContext, useEffect, useRef } from 'react'
import { getRandomId } from '@src/utils/random'
import Peer from 'peerjs'
import { peerConfig } from '@src/config/peerConfig'
import { SocketContext } from './useSocket'

const usePeer = ({ addRemoteStream, removeRemoteStream, chatroom, localStream }) => {
  const peers = {}

  const socket = useContext(SocketContext)

  const peerInstance = useRef<Peer>(null)
  const peerID = useRef<string>(null)

  const cleanUp = () => {
    if (peerInstance.current) {
      peerInstance.current?.disconnect()
      peerInstance.current?.destroy()
      peerInstance.current = null
      peerID.current = null
      socket.off('user-connected')
      socket.off('leave-room')
    }
  }

  useEffect(() => {
    if (localStream) {
      import('peerjs').then(({ default: Peer }) => {
        const peer = new Peer(String(getRandomId()), peerConfig)
        peer.on('open', () => {
          peerInstance.current = peer
          peerID.current = peer.id
          socket.emit('join-room', chatroom.id, peer.id)
        })
        peer.on('call', (call) => {
          const { username, profile } = call.metadata
          call.answer(localStream)
          call.on('stream', (remoteStream) => {
            addRemoteStream({ peerId: call.peer, stream: remoteStream })
          })
          call.on('close', () => {
            console.log('The call has ended')
            removeRemoteStream(call.peer)
          })
          call.on('error', (error) => {
            console.log(error)
            removeRemoteStream(call.peer)
          })
        })
        peer.on('disconnected', () => {
          console.log('disconnected with peer server')
          socket.emit('leave-room', peerID.current, chatroom.id)
        })
        peer.on('close', () => {
          console.log('close connection with peer server')
        })
        peer.on('error', (error) => {
          console.log('error event from peer server', error)
        })

        // got new user
        socket.on('user-connected', (userId) => {
          console.log('user-connected', userId)
          const call = peer.call(userId, localStream, {
            metadata: {
              username: 'test',
              profile: 'test',
            },
          })
          peers[userId] = call
          call.on('stream', (remoteStream) => {
            addRemoteStream({ peerId: userId, stream: remoteStream })
          })
          call.on('disconnected', () => {
            console.log('disconnected')
          })
          call.on('close', () => {
            removeRemoteStream(userId)
            call.close()
          })
          call.on('error', () => {
            removeRemoteStream(userId)
            call.close()
          })
        })
        socket.on('leave-room', (userId) => {
          console.log(userId)
          peers[userId]?.close()
          removeRemoteStream(userId)
        })
      })
    }
    return () => {
      cleanUp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStream])

  return [peerInstance, peers, cleanUp]
}

export default usePeer
