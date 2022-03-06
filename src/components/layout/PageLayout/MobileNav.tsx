import { useState } from 'react'
import { Link } from '@components/common'
import headerNavLinks from '@data/headerNavLinks'
import { motion } from 'framer-motion'
import Path from '@src/components/common/SVG/Path'

const SideMenuItem = ({ link, onToggleNav }) => {
  return (
    <motion.div
      className="px-12 py-4"
      variants={{
        open: {
          y: 0,
          opacity: 1,
          transition: {
            y: { stiffness: 1000, velocity: -100 },
          },
        },
        closed: {
          y: 50,
          opacity: 0,
          transition: {
            y: { stiffness: 1000 },
          },
        },
      }}
    >
      <Link
        href={link.href}
        className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
        onClick={onToggleNav}
      >
        {link.title}
      </Link>
    </motion.div>
  )
}

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="lg:hidden">
      <motion.button
        initial={false}
        animate={navShow ? 'open' : 'close'}
        type="button"
        className="ml-1 mr-1 w-6 rounded py-2.5"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <Path
            variants={{
              close: { d: 'M 2 2.5 L 20 2.5' },
              open: { d: 'M 3 16.5 L 17 2.5' },
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              close: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              close: { d: 'M 2 16.346 L 20 16.346' },
              open: { d: 'M 3 2.5 L 17 16.346' },
            }}
          />
        </svg>
      </motion.button>
      <div
        className={`fixed top-10 right-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed h-full w-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>
        <motion.nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link) => (
            <SideMenuItem key={link.title} link={link} onToggleNav={onToggleNav} />
          ))}
        </motion.nav>
      </div>
    </div>
  )
}

export default MobileNav
