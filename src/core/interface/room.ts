import { Document, Model } from "mongoose";

export interface IRoom extends Document {
	id: string;
	title: string;
	location: any;
	generator: any;
}

// export default interface IRoomDocument extends IRoom, Document {
// 	// define
// }

export interface IRoomModel extends Model<IRoom> {
	searching: (latitude: number, longitude: number) => Promise<any>;
	findOneByEmail: (email: string | string[]) => Promise<any>;
	delete: (room: any) => Promise<any>;
}
