import { useCallback, useEffect, useState } from 'react';

type AddRemoteCallback = {
  peerId: string;
  stream: MediaStream;
};

export type RemoteStreamsType = {
  [key: string]: MediaStream;
};
export type AddRemoteStreamType = ({ peerId, stream }: AddRemoteCallback) => void;
export type RemoveRemoteStreamType = (peerId: string) => void;

export default function useRemoteStreams() {
  const [remoteStreams, setRemoteStreams] = useState<RemoteStreamsType>({});

  const addRemoteStream = ({ peerId, stream }: AddRemoteCallback) => {
    setRemoteStreams({ ...remoteStreams, [peerId]: stream });
  };

  const removeRemoteStream = useCallback((peerId) => {
    const newRemoteStreams = { ...remoteStreams };
    delete newRemoteStreams[peerId];
    setRemoteStreams(newRemoteStreams);
  }, []);

  useEffect(() => {
    return () => {
      Object.values(remoteStreams).forEach((stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      });
    };
  });

  return [remoteStreams, addRemoteStream, removeRemoteStream] as const;
}
