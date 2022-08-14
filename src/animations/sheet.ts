import appConfig from '@src/core/config/appConfig';
import { Variants } from 'framer-motion';

export const sheetVars: Variants = {
  enter: { y: 1000 },
  hidden: { y: 'calc(100% - 160px)' },
  visible: {
    y: appConfig.headerHeightInt,
  },
  exit: {
    y: '100%',
  },
};
