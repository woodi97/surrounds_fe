import { Location } from "@src/core/interface";
import classNames from "classnames";
import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import config from "../../../config";

interface IMapProps {
	className: any;
	location: Location;
}

export default function Map(props: IMapProps): JSX.Element {
	const { className, location } = props;
	const [viewPort, setViewPort] = useState({
		width: "100vw",
		height: "100vh",
		latitude: location.latitude,
		longitude: location.longitude,
		zoom: 13,
	});

	return (
		<>
			<ReactMapGL
				mapStyle="mapbox://styles/mapbox/streets-v9"
				mapboxApiAccessToken={config.mapboxConfig.token}
				onViewportChange={(viewport) => setViewPort(viewport)}
				{...viewPort}
			/>
		</>
	);
}
