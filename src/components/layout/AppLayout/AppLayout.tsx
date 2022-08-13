import { pageVars } from '@src/animations/page';
import { useBrowserBackward, useRootDispatch, useRootState, useWindowResize } from '@src/hooks';
import { pageTransitionForward } from '@src/store/modules/layout';
import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useMemo, useRef } from 'react';

import AppHeader from './AppHeader';

const PageLayout: FC<{
  children: React.ReactNode;
  disableTransition?: boolean;
  disableContentPadding?: boolean;
}> = ({ children, disableTransition = false, disableContentPadding = false }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const dispatch = useRootDispatch();
  const layoutState = useRootState((state) => state.layout);

  useBrowserBackward();

  useEffect(() => {
    dispatch(pageTransitionForward());
  }, []);

  useWindowResize(() => {
    mainRef.current.style.setProperty('height', `${window.innerHeight}px`);
  }, 0);

  const pageDirectionCustom = useMemo(
    () => (layoutState.pageTransitionDir === 'forward' ? 1 : -1),
    [layoutState.pageTransitionDir]
  );

  return (
    <motion.div
      className="relative"
      variants={disableTransition ? {} : pageVars}
      custom={pageDirectionCustom}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }}
    >
      <AppHeader />
      <main
        ref={mainRef}
        className={cx('relative m-center w-full', 'py-0', 'overflow-hidden h-screen')}
      >
        {children}
      </main>
    </motion.div>
  );
};

export default PageLayout;
