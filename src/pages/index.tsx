import React, { useEffect, useState } from "react";
// Custom Hooks
import { useLocation } from "@src/util/hooks";
// NextJS
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import Interface
import { UserInfo } from "@src/core/interface";
import styles from "./index.module.scss";
// API Methods
import { getMyProfile } from "@src/core/api/user";
// import Components
import ProfileHeader from "@src/components/primary/ProfileHeader";
// import Mapbox By Dynamic
const MapBox = dynamic(() => import("@src/components/mapbox/Map"), {
	ssr: false,
});

export default function MainPage(): JSX.Element {
	const [me, setMe] = useState<UserInfo>(undefined);
	const [myLocation] = useLocation();
	const router = useRouter();

	// Get User Data
	// Should be called Once
	useEffect(() => {
		getUserData();
		async function getUserData() {
			try {
				const data = await getMyProfile();
				setMe(data);
			} catch (err) {
				router.push("/signin");
			}
		}
	}, []);

	// Return JSX
	return (
		<>
			{/* rendering mapbox */}
			{myLocation && <MapBox className={styles.map} location={myLocation} />}
			{/* rendering profileheader */}
			{myLocation && <ProfileHeader className={styles.profile} user={me} />}
		</>
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
