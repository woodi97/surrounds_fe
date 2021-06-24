import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import User from "@src/models/user";
import connectDB from "@src/util/mongodb";

const api = nextConnect<NextApiRequest, NextApiResponse>();

api.post(async (req, res) => {
	res.json("Succcess");
});

export default connectDB(api);
