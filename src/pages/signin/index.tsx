import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import { signin } from "@src/core/api/user";
import styles from "./index.module.scss";
import axios from "axios";

interface IProps {
	className?: string;
}

interface IInputs {
	email: string;
	password: string;
}

export default function SignInPage(props: IProps): JSX.Element {
	const router = useRouter();
	const { className } = props;
	const [isBtnActivate, setBtnActivate] = useState<boolean>(false);
	const [inputs, setInputs] = useState<IInputs>({
		email: "",
		password: "",
	});
	const { email, password } = inputs;

	// 입력시 입력값 업데이트
	const onChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	// SignIn 로직
	async function onSignIn(e) {
		e.preventDefault();
		if (!isBtnActivate) return;
		try {
			await signin(email, password);
			router.push("/", undefined, { shallow: true });
		} catch (error) {
			alert(error);
		}
	}

	// 입력 제한 코드
	const btnChangeColor = () => {
		inputs.email.length >= 4 && inputs.password.length >= 4
			? setBtnActivate(true)
			: setBtnActivate(false);
	};

	// JSX Code
	return (
		<div className={styles.blur}>
			<div className={classNames(className, styles.login_box)}>
				<img
					src="/images/favicon.ico"
					className={styles.logo_image}
					alt="Surrounds"
				></img>
				<h1>Surrounds</h1>
				<form>
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
						value="Log In"
						onClick={onSignIn}
					/>
					<Link href="/intro">Surrounds</Link>
					<br />
					<Link href="/signup">회원가입</Link>
				</form>
			</div>
		</div>
	);
}
