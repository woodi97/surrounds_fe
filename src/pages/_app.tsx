import '@src/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import { ModalContainer } from '@src/components/containers';
import { PageCommonLayout } from '@src/components/layout';
import { envConfig } from '@src/core/config/envConfig';
import { wrapper } from '@src/store';
import { getAuthToken } from '@src/utils/authUtil';
import axios from 'axios';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import qs from 'qs';
import React from 'react';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = envConfig.apiUrl;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = getAuthToken();
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};

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
  );
};

export default wrapper.withRedux(App);
