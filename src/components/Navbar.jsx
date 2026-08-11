import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const LinkItem = ({ children, href }) => (
    <motion.a
      href={href}
      className="text-sm font-medium cursor-pointer relative py-2 px-4 transition duration-300 ease-in-out"
      variants={linkVariants}
    >
      {children}
      <motion.span
        layoutId={`link-${href}`}
        className="absolute inset-y-0 left-0 w-full bg-white/10 rounded-sm pointer-events-none scale-[1.02]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1, transformOrigin: 'left' }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
      />
    </motion.a>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#050505]/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <motion.div
          className="text-2xl font-extrabold tracking-widest text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          H.STUDIO
        </motion.div>

        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex space-x-8 items-center">
            <LinkItem href="#work">Selected Work</LinkItem>
            <LinkItem href="#contact">Contact</LinkItem>
          </div>
        </motion.nav>
      </div>
    </header>
  );
};

export default Navbar;
