import React, { useCallback, useContext, useEffect, useState } from "react";
import router from "next/router";
// import modules
import Peer from "peerjs";
import classNames from "classnames";
import { SocketContext } from "@src/util/socket";
// import interface
import { Location, RoomInfo } from "@src/core/interface";
// import component
import RoomMedia from "./RoomMedia";
// import config
import config from "@src/core/config";
// import custom hooks
import { useUserMedia } from "@src/util/hooks";
// import api
import { deleteChatroom } from "@src/core/api/chatroom";
// import styles
import styles from "./Room.module.scss";

interface IRoomProps {
	className?: string;
	chatroom?: RoomInfo;
	emailId: string;
	profileImage: string;
	currentLocation: Location;
	getChatRooms(location: Location): void;
	onClick(emailId: string, e: any): void;
}

interface LocalMediaInfo {
	peerId: string;
	emailId: string;
	profileImage: string;
	stream: MediaStream;
}

export default function Room(props: IRoomProps): JSX.Element {
	const {
		className,
		chatroom,
		emailId,
		profileImage,
		currentLocation,
		getChatRooms,
		onClick,
	} = props;
	const localStream = useUserMedia();
	const peers = {};
	const socket = useContext(SocketContext);
	const [myPeer, setPeer] = useState<Peer>(undefined);
	const [remoteMediaInfos, setRemoteMediaInfos] = useState<LocalMediaInfo[]>(
		[],
	);

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

	const addRemoteStream = useCallback(
		(stream, peerId, emailId, profileImage) => {
			setRemoteMediaInfos((remoteMediaInfos) => {
				if (!stream || !peerId) return [...remoteMediaInfos];
				if (
					remoteMediaInfos.some(
						(remoteMediaInfo) => remoteMediaInfo.peerId === peerId,
					)
				)
					return [...remoteMediaInfos];
				return [
					...remoteMediaInfos,
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
		setRemoteMediaInfos((remoteMediaInfos) => {
			const index = remoteMediaInfos.findIndex(
				(remote) => remote.peerId === peerId,
			);
			if (index < 0) return [...remoteMediaInfos];
			remoteMediaInfos.splice(index, 1);
			return [...remoteMediaInfos];
		});
	}, []);

	useEffect(() => {
		if (localStream) {
			import("peerjs").then(({ default: Peer }) => {
				const peer = myPeer ? myPeer : new Peer(undefined, config.peerConfig);
				setPeer(peer);

				peer.on("open", (peerId) => {
					socket.emit("join-room", chatroom.id, peerId, emailId, profileImage);
				});

				peer.on("call", (call) => {
					const { emailId, profileImage } = call.metadata;
					console.log("get call from ", call.peer, emailId, profileImage);
					call.answer(localStream);
					call.on("stream", (remoteStream) => {
						addRemoteStream(remoteStream, call.peer, emailId, profileImage);
					});

					call.on("close", () => {
						removeRemoteStream(call.peer);
					});

					call.on("error", (error) => {
						console.log(error);
						removeRemoteStream(call.peer);
					});
				});

				peer.on("close", () => {
					console.log("Peer closed remotetly");
					cleanUp();
				});

				peer.on("disconnected", () => {
					console.log("Peer disconnected");
					cleanUp();
				});

				peer.on("error", (error) => {
					console.log("peer error", error);
					cleanUp();
				});

				// caller section
				socket.on(
					"user-connected",
					(userId, othersEmail, othersProfileImage) => {
						//call.peer == userId
						console.log(
							"connected user has : ",
							userId,
							othersEmail,
							othersProfileImage,
						);
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
								console.log("connected to" + call.peer);
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
			});
		}
		return () => {
			cleanUp();
		};
	}, [localStream]);

	const onExitButtonClick = async (e) => {
		e.preventDefault();
		if (remoteMediaInfos.length === 0) {
			try {
				const result = await deleteChatroom(chatroom.generator.email);
				console.log(result);
				socket.emit("leave-room", myPeer.id);
				myPeer.disconnect();
				myPeer.destroy();
				getChatRooms(currentLocation);
				router.push("/", undefined, { shallow: true });
			} catch (error) {
				console.log(error);
			}
		} else {
			socket.emit("leave-room", myPeer.id);
			myPeer.disconnect();
			myPeer.destroy();
			getChatRooms(currentLocation);
			router.push("/", undefined, { shallow: true });
		}
	};

	return (
		<div className={classNames(className, styles.container)}>
			<div className={styles.header}>
				<div className={styles.header_infos}>
					<div className={styles.header_infos_title}>{chatroom.title}</div>
					<div className={styles.header_infos_location}>
						{/* 흑석로, 중앙대학교(5m) */}
					</div>
				</div>
				<div className={styles.header_buttons}>
					<img
						onClick={onExitButtonClick}
						src="/images/icon_exit.svg"
						alt=""
					></img>
				</div>
			</div>
			<div className={styles.participants}>
				<RoomMedia
					mediaStream={localStream}
					emailId={emailId}
					onClick={onClick}
					muted={true}
					profileImage={profileImage}
				/>
				{remoteMediaInfos.map((remoteMediaInfo, index) => {
					return (
						<RoomMedia
							key={index}
							mediaStream={remoteMediaInfo.stream}
							emailId={remoteMediaInfo.emailId}
							onClick={onClick}
							muted={false}
							profileImage={remoteMediaInfo.profileImage}
						/>
					);
				})}
			</div>
		</div>
	);
}
