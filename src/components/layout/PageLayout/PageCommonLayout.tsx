import { AnimatePresence } from 'framer-motion';
import React, { FC, Fragment, memo } from 'react';

const PageCommonLayout: FC<{
  children: React.ReactNode;
  headerTransparent?: boolean;
  headerFixed?: boolean;
}> = ({ children }) => {
  return (
    //  overflow hidden to prevent text on background on transition
    <div
      id="page-layout"
      className="overflow-hidden w-full bg-primary-bg max-w-mobile-app m-center"
    >
      <AnimatePresence initial={false} exitBeforeEnter>
        <Fragment>{children}</Fragment>
      </AnimatePresence>
    </div>
  );
};

export default memo(PageCommonLayout);
