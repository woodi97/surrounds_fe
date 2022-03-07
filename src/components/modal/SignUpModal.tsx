import React from 'react'
import { SignUpForm } from '@src/components/form'
import { useSignInModal } from '@src/context/ModalContext'

const SignUpModal = () => {
  const SignInModal = useSignInModal()
  return <SignUpForm onSignInClick={() => SignInModal()} />
}

export default SignUpModal
