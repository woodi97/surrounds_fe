import SignInPageBackground from '@src/components/molecule/SignInPage/SignInPageBackground'
import SignInPageContents from '@src/components/molecule/SignInPage/SignInPageContents'
import React, { Fragment } from 'react'

const SignInPageTemplate = () => {
  return (
    <Fragment>
      <SignInPageContents />
      <SignInPageBackground />
    </Fragment>
  )
}

export default SignInPageTemplate
