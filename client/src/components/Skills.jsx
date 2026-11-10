import React, { useState } from 'react';
import { Layout, Server, Database, Wrench, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Tilt, TiltContent } from '@animate-ui/react/primitives/effects/tilt';
import { trackPortfolioEvent } from '../analytics.js';

export default function Skills({ skills, t }) {
  const [activeTab, setActiveTab] = useState('frontend');
  const [ripple, setRipple] = useState(null);

  const trackGlassPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--glass-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--glass-y', `${event.clientY - rect.top}px`);
  };

  const rippleGlass = (event, skillName) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setRipple({ x: event.clientX - rect.left, y: event.clientY - rect.top, id: Date.now(), skillName });
  };

  const categories = [
    { key: 'frontend', label: t.skills.tabs.frontend, icon: Layout },
    { key: 'backend', label: t.skills.tabs.backend, icon: Server },
    { key: 'database', label: t.skills.tabs.database, icon: Database },
    { key: 'enterpriseAndTools', label: t.skills.tabs.enterpriseAndTools, icon: Wrench },
  ];

  const currentSkills = skills?.[activeTab] || [];

  return (
    <section id="skills" className="py-20 relative border-t dark:border-slate-900 border-slate-200 dark:bg-[#101010]/30 bg-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 dark:bg-indigo-500/10 bg-indigo-50 px-3 py-1 rounded-full border dark:border-indigo-500/20 border-indigo-200">
            {t.skills.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 mt-4 tracking-tight">
            {t.skills.title}
          </h2>
          <p className="dark:text-slate-400 text-slate-600 mt-4 leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  if (activeTab !== cat.key) {
                    trackPortfolioEvent('skills_category_select', { category: cat.key });
                    setActiveTab(cat.key);
                  }
                }}
                className={`relative isolate flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors ${isActive ? 'border-transparent text-white' : 'dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 border-slate-200 bg-slate-100/80 text-slate-700 hover:text-indigo-600'}`}
              >
                {isActive && <motion.span layoutId="skills-active-pill" className="absolute inset-0 -z-10 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/25" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <Icon className="relative z-10 w-4 h-4" />
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
          {currentSkills.map((skill, index) => (
            <motion.div key={skill.name} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            <Tilt maxTilt={5} perspective={900} className="h-full">
            <TiltContent onPointerMove={trackGlassPointer} onPointerDown={(event) => rippleGlass(event, skill.name)} className={`liquid-glass-surface liquid-glass-card h-full p-4 rounded-2xl transition-colors duration-300 hover:border-indigo-500/50 relative overflow-hidden group ${skill.highlight ? 'ring-1 ring-indigo-500/30' : ''}`}>
              <div className="relative z-10">
              {ripple?.skillName === skill.name && <motion.span key={ripple.id} className="liquid-glass-ripple" style={{ left: ripple.x, top: ripple.y }} initial={{ opacity: 0.5, scale: 0 }} animate={{ opacity: 0, scale: 7 }} transition={{ duration: 0.8, ease: 'easeOut' }} />}
              {skill.highlight && (
                <div className="mb-3 flex w-fit items-center gap-1 text-[10px] font-mono font-semibold px-2 py-1 rounded-full dark:bg-indigo-500/20 bg-indigo-50 dark:text-indigo-300 text-indigo-700 border dark:border-indigo-500/30 border-indigo-200">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{t.skills.keyStrength}</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg dark:bg-indigo-600/20 bg-indigo-100 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
                  0{index + 1}
                </div>
                <h4 className="font-semibold dark:text-white text-slate-900 text-base group-hover:text-indigo-500 transition-colors">
                  {skill.name}
                </h4>
              </div>

              {/* Skill Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono dark:text-slate-400 text-slate-500">
                  <span>{t.skills.proficiency}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full dark:bg-slate-800/80 bg-slate-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.65, delay: index * 0.04, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                  />
                </div>
              </div>
              </div>
            </TiltContent>
            </Tilt>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
