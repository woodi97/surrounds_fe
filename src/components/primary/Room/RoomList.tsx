import React from 'react'
import classNames from 'classnames'

import { RoomInfo } from '@src/core/interface'

import RoomListCell from './RoomListCell'
import styles from './RoomList.module.scss'

interface RoomListProps {
  className: string
  chatrooms?: RoomInfo[]
  onClick(room: RoomInfo, e: any): void
}

export default function RoomListContainer(props: RoomListProps): JSX.Element {
  const { className, chatrooms, onClick } = props
  return (
    <div className={classNames(className, styles.bar)}>
      {chatrooms?.map((chatroom) => (
        <RoomListCell
          className={styles.cell}
          chatroom={chatroom}
          key={chatroom.id}
          onClick={onClick}
        />
      ))}
    </div>
  )
}
