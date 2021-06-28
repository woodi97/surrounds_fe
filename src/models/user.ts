import mongoose, { Schema } from "mongoose";
import IUser from "@src/core/interface/user";
import crypto from "crypto";
import config from "@src/core/config";

//made new user
const UserSchema = new Schema<IUser>({
	username: { type: String, unique: true },
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true },
	profileImage: String,
});

//create new user
UserSchema.statics.create = async function (
	username,
	email,
	password,
	profileImage,
) {
	const encrypted = crypto
		.createHmac("sha1", config.apiConfig.SECRET_KEY)
		.update(password)
		.digest("base64");
	const user = new this({
		username,
		email,
		password: encrypted,
		profileImage,
	});
	return user.save();
};

UserSchema.methods.verify = async function (password) {
	const encrypted = crypto
		.createHmac("sha1", config.apiConfig.SECRET_KEY)
		.update(password)
		.digest("base64");
	return this.password === encrypted;
};
//find one by username or email
UserSchema.statics.findOneByUsernameEmail = async function (username, email) {
	return this.findOne({
		$or: [{ username: username }, { email: email }],
	}).exec();
};

//find one by username or email
UserSchema.statics.findOneByEmail = async function (email) {
	return this.findOne({
		email,
	}).exec();
};

//find one by username or email
UserSchema.statics.findOneByUsername = async function (username) {
	return this.findOne({
		username,
	}).exec();
};

UserSchema.statics.findOneAndReplaceImage = async function (
	user,
	profileImage,
) {
	this.findOneAndUpdate(
		{ email: user.email },
		{ $set: { profileImage: profileImage } },
		{ new: true },
	).exec();
	user.profileImage = profileImage;
	return user;
};

UserSchema.statics.findOneAndReplaceUsername = async function (user, username) {
	this.findOneAndUpdate(
		{ email: user.email },
		{ $set: { username: username } },
		{ new: true },
	).exec();
	user.username = username;
	return user;
};

// Add this line for checking duplication(for serverless)
module.exports =
	mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
