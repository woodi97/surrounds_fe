import { useState, useEffect, useContext } from 'react'
import { getRandomId } from '@src/utils/random'
import { SocketContext } from '@src/utils/socket'
import Peer from 'peerjs'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: {
    stunURL,
    turnURL,
    turnUsername,
    turnCredential,
    peerHost,
    peerPort,
    peerDebug,
    peerPath,
    peerSecure,
  },
} = getConfig()

const config = {
  iceServers: [
    { urls: [stunURL] },
    {
      urls: turnURL,
      username: turnUsername,
      credential: turnCredential,
    },
  ],
}
const peerConfig = {
  host: peerHost,
  port: Number(peerPort),
  debug: Number(peerDebug),
  path: peerPath,
  secure: peerSecure === 'true',
  config,
}

console.log(peerConfig)

export default function usePeer({
  addRemoteStream,
  removeRemoteStream,
  emailId,
  profileImage,
  chatroom,
  localStream,
}) {
  const peers = {}
  const [myPeer, setPeer] = useState<Peer>(null)
  const [myPeerID, setMyPeerID] = useState<string>(null)
  const socket = useContext(SocketContext)

  useEffect(() => {
    if (localStream) {
      import('peerjs')
        .then(({ default: Peer }) => {
          const peer = myPeer ? myPeer : new Peer(String(getRandomId()), peerConfig)

          peer.on('open', () => {
            setPeer(peer)
            setMyPeerID(peer.id)
            socket.emit('join-room', chatroom.id, peer.id, emailId, profileImage)
          })

          peer.on('call', (call) => {
            const { emailId, profileImage } = call.metadata
            call.answer(localStream)
            call.on('stream', (remoteStream) => {
              addRemoteStream(remoteStream, call.peer, emailId, profileImage)
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
            console.log('Peer desconnected')
            peer.reconnect()
          })

          peer.on('close', () => {
            console.log('Peer closed remotetly')
          })

          peer.on('error', (error) => {
            console.log('peer error', error)
            peer.disconnect()
          })

          socket.on('user-connected', (userId, othersEmail, othersProfileImage) => {
            if (peer.disconnected) {
              peer.connect(userId)
            } else {
              const call = peer.call(userId, localStream, {
                metadata: {
                  emailId: emailId,
                  profileImage: profileImage,
                },
              })
              peers[userId] = call
              call.on('stream', (remoteStream) => {
                addRemoteStream(remoteStream, call.peer, othersEmail, othersProfileImage)
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
            }
          })
          socket.on('user-disconnected', (userId) => {
            console.log('user-disconnected to')
            removeRemoteStream(userId)
            if (peers[userId]) peers[userId].close()
          })
          socket.on('user-leave', (userId) => {
            console.log(userId)
            removeRemoteStream(userId)
            if (peers[userId]) peers[userId].close()
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return () => {
      if (myPeer) {
        myPeer.disconnect()
        myPeer.destroy()
        setPeer(null)
      }
    }
  }, [localStream])

  return [myPeer, myPeerID] as const
}
