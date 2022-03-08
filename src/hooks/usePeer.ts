import { useEffect, useContext, useRef } from 'react'
import { getRandomId } from '@src/utils/random'
import Peer from 'peerjs'
import { SocketContext } from './useSocket'
import { peerConfig } from '@src/config/peerConfig'

export default function usePeer({ addRemoteStream, removeRemoteStream, chatroom, localStream }) {
  const peers = {}
  const socket = useContext(SocketContext)

  const peerInstance = useRef<Peer>(null)
  const peerID = useRef<string>(null)

  const cleanUp = () => {
    console.log(peerInstance.current)
    if (peerInstance.current) {
      socket.emit('leave-room', peerID.current)
      peerInstance.current.disconnect()
      peerInstance.current.destroy()
      peerInstance.current = null
    }
  }

  useEffect(() => {
    if (localStream) {
      import('peerjs').then(({ default: Peer }) => {
        const peer = peerInstance.current ?? new Peer(String(getRandomId()), peerConfig)
        peer.on('open', () => {
          peerInstance.current = peer
          peerID.current = peer.id
          socket.emit('join-room', chatroom.id, peer.id)
        })
        peer.on('call', (call) => {
          call.answer(localStream)
          call.on('stream', (remoteStream) => {
            addRemoteStream(remoteStream, call.peer)
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
          console.log('Peer disconnected')
          peer.reconnect()
        })
        peer.on('close', () => {
          console.log('Peer closed remotetly')
        })
        peer.on('error', (error) => {
          console.log('peer error', error)
          peer.disconnect()
        })
        // got new user
        socket.on('user-connected', (userId) => {
          console.log('user-connected', userId)
          const call = peer.call(userId, localStream)
          peers[userId] = call
          call.on('stream', (remoteStream) => {
            addRemoteStream(remoteStream, call.peer)
          })
          call.on('disconnected', () => {
            console.log('disconnected')
          })
          call.on('close', () => {
            console.log('call closed')
            removeRemoteStream(call.peer)
            call.close()
          })
          call.on('error', (error) => {
            console.log('call error', error)
            removeRemoteStream(call.peer)
            call.close()
          })
        })
        socket.on('user-disconnected', (userId) => {
          console.log('user-disconnected to')
          removeRemoteStream(userId)
          if (peers[userId]) peers[userId].close()
        })
        socket.on('user-leave', (userId) => {
          console.log('user-leave')
          removeRemoteStream(userId)
          if (peers[userId]) peers[userId].close()
        })
      })
    }

    return () => {
      cleanUp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStream])
}
