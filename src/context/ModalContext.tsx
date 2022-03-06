import { useCallback, useState } from 'react'
import constate from 'constate'
import { ModalShape } from '@src/core/interface/modal-type'
import { RoomInfo } from '@src/core/interface/chatroom'

const useModal = () => {
  const [modal, setModal] = useState<ModalShape | null>(null)
  const [modalTitle, setModalTitle] = useState<string>(null)
  const [modalOption, setModalOption] = useState<unknown>(null)

  const closeModal = useCallback(() => {
    setModal(null)
    setModalTitle(null)
    setModalOption(null)
  }, [])

  const openModal = useCallback(
    (modal: ModalShape, modalTitle?: string, modalOption?: unknown) => {
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

  const openRoomCreateModal = useCallback(
    (modalTitle?: string) => {
      openModal('CREATEROOM', modalTitle, {})
    },
    [openModal]
  )

  const openJoinRoomModal = useCallback(
    ({ modalTitle, roomInfo }: { modalTitle?: string; roomInfo: RoomInfo }) => {
      openModal('CHATROOM', modalTitle, { roomInfo })
    },
    [openModal]
  )

  const openProfileModal = useCallback(
    (modalTitle?: string) => {
      openModal('PROFILE', modalTitle, {})
    },
    [openModal]
  )

  return {
    modal,
    modalTitle,
    modalOption,
    openSignUpModal,
    openSignInModal,
    openRoomCreateModal,
    openJoinRoomModal,
    openProfileModal,
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
  useRoomCreateModal,
  useJoinRoomModal,
  useProfileModal,
  useCloseModal,
] = constate(
  useModal,
  (value) => value.modal,
  (value) => value.modalTitle,
  (value) => value.modalOption,
  (value) => value.openSignUpModal,
  (value) => value.openSignInModal,
  (value) => value.openRoomCreateModal,
  (value) => value.openJoinRoomModal,
  (value) => value.openProfileModal,
  (value) => value.closeModal
)

export {
  ModalProvider,
  useModalInfo,
  useModalTitle,
  useModalOption,
  useSignUpModal,
  useSignInModal,
  useRoomCreateModal,
  useJoinRoomModal,
  useProfileModal,
  useCloseModal,
}
