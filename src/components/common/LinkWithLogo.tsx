import { motion } from 'framer-motion'
import { FC } from 'react'
import { Link, Image } from '.'

interface LinkWithLogoShape {
  priority?: boolean
  path: string
  logoSrc: string
  alt: string
  width: number
  height: number
}

const LinkWithLogo: FC<LinkWithLogoShape> = ({
  priority = false,
  path,
  logoSrc,
  alt,
  width,
  height,
}) => {
  return (
    <motion.div
      className="flex justify-center align-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={path} className={`w-${width / 4} h-${height / 4}`}>
        <Image
          className="cursor-pointer"
          priority={priority}
          src={logoSrc}
          width={width}
          height={height}
          alt={alt}
        />
      </Link>
    </motion.div>
  )
}

export default LinkWithLogo
