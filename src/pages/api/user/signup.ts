import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import User from "@src/models/user";
import connectDB from "@src/util/mongodb";

const api = nextConnect<NextApiRequest, NextApiResponse>();

api.post(async (req, res) => {
	const { username, email, password } = req.body;

	// create user when user not exist
	const create = async (user) => {
		if (user) {
			if (user.username == username) throw new Error("username exists");
			else if (user.email == email) throw new Error("email exists");
		} else {
			console.log("user creating...");
			return User.create(username, email, password, "NULL");
		}
	};

	const respond = () => {
		res.json({
			header: {
				message: "success",
			},
			body: {
				email: email,
				username: username,
				profileImage: "NULL",
			},
		});
	};

	const onError = (error) => {
		res.status(409).json({
			message: error.message,
		});
	};

	// check nickname duplication
	User.findOneByUsernameEmail(username, email)
		.then(create)
		.then(respond)
		.catch(onError);
});

export default connectDB(api);
