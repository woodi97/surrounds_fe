import ModalBaseDesign from '@src/components/containers/Modal/Base/ModalBaseDesign'
import ModalBaseLayout from '@src/components/containers/Modal/Base/ModalBaseLayout'
import ModalBaseOverLay from '@src/components/containers/Modal/Base/ModalBaseOverLay'
import React, { FC, ReactNode } from 'react'

export type ModalBaseShape = {
  children?: ReactNode
  onClose: () => void
}

const ModalBase: FC<ModalBaseShape> = ({ children, onClose }) => {
  return (
    <ModalBaseLayout>
      <ModalBaseOverLay onClick={onClose} />
      <ModalBaseDesign>{children}</ModalBaseDesign>
    </ModalBaseLayout>
  )
}

export default ModalBase
