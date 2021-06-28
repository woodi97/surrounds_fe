import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { User, Room } from "@src/models";
import connectDB from "@src/util/mongodb";
import authMiddleware from "@src/util/auth";
import config from "../../../../config";

interface Request extends NextApiRequest {
	params: any;
	decoded: any;
}

const api = nextConnect<Request, NextApiResponse>();

api.use(authMiddleware);

api.get(async (req, res) => {
	const { latitude, longitude } = req.query;
	const check = (rooms) => {
		if (!rooms) {
			//room does not exist
			throw new Error("Has No Matching Room");
		}
		return new Promise(function (resolve, reject) {
			resolve(rooms);
		});
	};

	const search = (latitude, longitude) => {
		return Room.searching(latitude, longitude);
	};

	const respond = (rooms) => {
		const body = [];
		rooms.forEach(function (room) {
			body.push({
				id: room.id,
				title: room.title,
				location: {
					latitude: parseFloat(room.location.coordinates[1]),
					longitude: parseFloat(room.location.coordinates[0]),
				},
				generator: {
					email: room.generator.email,
					username: room.generator.username,
					profileImage:
						config.apiConfig.IMAGE_URL + room.generator.profileImage,
				},
			});
		});

		res.json({
			header: {
				message: "success",
			},
			body,
		});
	};

	const onError = (error) => {
		res.status(403).json({
			message: error.message,
		});
	};

	search(latitude, longitude)
		.then(check)
		.then((rooms) => respond(rooms))
		.catch(onError);
});

api.post(async (req, res) => {
	const { title, latitude, longitude } = req.body;
	const user = User.findOneByEmail(req.decoded["email"]);

	//create user if not exist
	const create = (user) => {
		return Room.create(title, latitude, longitude, user);
	};

	const checkRoom = (room) => {
		return new Promise(function (resolve, reject) {
			if (room) {
				//user does not exist
				throw new Error("generator already has room ");
			}
			resolve(user);
		});
	};

	const respond = (room) => {
		res.json({
			header: {
				message: "success",
			},
			body: {
				id: room.id,
				title: room.title,
				location: {
					latitude: parseFloat(room.location.coordinates[1]),
					longitude: parseFloat(room.location.coordinates[0]),
				},
				generator: {
					email: room.generator.email,
					username: room.generator.username,
					profileImage: room.generator.profileImage,
				},
			},
		});
	};

	const onError = (error) => {
		res.status(403).json({
			message: error.message,
		});
	};

	Room.findOneByEmail(req.decoded["email"])
		.then(checkRoom)
		.then((email) => create(email))
		.then((room) => respond(room))
		.catch(onError);
});

api.delete(async (req, res) => {
	const { email } = req.query;
	const check = (room) => {
		if (!room) {
			//room does not exist
			throw new Error("Has No Room");
		}
		return new Promise(function (resolve, reject) {
			resolve(room);
		});
	};
	const respond = () => {
		res.json({
			header: {
				message: "success",
			},
		});
	};

	const deleting = (room) => {
		Room.delete(room);
	};

	const onError = (error) => {
		res.status(403).json({
			message: error.message,
		});
	};

	Room.findOneByEmail(email)
		.then(check)
		.then(deleting)
		.then(respond)
		.catch(onError);
});

export default connectDB(api);
