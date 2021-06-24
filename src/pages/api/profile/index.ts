import { connectToDatabase } from "@src/util/mongodb";

export default async (req, res) => {
	const { db } = await connectToDatabase();
	if (req.method === "GET") {
		res.status(200).json({ test: "GET" });
	} else if (req.method === "POST") {
		res.status(200).json({ test: "POST" });
	} else if (req.method === "PUT") {
		res.status(200).json({ test: "PUT" });
	} else if (req.method === "DELETE") {
		res.status(200).json({ test: "DELETE" });
	}
};
