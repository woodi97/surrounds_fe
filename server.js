/* eslint-disable @typescript-eslint/no-var-requires */
const Koa = require("koa");
const next = require("next");
const Router = require("@koa/router");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const config = require("./config");
const { PeerServer } = require("peer");

app.prepare().then(() => {
	const server = new Koa();
	const router = new Router();
	const io = require("socket.io")(server);

	// Init PeerServer
	PeerServer({ port: 4000, path: "/media-chat" });

	router.get("/signin", async (ctx) => {
		await app.render(ctx.req, ctx.res, "/", ctx.req.query);
	});

	router.get("/signup", async (ctx) => {
		await app.render(ctx.req, ctx.res, "/", ctx.req.query);
	});

	router.get("/", async (ctx) => {
		await app.render(ctx.req, ctx.res, "/", ctx.query);
		ctx.respond = false;
	});

	router.all("(.*)", async (ctx) => {
		await handle(ctx.req, ctx.res);
		ctx.respond = false;
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

	server.use(async (ctx, next) => {
		ctx.res.statusCode = 200;
		await next();
	});

	server.use(router.routes());
	server.use(router.allowedMethods());
	server.listen(port, () => {
		console.log(`> Ready on ${config.apiConfig.SERVER_URL}`);
	});
});
