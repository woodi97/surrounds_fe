import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

import { UserInfo } from "@src/core/interface";
import { useRouter } from "next/router";

import styles from "./index.module.scss";
// interface Props {
// 	me?: UserInfo;
// }

const MapBox = dynamic(() => import("@src/components/mapbox/Map"), {
	ssr: false,
});

export default function MainPage(): JSX.Element {
	// const { me } = props;
	const router = useRouter();
	return (
		<>
			{/* rendering mapbox */}
			<MapBox className="App" />
		</>
	);
}
