import { createChatroom } from '@src/core/api/chatroom'
import React, { FC, useState } from 'react'
import { isValidRoomName } from '@src/utils/check'
import { ToastError, ToastSuccess } from '@src/utils/toast'
import { Button, InputBox } from '../common'
import { useCloseModal } from '@src/context/ModalContext'
import { useUpdateChatrooms, useUserLocation } from '@src/context/ChatroomContext'

const CreateRoomModal: FC = () => {
  const [title, setTitle] = useState('')
  const closeModal = useCloseModal()
  const location = useUserLocation()
  const updateChatrooms = useUpdateChatrooms()

  const tryCreateRoom = async () => {
    if (!isValidRoomName(title)) {
      ToastError("채팅방 이름은 '영문자', '숫자', '_', '-'만 가능합니다.")
    }
    try {
      await Promise.all([createChatroom(title, location), updateChatrooms()])
      ToastSuccess('채팅방이 생성되었습니다.')
      closeModal()
    } catch (err) {
      ToastError('채팅방 생성에 실패했습니다.')
    }
  }

  const handleOnChange = (e) => {
    setTitle(e.target.value)
  }

  return (
    <div className="flex flex-col">
      <InputBox
        type="id"
        name={'title'}
        value={title}
        label="채팅방 생성"
        onChange={handleOnChange}
      />
      <Button fullWidth onClick={tryCreateRoom}>
        생성
      </Button>
    </div>
  )
}

export default CreateRoomModal
