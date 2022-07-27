import Portal from '@src/components/atom/Portal'
import SignInModal from '@src/components/containers/modal/content/SignInModal'
import SignUpModal from '@src/components/containers/modal/content/SignUpModal'
import { ModalType } from '@src/core/types/modal-type'
import { useRootDispatch, useRootState } from '@src/hooks/useRootState'
import { closeModal } from '@src/store/modules/modal'
import { AnimatePresence } from 'framer-motion'
import React, { FC } from 'react'

import ModalBase from './modal/ModalBase'

const _selectModal: { [key in ModalType]: FC } = {
  SIGNUP: SignUpModal,
  SIGNIN: SignInModal,
}

const ModalContainer: FC = () => {
  const modal = useRootState((state) => state.modal)
  const dispatch = useRootDispatch()

  const ModalComponent = modal.type ? _selectModal[modal.type] : null

  return (
    <Portal selectorId="modal">
      <AnimatePresence exitBeforeEnter>
        {modal.type && (
          <ModalBase
            onClose={() => {
              dispatch(closeModal())
            }}
          >
            {ModalComponent && <ModalComponent />}
          </ModalBase>
        )}
      </AnimatePresence>
    </Portal>
  )
}

export default ModalContainer
