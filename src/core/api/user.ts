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
	try {
		const { data } = await axios.put("/api/user", {
			username: username,
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};

export const editProfileImage = async (image) => {
	try {
		const formData = new FormData();
		formData.append("image", image);
		const { data } = await axios.put("/api/profile", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return data.body;
	} catch (error) {
		throw error;
	}
};
