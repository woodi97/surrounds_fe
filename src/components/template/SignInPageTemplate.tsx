import React, { Fragment } from 'react'
import SignInPageContents from '@src/components/molecule/SignInPage/SignInPageContents'
import SignInPageBackground from '@src/components/molecule/SignInPage/SignInPageBackground'

const SignInPageTemplate = () => {
  return (
    <Fragment>
      <SignInPageContents />
      <SignInPageBackground />
    </Fragment>
  )
}

export default SignInPageTemplate
