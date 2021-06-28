import { Document, Model } from "mongoose";

export interface IUser {
	username: string;
	email: string;
	password: string;
	profileImage: string;
}

export interface IUserDocument extends IUser, Document {
	verify(password: string);
}

export interface IUserModel extends Model<IUserDocument> {
	findOneByUsernameEmail(username: string, email: string);
	findOneByEmail(email: string | string[]);
	findOneByUsername(username: string);
	findOneAndReplaceImage(user: any, profileImage: string);
	findOneAndReplaceUsername(user: any, username: string);
}
