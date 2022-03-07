import React from 'react'
import { Icon, Image } from '@components/common'
import { motion } from 'framer-motion'
import { useRoomCreateModal } from '@src/context/ModalContext'

const Header = () => {
  const openRoomCreateModal = useRoomCreateModal()

  return (
    <motion.div className="fixed md:hidden w-screen z-40 border-2 border-[rgba(0,0,0,0.2)] rounded-b-md h-14 top-0 bg-gray-200 ">
      <div className="flex h-full px-3 py-1 items-center justify-between">
        <Image
          className="rounded-3xl"
          src="/profiles/default.png"
          width={40}
          height={40}
          alt="profile"
        />
        <div className="flex items-center space-x-2">
          <Icon name="settings" />
          <Icon name="plus" onClick={() => openRoomCreateModal()} />
        </div>
      </div>
    </motion.div>
  )
}

export default Header
