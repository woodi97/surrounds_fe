import React, { FC } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { SVGPath } from '..'
import BottomSheetHeader from './BottomSheetHeader'

interface DraggableSheetProps {
  className?: string
  onOpen: () => void
  onClose: () => void
}

const DraggableSheet: FC<DraggableSheetProps> = ({ className, children, onOpen, onClose }) => {
  const controls = useAnimation()

  function onDragEnd(event, info) {
    const shouldClose = info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45)
    if (shouldClose) {
      controls.start('hidden')
      onClose()
    } else {
      controls.start('visible')
      onOpen()
    }
  }

  return (
    <motion.div
      drag="y"
      initial="hidden"
      onDragEnd={onDragEnd}
      animate={controls}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 300,
      }}
      variants={{
        visible: { y: '30vh' },
        hidden: { y: '95vh' },
      }}
      draggable
      dragConstraints={{ top: 0 }}
      dragElastic={0.5}
      className={`z-10 fixed bottom-0 w-screen h-screen rounded-t-lg bg-white ${className}`}
    >
      <BottomSheetHeader />
      <div className="children:p-3">{children}</div>
    </motion.div>
  )
}

export default DraggableSheet
