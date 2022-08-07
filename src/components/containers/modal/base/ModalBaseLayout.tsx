import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const ModalBaseLayout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <motion.div
      className={cx(
        'z-[1000] w-full h-full',
        'fixed top-0 left-0',
        'flex justify-center items-center'
      )}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default ModalBaseLayout;
