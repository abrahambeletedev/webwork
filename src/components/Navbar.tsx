"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-full px-6 py-3 sm:px-8 w-full max-w-xl flex justify-between items-center transition-all duration-300 pointer-events-auto"
      >
        <div className="text-xl font-bold font-display text-white tracking-widest uppercase">
          UNIMITY<span className="text-gray-500">.</span>
        </div>
        <div className="flex items-center space-x-6 sm:space-x-8">
          <a href="#projects" className="text-sm font-medium text-gray-400 hover:text-white hover:text-glow transition-all duration-300">Projects</a>
          <a href="#skills" className="text-sm font-medium text-gray-400 hover:text-white hover:text-glow transition-all duration-300">Skills</a>
          <a href="#contact" className="text-sm font-medium text-gray-400 hover:text-white hover:text-glow transition-all duration-300">Contact</a>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;