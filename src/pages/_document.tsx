import siteMetaData from '@src/core/config/appConfig';
import { portalType } from '@src/core/types/portal-type';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    const { notchColor } = siteMetaData;

    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
          />
          <link rel="icon" href="logo.ico" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          <meta content={notchColor} name="theme-color" />
          <meta content={notchColor} name="msapplication-navbutton-color" />
          <meta content={notchColor} name="apple-mobile-web-app-status-bar-style" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
        </Head>
        <body className="z-0 bg-primary-bg text-black antialiased">
          <Main />
          {portalType.map((item) => {
            return <div key={item} id={item} />;
          })}
          <NextScript />
        </body>
      </Html>
    );
  }
}
