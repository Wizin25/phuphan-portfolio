import React, { useState } from 'react';
import { Layout, Server, Database, Wrench, Sparkles } from 'lucide-react';

export default function Skills({ skills, t }) {
  const [activeTab, setActiveTab] = useState('frontend');

  const categories = [
    { key: 'frontend', label: t.skills.tabs.frontend, icon: Layout },
    { key: 'backend', label: t.skills.tabs.backend, icon: Server },
    { key: 'database', label: t.skills.tabs.database, icon: Database },
    { key: 'enterpriseAndTools', label: t.skills.tabs.enterpriseAndTools, icon: Wrench },
  ];

  const currentSkills = skills?.[activeTab] || [];

  return (
    <section id="skills" className="py-20 relative border-t dark:border-slate-900 border-slate-200 dark:bg-[#0a0d14] bg-white">
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
                onClick={() => setActiveTab(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                    : 'dark:bg-slate-900/80 bg-slate-100 dark:text-slate-300 text-slate-700 hover:text-indigo-600 dark:hover:text-white dark:hover:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSkills.map((skill, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl glass-card transition-all duration-300 hover:border-indigo-500/50 relative overflow-hidden group ${
                skill.highlight ? 'ring-1 ring-indigo-500/30' : ''
              }`}
            >
              {skill.highlight && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full dark:bg-indigo-500/20 bg-indigo-50 dark:text-indigo-300 text-indigo-700 border dark:border-indigo-500/30 border-indigo-200">
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
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
