import React, { useContext } from "react";
import router from "next/router";
// import modules
import classNames from "classnames";
import { SocketContext } from "@src/utils/socket";
// import interface
import { Location, RoomInfo } from "@src/core/interface";
// import component
import RoomMedia from "./RoomMedia";
// import custom hooks
import { useUserMedia, useRemoteStreams, usePeer } from "@src/utils/hooks";
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
	const socket = useContext(SocketContext);
	const [remoteStreams, addRemoteStream, removeRemoteStream] =
		useRemoteStreams();
	const [myPeer, myPeerID] = usePeer(
		addRemoteStream,
		removeRemoteStream,
		emailId,
		profileImage,
		chatroom,
		localStream,
	);

	const onExitButtonClick = async () => {
		if (remoteStreams?.length === 0) {
			try {
				await deleteChatroom(chatroom.generator.email);
				socket.emit("leave-room", myPeerID);
				myPeer.disconnect();
				myPeer.destroy();
				getChatRooms(currentLocation);
				router.push("/", undefined, { shallow: true });
			} catch (error) {
				console.log(error);
			}
		} else {
			socket.emit("leave-room", myPeerID);
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
				{remoteStreams?.map((remoteMediaInfo, index) => {
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
