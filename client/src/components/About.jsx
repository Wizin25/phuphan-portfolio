import React from 'react';
import { Layers, Database, Zap, ShieldCheck, CheckCircle, Code2, Award, Sparkles, Terminal } from 'lucide-react';

export default function About({ t }) {
  const icons = [Layers, Database, Zap, ShieldCheck];

  const stats = [
    { value: '119+', label: 'Commits on SwapX', sublabel: 'Frontend Lead' },
    { value: '6+', label: 'Real Projects', sublabel: 'Web, Mobile & ERP' },
    { value: '100%', label: 'Clean Architecture', sublabel: 'N-Tier & Modularity' },
    { value: 'FPTU', label: 'Software Engineer', sublabel: 'Graduated 2025' }
  ];

  return (
    <section id="about" className="py-20 relative border-t dark:border-slate-900 border-slate-200 dark:bg-[#0c101a]/50 bg-slate-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 dark:bg-indigo-500/10 bg-indigo-50 px-3 py-1 rounded-full border dark:border-indigo-500/20 border-indigo-200">
            {t.about.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 mt-4 tracking-tight">
            {t.about.title}
          </h2>
          <p className="dark:text-slate-400 text-slate-600 mt-4 leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-2xl text-center hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent font-mono mb-1">
                {s.value}
              </div>
              <div className="text-xs font-bold dark:text-white text-slate-900">{s.label}</div>
              <div className="text-[11px] font-mono dark:text-slate-500 text-slate-500">{s.sublabel}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Bullet Points */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold dark:text-white text-slate-900">
              {t.about.heading}
            </h3>
            <p className="dark:text-slate-300 text-slate-700 leading-relaxed font-light">
              {t.about.p1}
            </p>
            <p className="dark:text-slate-300 text-slate-700 leading-relaxed font-light">
              {t.about.p2}
            </p>

            <div className="pt-4 space-y-3">
              {t.about.highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-1 rounded-md dark:bg-indigo-500/10 bg-indigo-100 text-indigo-600 dark:text-indigo-400 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm dark:text-slate-300 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Pillars Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.about.cards.map((card, i) => {
              const Icon = icons[i] || Layers;
              return (
                <div
                  key={i}
                  className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl dark:bg-indigo-600/20 bg-indigo-50 border dark:border-indigo-500/30 border-indigo-200 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold dark:text-white text-slate-900 mb-2">{card.title}</h4>
                  <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
