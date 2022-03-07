import React, { FC, useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import BottomSheetHeader from './BottomSheetHeader'

interface DraggableSheetProps {
  className?: string
}

const DraggableSheet: FC<DraggableSheetProps> = ({ className, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  function onDragEnd(event, info) {
    const shouldClose = info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45)
    if (shouldClose) {
      controls.start('hidden')
      setIsOpen(false)
    } else {
      controls.start('visible')
      setIsOpen(true)
    }
  }

  useEffect(() => {
    controls.start('hidden')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      ref={sheetRef}
      initial={{
        y: '120vh',
      }}
      variants={{
        hidden: { y: '80vh' },
        visible: {
          y: '20vh',
          transition: {
            type: 'spring',
            damping: 40,
            stiffness: 200,
          },
        },
      }}
      animate={controls}
      onDragEnd={onDragEnd}
      drag="y"
      draggable
      dragConstraints={{ top: 0 }}
      dragElastic={isOpen ? 0 : 0.2}
      className={`z-10 fixed bottom-0  w-screen h-screen rounded-t-lg bg-white ${className}`}
    >
      <BottomSheetHeader />
      <div className="children:p-3">{children}</div>
    </motion.div>
  )
}

export default DraggableSheet
