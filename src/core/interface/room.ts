import { Document } from "mongoose";

export default interface IRoom extends Document {
	id: string;
	title: string;
	location: any;
	generator: any;
}
