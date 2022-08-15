import { MutableRefObject, useEffect } from 'react';

export default function useDrawVoiceLoudness({
  mediaStream,
  muted,
  ref,
}: {
  mediaStream: MediaStream;
  muted: boolean;
  ref: MutableRefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    if (!muted) {
      function drawLoudness() {
        requestAnimationFrame(drawLoudness);
        const bufferLength = audioAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        audioAnalyser.getByteFrequencyData(dataArray);
        const audioLevel = dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
        if (audioLevel > 40) {
          ref.current?.style.setProperty('border-color', '#ff0000');
        } else {
          ref.current?.style.setProperty('border-color', 'transparent');
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
}
