import { useState, useEffect } from "react";
import config from "@src/core/config";

const ratios = new Map([
	["default", { width: 640, height: 480 }],
	["portrait", { width: 375, height: 720 }],
]);

export default function useUserMedia() {
	const [mediaStream, setMediaStream] = useState(null);

	useEffect(() => {
		const enableStream = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia(
					config.userMediaConfig,
				);
				setMediaStream(stream);
			} catch (error) {
				console.log(error);
			}
		};

		if (!mediaStream) {
			enableStream();
		} else {
			return () => {
				mediaStream.getTracks().forEach((track) => {
					track.stop();
				});
			};
		}
	}, [mediaStream]);

	return mediaStream;
}
