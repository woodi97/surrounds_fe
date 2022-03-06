import React, { FC } from 'react'
import { SignInForm } from '@src/components/form'
import { useSignUpModal } from '@src/context/ModalContext'

const SignInModal: FC = () => {
  const SignUpModal = useSignUpModal()
  return <SignInForm onSignUpClick={() => SignUpModal()} />
}

export default SignInModal
