import appConfig from '@src/core/config/appConfig';
import React, { FC, useEffect, useRef } from 'react';

import Image from './ImageWrapper';

interface VideoShape {
  mediaStream: MediaStream;
  muted: boolean;
}

const Video: FC<VideoShape> = ({ mediaStream, muted }) => {
  const viewRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream ? mediaStream : null;
  }, [mediaStream]);

  useEffect(() => {
    if (!muted) {
      function drawLoudness() {
        requestAnimationFrame(drawLoudness);
        const bufferLength = audioAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        audioAnalyser.getByteFrequencyData(dataArray);
        const audioLevel = dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
        if (audioLevel > 40) {
          divRef.current?.style.setProperty('border-color', appConfig.notchColor);
        } else {
          divRef.current?.style.setProperty('border-color', 'transparent');
        }
      }

      const audioContext = new AudioContext();
      const audioAnalyser = new AnalyserNode(audioContext, { fftSize: 64 });
      if (mediaStream) {
        const audioSource = audioContext.createMediaStreamSource(mediaStream);
        audioSource.connect(audioAnalyser);
        audioSource.connect(audioContext.destination);
        drawLoudness();
      }
    }
  }, [mediaStream, muted]);

  return (
    <div ref={divRef} className="border-2 border-primary border-solid w-20 h-20 rounded-full">
      <video ref={viewRef} className="hidden" autoPlay playsInline muted={muted} />
      <Image
        className="rounded-full"
        src="/profiles/default.png"
        width="80px"
        height="80px"
        alt=""
      />
    </div>
  );
};

export default Video;
