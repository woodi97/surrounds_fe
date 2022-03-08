import classNames from 'classnames'
import React, { FC, useContext } from 'react'
import { Image } from '@components/common'
import styles from './ModalBase.module.scss'

interface IModalBase {
  show: boolean
  title?: string
  onClose: () => void
}

const ModalBase: FC<IModalBase> = ({
  show,
  title = process.env.NEXT_PUBLIC_APP_TITLE,
  onClose,
  children,
}) => {
  return (
    <div className={classNames(styles.cnt, { [styles.active]: show })}>
      <div
        className={styles.overlay}
        onClick={() => {
          onClose()
        }}
      />
      <div className={classNames(styles.con)}>
        <div className={styles.logo_image}>
          <Image src="/logo.ico" width={100} height={100} alt="logo" />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.contents}>{children}</div>
      </div>
    </div>
  )
}

export default ModalBase
