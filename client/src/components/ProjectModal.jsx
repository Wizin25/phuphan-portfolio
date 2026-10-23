import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';

export default function ProjectModal({ project, onClose, lang, t }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const title = lang === 'vi' ? (project.titleVi || project.title) : (project.titleEn || project.title);
  const description = lang === 'vi' ? (project.shortDescriptionVi || project.shortDescription) : (project.shortDescriptionEn || project.shortDescription);
  const role = lang === 'vi' ? (project.roleVi || project.role) : (project.roleEn || project.role);
  const badge = lang === 'vi' ? (project.badgeVi || project.badge) : (project.badgeEn || project.badge);
  const highlights = lang === 'vi' ? (project.highlightsVi || project.highlights) : (project.highlightsEn || project.highlights);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl dark:bg-[#0f1524] bg-white border dark:border-slate-700/80 border-slate-200 rounded-2xl shadow-2xl dark:shadow-black/80 max-h-[90vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b dark:border-slate-800 border-slate-200 flex items-start justify-between dark:bg-slate-900/60 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full dark:bg-indigo-500/20 bg-indigo-50 dark:text-indigo-300 text-indigo-700 border dark:border-indigo-500/30 border-indigo-200 text-xs font-mono font-medium">
                {project.category}
              </span>
              {badge && (
                <span className="px-2.5 py-0.5 rounded-full dark:bg-emerald-500/20 bg-emerald-50 dark:text-emerald-300 text-emerald-700 border dark:border-emerald-500/30 border-emerald-200 text-xs font-mono font-medium">
                  {badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold dark:text-white text-slate-900 tracking-tight">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Metadata bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl dark:bg-slate-950/60 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs font-mono">
            <div>
              <span className="dark:text-slate-500 text-slate-500 block">{t.projects.modalRole}</span>
              <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{role}</span>
            </div>
            <div>
              <span className="dark:text-slate-500 text-slate-500 block">{t.projects.modalTeam}</span>
              <span className="dark:text-slate-200 text-slate-800">{project.teamSize || 'Individual'}</span>
            </div>
            <div>
              <span className="dark:text-slate-500 text-slate-500 block">{t.projects.modalTimeline}</span>
              <span className="dark:text-slate-200 text-slate-800">{project.timeline}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider dark:text-slate-400 text-slate-500 mb-2 font-semibold">
              {t.projects.modalOverview}
            </h4>
            <p className="dark:text-slate-200 text-slate-700 leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Key Achievements & Highlights */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider dark:text-slate-400 text-slate-500 mb-3 font-semibold">
              {t.projects.modalHighlights}
            </h4>
            <div className="space-y-2.5">
              {highlights?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-md dark:bg-indigo-500/10 bg-indigo-100 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack badges */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider dark:text-slate-400 text-slate-500 mb-3 font-semibold">
              {t.projects.modalTech}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs font-mono text-indigo-600 dark:text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Links */}
        <div className="p-6 border-t dark:border-slate-800 border-slate-200 dark:bg-slate-900/60 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-slate-800 bg-white hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-200 text-slate-800 text-xs font-semibold border dark:border-slate-700 border-slate-300 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>{t.projects.modalRepo}</span>
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.projects.modalLive}</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 cursor-pointer"
          >
            {t.projects.modalClose}
          </button>
        </div>
      </div>
    </div>
  );
}
