import classNames from 'classnames'
import { motion } from 'framer-motion'
import React, { FC, FocusEventHandler, useCallback, useEffect, useRef } from 'react'
import styles from './PopupLayout.module.scss'

interface PopupLayoutProps {
  className: string
  isOpen: boolean
  onToggle: () => void
}

const PopupLayout: FC<PopupLayoutProps> = ({ children, className, isOpen, onToggle }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    containerRef?.current?.focus()
  }, [])

  const handleBlur: FocusEventHandler = useCallback(
    (e) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        onToggle()
      }
    },
    [onToggle]
  )

  return (
    <motion.div
      ref={containerRef}
      className={classNames(className, styles.cnt, { [styles.active]: isOpen })}
      onBlur={handleBlur}
    >
      <div className={styles.con}>{children}</div>
    </motion.div>
  )
}

export default PopupLayout
