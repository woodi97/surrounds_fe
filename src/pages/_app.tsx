import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import axios from 'axios'

import '@src/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { wrapper } from '@src/store'
import { PageCommonLayout } from '@src/components/layout'
import { ModalContainer } from '@src/components/containers'
import { envConfig } from '@src/core/config/envConfig'

axios.defaults.baseURL = envConfig.apiUrl
axios.defaults.withCredentials = true

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Head>
        <title>{envConfig.appName}</title>
        <link rel="icon" href="/logo.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      <PageCommonLayout>
        <Component {...pageProps} key={router.route} />
      </PageCommonLayout>
      <ModalContainer />
      <ToastContainer />
    </>
  )
}

export default wrapper.withRedux(App)
