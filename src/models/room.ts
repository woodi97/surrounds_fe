import { Schema, model, models } from "mongoose";
import { IRoom, IRoomModel } from "@src/core/interface/room";
import crypto from "crypto";
import config from "@src/core/config";

//made Room
const RoomSchema = new Schema<IRoom>({
	id: { type: String, unique: true },
	title: { type: String, required: true },
	location: {
		type: { type: String },
		coordinates: [],
	},
	generator: { type: Schema.Types.ObjectId, ref: "User", unique: true },
});

RoomSchema.index({ location: "2dsphere" });

//create new user
RoomSchema.statics.create = function (title, latitude, longitude, generator) {
	//room id will encrypted by user.email
	const encrypted = encodeURIComponent(
		crypto
			.createHmac("sha1", config.apiConfig.SECRET_KEY)
			.update(generator.email)
			.digest("base64"),
	);
	const room = new this({
		id: encrypted,
		title: title,
		location: {
			type: "Point",
			coordinates: [parseFloat(longitude), parseFloat(latitude)],
		},
		generator: generator,
	});
	room.save();
	return room
		.populate("generator", "email username profileImage")
		.execPopulate();
};

RoomSchema.statics.searching = function (latitude, longitude) {
	const coordinates = [longitude, latitude];
	return this.find(
		{
			location: {
				$near: {
					//1km : 1000
					$maxDistance: 1000,
					$geometry: {
						type: "Point",
						coordinates: coordinates,
					},
				},
			},
		},
		{ _id: false },
	).populate("generator", "email username profileImage", { _id: false });
};

//find one by username or email
RoomSchema.statics.findOneByEmail = function (email) {
	const encrypted = encodeURIComponent(
		crypto
			.createHmac("sha1", config.apiConfig.SECRET_KEY)
			.update(email)
			.digest("base64"),
	);
	return this.findOne({ id: encrypted }).exec();
};

RoomSchema.statics.delete = function (room) {
	return this.deleteOne({ id: room.id }).exec();
};

// Add this line for checking duplication(for serverless)
delete models.Room;
export default model<IRoom, IRoomModel>("Room", RoomSchema);
