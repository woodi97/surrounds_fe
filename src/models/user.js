/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const config = require("@src/core/config");

//made new user
const User = new Schema({
	username: { type: String, unique: true },
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true },
	profileImage: String,
});

//create new user
User.statics.create = async function (username, email, password, profileImage) {
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

User.methods.verify = async function (password) {
	const encrypted = crypto
		.createHmac("sha1", config.apiConfig.SECRET_KEY)
		.update(password)
		.digest("base64");
	return this.password === encrypted;
};
//find one by username or email
User.statics.findOneByUsernameEmail = async function (username, email) {
	return this.findOne({
		$or: [{ username: username }, { email: email }],
	}).exec();
};

//find one by username or email
User.statics.findOneByEmail = async function (email) {
	return this.findOne({
		email,
	}).exec();
};

//find one by username or email
User.statics.findOneByUsername = async function (username) {
	return this.findOne({
		username,
	}).exec();
};

User.statics.findOneAndReplaceImage = async function (user, profileImage) {
	this.findOneAndUpdate(
		{ email: user.email },
		{ $set: { profileImage: profileImage } },
		{ returnNewDocument: true },
	).exec();
	user.profileImage = profileImage;
	return user;
};

User.statics.findOneAndReplaceUsername = async function (user, username) {
	this.findOneAndUpdate(
		{ email: user.email },
		{ $set: { username: username } },
		{ returnNewDocument: true },
	).exec();
	user.username = username;
	return user;
};

// Add this line for checking duplication(for serverless)
module.exports = mongoose.models.User || mongoose.model("User", User);
