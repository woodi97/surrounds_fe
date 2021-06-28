import React from "react";
import classNames from "classnames";

import { RoomInfo } from "@src/core/interface";

import RoomListCell from "./RoomListCell";
import styles from "./RoomList.module.scss";

interface RoomListProps {
	className: string;
	chatrooms?: RoomInfo[];
}

export default function RoomListContainer(props: RoomListProps): JSX.Element {
	const { className, chatrooms } = props;
	return (
		<div className={classNames(className, styles.bar)}>
			{chatrooms?.map((chatroom) => (
				<RoomListCell
					className={styles.cell}
					chatroom={chatroom}
					key={chatroom.id}
				/>
			))}
		</div>
	);
}
