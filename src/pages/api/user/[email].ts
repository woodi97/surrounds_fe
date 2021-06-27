import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import User from "@src/models/user";
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
	const {
		query: { email },
	} = req;
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
				profileImage: config.apiConfig.IMAGE_URL + user.profileImage,
			},
		});
	};

	const onError = (error) => {
		res.status(403).json({
			message: error.message,
		});
	};

	User.findOneByEmail(email).then(check).then(respond).catch(onError);
});

export default connectDB(api);
