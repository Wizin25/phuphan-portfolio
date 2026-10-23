import React from 'react';

export default function Experience({ t }) {
  const milestones = t.education.milestones;

  return (
    <section id="education" className="py-20 relative border-t dark:border-slate-900 border-slate-200 dark:bg-[#0a0d14] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 dark:bg-indigo-500/10 bg-indigo-50 px-3 py-1 rounded-full border dark:border-indigo-500/20 border-indigo-200">
            {t.education.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 mt-4 tracking-tight">
            {t.education.title}
          </h2>
          <p className="dark:text-slate-400 text-slate-600 mt-4 leading-relaxed">
            {t.education.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative pl-6 sm:pl-8 border-l dark:border-slate-800 border-slate-300 space-y-10">
          {milestones.map((item, index) => (
            <div key={index} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full dark:bg-slate-900 bg-white border-2 border-indigo-500 group-hover:scale-125 transition-transform shadow-sm"></div>

              <div className="glass-card p-6 rounded-2xl">
                <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 dark:bg-indigo-500/10 bg-indigo-50 px-2.5 py-0.5 rounded-full border dark:border-indigo-500/20 border-indigo-200 inline-block mb-2">
                  {item.period}
                </span>
                <h3 className="text-lg font-bold dark:text-white text-slate-900">{item.title}</h3>
                <h4 className="text-sm font-medium dark:text-slate-300 text-slate-700 mb-3">{item.org}</h4>
                <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
