import React from 'react'
import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} />

export default Image

// if you want use html img tag
// resolve comment below

// interface IImageProps {
//   alt: string
//   src: string
//   className?: string
//   width?: number | string
//   height?: number | string
// }

// const Image = ({ ...rests }: IImageProps) => <img {...rests} />

// export default Image
