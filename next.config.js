/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, "./src/styles")],
	},
	images: {
		domains: ["user-images.githubusercontent.com"],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	// Add Runtime process.env Configuration
	serverRuntimeConfig: {
		// Will only be available on the server side
		staticFolder: "/public",
	},
	publicRuntimeConfig: {
		// Will be available on both server and client
		stunURL: process.env.STUN_URL,
		turnURL: process.env.TURN_URL,
		turnUsername: process.env.TURN_USERNAME,
		turnCredential: process.env.TURN_CREDENTIAL,
		peerHost: process.env.PEER_HOST,
		peerPort: process.env.PEER_PORT,
		peerDebug: process.env.PEER_DEBUG,
		peerPath: process.env.PEER_PATH,
		peerSecure: process.env.PEER_SECURE,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};
