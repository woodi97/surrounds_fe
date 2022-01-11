import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import axios from "axios";

import "@styles/globals.scss";
import "mapbox-gl/dist/mapbox-gl.css";

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>Surrounds</title>
				<link rel="icon" href="/images/favicon.ico" />
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					httpEquiv="Content-Security-Policy"
					content="upgrade-insecure-requests"
				></meta>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, user-scalable=no"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
