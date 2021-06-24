import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import connectDB from "@src/util/mongodb";

const api = nextConnect<NextApiRequest, NextApiResponse>();

api.post(async (req, res) => {
	res.json("success");
});

export default connectDB(api);
