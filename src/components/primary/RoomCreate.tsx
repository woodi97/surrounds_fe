import React, { useState } from "react";
import router from "next/router";
import classNames from "classnames";

import { Location } from "@src/core/interface";
import { createChatroom } from "@src/core/api/chatroom";
import styles from "./RoomCreate.module.scss";

interface Props {
	className?: string;
	location?: Location;
	getChatRooms(location: Location): void;
}

export default function RoomCreatePage(props: Props): JSX.Element {
	const { className, location, getChatRooms } = props;
	const [title, setTitle] = useState("");
	const [isBtnActivate, setBtnActivate] = useState<boolean>(false);

	const onChange = (e) => {
		const { value } = e.target;
		setTitle(value);
	};

	const tryCreateRoom = async (e) => {
		e.preventDefault();
		if (!isBtnActivate) return;
		else {
			setBtnActivate(false);
		}
		try {
			await createChatroom(title, location);
			getChatRooms(location);
			alert("successfully created");
			router.push("/", undefined, { shallow: true });
		} catch (err) {
			alert("error occured back to main page");
			router.push("/", undefined, { shallow: true });
		}
	};

	// 입력 제한 코드
	const btnChangeColor = () => {
		title.length >= 4 ? setBtnActivate(true) : setBtnActivate(false);
	};

	return (
		<div className={styles.blur}>
			<div className={classNames(className, styles.login_box)}>
				<h1>방 생성하기</h1>
				<form>
					<label htmlFor="email">Room Title</label>
					<input
						type="id"
						name="title"
						placeholder="채팅방이름"
						onChange={onChange}
						onKeyUp={btnChangeColor}
						value={title}
					/>
					<input
						className={classNames(
							`${styles.login_btn} ${
								isBtnActivate ? styles.onLoginBtn : styles.offLoginBtn
							}`,
						)}
						type="submit"
						value="Create"
						onClick={tryCreateRoom}
					/>
				</form>
			</div>
		</div>
	);
}
