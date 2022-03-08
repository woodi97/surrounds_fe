import React, { FC, useEffect, useRef } from 'react'

interface VideoShape {
  mediaStream: MediaStream
  muted: boolean
}

const Video: FC<VideoShape> = ({ mediaStream, muted }) => {
  const viewRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!viewRef.current) return
    viewRef.current.srcObject = mediaStream ? mediaStream : null
  }, [mediaStream])

  // useEffect(() => {
  // 	function drawLoudness() {
  // 		requestAnimationFrame(drawLoudness);
  // 		const bufferLength = audioAnalyser.frequencyBinCount;
  // 		const dataArray = new Uint8Array(bufferLength);
  // 		audioAnalyser.getByteFrequencyData(dataArray);
  // 		const audioLevel =
  // 			dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
  // 		if (audioLevel > 50) {
  // 			viewRef.current.style.borderColor = "green";
  // 		} else {
  // 			if (viewRef.current) viewRef.current.style.borderColor = "transparent";
  // 		}
  // 	}
  // 	const audioContext = new AudioContext();
  // 	const audioAnalyser = new AnalyserNode(audioContext, { fftSize: 32 });
  // 	if (mediaStream) {
  // 		const audioSource = audioContext.createMediaStreamSource(mediaStream);
  // 		audioSource.connect(audioAnalyser);
  // 		audioSource.connect(audioContext.destination);
  // 		drawLoudness();
  // 	}
  // }, [mediaStream]);

  return (
    <video
      className="w-24 h-24 rounded-full object-cover"
      ref={viewRef}
      autoPlay
      playsInline
      muted={muted}
      poster="/profiles/default.png"
    />
  )
}

export default Video
