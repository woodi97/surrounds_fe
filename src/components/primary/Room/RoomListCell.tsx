import React from "react";
import classNames from "classnames";
import styles from "./RoomListCell.module.scss";

import { RoomInfo } from "@src/core/interface";

interface RoomListCellProps {
	className: string;
	chatroom: RoomInfo;
}

export default function RoomListCell(props: RoomListCellProps): JSX.Element {
	const { className, chatroom } = props;

	const onImageError = (e) => {
		e.target.src = "/profiles/default.png";
	};
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
