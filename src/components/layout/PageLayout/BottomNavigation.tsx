import React from 'react'
import { LinkWithLogo } from '@components/common'
import headerNavLinks from '@data/headerNavLinks'

const BottomNavigation = () => {
  return (
    <nav className=" z-10 fixed flex w-full justify-between align-center bottom-0 bg-primary px-4 py-2 sm:hidden">
      {headerNavLinks.map((link) => (
        <LinkWithLogo
          priority
          key={link.title}
          path="/"
          logoSrc={link.logoSrc}
          alt="home"
          width={32}
          height={32}
        />
      ))}
    </nav>
  )
}

export default BottomNavigation
