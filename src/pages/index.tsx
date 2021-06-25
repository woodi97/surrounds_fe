import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import Interface
import { UserInfo } from "@src/core/interface";
import styles from "./index.module.scss";
// API Methods
import { getMyProfile } from "@src/core/api/user";
import { useState } from "react";
// import Components
import ProfileHeader from "@src/components/primary/ProfileHeader";
// import Mapbox By Dynamic
const MapBox = dynamic(() => import("@src/components/mapbox/Map"), {
	ssr: false,
});

export default function MainPage(): JSX.Element {
	const [me, setMe] = useState<UserInfo>(undefined);
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

	return (
		<>
			{console.log(me)}
			{/* rendering mapbox */}
			<MapBox className="App" />
			<ProfileHeader className={styles.profile} user={me} />
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
