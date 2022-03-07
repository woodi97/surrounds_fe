import { motion, MotionProps } from 'framer-motion'
import React, { FC } from 'react'
import HamburgerSVG from './assets/Hamburger'
import PlusSVG from './assets/Plus'
import SettingSVG from './assets/Setting'

export type SVGTypes = 'plus' | 'hamburger' | 'settings'

interface Props extends MotionProps {
  name: SVGTypes
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}

const Icon: FC<Props> = ({ name, type = 'button', className, onClick, ...props }) => {
  const IconSelector: { [keys in SVGTypes]: JSX.Element } = {
    plus: <PlusSVG />,
    hamburger: <HamburgerSVG />,
    settings: <SettingSVG />,
  }

  return (
    <motion.button className={className} type={type} onClick={onClick} {...props}>
      {IconSelector[name]}
    </motion.button>
  )
}

export default Icon
