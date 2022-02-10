import { useCallback, useState } from 'react'
import constate from 'constate'
import { ModalShape } from '@src/core/interface/modal-type'

const useModal = () => {
  const [modal, setModal] = useState<ModalShape | null>(null)
  const [modalTitle, setModalTitle] = useState<string>(null)
  const [modalOption, setModalOption] = useState<any>(null)

  const closeModal = useCallback(() => {
    setModal(null)
    setModalTitle(null)
    setModalOption(null)
  }, [])

  const openModal = useCallback(
    (modal: ModalShape, modalTitle?: string, modalOption?: any) => {
      closeModal()
      setModal(modal)
      setModalTitle(modalTitle)
      setModalOption(modalOption)
    },
    [closeModal]
  )

  const openSignUpModal = useCallback(
    (modalTitle?: string) => {
      openModal('SIGNUP', modalTitle, {})
    },
    [openModal]
  )

  const openSignInModal = useCallback(
    (modalTitle?: string) => {
      openModal('SIGNIN', modalTitle, {})
    },
    [openModal]
  )
  return {
    modal,
    modalTitle,
    modalOption,
    openSignUpModal,
    openSignInModal,
    closeModal,
  }
}

const [
  ModalProvider,
  useModalInfo,
  useModalTitle,
  useModalOption,
  useSignUpModal,
  useSignInModal,
  useCloseModal,
] = constate(
  useModal,
  (value) => value.modal,
  (value) => value.modalTitle,
  (value) => value.modalOption,
  (value) => value.openSignUpModal,
  (value) => value.openSignInModal,
  (value) => value.closeModal
)

export {
  ModalProvider,
  useModalInfo,
  useModalTitle,
  useModalOption,
  useSignUpModal,
  useSignInModal,
  useCloseModal,
}
