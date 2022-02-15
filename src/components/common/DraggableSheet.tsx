import React, { FC } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { SVGPath } from '.'

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
      onDragEnd={onDragEnd}
      initial="hidden"
      animate={controls}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 300,
      }}
      variants={{
        visible: { y: '30vh' },
        hidden: { y: '92vh' },
      }}
      dragConstraints={{ top: 0 }}
      dragElastic={0.2}
      className={`z-10 fixed bottom-0 w-screen h-screen rounded-t-lg bg-white ${className}`}
    >
      <div className="flex justify-center h-[3vh] bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-full"
        >
          <SVGPath d="M 2 2.5 L 20 2.5" strokeWidth={2} />
          <SVGPath d="M 2 9.423 L 20 9.423" strokeWidth={2} />
          <SVGPath d="M 2 16.346 L 20 16.346" strokeWidth={2} />
        </svg>
      </div>
      <div className="children:p-3">{children}</div>
    </motion.div>
  )
}

export default DraggableSheet
