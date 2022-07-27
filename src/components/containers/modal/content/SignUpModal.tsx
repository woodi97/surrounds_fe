import { SignUpForm } from '@src/components/molecule'
import React from 'react'

const SignUpModal = () => {
  const handleSubmit = ({ name, email, password }) => {
    console.log(name, email, password)
  }

  return <SignUpForm onSubmit={handleSubmit} />
}

export default SignUpModal
