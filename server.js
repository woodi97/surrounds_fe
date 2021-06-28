/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");
const next = require("next");
const path = require("path");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require("express");
const config = require("./config");
const { ExpressPeerServer } = require("peer");

app.prepare().then(() => {
	const exapp = express();
	const server = http.createServer(exapp);
	const io = require("socket.io")(server);

	let connected = [];
	const expServer = ExpressPeerServer(server, {
		allow_discovery: true,
		debug: true,
	});

	//MiddleWares
	exapp.use(express.static(path.join(__dirname, "public")));
	// set the secret key variable for jwt
	exapp.set("jwt-secret", config.apiConfig.SECRET_KEY);

	// express + peerjs setting
	exapp.use("/media-chat", expServer);

	// when user connected to peer server, save that id to connected array
	// this is for managing connected person
	expServer.on("connection", (id) => {
		let idx = connected.indexOf(id);
		if (idx === -1) {
			connected.push(id);
		}
	});
	expServer.on("disconnect", (id) => {
		let idx = connected.indexOf(id);
	});

	// nextjs custom rendering
	exapp.get("/", (req, res) => {
		return app.render(req, res, "/", req.query);
	});
	// nextjs custom rendering
	exapp.all("*", (req, res) => {
		return handle(req, res);
	});

	// io connection for video/voice chat
	io.on("connection", (socket) => {
		socket.on("join-room", (roomId, userId, emailId, profileImage) => {
			socket.join(roomId);
			socket.broadcast
				.to(roomId)
				.emit("user-connected", userId, emailId, profileImage);
			socket.on("disconnect", () => {
				socket.broadcast.to(roomId).emit("user-disconnected", userId);
			});
			socket.on("leave-room", (userId) => {
				socket.broadcast.to(roomId).emit("user-leave", userId);
			});
		});
	});

	// listen for secured http connection
	server.listen(port, () => {
		console.log(`> Ready on ${config.apiConfig.SERVER_URL}`);
	});
});
