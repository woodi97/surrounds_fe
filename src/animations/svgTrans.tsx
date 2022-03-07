import type { Variants } from 'framer-motion'

export const svgVariants: Variants = {
  hidden: { rotate: -90, originX: 0.6, originY: 0.6, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
}
