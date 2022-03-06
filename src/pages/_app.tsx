import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import axios from 'axios'

import '@css/reset.scss'
import '@styles/globals.scss'
import '@css/tailwind.scss'
import 'react-toastify/dist/ReactToastify.css'

import { Composer } from '@src/components/common'
import { UserAuthProvider } from '@src/context/UserAuthContext'
import { ModalProvider } from '@src/context/ModalContext'
import { ModalContainer } from '@src/containers'
import { ToastContainer } from 'react-toastify'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
axios.defaults.withCredentials = true

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
        <link rel="icon" href="/logo.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      <Composer components={[UserAuthProvider, ModalProvider]}>
        <Component {...pageProps} key={router.route} />
        <ModalContainer />
        <ToastContainer />
      </Composer>
    </>
  )
}
