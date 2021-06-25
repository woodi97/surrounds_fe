import React, { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { signup } from "@src/core/api/user";
import styles from "./index.module.scss";

interface IProps {
	className?: string;
}

interface IInputs {
	username: string;
	email: string;
	password: string;
}

export default function BDSignup(props: IProps) {
	const router = useRouter();
	const { className } = props;
	const [inputs, setInputs] = useState<IInputs>({
		username: "",
		email: "",
		password: "",
	});
	const [isBtnActivate, setBtnActivate] = useState<boolean>(false);

	const { username, email, password } = inputs;

	const onChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	async function trySignup(e) {
		e.preventDefault();
		if (!isBtnActivate) return;
		signup(username, email, password)
			.then((result) => {
				alert("successfully created");
				router.push("/signin");
			})
			.catch((error) => {
				alert(error);
			});
	}

	// 입력 제한 코드
	const btnChangeColor = () => {
		inputs.username.length >= 4 &&
		inputs.email.includes("@") &&
		inputs.password.length >= 4
			? setBtnActivate(true)
			: setBtnActivate(false);
	};

	return (
		<div className={styles.blur}>
			<div className={classNames(className, styles.signup_box)}>
				<img
					src="/images/favicon.ico"
					className={styles.logo_image}
					alt="Surrounds"
				></img>
				<h1>Surrounds</h1>
				<form>
					<label htmlFor="username">Username</label>
					<input
						type="id"
						name="username"
						placeholder="아이디"
						onChange={onChange}
						onKeyUp={btnChangeColor}
						value={username}
					/>
					<label htmlFor="email">Email</label>
					<input
						type="id"
						name="email"
						placeholder="이메일"
						onChange={onChange}
						onKeyUp={btnChangeColor}
						value={email}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						placeholder="패스워드"
						onChange={onChange}
						onKeyUp={btnChangeColor}
						value={password}
					/>

					<input
						className={classNames(
							`${styles.login_btn} ${
								isBtnActivate ? styles.onLoginBtn : styles.offLoginBtn
							}`,
						)}
						type="submit"
						value="Sign up"
						onClick={trySignup}
					/>
				</form>
			</div>
		</div>
	);
}
