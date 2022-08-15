import { modalFullScreenVariants, modalVariants } from '@src/animations/modal';
import { IconButton } from '@src/components/atom';
import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const ModalBaseDesign: FC<{
  fullScreen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}> = ({ fullScreen, children, onClose }) => {
  return (
    <motion.div
      className={cx(
        'relative z-50 flex items-center max-w-mobile-app',
        fullScreen ? 'w-full h-full' : 'w-full h-auto py-8',
        'bg-primary-bg rounded-xl'
      )}
      variants={fullScreen ? modalFullScreenVariants : modalVariants}
    >
      <div
        className={cx(
          'absolute top-0 w-full h-header-modal flex',
          'py-2 px-1 rounded-t-xl',
          'justify-end items-center',
          'bg-primary-500 text-white'
        )}
      >
        <IconButton name="close" size={32} onClick={onClose} />
      </div>
      <div className="w-full h-full pt-header-modal px-side-padding">{children}</div>
    </motion.div>
  );
};

export default ModalBaseDesign;
