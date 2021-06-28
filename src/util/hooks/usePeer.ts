import { useState, useEffect, useContext } from "react";
import { getRandomId } from "@src/util/random";
import { SocketContext } from "@src/util/socket";
import config from "@src/core/config";
import Peer from "peerjs";

export default function usePeer(
	addRemoteStream,
	removeRemoteStream,
	emailId,
	profileImage,
	chatroom,
	localStream,
) {
	const peers = {};
	const [myPeer, setPeer] = useState<Peer>(null);
	const [myPeerID, setMyPeerID] = useState<string>(null);
	const socket = useContext(SocketContext);

	const cleanUp = () => {
		if (myPeer) {
			myPeer.disconnect();
			// myPeer.destroy();
			// myPeer.off("call", () => {
			// 	console.log("call event disarmed");
			// });
			// myPeer.off("close", () => {
			// 	console.log("close event disarmed");
			// });
			// myPeer.off("disconnected", () => {
			// 	console.log("disconnected event disarmed");
			// });
			// myPeer.off("error", () => {
			// 	console.log("error event disarmed");
			// });
			// socket.off("user-connected", () => {
			// 	console.log("user-connected event closed");
			// });
			// socket.off("user-disconnected", () => {
			// 	console.log("user-disconnected event closed");
			// });
			// socket.off("user-leave", () => {
			// 	console.log("user-leave event closed");
			// });
		}
		setPeer(null);
	};

	useEffect(() => {
		if (localStream) {
			import("peerjs")
				.then(({ default: Peer }) => {
					const peer = myPeer
						? myPeer
						: new Peer(String(getRandomId()), config.peerConfig);
					peer.on("open", () => {
						setPeer(peer);
						setMyPeerID(peer.id);
						socket.emit(
							"join-room",
							chatroom.id,
							peer.id,
							emailId,
							profileImage,
						);
					});

					peer.on("call", (call) => {
						const { emailId, profileImage } = call.metadata;
						// Answer the call with an A/V stream.
						call.answer(localStream);

						// Play the remote stream
						call.on("stream", (remoteStream) => {
							addRemoteStream(remoteStream, call.peer, emailId, profileImage);
						});

						call.on("close", () => {
							console.log("The call has ended");
							removeRemoteStream(call.peer);
						});

						call.on("error", (error) => {
							console.log(error);
							removeRemoteStream(call.peer);
						});
					});

					peer.on("disconnected", () => {
						console.log("Peer desconnected");
						cleanUp();
					});

					peer.on("close", () => {
						console.log("Peer closed remotetly");
						cleanUp();
					});

					peer.on("error", (error) => {
						console.log("peer error", error);
						cleanUp();
					});

					socket.on(
						"user-connected",
						(userId, othersEmail, othersProfileImage) => {
							if (peer.disconnected) {
								peer.connect(userId);
							} else {
								const call = peer.call(userId, localStream, {
									metadata: {
										emailId: emailId,
										profileImage: profileImage,
									},
								});
								peers[userId] = call;
								call.on("stream", (remoteStream) => {
									addRemoteStream(
										remoteStream,
										call.peer,
										othersEmail,
										othersProfileImage,
									);
								});
								call.on("disconnected", () => {
									console.log("disconnected");
								});
								call.on("close", () => {
									console.log("call closed");
									removeRemoteStream(call.peer);
									call.close();
								});
								call.on("error", (error) => {
									console.log("call error", error);
									removeRemoteStream(call.peer);
									call.close();
								});
							}
						},
					);
					socket.on("user-disconnected", (userId) => {
						console.log("user-disconnected to");
						removeRemoteStream(userId);
						if (peers[userId]) peers[userId].close();
					});
					socket.on("user-leave", (userId) => {
						console.log(userId);
						removeRemoteStream(userId);
						if (peers[userId]) peers[userId].close();
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}

		return () => {
			cleanUp();
		};
	}, [localStream]);

	return [myPeer, myPeerID] as const;
}
