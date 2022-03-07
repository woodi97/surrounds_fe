import React, { FC } from 'react'
import { motion } from 'framer-motion'

const Svg: FC = ({ children }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 18.474 18.474"
    >
      {children}
    </motion.svg>
  )
}

export default Svg
