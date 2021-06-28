import React, { useState, useEffect } from "react";
import ReactMapGL, {
	Marker,
	Popup,
	NavigationControl,
	FlyToInterpolator,
} from "react-map-gl";
// import modules
import classNames from "classnames";
// import stylesheet
import styles from "./Map.module.scss";
// import interface
import { Location, RoomInfo } from "@src/core/interface";
// import config
import config from "../../../config";
interface IMapProps {
	className: string;
	location: Location;
	chatrooms?: RoomInfo[];
}

export default function Map(props: IMapProps): JSX.Element {
	const { className, location, chatrooms } = props;
	const isClient = typeof window === "object";
	const [viewPort, setViewPort] = useState({
		...getSize(),
		latitude: location.latitude,
		longitude: location.longitude,
		zoom: 13,
	});

	// get size of current window
	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined,
		};
	}

	// add resize event listener to window
	// to get the event when resize
	useEffect(() => {
		if (!isClient) {
			return;
		}
		function handleResize() {
			setViewPort({
				...viewPort,
				...getSize(),
			});
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// return JSX
	return (
		<div className={classNames(className, styles.Mapbox)}>
			<ReactMapGL
				{...viewPort}
				mapStyle="mapbox://styles/mapbox/streets-v11"
				mapboxApiAccessToken={config.mapboxConfig.token}
				transitionInterpolator={new FlyToInterpolator()}
				onViewportChange={(viewport) => setViewPort(viewport)}
			>
				<div className={styles.navi_control}>
					<NavigationControl />
				</div>
				{chatrooms.map((room, idx) => (
					<Marker
						key={idx}
						latitude={room.location.latitude}
						longitude={room.location.longitude}
					>
						<button className={styles.btn_marker}>
							<img
								src={
									room.generator.profileImage ===
									"https://boundary.or.kr/api/NULL"
										? "/profiles/default.png"
										: room.generator.profileImage
								}
								alt="img"
							/>
						</button>
					</Marker>
				))}
			</ReactMapGL>
		</div>
	);
}

{
	/* <Marker
	key={idx}
	longitude={chatroom.location.longitude}
	latitude={chatroom.location.latitude}
>
	<button className={styles.marker_btn} />
</Marker>; */
}
