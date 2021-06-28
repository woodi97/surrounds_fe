import { UserInfo } from "@src/core/interface";
import { rejects } from "assert";
import axios from "axios";

export async function SignIn(email: string, password: string) {
	try {
		const { data } = await axios.post("/api/user/signin", {
			email: email,
			password: password,
		});
		axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
		return data.body;
	} catch (err) {
		throw err;
	}
}

export async function SignUp(
	username: string,
	email: string,
	password: string,
) {
	try {
		const { data } = await axios.post("/api/user/signup", {
			username: username,
			email: email,
			password: password,
		});
		return data.body;
	} catch (err) {
		throw err;
	}
}

export async function getMyProfile() {
	try {
		const { data } = await axios.get("/api/user");
		return data.body;
	} catch (err) {
		throw err;
	}
}

export const getProfile = async (email: string) => {
	try {
		const { data } = await axios.get(`/api/user/${email}`);
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const editUserName = async (username: string) => {
	let data;
	try {
		data = await axios.put("/api/user", {
			username: username,
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