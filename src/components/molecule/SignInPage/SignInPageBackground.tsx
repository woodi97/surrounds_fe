import React from 'react'
import { ImageWrapper } from '@src/components/atom'

const SignInPageBackground = () => {
  return (
    <div className="z-0 absolute top-0 left-0 w-full h-full">
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

export default SignInPageBackground
