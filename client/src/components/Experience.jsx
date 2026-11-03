import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

function Milestone({ item, index }) {
  const milestoneRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: milestoneRef,
    offset: ['start end', 'start 25%'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [110, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.82, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [16, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], reduceMotion ? [1, 1, 1] : [0.2, 0.72, 1]);

  return (
    <div ref={milestoneRef} className="relative min-h-[68vh]" style={{ perspective: 1200 }}>
      <motion.article
        style={{ y, scale, rotateX, opacity, zIndex: index + 1, transformOrigin: 'center top' }}
        className="sticky top-[15vh] mx-auto w-full max-w-3xl will-change-transform"
      >
        <div className="glass-card relative overflow-hidden rounded-2xl p-5 shadow-2xl shadow-black/10 sm:p-7">
          <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/25 bg-indigo-500/10 font-mono text-sm font-bold text-indigo-600 dark:text-indigo-300">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="min-w-0 flex-1">
              <span className="mb-3 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 font-mono text-xs font-semibold text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                {item.period}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">{item.title}</h3>
              <h4 className="mb-3 mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">{item.org}</h4>
              <p className="text-sm font-light leading-relaxed text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Experience({ t }) {
  const milestones = t.education.milestones;

  return (
    <section id="education" className="relative border-t border-slate-200 bg-white/30 py-20 dark:border-slate-900 dark:bg-[#101010]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            {t.education.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t.education.title}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
            {t.education.subtitle}
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl pb-12">
          {milestones.map((item, index) => (
            <Milestone key={`${item.period}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
