import { UserInfo } from "@src/core/interface";
import axios from "axios";

export const signin = async (email: string, password: string) => {
	let data;
	try {
		data = await axios.post("/api/user/signin", {
			data: {
				email: email,
				password: password,
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const signup = async (
	username: string,
	email: string,
	password: string,
) => {
	let data;
	try {
		data = await axios.post("/api/user/signup", {
			data: {
				username: username,
				email: email,
				password: password,
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const viewMyProfile = async (cookie?: string) => {
	let data;
	try {
		data = await axios.get("/api/user", {
			headers: {
				cookie: cookie,
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const viewProfile = async (email: string) => {
	let data;
	try {
		data = await axios.get(`/api/user/${email}`);
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const editNickname = async (nickname: string) => {
	let data;
	try {
		data = await axios.put("/api/user", {
			data: {
				nickname: nickname,
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const editProfileImage = async (image) => {
	let data;
	try {
		const formData = new FormData();
		formData.append("file", image);
		data = await axios.put("/api/profile", {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};
