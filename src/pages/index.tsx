import { AppLayout } from '@src/components/layout';
import MainPageTemplate from '@src/components/template/MainPageTemplate';
import { withAuthSSR } from '@src/hocnf';
import { NextPage } from 'next';
import React from 'react';

export const getServerSideProps = withAuthSSR();

// Todo: Apply React Query
const HomePage: NextPage = () => {
  return (
    <AppLayout>
      <MainPageTemplate />
    </AppLayout>
  );
};

export default HomePage;
