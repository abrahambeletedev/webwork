"use client";
import React from 'react';
import { motion } from 'framer-motion';

const DynamicBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-bg-dark">
      {/* Faint, slowly drifting monochromatic blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white rounded-full opacity-[0.03] blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 100, -80, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-white rounded-full opacity-[0.02] blur-[150px]"
      />
      
      <motion.div
        animate={{
          x: [0, 80, -100, 0],
          y: [0, 50, -150, 0],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full opacity-[0.02] blur-[100px]"
      />
    </div>
  );
};

export default DynamicBackground;
