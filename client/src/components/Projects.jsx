import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { LiquidButton } from './animate-ui/buttons/liquid';

export default function Projects({ projects, onSelectProject, lang, t }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <section id="projects" className="py-20 relative border-t dark:border-slate-900 border-slate-200 dark:bg-[#101010]/25 bg-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 dark:bg-indigo-500/10 bg-indigo-50 px-3 py-1 rounded-full border dark:border-indigo-500/20 border-indigo-200">
              {t.projects.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 mt-4 tracking-tight">
              {t.projects.title}
            </h2>
            <p className="dark:text-slate-400 text-slate-600 mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {t.projects.filters.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative isolate rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${selectedCategory === cat ? 'border-transparent text-white' : 'dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400 border-slate-200 bg-white/75 text-slate-600 hover:text-indigo-600'}`}
              >
                {selectedCategory === cat && <motion.span layoutId="projects-filter-pill" className="absolute inset-0 -z-10 rounded-lg bg-indigo-600 shadow-md shadow-indigo-600/25" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project) => {
            const title = lang === 'vi' ? (project.titleVi || project.title) : (project.titleEn || project.title);
            const description = lang === 'vi' ? (project.shortDescriptionVi || project.shortDescription) : (project.shortDescriptionEn || project.shortDescription);
            const role = lang === 'vi' ? (project.roleVi || project.role) : (project.roleEn || project.role);
            const badge = lang === 'vi' ? (project.badgeVi || project.badge) : (project.badgeEn || project.badge);

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.24, layout: { type: 'spring', stiffness: 360, damping: 32 } }}
                className="relative"
              >
              <div className="glass-card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl transition-colors duration-300 group hover:border-indigo-500/40">
                {/* Card Header & Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full dark:bg-slate-800/80 bg-slate-100 text-indigo-600 dark:text-indigo-300 border dark:border-slate-700/60 border-slate-200">
                      {project.category}
                    </span>
                    {badge && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full dark:bg-emerald-500/10 bg-emerald-50 text-emerald-600 dark:text-emerald-400 border dark:border-emerald-500/20 border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        {badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2">
                    <LiquidButton
                      onClick={() => onSelectProject(project)}
                      className="h-auto w-full justify-between rounded-lg p-0 text-left text-xl font-bold text-slate-900 dark:text-white [--liquid-button-background-color:transparent] [--liquid-button-color:#312e81] dark:[--liquid-button-color:#818cf8]"
                    >
                      <span>{title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 transition-opacity text-indigo-500 group-hover:opacity-100" />
                    </LiquidButton>
                  </h3>

                  <p className="text-xs font-mono dark:text-slate-400 text-slate-500 mb-3">
                    {t.projects.roleLabel} <span className="dark:text-slate-300 text-slate-700 font-semibold">{role}</span>
                  </p>

                  <p className="text-sm dark:text-slate-300 text-slate-600 leading-relaxed font-light mb-4 line-clamp-3">
                    {description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techStack.slice(0, 5).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded dark:bg-slate-900/90 bg-slate-100 border dark:border-slate-800 border-slate-200 text-[11px] font-mono dark:text-slate-400 text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-2 py-0.5 rounded dark:bg-slate-900/90 bg-slate-100 border dark:border-slate-800 border-slate-200 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-3 dark:bg-slate-950/25 bg-slate-50/60 border-t dark:border-slate-800/60 border-slate-200/70 flex items-center justify-between">
                  <LiquidButton
                    onClick={() => onSelectProject(project)}
                    className="h-8 rounded-md px-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 [--liquid-button-background-color:#eef2ff] [--liquid-button-color:#6366f1] dark:[--liquid-button-background-color:#1e293b]"
                  >
                    {t.projects.viewDetails}
                  </LiquidButton>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <LiquidButton asChild className="h-8 w-8 rounded-lg border border-slate-200 p-0 text-slate-600 dark:border-slate-700 dark:text-slate-300 [--liquid-button-background-color:#f1f5f9] [--liquid-button-color:#6366f1] dark:[--liquid-button-background-color:#1e293b]">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        title="View GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      </LiquidButton>
                    )}
                    {project.liveDemo && (
                      <LiquidButton asChild className="h-8 w-8 rounded-lg p-0 text-emerald-700 dark:text-emerald-300 [--liquid-button-background-color:#d1fae5] [--liquid-button-color:#059669] dark:[--liquid-button-background-color:#064e3b]">
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        title="Live Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      </LiquidButton>
                    )}
                  </div>
                </div>
              </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
