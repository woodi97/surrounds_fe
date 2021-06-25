import { UserInfo, Location } from "@src/core/interface";
import axios from "axios";

export const getNearbyChatrooms = async (location: Location) => {
	let data;
	try {
		data = await axios.get("/api/chatroom", {
			params: {
				longitude: location.longitude,
				latitude: location.latitude,
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const checkChatroom = async (email: string) => {
	let data;
	try {
		data = await axios.get("/api/chatroom/check", {
			params: {
				email: email,
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const createChatroom = async (title: string, location: Location) => {
	let data;
	try {
		data = await axios.post("/api/chatroom", {
			data: {
				title: title,
				longitude: location.longitude,
				latitude: location.latitude,
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const deleteChatroom = async (email: string) => {
	let data;
	try {
		data = await axios.delete("/api/chatroom", {
			params: {
				email: email,
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};
