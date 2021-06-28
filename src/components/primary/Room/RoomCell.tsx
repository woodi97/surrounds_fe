import React from "react";
// import { useRouter } from "next/router";
import classNames from "classnames";
import styles from "./RoomCell.module.scss";

import { RoomInfo } from "@src/core/interface";
// import { checkChatroom } from "@src/core/api/chatroom";

interface RoomCellProps {
	className: string;
	chatroom: RoomInfo;
}

export default function RoomCell(props: RoomCellProps): JSX.Element {
	const { className, chatroom } = props;
	// const router = useRouter();

	const onImageError = (e) => {
		e.target.src = "/default_user.png";
	};

	// const onChatroomClick = async () => {
	// 	try {
	// 		await checkChatroom(chatroom.generator.email);
	// 		router.push("/", `/chatroom/${chatroom.id}`);
	// 	} catch {
	// 		alert("이미 폭파된 방입니다🥲 페이지를 다시 로딩합니다.");
	// 		router.reload();
	// 	}
	// };
	return (
		<div className={classNames(className)}>
			<div className={styles.cell}>
				<div className={styles.image}>
					<img
						src={chatroom.generator.profileImage}
						onError={onImageError}
						alt=""
					/>
				</div>
				<div className={styles.infos}>
					<div className={styles.info_title}>{chatroom.title}</div>
				</div>
				<div className={styles.location}> &gt;</div>
			</div>
			<hr className={styles.divline}></hr>
		</div>
	);
}
