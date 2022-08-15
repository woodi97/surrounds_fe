import { Variants } from 'framer-motion';

const modalTransition = {
  type: 'spring',
  damping: 70,
  mass: 1,
  stiffness: 500,
};

export const modalVariants: Variants = {
  enter: {
    y: -300,
    opacity: 0,
    speed: 10,
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: modalTransition,
  },
  exit: {
    y: -300,
    opacity: 0,
    speed: 10,
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

export const modalFullScreenVariants: Variants = {
  enter: {
    y: 1000,
    opacity: 0,
    speed: 5,
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: modalTransition,
  },
  exit: {
    y: 1000,
    opacity: 0,
    speed: 5,
    transition: modalTransition,
  },
};
