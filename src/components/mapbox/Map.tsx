import { Location } from "@src/core/interface";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import config from "../../../config";
import styles from "./Map.module.scss";

interface IMapProps {
	className: any;
	location: Location;
}

export default function Map(props: IMapProps): JSX.Element {
	const isClient = typeof window === "object";
	const { className, location } = props;
	const [viewPort, setViewPort] = useState({
		...getSize(),
		latitude: location.latitude,
		longitude: location.longitude,
		zoom: 13,
	});

	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined,
		};
	}

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

	return (
		<div className={classNames(className, styles.map)}>
			<ReactMapGL
				mapStyle="mapbox://styles/mapbox/streets-v11"
				mapboxApiAccessToken={config.mapboxConfig.token}
				onViewportChange={(viewport) => setViewPort(viewport)}
				{...viewPort}
			/>
		</div>
	);
}
