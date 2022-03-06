import React from 'react'
import { Icon, Image } from '@components/common'
import { motion } from 'framer-motion'
import { useRoomCreateModal } from '@src/context/ModalContext'

const Header = () => {
  const openRoomCreateModal = useRoomCreateModal()

  return (
    <motion.div className="md:hidden w-[95vw] left-1/2 translate-x-[-50%] z-10 absolute border-solid border-2 border-[rgba(0,0,0,0.6)] rounded-2xl h-14 top-2 bg-gray-200 ">
      <div className="flex h-full px-3 py-1 items-center justify-between">
        <Image
          className="rounded-3xl"
          src="/profiles/default.png"
          width={40}
          height={40}
          alt="profile"
        />
        <Icon name="plus" onClick={() => openRoomCreateModal()} />
      </div>
    </motion.div>
  )
}

export default Header
