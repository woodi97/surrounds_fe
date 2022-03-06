import { createChatroom, getNearChatrooms } from '@src/core/api/chatroom'
import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { Location } from '@src/core/interface'

type Props = {
  location: Location
}

const CreateRoomModal: FC<Props> = ({ location }) => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const tryCreateRoom = async (e) => {
    if (!isBtnActivate) return
    else {
      setBtnActivate(false)
    }
    try {
      await createChatroom(title, location)
      await getNearChatrooms(location)
      alert('successfully created')
      router.push('/', undefined, { shallow: true })
    } catch (err) {
      alert('error occured back to main page')
      router.push('/', undefined, { shallow: true })
    }
  }

  return <motion.div>CreateRoom</motion.div>
}

export default CreateRoomModal
