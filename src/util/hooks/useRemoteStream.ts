import { useState, useCallback } from "react";
//import interface
import { IRemoteMedia } from "@src/core/interface";

export default function useRemoteStreams() {
	const [remoteStreams, setRemoteStreams] = useState<IRemoteMedia[]>([]);

	const addRemoteStream = useCallback(
		(stream, peerId, emailId, profileImage) => {
			setRemoteStreams((remoteStreams) => {
				if (!stream || !peerId) return [...remoteStreams];
				if (
					remoteStreams.some(
						(remoteMediaInfo) => remoteMediaInfo.peerId === peerId,
					)
				)
					return [...remoteStreams];
				return [
					...remoteStreams,
					{
						peerId: peerId,
						emailId: emailId,
						stream: stream,
						profileImage: profileImage,
					},
				];
			});
		},
		[],
	);

	const removeRemoteStream = useCallback((peerId) => {
		setRemoteStreams((remoteStreams) => {
			const index = remoteStreams.findIndex(
				(remote) => remote.peerId === peerId,
			);
			if (index < 0) return [...remoteStreams];
			remoteStreams.splice(index, 1);
			return [...remoteStreams];
		});
	}, []);

	return [remoteStreams, addRemoteStream, removeRemoteStream] as const;
}
