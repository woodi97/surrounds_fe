import React from 'react'
import classNames from 'classnames'
import { SocialIcon } from 'react-social-icons'

const Footer = ({ className }) => {
  return (
    <div className={classNames(className, 'bg-footer')}>
      <footer className="pt-12 pb-20 mb:py-20 space-y-10">
        <div className="flex flex-col justify-start space-y-2">
          <h5>Mircats in Container101</h5>
          <h5>Contact : mircat.daily@gmail.com</h5>
          <h5>Chuang-ang Univ. Software Majoring</h5>
          <h5>© Copyright 2022 by Mircats in Container101. All rights reserved</h5>
        </div>
        <SocialIcon url="https://github.com/woodi97" />
      </footer>
    </div>
  )
}

export default Footer
