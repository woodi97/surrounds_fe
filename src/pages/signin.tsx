import React, { FC, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { Image } from '@components/common'

import axios from 'axios'
import { validate } from '@api/auth'
import { SignInForm, SignUpForm } from '@src/components/form'
import ModalBase from '@src/containers/Modal/ModalBase'

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<GetServerSidePropsResult<any>> => {
  const { req } = ctx
  const token = req.cookies['jwt']
  axios.defaults.headers['Authorization'] = `Bearer ${token}`

  try {
    await validate()
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    }
  } catch (err) {
    return { props: { isAuth: false } }
  }
}

const SignInPage: FC = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  return (
    <div>
      <div className="relative w-screen h-screen top-0 left-0 z-10 backdrop-blur-sm" />
      <Image src="/background.svg" layout="fill" alt="bg" />
      <ModalBase show={true} onClose={() => {}}>
        {isSignUp ? (
          <SignUpForm onSignInClick={() => setIsSignUp(false)} />
        ) : (
          <SignInForm onSignUpClick={() => setIsSignUp(true)} />
        )}
      </ModalBase>
    </div>
  )
}

export default SignInPage
