"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const sentence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as any },
  },
};

const Hero = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-8 md:px-12 overflow-hidden">
      
      {/* Background handled dynamically by layout's DynamicBackground component */}

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 px-4 py-1.5 rounded-full border border-white/10 glass inline-flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-xs tracking-widest uppercase font-medium text-gray-400">2 spots open for Q2 2026</span>
        </motion.div>

        <motion.div
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="overflow-hidden mb-2"
        >
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white font-display leading-[0.9] tracking-tighter"
          >
            {"UNIMITY".split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter} className="inline-block px-0.5">
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-4xl text-gray-500 font-display tracking-tight mb-8"
        >
          Design & <span className="text-white">Engineering</span> Studio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed"
        >
          We design and ship <span className="text-white font-normal">high-converting websites</span>, web apps, and brand identities for startups and founders who want to stand out — in weeks, not months.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="mailto:abraham.belete.dev@gmail.com?subject=Project%20Inquiry"
            className="group px-8 py-4 rounded-full bg-white text-bg-dark font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] inline-flex items-center justify-center gap-2.5"
          >
            <Mail className="w-5 h-5" />
            Start a Project
            <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#projects"
            className="px-8 py-4 rounded-full glass font-semibold text-white text-lg hover:bg-white/10 border border-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            See Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;