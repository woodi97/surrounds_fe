import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

import Header from "./Header";
import Main from "./Main";
import { Error } from "@src/components/common";

import { getProfile } from "@src/core/api/user";

interface IProfilePageProps {
	className?: string;
	emailId?: string;
	onProfileUpdate(): void;
	onClick(emailId: string, e: any): void;
}

export default function ProfilePage(props: IProfilePageProps): JSX.Element {
	const { className, emailId, onClick, onProfileUpdate } = props;
	const [profileInfo, setProfileInfo] = useState({
		email: "",
		username: "",
		profileImage: "",
	});
	const [isUserExist, setUserExist] = useState<boolean>(undefined);

	const getProfileData = useCallback(async (emailId) => {
		try {
			const { email, username, profileImage } = await getProfile(emailId);
			setProfileInfo({
				email: email,
				username: username,
				profileImage: profileImage,
			});
			setUserExist(true);
		} catch (e) {
			setUserExist(false);
			return;
		}
	}, []);

	useEffect(() => {
		getProfileData(emailId);
	}, []);

	return (
		<div className={styles.blur}>
			<div className={classNames(className, styles.ProfilePage)}>
				<div className={styles.titlebar}>
					<div className={styles.buttons}>
						<div
							className={styles.close}
							onClick={(e) => {
								onClick(emailId, e);
							}}
						>
							<button className={styles.closebutton}>
								<span className={styles.header_span}>
									<strong>x</strong>
								</span>
							</button>
						</div>
						{/* <div className={styles.minimize}>
							<a className={styles.minimizebutton} href="#">
								<span>
									<strong>&ndash;</strong>
								</span>
							</a>
						</div>
						<div className={styles.zoom}>
							<a className={styles.zoombutton} href="#">
								<span>
									<strong>+</strong>
								</span>
							</a>
						</div> */}
					</div>
					{profileInfo.username + "'s profile"}
				</div>
				{isUserExist === undefined && <></>}
				{isUserExist === true && (
					<>
						<Header userInfo={profileInfo} onProfileUpdate={onProfileUpdate} />
						<Main />
					</>
				)}
				{isUserExist === false && (
					<>
						<Error />
					</>
				)}
			</div>
		</div>
	);
}
