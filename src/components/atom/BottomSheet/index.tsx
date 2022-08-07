import { bottomSheetVars } from '@src/animations/bottom-sheet';
import cx from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import React, { FC, useEffect, useRef, useState } from 'react';

import BottomSheetHeader from './BottomSheetHeader';

const DraggableSheet: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  function onDragEnd(event, info) {
    const shouldClose = info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
    if (shouldClose) {
      controls.start('hidden');
      setIsOpen(false);
    } else {
      controls.start('visible');
      setIsOpen(true);
    }
  }

  useEffect(() => {
    controls.start('hidden');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={sheetRef}
      variants={bottomSheetVars}
      animate={controls}
      onDragEnd={onDragEnd}
      drag="y"
      draggable
      dragConstraints={{ top: 0 }}
      dragElastic={isOpen ? 0 : 0.2}
      className={cx(
        `z-10 fixed bottom-0 px-side-padding`,
        'max-w-mobile-app w-full h-full',
        'rounded-t-lg bg-white'
      )}
    >
      <BottomSheetHeader />
      <div className="children:p-3">{children}</div>
    </motion.div>
  );
};

export default DraggableSheet;
