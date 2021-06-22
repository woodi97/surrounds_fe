import React from "react";
import type { AppProps } from "next/app";
import GlobalStyles from "@src/styles/global-styles";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import theme from "@src/styles/theme";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<GlobalStyles />
			<Head>
				<title>Surrounds</title>
				<link rel="icon" href="images/favicon.ico" />
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, user-scalable=no"
				/>
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
