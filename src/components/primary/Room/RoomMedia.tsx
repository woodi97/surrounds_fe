import React, { useEffect, useRef } from 'react'

import classNames from 'classnames'
import styles from './RoomMedia.module.scss'

interface IRoomMediaProps {
  className?: string
  mediaStream: MediaStream
  emailId: string
  muted: boolean
  profileImage: string
  onClick(emailId: string, e: any): void
}

export default function RoomMedia(props: IRoomMediaProps): JSX.Element {
  const { className, mediaStream, emailId, profileImage, muted, onClick } = props
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
    <div className={classNames(className, styles.container)}>
      <video
        className={styles.video}
        ref={viewRef}
        autoPlay
        playsInline
        muted={muted}
        poster="/profiles/default.png"
        onClick={(e) => {
          onClick(emailId, e)
        }}
      />
      <div className={styles.label}>{emailId ? emailId : 'unknown'}</div>
    </div>
  )
}
