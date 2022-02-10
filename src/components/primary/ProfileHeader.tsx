import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { UserInfo } from '@src/core/interface'
import styles from './ProfileHeader.module.scss'

interface Props {
  className?: string
  user?: UserInfo
  onClick(emailId: string, e: any): void
}

export default function ProfileHeader(props: Props): JSX.Element {
  const { className, user, onClick } = props

  return (
    <div className={classNames(className, styles.profile)}>
      <div className={styles.image}>
        <img src="/profiles/default.png" alt="" onClick={(e) => onClick(user.email, e)} />
      </div>
      <div className={styles.infos}>
        <div className={styles.info_name}>{user?.username}</div>
        <div className={styles.info_email}>{user?.email}</div>
      </div>
      <div className={styles.buttons}>
        <Link href="/" as={{ pathname: `/chatroom` }}>
          <div className={styles.buttons_createroom}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18.474"
              height="18.474"
              viewBox="0 0 18.474 18.474"
            >
              <line
                id="선_4"
                data-name="선 4"
                x2="15.474"
                transform="translate(1.5 9.237)"
                fill="none"
                stroke="#707070"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <line
                id="선_5"
                data-name="선 5"
                x2="15.474"
                transform="translate(9.237 1.5) rotate(90)"
                fill="none"
                stroke="#707070"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  )
}
