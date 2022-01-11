import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { Room } from "@src/models";
import connectDB from "@src/utils/mongodb";
import authMiddleware from "@src/utils/auth";

interface Request extends NextApiRequest {
	params: any;
	decoded: any;
}

const api = nextConnect<Request, NextApiResponse>();

api.use(authMiddleware);

api.get(async (req, res) => {
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
	const onError = (error) => {
		res.status(403).json({
			message: error.message,
		});
	};

	Room.findOneByEmail(email).then(check).then(respond).catch(onError);
});

export default connectDB(api);
