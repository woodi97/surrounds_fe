import React from 'react'
import router from 'next/router'
// import module
import classNames from 'classnames'
// import interface
import { RoomInfo } from '@src/core/interface'
// import API
import { checkChatroom } from '@src/core/api/chatroom'
// import styles
import styles from './RoomListCell.module.scss'

interface RoomListCellProps {
  className: string
  chatroom: RoomInfo
  onClick(room: RoomInfo, e: any): void
}

export default function RoomListCell(props: RoomListCellProps): JSX.Element {
  const { className, chatroom, onClick } = props

  const onImageError = (e) => {
    e.target.src = '/profiles/default.png'
  }

  const onChatroomClick = async () => {
    try {
      await checkChatroom(chatroom.generator.email)
      router.push('/', `/chatroom/${chatroom.id}`)
    } catch {
      alert('이미 폭파된 방입니다🥲 페이지를 다시 로딩합니다.')
      router.reload()
    }
  }

  return (
    <div
      className={classNames(className)}
      onClick={(e) => {
        onClick(chatroom, e)
        onChatroomClick()
      }}
    >
      <div className={styles.cell}>
        <div className={styles.image}>
          <img src={chatroom.generator.profileImage} onError={onImageError} alt="" />
        </div>
        <div className={styles.infos}>
          <div className={styles.info_title}>{chatroom.title}</div>
        </div>
        <div className={styles.location}> &gt;</div>
      </div>
      <hr className={styles.divline}></hr>
    </div>
  )
}
