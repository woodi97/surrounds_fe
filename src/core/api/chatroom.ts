import { Location } from "@src/core/interface";
import axios from "axios";

export const getNearChatrooms = async (location: Location) => {
	try {
		const { data } = await axios.get("/api/chatroom", {
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
	try {
		const { data } = await axios.get("/api/chatroom/check", {
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
	try {
		const { data } = await axios.post("/api/chatroom", {
			title: title,
			longitude: location.longitude,
			latitude: location.latitude,
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const deleteChatroom = async (email: string) => {
	try {
		const { data } = await axios.delete("/api/chatroom", {
			params: {
				email: email,
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};
