import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const ModalPortal: FC = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted ? createPortal(children, document.getElementById('modal')) : null
}

export default ModalPortal
