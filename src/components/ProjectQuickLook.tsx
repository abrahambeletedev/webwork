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
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12"
          onClick={onClose}
        >
          {/* Backdrop with sophisticated blur */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-[20px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.8 }}
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-bg-dark/80 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Top Bar */}
            <div className="absolute top-6 right-6 z-[60] flex items-center gap-4">
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all duration-300"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
              {/* Image Column - Uses scrolling preview logic consistent with gallery */}
              <div className="w-full lg:w-[60%] h-[400px] lg:h-full bg-white/2 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="relative w-full h-full p-6 lg:p-10">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl group/mockup">
                    {/* Mockup dots */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-black/40 backdrop-blur-md border-b border-white/5 z-20 flex items-center px-5 flex-shrink-0">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                    </div>

                    <div className="absolute inset-0 pt-10 overflow-auto scrollbar-hide">
                      {project.image_url ? (
                        <motion.img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-auto object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 uppercase tracking-widest text-xs">
                          No Preview Available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text / Actions Column */}
              <div className="flex-1 p-8 lg:p-14 flex flex-col justify-center relative">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-gray-600 mb-6 block">Case Study</span>
                  <h2 className="text-4xl lg:text-6xl font-bold text-white font-display mb-8 tracking-tighter leading-tight italic">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 text-lg lg:text-xl leading-relaxed mb-12 font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-white text-bg-dark font-black text-sm tracking-tight transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] group"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl glass border border-white/10 text-white font-bold text-sm tracking-tight transition-all duration-300 hover:border-white/30 hover:bg-white/5 group"
                      >
                        <GithubIcon className="w-5 h-5" />
                        Code Repository
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* Subtle Hint */}
                <div className="absolute bottom-10 left-14 hidden lg:block">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-gray-700 font-bold">UNIMITY Project Portfolio</span>
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
