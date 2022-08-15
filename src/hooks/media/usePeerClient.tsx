import { SocketJoinReceiveType } from '@src/core/types/message';
import { AddRemoteStreamType, RemoveRemoteStreamType } from '@src/hooks/media/useRemoteStream';
import Peer from 'peerjs';
import { useEffect, useRef } from 'react';

export type PeerClientHookProps = {
  localStream: MediaStream;
  addRemoteStream: AddRemoteStreamType;
  removeRemoteStream: RemoveRemoteStreamType;
  sendJoinMessage: (peerId: string) => void;
  recvJoinMessage: (callback: ({ peerId }: SocketJoinReceiveType) => void) => void;
  disconnectSocket: () => void;
};

function usePeerClient({
  localStream,
  addRemoteStream,
  removeRemoteStream,
  sendJoinMessage,
  recvJoinMessage,
  disconnectSocket,
}: PeerClientHookProps) {
  const peerRef = useRef<Peer>(null);

  // cleanup peer connection
  const cleanupPeerConnection = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
  };

  const initPeerConnection = (peerObj: Peer) => {
    peerObj.on('open', () => {
      peerRef.current = peerObj;
      sendJoinMessage(peerObj.id);
    });
  };

  const callFromPeer = (peerObj: Peer) => {
    peerObj.on('call', (call) => {
      // const {username, profile} = call.metadata;
      // answer call
      call.answer(localStream);
      // add remote stream
      call.on('stream', (stream) => {
        addRemoteStream({
          peerId: call.peer,
          stream,
        });
      });
      // close call
      call.on('close', () => {
        removeRemoteStream(call.peer);
      });
      // error call
      call.on('error', (err) => {
        console.error(err);
        removeRemoteStream(call.peer);
      });
    });
  };

  const callToPeer = (peerObj: Peer) => {
    recvJoinMessage(({ peerId }) => {
      const call = peerObj.call(peerId, localStream);
      // add remote stream
      call.on('stream', (remoteStream) => {
        addRemoteStream({
          peerId,
          stream: remoteStream,
        });
      });
      // remove stream when close
      call.on('close', () => {
        removeRemoteStream(peerId);
        call.close();
      });
      // remove stream when error
      call.on('error', () => {
        removeRemoteStream(peerId);
        call.close();
      });
    });
  };

  const disconnectFromPeer = (peerObj: Peer) => {
    peerObj.on('disconnected', () => {
      cleanupPeerConnection();
      disconnectSocket();
    });
    peerObj.on('close', () => {
      cleanupPeerConnection();
      disconnectSocket();
    });
    peerObj.on('error', () => {
      cleanupPeerConnection();
      disconnectSocket();
    });
  };

  const handlePeerConnection = (peerObj: Peer) => {
    initPeerConnection(peerObj);
    callFromPeer(peerObj);
    callToPeer(peerObj);
    disconnectFromPeer(peerObj);
  };

  useEffect(() => {
    if (localStream) {
      import('peerjs').then(({ default: Peer }) => {
        const peerObj = new Peer();
        handlePeerConnection(peerObj);
      });
    }

    return () => {
      cleanupPeerConnection();
    };
  }, [localStream]);
}

export default usePeerClient;
