"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/lib/supabase';
import ProjectQuickLook from './ProjectQuickLook';

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
    <section id="projects" className="py-32 w-full relative z-10">
      <div className="w-full mx-auto px-6 sm:px-8 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Featured <span className="text-gradient">Work</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl">A selection of our recent projects, showcasing our expertise in building high-performance, beautiful applications.</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects yet. Add some from the <a href="/admin" className="text-white underline underline-offset-4 hover:no-underline">admin panel</a>.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
          >
            {projects.map((project) => {
              const isLarge = project.size === 'large';
              const colSpan = isLarge ? "md:col-span-2" : "md:col-span-1";

              return (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95, y: 30 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className={`group relative rounded-3xl overflow-hidden glass hover:border-white/40 transition-all duration-500 cursor-pointer ${colSpan}`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-500 z-10"></div>
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition-all duration-700 ease-in-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent z-10 opacity-80"></div>

                  <div className="absolute bottom-0 left-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.description}</p>
                    <span className="inline-flex items-center gap-1.5 mt-3 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 uppercase tracking-widest">
                      Click to preview
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Quick Look Modal */}
      <ProjectQuickLook
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectGallery;