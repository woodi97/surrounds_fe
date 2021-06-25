export interface Location {
	latitude: number;
	longitude: number;
}

export interface UserInfo {
	email: string;
	username: string;
	profileImage: string;
}

export interface RoomInfo {
	id: string;
	title: string;
	location: Location;
	generator: UserInfo;
}
