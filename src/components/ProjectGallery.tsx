"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/lib/supabase';
import ProjectQuickLook from './ProjectQuickLook';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);

const ProjectGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error.message, error.code, error.details);
      } else {
        setProjects(data as Project[]);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-32 w-full relative z-10 font-sans">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
            Latest <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A selection of our latest work, where design and engineering meet to create high-performing digital experiences.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 glass rounded-[2rem] border border-white/5">
            <p className="text-gray-500 text-lg mb-4">No projects showcased yet.</p>
            <a href="/admin" className="text-white underline underline-offset-4 hover:no-underline">Go to Admin Panel</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`group flex flex-col ${project.size === 'large' ? 'md:col-span-2' : ''}`}
              >
                {/* Browser Mockup Wrapper */}
                <div 
                  className="relative rounded-2xl overflow-hidden glass border border-white/10 aspect-square sm:aspect-[16/9] cursor-pointer shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-white/5"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Mockup Header */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-black/40 backdrop-blur-md border-b border-white/5 z-20 flex items-center px-5 shrink-0">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 group-hover:bg-red-500/60 transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 group-hover:bg-yellow-500/60 transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 group-hover:bg-green-500/60 transition-colors" />
                    </div>
                    <div className="mx-auto bg-white/5 rounded-md px-3 py-1 flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full border border-white/10" />
                       <div className="w-32 h-1.5 rounded-full bg-white/10" />
                    </div>
                  </div>

                  {/* Scrolling Content / Demo Preview */}
                  <div className="absolute inset-0 pt-10 overflow-hidden">
                    {project.image_url ? (
                      <motion.img
                        src={project.image_url}
                        alt={project.title}
                        initial={{ y: "0%" }}
                        whileHover={{ y: project.demo_url ? "0%" : "-65%" }}
                        transition={{ 
                          duration: 8, 
                          ease: "linear"
                        }}
                        className={`w-full h-auto object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-[filter,opacity] duration-700 ${project.demo_url ? 'group-hover:opacity-0' : ''}`}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-gray-600 text-xs uppercase tracking-widest">No Preview Available</span>
                      </div>
                    )}

                    {/* Live Demo Overlay */}
                    {project.demo_url && (
                      <div className="absolute inset-0 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        {project.demo_url.match(/\.(mp4|webm|ogg)$/i) ? (
                          <video
                            src={project.demo_url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={project.demo_url}
                            alt={`${project.title} demo`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none" />
                  
                  {/* Quick Look Hint */}
                  <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm tracking-tight shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      Quick Look
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-start gap-6">
                  <div className="max-w-xl">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display">{project.title}</h3>
                    <p className="text-gray-500 text-base leading-relaxed line-clamp-2">{project.description}</p>
                  </div>
                  
                  <div className="flex gap-4 pt-1">
                    {project.live_url && (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.github_url && (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all duration-300"
                      >
                        <GithubIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ProjectQuickLook
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectGallery;