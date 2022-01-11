import { useState, useEffect, useContext } from "react";
import { getRandomId } from "@src/utils/random";
import { SocketContext } from "@src/utils/socket";
import Peer from "peerjs";
// import nextjs config
import getConfig from "next/config";

// Add SSR, CSR Process.env Set
// Only holds serverRuntimeConfig and publicRuntimeConfig
const {
	publicRuntimeConfig: {
		stunURL,
		turnURL,
		turnUsername,
		turnCredential,
		peerHost,
		peerPort,
		peerDebug,
		peerPath,
		peerSecure,
	},
} = getConfig();

const config = {
	iceServers: [
		{ urls: [stunURL] },
		{
			urls: turnURL,
			username: turnUsername,
			credential: turnCredential,
		},
	],
};
const peerConfig = {
	host: peerHost,
	port: Number(peerPort),
	debug: Number(peerDebug),
	path: peerPath,
	secure: peerSecure === "true",
	config,
};

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
						: new Peer(String(getRandomId()), peerConfig);

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
	}, [
		addRemoteStream,
		chatroom.id,
		cleanUp,
		emailId,
		localStream,
		myPeer,
		peers,
		profileImage,
		removeRemoteStream,
		socket,
	]);

	return [myPeer, myPeerID] as const;
}
