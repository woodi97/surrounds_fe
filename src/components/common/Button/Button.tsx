import React, { forwardRef } from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'
import { btnSizes, btnStyles } from '@src/utils/constants'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  btnSize?: btnSizes
  btnStyles?: btnStyles
  hover?: boolean
  focus?: boolean
  disabled?: boolean
  social?: 'google'
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = (
  {
    type = 'button',
    className,
    btnSize = 'medium',
    btnStyles = 'default',
    hover = false,
    focus = false,
    disabled = false,
    social,
    fullWidth,
    children,
    onClick,
    ...props
  }: Props,
  ref: React.Ref<HTMLButtonElement>
) => {
  return (
    <button
      ref={ref}
      type={type}
      className={classNames(className, styles.ctn, styles[btnStyles], styles[btnSize], {
        [styles.fullWidth]: fullWidth,
        [styles.hover]: hover,
        [styles.focus]: focus,
        [styles.disabled]: disabled,
        [styles.google]: social === 'google',
      })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default forwardRef(Button)
