import React from "react";
import Link from "next/link";
import styles from "./Error.module.scss";

export default function ErrorPage(): JSX.Element {
	return (
		<div>
			<h1 className={styles.user_sorry}>
				죄송합니다. 페이지를 사용할 수 없습니다
			</h1>
			<Link href="/">홈페이지로 돌아가기</Link>
		</div>
	);
}
