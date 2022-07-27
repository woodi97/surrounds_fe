import { Icon, ImageWrapper } from '@src/components/atom'
import cx from 'classnames'
import React from 'react'

const Header = () => {
  return (
    <div
      className={cx(
        'z-20 w-full max-w-mobile-app h-gb-header',
        'px-side-padding py-2',
        'border-2 border-gray-300 rounded-b-md bg-gray-200',
        'flex justify-between items-center align-middle',
        'font-bold',
        'fixed top-0'
      )}
    >
      <div>
        <ImageWrapper
          className="rounded-3xl"
          src="/profiles/default.png"
          width={40}
          height={40}
          alt="profile"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Icon name="setting" />
        <Icon name="plus" />
      </div>
    </div>
  )
}

export default Header
