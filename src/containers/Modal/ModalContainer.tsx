import React, { FC } from 'react'
import ModalPortal from './ModalPortal'
import {
  ChatroomModal,
  CreateRoomModal,
  ProfileModal,
  SignInModal,
  SignUpModal,
} from '@components/modal'
import { ModalShape } from '@src/core/interface/modal-type'
import ModalBase from './ModalBase'
import {
  useCloseModal,
  useModalInfo,
  useModalOption,
  useModalTitle,
} from '@src/context/ModalContext'

const ModalContainer: FC = () => {
  const modalInfo = useModalInfo()
  const modalTitle = useModalTitle()
  const modalOption = useModalOption()
  const closeModal = useCloseModal()

  const SelectRenderingModal: { [keys in ModalShape]: JSX.Element } = {
    SIGNUP: <SignUpModal />,
    SIGNIN: <SignInModal />,
    CREATEROOM: <CreateRoomModal />,
    CHATROOM: <ChatroomModal modalOption={modalOption} />,
    PROFILE: <ProfileModal modalOption={modalOption} />,
  }

  return (
    <ModalPortal>
      <ModalBase title={modalTitle} show={modalInfo ? true : false} onClose={closeModal}>
        {modalInfo ? SelectRenderingModal[modalInfo] : null}
      </ModalBase>
    </ModalPortal>
  )
}

export default ModalContainer
