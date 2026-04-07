'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { verifyPassword, getProjects, addProject, deleteProject, updateProject } from './actions';
import type { Project } from '@/lib/supabase';
import { Plus, Trash2, Edit2, Lock, LogOut, ExternalLink, Image as ImageIcon, Video } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data as Project[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchProjects();
    }
  }, [authenticated, fetchProjects]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const valid = await verifyPassword(password);
    if (valid) {
      setAuthenticated(true);
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const handleSubmitProject = async (formData: FormData) => {
    setSubmitting(true);
    let result;
    
    if (editingProject) {
      result = await updateProject(editingProject.id, formData);
    } else {
      result = await addProject(formData);
    }

    if (result.success) {
      setFormOpen(false);
      setEditingProject(null);
      await fetchProjects();
    } else {
      console.error('Project save error:', result.error);
      setError(`Error: ${result.error || 'Failed to save project'}`);
    }
    setSubmitting(false);
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const result = await deleteProject(id);
    if (result.success) {
      await fetchProjects();
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-3xl p-10 border border-white/10">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mx-auto mb-8">
              <Lock className="w-7 h-7 text-white/60" />
            </div>
            <h1 className="text-3xl font-bold text-white text-center font-display mb-2">
              Admin Access
            </h1>
            <p className="text-gray-500 text-center mb-8 text-sm">
              Enter your password to manage projects
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all duration-300 text-sm"
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400/80 text-sm text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              >
                Unlock
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-500 hover:text-white transition-colors text-sm">
              ← Back to site
            </a>
            <div className="w-px h-5 bg-white/10" />
            <h1 className="text-xl font-bold text-white font-display">Project Manager</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingProject(null);
                setFormOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="p-2.5 rounded-xl glass border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
            onClick={() => setFormOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg glass rounded-3xl border border-white/10 p-8"
              onClick={(e) => e.stopPropagation()}
            >
               <h2 className="text-2xl font-bold text-white font-display mb-6">
                {editingProject ? 'Edit Project' : 'New Project'}
              </h2>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium leading-relaxed"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form action={handleSubmitProject} key={editingProject?.id || 'new'} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">Title *</label>
                  <input
                    name="title"
                    required
                    defaultValue={editingProject?.title || ''}
                    placeholder="My Awesome Project"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/25 transition-all duration-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={editingProject?.description || ''}
                    placeholder="A brief description of the project..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/25 transition-all duration-300 text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">
                    <span className="flex items-center gap-1.5"><ImageIcon className="w-3 h-3" /> Image URL</span>
                  </label>
                  <input
                    name="image_url"
                    defaultValue={editingProject?.image_url || ''}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/25 transition-all duration-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">
                    <span className="flex items-center gap-1.5"><Video className="w-3 h-3" /> Demo/Video URL</span>
                  </label>
                  <input
                    name="demo_url"
                    defaultValue={editingProject?.demo_url || ''}
                    placeholder="https://.../demo.mp4 or .gif"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/25 transition-all duration-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">
                    <span className="flex items-center gap-1.5"><GithubIcon className="w-3 h-3" /> GitHub URL</span>
                  </label>
                  <input
                    name="github_url"
                    defaultValue={editingProject?.github_url || ''}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/25 transition-all duration-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">
                    <span className="flex items-center gap-1.5"><ExternalLink className="w-3 h-3" /> Live URL</span>
                  </label>
                  <input
                    name="live_url"
                    defaultValue={editingProject?.live_url || ''}
                    placeholder="https://my-project.vercel.app"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/25 transition-all duration-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">Card Size</label>
                  <select
                    name="size"
                    defaultValue={editingProject?.size || 'small'}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/25 transition-all duration-300 text-sm appearance-none"
                  >
                    <option value="small" className="bg-neutral-900">Small (1 column)</option>
                    <option value="large" className="bg-neutral-900">Large (2 columns)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormOpen(false);
                      setEditingProject(null);
                    }}
                    className="flex-1 py-3 rounded-xl glass border border-white/10 text-gray-400 font-medium text-sm hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Saving...' : editingProject ? 'Save Changes' : 'Add Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project List */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-3xl glass border border-white/10 flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl text-white font-display mb-2">No projects yet</h3>
            <p className="text-gray-500 text-sm mb-6">Add your first project to get started</p>
            <button
              onClick={() => {
                setEditingProject(null);
                setFormOpen(true);
              }}
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-all duration-300"
            >
              Add Project
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group glass rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  {/* Image */}
                  {project.image_url && (
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-[11px] text-gray-300 font-medium uppercase tracking-wider border border-white/10">
                          {project.size}
                        </span>
                        {project.demo_url && (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-sm text-[11px] text-emerald-400 font-bold uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1">
                            <Video className="w-3 h-3" /> Demo
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-1 font-display">{project.title}</h3>
                    {project.description && (
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{project.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            GitHub
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(project)}
                          className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-white/10 transition-all duration-300"
                          title="Edit project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
