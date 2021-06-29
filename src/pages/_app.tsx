import React from "react";
import type { AppProps } from "next/app";
import GlobalStyles from "@src/styles/global-styles";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import theme from "@src/styles/theme";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<GlobalStyles />
			<Head>
				<title>Surrounds</title>
				<link rel="icon" href="/images/favicon.ico" />
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, user-scalable=no"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
