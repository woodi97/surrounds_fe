import React, { FC, useEffect } from 'react'
import router from 'next/router'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { Image } from '@components/common'

import axios from 'axios'
import { validate } from '@api/auth'
import styles from '@styles/pages/signin.module.scss'
import { useModalInfo, useSignInModal } from '@src/context/ModalContext'

const SignInPage: FC = () => {
  const modalInfo = useModalInfo()
  const openSignInModal = useSignInModal()

  useEffect(() => {
    if (!modalInfo) openSignInModal()
  }, [openSignInModal, modalInfo])

  return (
    <div className={styles.cnt}>
      <div className={styles.blur} />
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
