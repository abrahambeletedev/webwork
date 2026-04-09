'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/supabase';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);

interface ProjectQuickLookProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectQuickLook: React.FC<ProjectQuickLookProps> = ({ project, onClose }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div 
          key="quick-look-modal" 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onWheel={() => onClose()}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
            onTouchMove={() => onClose()}
          />

          {/* Fixed Close Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            className="fixed top-4 right-4 md:top-8 md:right-8 z-[110]"
          >
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>

          {/* Scrollable Container for the Card */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-6xl max-h-[90vh] md:h-[85vh] flex justify-center z-10"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full bg-[#0a0a0a] rounded-[2.5rem] overflow-y-auto hide-scrollbar shadow-[0_-20px_100px_rgba(0,0,0,0.8)] border border-white/10 relative pb-10">
              
              {/* Media Header */}
              <div className="relative w-full h-[40vh] md:h-[50vh] bg-neutral-900 overflow-hidden">
                {project.demo_url ? (
                  project.demo_url.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      src={project.demo_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-90"
                    />
                  ) : (
                    <img
                      src={project.demo_url}
                      alt={`${project.title} live demo`}
                      className="w-full h-full object-cover opacity-90"
                    />
                  )
                ) : project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 uppercase tracking-widest text-sm">
                    No Preview Available
                  </div>
                )}
                
                {/* Gradient Overlay for seamless blend to content */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                
                {/* Card Top Pill (Mobile only hint) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-white/20 md:hidden" />
              </div>

              {/* Content Body */}
              <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-16 relative z-10">
                <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-gray-400 mb-4 block">
                  Quick Look
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white font-display mb-6 tracking-tight leading-tight">
                  {project.title}
                </h2>
                
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 font-light">
                  {project.description}
                </p>

                {project.client_impact && (
                  <div className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10">
                    <h4 className="text-sm uppercase tracking-[0.2em] text-white mb-4 font-bold flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      Client Impact
                    </h4>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {project.client_impact}
                    </p>
                  </div>
                )}



                {/* Call to Actions */}
                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
                    >
                      <GithubIcon className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectQuickLook;

