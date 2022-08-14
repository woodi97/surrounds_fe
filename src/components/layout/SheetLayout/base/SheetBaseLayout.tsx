import { sheetVars } from '@src/animations/sheet';
import cx from 'classnames';
import { motion, useAnimation, useDragControls } from 'framer-motion';
import React, { FC, useEffect } from 'react';

const SheetBaseLayout: FC<{
  children: React.ReactNode;
  sheetPosition: string;
  isActiveOverLay: boolean;
}> = ({ children, sheetPosition, isActiveOverLay }) => {
  const controls = useAnimation();
  // this hook is used to give smooth transition while drag the sheet
  const dragControls = useDragControls();

  function onDragStart(event, info) {
    event.stopPropagation();
  }

  function onDragEnd(event, info) {
    const shouldClose = info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
    if (shouldClose) {
      controls.start('hidden');
    } else {
      controls.start('visible');
    }
  }

  useEffect(() => {
    controls.start('hidden');
  }, []);

  return (
    <motion.div
      variants={sheetVars}
      initial="enter"
      exit="exit"
      animate={controls}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 200,
      }}
      drag="y"
      dragControls={dragControls}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragConstraints={{ top: 0 }}
      dragElastic={0.1}
      className={cx(
        'fixed z-30 max-w-mobile-app mx-auto',
        isActiveOverLay ? 'inset-0' : `inset-x-0 ${sheetPosition} bottom-0`
      )}
    >
      {children}
    </motion.div>
  );
};

export default SheetBaseLayout;
