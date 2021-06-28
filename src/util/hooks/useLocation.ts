import React, { useCallback, useEffect, useState } from "react";
import { Location } from "@src/core/interface";

const gpsOptions = {
	enableHighAccuracy: true,
	maximumAge: 30000,
};

export default function useLocation() {
	const [location, setLocation] = useState<Location>(null);

	const getCurrentLocation = () => {
		// navigator.geolocation.getCurrentPosition을 비동기로 사용하기 위해 Promise로 감쌌음
		return new Promise<Location>((resolve, reject) => {
			if (!navigator.geolocation) {
				reject("위치정보 사용이 불가능한 브라우저입니다.");
			}
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve(position.coords as Location);
				},
				reject,
				gpsOptions,
			);
		});
	};

	useEffect(() => {
		if (!location) {
			getGPS();
		}
		async function getGPS() {
			try {
				const result = await getCurrentLocation();
				setLocation(result);
			} catch (error) {
				window.alert(error);
			}
		}
	}, [location]);

	return [location] as const;
}
