import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Projects({ projects, onSelectProject, lang, t }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <section id="projects" className="py-20 relative border-t dark:border-slate-900 border-slate-200 dark:bg-[#0c101a]/40 bg-slate-100/50">
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'dark:bg-slate-900/80 bg-white dark:text-slate-400 text-slate-600 hover:text-indigo-600 dark:hover:text-white dark:hover:bg-slate-800 hover:bg-slate-50 border dark:border-slate-800 border-slate-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const title = lang === 'vi' ? (project.titleVi || project.title) : (project.titleEn || project.title);
            const description = lang === 'vi' ? (project.shortDescriptionVi || project.shortDescription) : (project.shortDescriptionEn || project.shortDescription);
            const role = lang === 'vi' ? (project.roleVi || project.role) : (project.roleEn || project.role);
            const badge = lang === 'vi' ? (project.badgeVi || project.badge) : (project.badgeEn || project.badge);

            return (
              <div
                key={project.id}
                className="glass-card rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 group relative"
              >
                {/* Card Header & Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
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

                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-xl font-bold dark:text-white text-slate-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors cursor-pointer mb-2 flex items-center justify-between"
                  >
                    <span>{title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                  </h3>

                  <p className="text-xs font-mono dark:text-slate-400 text-slate-500 mb-3">
                    {t.projects.roleLabel} <span className="dark:text-slate-300 text-slate-700 font-semibold">{role}</span>
                  </p>

                  <p className="text-sm dark:text-slate-300 text-slate-600 leading-relaxed font-light mb-6 line-clamp-3">
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
                <div className="px-6 py-4 dark:bg-slate-950/40 bg-slate-50 border-t dark:border-slate-800/80 border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer"
                  >
                    {t.projects.viewDetails}
                  </button>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg dark:bg-slate-800 bg-white dark:hover:bg-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-300 dark:hover:text-white hover:text-slate-900 border dark:border-slate-700 border-slate-200 transition-all shadow-sm"
                        title="View GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg dark:bg-emerald-600/30 bg-emerald-100 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white transition-all shadow-sm"
                        title="Live Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
