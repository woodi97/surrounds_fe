import appConfig from '@src/core/config/appConfig';
import { Variants } from 'framer-motion';

export const bottomSheetVars: Variants = {
  hidden: { y: 'calc(100% - 100px)' },
  visible: {
    y: appConfig.headerHeight,
    transition: {
      type: 'spring',
      damping: 40,
      stiffness: 200,
    },
  },
};
