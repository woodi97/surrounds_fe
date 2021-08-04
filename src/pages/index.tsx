import React, { useEffect, useState } from "react";
import { GetServerSidePropsResult } from "next";
// Custom Hooks
import { useLocation } from "@src/util/hooks";
// NextJS
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import Interface
import { UserInfo, Location, RoomInfo } from "@src/core/interface";
import styles from "@styles/Home.module.scss";
// API Methods
import { getMyProfile } from "@src/core/api/user";
import { getNearChatrooms } from "@src/core/api/chatroom";
// import Components
import {
	ProfileHeader,
	RoomCreatePage,
	ProfilePage,
	RoomList,
} from "@src/components/primary";
import { SignInModal } from "@src/components/modal";

// import Mapbox By Dynamic
const MapBox = dynamic(() => import("@src/components/mapbox/Map"), {
	ssr: false,
});
// import Room By Dynamic
const Room = dynamic(() => import("@src/components/primary/Room/Room"), {
	ssr: false,
});

interface Profile {
	show: boolean;
	email: string;
}

export default function MainPage(): JSX.Element {
	const [myLocation] = useLocation();
	const [chatrooms, setChatrooms] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState<RoomInfo>(null);
	const [me, setMe] = useState<UserInfo>(undefined);
	// Showing Profile
	const [profile, setProfile] = useState<Profile>({
		show: false,
		email: "",
	});
	// Using Router
	const router = useRouter();

	// Open Profile Page When Click
	function onProfileClick(
		email: string,
		e: React.MouseEvent<HTMLInputElement>,
	) {
		e.preventDefault();
		setProfile({ show: !profile.show, email: email });
	}

	// Select Room When Click
	function onRoomClick(room: RoomInfo, e: React.MouseEvent<HTMLInputElement>) {
		e.preventDefault();
		setSelectedRoom(room);
	}

	// Get Near Chatrooms
	async function getChatrooms(location: Location) {
		try {
			const data = await getNearChatrooms(location);
			setChatrooms(data);
		} catch (err) {
			window.alert(err);
		}
	}

	// Get User Data
	async function getUserData() {
		try {
			const data = await getMyProfile();
			setMe(data);
		} catch (err) {
			console.log("SignIn Error");
		}
	}

	// Get User Data
	// Should be called Once
	useEffect(() => {
		getUserData();
	}, []);

	// Get Chatrooms
	useEffect(() => {
		if (myLocation) {
			getChatrooms(myLocation);
		}
	}, [myLocation]);

	// Return JSX
	return (
		<div className={styles.container}>
			{/* signin modal */}
			{!me && <SignInModal className={styles.signin} />}
			{/* rendering mapbox */}
			{myLocation && (
				<MapBox
					className={styles.map}
					location={myLocation}
					chatrooms={chatrooms}
				/>
			)}
			{/* rendering profileheader */}
			{myLocation && (
				<ProfileHeader
					className={styles.profile}
					user={me}
					onClick={onProfileClick}
				/>
			)}
			{/* rendering joinable rooms */}
			{myLocation && (
				<RoomList
					className={styles.bottombar}
					chatrooms={chatrooms}
					onClick={onRoomClick}
				/>
			)}
			{/* rendering profile page */}
			{profile.show && (
				<ProfilePage
					className={styles.detailProfile}
					emailId={profile.email}
					onClick={onProfileClick}
					onProfileUpdate={getUserData}
				/>
			)}
			{/* rendering room create page */}
			{router.asPath == "/chatroom" && (
				<RoomCreatePage
					className={styles.createChatroom}
					location={myLocation}
					getChatRooms={getChatrooms}
				/>
			)}
			{/* enter room */}
			{router.asPath.startsWith("/chatroom/") && (
				<Room
					className={styles.currentchatroom}
					chatroom={selectedRoom}
					emailId={me.email}
					profileImage={me.profileImage}
					currentLocation={myLocation}
					getChatRooms={getChatrooms}
					onClick={onProfileClick}
				/>
			)}
		</div>
	);
}

// export async function getServerSideProps(
// 	ctx,
// ): Promise<GetServerSidePropsResult<any>> {
// 	const data = await getMyProfile();
// 	return {
// 		props: {
// 			data,
// 		},
// 	};
// }
