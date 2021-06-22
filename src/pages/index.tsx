import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicWithNoSSR = dynamic(() => import("@src/components/mapbox/Map"), {
	ssr: false,
});

export default function Home(): JSX.Element {
	return (
		<>
			<DynamicWithNoSSR className="App" />
		</>
	);
}
