"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <footer id="contact" className="relative w-full py-20 sm:py-32 overflow-hidden border-t border-white/5">

      <div className="w-full overflow-hidden border-y border-white/5 py-4 mb-24 relative flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex text-5xl sm:text-8xl md:text-[10rem] font-black font-display text-white/5 uppercase tracking-tighter"
        >
          <span>UNIMITY • DIGITAL STUDIO • UNIMITY • DIGITAL STUDIO • UNIMITY • DIGITAL STUDIO • UNIMITY • DIGITAL STUDIO • </span>
        </motion.div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-8 md:px-12 max-w-7xl relative z-10">
        {/* Main CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">Ready to <span className="text-gradient">ship</span>?</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            Tell us about your project and we'll get back within 24 hours with a free estimate. No contracts, no pressure — just a conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:abraham.belete.dev@gmail.com?subject=Project%20Inquiry"
              className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-5 rounded-full bg-white text-bg-dark font-bold text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full sm:w-auto overflow-hidden text-ellipsis"
            >
              <Mail className="w-5 h-5 shrink-0" />
              <span className="truncate max-w-[200px] sm:max-w-none">abraham.belete.dev@gmail.com</span>
              <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
          </div>

          <p className="text-gray-600 text-sm mt-6">Average response time: under 6 hours</p>
        </motion.div>

        {/* Social links & info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass rounded-3xl border border-white/10 p-10 md:p-14"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Column 1 — Quick details */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-4">Email</h3>
              <a href="mailto:abraham.belete.dev@gmail.com" className="text-white text-base sm:text-lg hover:text-gray-300 transition-colors break-all">abraham.belete.dev@gmail.com</a>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-4">Location</h3>
              <p className="text-white text-lg">Remote — worldwide</p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-4">Connect</h3>
              <div className="flex gap-3">
                <a href="https://github.com/abrahambeletedev" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-600 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} UNIMITY Studio. All rights reserved.</p>
          <p className="text-gray-700">Designed and engineered for the future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;