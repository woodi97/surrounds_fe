import { useCallback, useEffect, useState } from 'react';

export default function useRemoteStreams() {
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());

  const addRemoteStream = ({ peerId, stream }: { peerId: string; stream: MediaStream }) => {
    setRemoteStreams((prev) => {
      return new Map(prev).set(peerId, stream);
    });
  };

  const removeRemoteStream = useCallback((peerId) => {
    setRemoteStreams((prev) => {
      const tempMap = new Map(prev);
      tempMap.delete(peerId);
      return tempMap;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (remoteStreams.size > 0) {
        remoteStreams.forEach((stream) => {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        });
        setRemoteStreams(new Map());
      }
    };
  });

  return [remoteStreams, addRemoteStream, removeRemoteStream] as const;
}
