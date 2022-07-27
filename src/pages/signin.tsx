import React, { FC } from 'react'
import { PageLayout } from '@src/components/layout'
import SignInPageTemplate from '@src/components/template/SignInPageTemplate'
import { withShouldNoAuthSSR } from '@src/hocnf'

export const getServerSideProps = withShouldNoAuthSSR()

const SignInPage: FC = () => {
  return (
    <PageLayout fixedHeight>
      <SignInPageTemplate />
    </PageLayout>
  )
}

export default SignInPage
