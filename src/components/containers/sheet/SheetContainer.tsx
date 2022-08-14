import { SheetLayout } from '@src/components/layout';
import { AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';

const SheetContainer: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <SheetLayout>{children}</SheetLayout>
    </AnimatePresence>
  );
};

export default SheetContainer;
