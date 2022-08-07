import { useCycle } from 'framer-motion';
import React from 'react';

import MobileNav from './MobileNav';

const Header = ({ className }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <header
      className={`z-40 flex fixed w-full h-10 top-0 justify-between border-b-2 border-black-500 ${className} bg-primary`}
    >
      <MobileNav />
    </header>
  );
};

export default Header;
