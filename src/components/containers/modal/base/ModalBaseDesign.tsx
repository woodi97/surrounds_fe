import { modalVariants } from '@src/animations/modal'
import { motion } from 'framer-motion'
import React, { FC } from 'react'

const ModalBaseDesign: FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <motion.div
      className="relative w-full max-w-[500px] bg-primary-bg rounded-xl"
      variants={modalVariants}
    >
      <div className="w-full h-full z-50 p-10">{children}</div>
    </motion.div>
  )
}

export default ModalBaseDesign
