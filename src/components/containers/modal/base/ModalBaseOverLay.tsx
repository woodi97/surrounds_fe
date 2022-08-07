import { modalOverlayVariants } from '@src/animations/modal';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const ModalBaseOverLay: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-black/30"
      variants={modalOverlayVariants}
      onClick={onClick}
    />
  );
};

export default ModalBaseOverLay;
