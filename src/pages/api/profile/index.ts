import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import connectDB from "@src/utils/mongodb";
import authMiddleware from "@src/utils/auth";
import multer from "multer";
import { User } from "@src/models";
import randomstring from "randomstring";
import fs from "fs";

// image uploader setting
const imageUpload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, `${__dirname}/../../../../public/profiles/`); // public 폴더를 지정합니다.
		},
		filename: (req, file, cb) => {
			const fileName = randomstring.generate(25); // 파일 이름입니다. 저는 랜덤 25자로 설정했습니다.
			let mimeType;
			switch (
				file.mimetype // 파일 타입을 거릅니다.
			) {
				case "image/jpeg":
					mimeType = "jpg";
					break;
				case "image/png":
					mimeType = "png";
					break;
				case "image/gif":
					mimeType = "gif";
					break;
				case "image/bmp":
					mimeType = "bmp";
					break;
				default:
					mimeType = "jpg";
					break;
			}
			cb(null, fileName + "." + mimeType); // 파일 이름 + 파일 타입 형태로 이름을 바꿉니다.
		},
	}),
	limits: {
		fileSize: 5 * 1024 * 1024, // 크기제한입니다. 기준은 byte 입니다.
	},
});

interface Request extends NextApiRequest {
	file: any;
	decoded: any;
}

const api = nextConnect<Request, NextApiResponse>();

api.use(authMiddleware);
api.use(imageUpload.single("image"));

api.put(async (req, res) => {
	const check = (user) => {
		return new Promise(function (resolve) {
			if (!req.file) {
				//user does not exist
				throw new Error("No file");
			}
			if (user.profileImage !== "NULL") {
				fs.unlink(
					__dirname + "/../../../../public/profiles/" + user.profileImage,
					(err) => {
						if (err) {
							console.log("no existing profile match with fs");
							//throw new Error('while deleting profiles error')
						}
					},
				);
			}
			resolve([user, req.file.filename]);
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
		.then(([user, profileImage]) =>
			User.findOneAndReplaceImage(user, profileImage),
		)
		.then(respond)
		.catch(onError);
});

export default connectDB(api);

export const config = {
	api: {
		bodyParser: false,
	},
};
