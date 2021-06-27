import React, { useEffect, useState } from "react";

import { RoomInfo } from "@src/core/interface";

import RoomCell from "./RoomCell";
import classNames from "classnames";
import styles from "./RoomContainer.module.scss";

interface RoomProps {
	className: string;
	chatrooms?: RoomInfo[];
}

export default function RoomContainer(props: RoomProps): JSX.Element {
	const { className, chatrooms } = props;
	return (
		<div className={classNames(className, styles.bar)}>
			{chatrooms?.map((chatroom) => (
				<RoomCell
					className={styles.cell}
					chatroom={chatroom}
					key={chatroom.id}
				/>
			))}
		</div>
	);
}
