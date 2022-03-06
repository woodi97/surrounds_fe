import React, { FC, useEffect, useState } from 'react'
import styles from './index.module.scss'

import Main from './Main'

import { getUserProfile } from '@src/core/api/user'

type Props = {
  // modalOption: {
  //   email: string
  // }
  modalOption: any
}

const ProfileModal: FC<Props> = ({ modalOption }) => {
  const { email } = modalOption
  const [profileInfo, setProfileInfo] = useState({
    email: '',
    username: '',
    profileImage: '',
  })

  const getProfileData = async (emailId: string) => {
    try {
      const { email, username, profileImage } = await getUserProfile(emailId)
      setProfileInfo({
        email: email,
        username: username,
        profileImage: profileImage,
      })
    } catch (e) {
      console.log('불러오는데 실패했습니다')
    }
  }

  useEffect(() => {
    getProfileData(email)
  }, [])

  return (
    <div className={styles.blur}>
      <div className={styles.ProfilePage}>
        <div className={styles.titlebar}>
          <div className={styles.buttons}>
            <div className={styles.close}>
              <button className={styles.closebutton}>
                <span className={styles.header_span}>
                  <strong>x</strong>
                </span>
              </button>
            </div>
            <div className={styles.minimize}>
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
            </div>
          </div>
          {profileInfo.username + "'s profile"}
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
