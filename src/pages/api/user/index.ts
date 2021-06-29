import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import User from "@src/models/user";
import connectDB from "@src/util/mongodb";
import authMiddleware from "@src/util/auth";

interface Request extends NextApiRequest {
	params: any;
	decoded: any;
}

const api = nextConnect<Request, NextApiResponse>();

api.use(authMiddleware);

api.get(async (req, res) => {
	const userE = req.params.email ? req.params.email : req.decoded["email"];

	const check = (user) => {
		if (!user) {
			//user does not exist
			throw new Error("No matching email");
		}
		return user;
	};

	const respond = (user) => {
		res.json({
			header: {
				message: "success",
			},
			body: {
				email: user.email,
				username: user.username,
				profileImage: process.env.IMAGE_URL + user.profileImage,
			},
		});
	};

	const onError = (error) => {
		res.status(403).json({
			message: error.message,
		});
	};

	User.findOneByEmail(userE).then(check).then(respond).catch(onError);
});

api.put(async (req, res) => {
	const { username } = req.body;

	const check = (user) => {
		return new Promise(function (resolve, reject) {
			if (!user) {
				//user does not exist
				throw new Error("No user");
			}
			resolve([user, username]);
		});
	};

	const respond = (user) => {
		res.json({
			header: {
				message: "success",
			},
			body: {
				email: user.email,
				username: user.username,
				profileImage: process.env.IMAGE_URL + user.profileImage,
			},
		});
	};

	const onError = (error) => {
		res.status(403).json({
			message: error.message,
		});
	};

	User.findOneByEmail(req.decoded["email"])
		.then(check)
		.then(([user, username]) => User.findOneAndReplaceUsername(user, username))
		.then(respond)
		.catch(onError);
});

export default connectDB(api);
