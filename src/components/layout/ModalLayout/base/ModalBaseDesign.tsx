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
        'relative z-50 py-10 flex items-center',
        fullScreen ? 'w-full h-full' : 'w-full h-auto max-w-mobile-app min-h-[400px]',
        'bg-primary-bg rounded-md'
      )}
      variants={fullScreen ? modalFullScreenVariants : modalVariants}
    >
      <div className="absolute top-0 w-full bg-primary-500 text-end">
        <IconButton name="close" size={40} onClick={onClose} />
      </div>
      <div className="px-side-padding">{children}</div>
    </motion.div>
  );
};

export default ModalBaseDesign;
