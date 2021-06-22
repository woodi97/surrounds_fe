import classNames from "classnames";
import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import config from "../../../config";

export interface IMapProps {
	className: any;
}

export default function Map(props: IMapProps): JSX.Element {
	const { className } = props;
	const [viewPort, setViewPort] = useState({
		width: "100vw",
		height: "100vh",
		latitude: 41.5868,
		longitude: -93.625,
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
