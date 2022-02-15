import React, { FC, useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { Image } from '@components/common'

import axios from 'axios'
import { validate } from '@api/auth'
import { useModalInfo, useSignInModal } from '@src/context/ModalContext'

const SignInPage: FC = () => {
  const modalInfo = useModalInfo()
  const openSignInModal = useSignInModal()

  useEffect(() => {
    if (!modalInfo) openSignInModal()
  }, [modalInfo, openSignInModal])

  return (
    <div>
      <div className="relative w-screen h-screen top-0 left-0 z-10 backdrop-blur-sm" />
      <Image src="/background.svg" layout="fill" alt="bg" />
    </div>
  )
}

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

export default SignInPage
