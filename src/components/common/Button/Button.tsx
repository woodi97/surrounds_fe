import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface Props {
	primary?: boolean;
	backgroundColor?: string;
	size?: "small" | "medium" | "large";
	children?: string;
	onClick?: () => void;
}

export default function Button({
	primary = false,
	backgroundColor,
	size = "medium",
	children,
	onClick,
	...props
}: Props): JSX.Element {
	const mode = primary ? styles.btn_primary : styles.btn_secondary;
	const btn_size =
		size === "medium"
			? styles.btn_medium
			: size === "small"
			? styles.btn_small
			: styles.btn_large;
	return (
		<>
			<button
				type="button"
				className={classNames(styles.btn, mode, btn_size)}
				style={{ backgroundColor }}
				onClick={onClick}
				{...props}
			>
				{children}
			</button>
		</>
	);
}
