import { Variants } from 'framer-motion'

export const bottomSheetVars: Variants = {
  hidden: { y: '80vh' },
  visible: {
    y: '20vh',
    transition: {
      type: 'spring',
      damping: 40,
      stiffness: 200,
    },
  },
}
