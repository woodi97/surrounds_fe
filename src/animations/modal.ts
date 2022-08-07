import { Variants } from 'framer-motion';

const modalTransition = {
  type: 'spring',
  damping: 50,
  mass: 1,
  stiffness: 500,
};

export const modalVariants: Variants = {
  enter: {
    y: -400,
    opacity: 0,
    speed: 8,
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: modalTransition,
  },
  exit: {
    y: -400,
    opacity: 0,
    speed: 8,
    transition: modalTransition,
  },
};

export const modalOverlayVariants: Variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
