import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import User from "@src/models/user";
import connectDB from "@src/utils/mongodb";
import jwt from "jsonwebtoken";

interface Request extends NextApiRequest {
	app: any;
}

const api = nextConnect<Request, NextApiResponse>();

api.post(async (req, res) => {
	const { email, password } = req.body;
	const secret = req.app.get("jwt-secret");
	const options = {
		expiresIn: "2d",
		issuer: "surrounds.com",
		subject: "userInfo",
	};

	//check the user info & generate the jwt
	const check = (user) => {
		if (!user) {
			//user does not exist
			throw new Error("login failed");
		} else {
			if (user.verify(password)) {
				const p = new Promise((resolve, reject) => {
					jwt.sign(
						{
							_id: user._id,
							email: user.email,
						},
						secret,
						options,
						(err, token) => {
							if (err) reject(err);
							resolve([token, user]);
						},
					);
				});
				return p;
			} else {
				throw new Error("login failed");
			}
		}
	};

	const respond = (token, user) => {
		res.json({
			header: {
				message: "success",
			},
			body: {
				email: email,
				username: user.username,
				profileImage: process.env.IMAGE_URL + user.profileImage,
			},
			token: token,
		});
	};

	//error occured
	const onError = (error) => {
		res.status(403).json({
			message: error.message,
		});
	};

	//find the user
	User.findOneByEmail(email)
		.then(check)
		.then(([token, user]) => respond(token, user))
		.catch(onError);
});

export default connectDB(api);
