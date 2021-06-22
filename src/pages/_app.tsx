import React from "react";
import type { AppProps } from "next/app";
import GlobalStyles from "@src/styles/global-styles";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import theme from "@src/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Head>
				<title>surrounds</title>
				<link rel="icon" href="images/favicon.ico" />
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, user-scalable=no"
				/>
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
