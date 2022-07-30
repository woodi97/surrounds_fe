import { ImageWrapper } from '@src/components/atom'
import cx from 'classnames'
import React, { memo } from 'react'

const SignInPageBackground = () => {
  return (
    <div className={cx('z-0 top-0 left-0', 'w-full h-full')}>
      <ImageWrapper
        src={'/static/images/signin.png'}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />
    </div>
  )
}

export default memo(SignInPageBackground)
