import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import { SignIn } from "@src/core/api/user";
import styles from "./SignIn.module.scss";
import Button from "@src/components/common/Button/Button";

interface IProps {
	className?: string;
}

interface IInputs {
	email: string;
	password: string;
}

export default function SignInModal(props: IProps): JSX.Element {
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
		if (!isBtnActivate) return;
		try {
			await SignIn(email, password);
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
					<Button fullWidth btnSize="large" onClick={onSignIn}>
						Log In
					</Button>
					<Link href="/signup">Sign Up</Link>
				</form>
			</div>
		</div>
	);
}
