import React, { useState } from 'react'
import styles from './Header.module.scss'

import { editUserName, editProfileImage } from '@src/core/api/user'
import { UserInfo } from '@src/core/interface'

interface Props {
  userInfo: UserInfo
  onProfileUpdate(): void
}

export default function ProfileHeader(props: Props): JSX.Element {
  const {
    userInfo: { email, username, profileImage },
    onProfileUpdate,
  } = props
  const [inputs, setInputs] = useState({
    username: username,
  })

  const onChange = (e) => {
    const { value, name } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
    if (name === 'profileImage') {
      const onProfileImageChanged = async () => {
        try {
          await editProfileImage(e.target.files[0])
          onProfileUpdate()
        } catch (error) {
          console.log(error)
        }
      }
      onProfileImageChanged()
    }
  }

  const [isEdit, setEdit] = useState<boolean>(false)
  const onEditButtonClick = async () => {
    if (isEdit) {
      try {
        await editUserName(inputs.username)
        onProfileUpdate
      } catch (error) {
        console.log(error)
      }
    }
    setEdit(!isEdit)
  }

  return (
    <header>
      <div className={styles.container}>
        {/* <button>X</button> */}
        <div className={styles.profile}>
          <div className={styles.profile_image}>
            {profileImage === `${process.env.NEXT_PUBLIC_IMAGE_URL}NULL` ? (
              <img src="/profiles/default.png" alt="" />
            ) : (
              <img src={profileImage} alt="" />
            )}
            {isEdit === true && (
              <>
                <label
                  htmlFor={styles.profile_image_edit_btn}
                  className={styles.profile_image_edit_btn_label}
                >
                  <img src="/images/icon_edit_image.svg" alt="" />
                </label>
                <input
                  id={styles.profile_image_edit_btn}
                  type="file"
                  accept=".jpg,.png"
                  name="profileImage"
                  onChange={onChange}
                />
              </>
            )}
          </div>

          <div className={styles.profile_user_settings}>
            {isEdit === true && (
              <>
                <input
                  className={styles.profile_user_name_edit}
                  type="text"
                  name="username"
                  value={inputs.username}
                  onChange={onChange}
                />
                <button
                  className={`${styles.btn} ${styles.profile_edit_btn}`}
                  onClick={onEditButtonClick}
                >
                  Submit
                </button>
              </>
            )}
            {isEdit === false && (
              <>
                <h1 className={styles.profile_user_name}>{username}</h1>
                <button
                  className={`${styles.btn} ${styles.profile_edit_btn}`}
                  onClick={onEditButtonClick}
                >
                  Edit Profile
                </button>
              </>
            )}

            <button
              className={`${styles.btn} ${styles.profile_settings_btn}`}
              aria-label="profile settings"
            >
              <i className="fas fa-cog" aria-hidden="true"></i>
            </button>
          </div>

          <div className={styles.profile_stats}>
            <ul>
              <li>
                <span className={styles.profile_stat_count}>흑석동</span> usually
              </li>
              <li>
                <span className={styles.profile_stat_count}>188</span> friends
              </li>
              <li>
                <span className={styles.profile_stat_count}>206</span> following
              </li>
            </ul>
          </div>

          <div className={styles.profile_bio}>
            <p>
              <span className={styles.profile_real_name}>intro</span> {email}
            </p>
          </div>
        </div>
        {/* <!-- End of profile section --> */}
      </div>
      {/* <!-- End of container --> */}
    </header>
  )
}
