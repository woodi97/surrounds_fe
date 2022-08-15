import { PageSEO } from '@src/components/analytics/SEO';
import { PageLayout } from '@src/components/layout';
import SignInPageTemplate from '@src/components/template/SignInPageTemplate';
import siteMetadata from '@src/core/config/siteMetadata';
import { withShouldNoAuthSSR } from '@src/hocnf';
import React, { FC } from 'react';

export const getServerSideProps = withShouldNoAuthSSR();

const SignInPage: FC = () => {
  return (
    <PageLayout fixedHeight disableHeader>
      <PageSEO
        title={siteMetadata.title + ' SignIn Page'}
        description={'talk with your ' + siteMetadata.title}
      />
      <SignInPageTemplate />
    </PageLayout>
  );
};

export default SignInPage;
