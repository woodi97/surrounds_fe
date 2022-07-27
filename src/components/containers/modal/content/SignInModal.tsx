import React from 'react'
import { SignInForm } from '@src/components/molecule'
import { apiSignIn } from '@src/core/api/user'
import { useRouter } from 'next/router'
import { useRootDispatch } from '@src/hooks'
import { closeModal } from '@src/store/modules/modal'
import { setUserInfo } from '@src/store/modules/auth'

const SignInModal = () => {
  const router = useRouter()
  const dispatch = useRootDispatch()
  const handleSubmit = async ({ email, password }) => {
    try {
      const result = await apiSignIn(email, password)
      await dispatch(
        setUserInfo({
          email: result.email,
          nickname: result.nickname,
          profileImage: result.profileImage,
        })
      )
      await dispatch(closeModal())
      // Todo: set Interval before route to home page
      await router.push('/')
    } catch (err) {}
  }

  return <SignInForm onSubmit={handleSubmit} />
}

export default SignInModal
