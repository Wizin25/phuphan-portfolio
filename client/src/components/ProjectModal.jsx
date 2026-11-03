import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { LiquidButton } from './animate-ui/buttons/liquid';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(4px)' }}
        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
        className="relative w-full max-w-3xl dark:bg-[#1a1a1a] bg-white border dark:border-slate-700/80 border-slate-200 rounded-2xl shadow-2xl dark:shadow-black/80 max-h-[90vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-200"
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
          <LiquidButton
            onClick={onClose}
            className="h-9 w-9 rounded-xl p-0 text-slate-600 dark:text-slate-300 [--liquid-button-background-color:#e2e8f0] [--liquid-button-color:#6366f1] dark:[--liquid-button-background-color:#1e293b]"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </LiquidButton>
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
              <LiquidButton asChild className="h-9 rounded-xl border border-slate-300 px-4 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-200 [--liquid-button-background-color:#f1f5f9] [--liquid-button-color:#6366f1] dark:[--liquid-button-background-color:#1e293b]">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="w-4 h-4" />
                <span>{t.projects.modalRepo}</span>
              </a>
              </LiquidButton>
            )}
            {project.liveDemo && (
              <LiquidButton asChild className="h-9 rounded-xl px-4 text-xs font-semibold text-white [--liquid-button-background-color:#BAFF39] [--liquid-button-color:#6E6E6E]">
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.projects.modalLive}</span>
              </a>
              </LiquidButton>
            )}
          </div>
          <LiquidButton
            onClick={onClose}
            className="h-9 rounded-xl px-4 text-xs font-semibold text-slate-600 dark:text-slate-300 [--liquid-button-background-color:#e2e8f0] [--liquid-button-color:#6366f1] dark:[--liquid-button-background-color:#1e293b]"
          >
            {t.projects.modalClose}
          </LiquidButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
