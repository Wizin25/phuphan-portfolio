import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Mail, Sparkles, MapPin, Check, Copy, Terminal, Shield, Zap, Award } from 'lucide-react';

export default function Hero({ profile, lang, t }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const rolesEn = [
    "Full-Stack Software Engineer",
    "React 19 & TypeScript Specialist",
    ".NET 8 & Clean Architecture Dev",
    "Enterprise Systems & SAP Explorer"
  ];

  const rolesVi = [
    "Kỹ sư Phần mềm Full-Stack",
    "Chuyên gia React 19 & TypeScript",
    "Lập trình viên .NET 8 & Clean Architecture",
    "Nghiên cứu Hệ thống ERP & SAP S/4HANA"
  ];

  const currentRoles = lang === 'vi' ? rolesVi : rolesEn;

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % currentRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [currentRoles.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.emailPrimary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const techPills = [
    'React 19 / 18',
    'TypeScript',
    '.NET 8 Web API',
    'Node.js / Express',
    'SQL Server',
    'SAP S/4HANA & ABAP',
    'PayOS VietQR'
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden gradient-glow">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-500/10 blur-[90px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Info & Story (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Pill with Radar Pulse */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full dark:bg-slate-900/90 bg-white dark:border-indigo-500/30 border-indigo-200 border text-xs font-semibold shadow-md dark:shadow-indigo-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="dark:text-indigo-300 text-indigo-700 font-medium">
                {t.hero.status}
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold dark:text-white text-slate-900 tracking-tight leading-[1.12]">
                {t.hero.titlePrefix}{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>{" "}
                {t.hero.titleSuffix}
              </h1>

              {/* Dynamic Role Rotator */}
              <div className="mt-3 flex items-center gap-2 text-lg sm:text-xl font-mono text-indigo-600 dark:text-indigo-400 font-semibold h-8 overflow-hidden">
                <span className="text-slate-400 dark:text-slate-500">&gt;</span>
                <span className="transition-all duration-500 ease-in-out transform">
                  {currentRoles[roleIndex]}
                </span>
                <span className="w-2 h-5 bg-indigo-500 animate-pulse inline-block"></span>
              </div>
            </div>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg dark:text-slate-300 text-slate-600 leading-relaxed font-light max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Location & Quick Contact Badge */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg dark:bg-slate-900/60 bg-slate-100 dark:border-slate-800 border-slate-200 border text-xs font-mono dark:text-slate-300 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{lang === 'vi' ? profile.locationVi : profile.location}</span>
              </div>

              {/* Quick Copy Email */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg dark:bg-slate-900/60 bg-slate-100 hover:bg-indigo-50 dark:hover:bg-slate-800 dark:border-slate-800 border-slate-200 border text-xs font-mono dark:text-indigo-300 text-indigo-600 transition-all cursor-pointer group"
                title="Click to copy primary email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'vi' ? 'Đã sao chép!' : 'Copied!') : profile.emailPrimary}</span>
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl dark:bg-slate-800/90 bg-white hover:bg-slate-50 dark:hover:bg-slate-700/80 dark:text-slate-200 text-slate-800 font-semibold text-sm border dark:border-slate-700 border-slate-300 shadow-sm transition-all hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>{t.hero.contactBtn}</span>
              </a>

              <a
                href="https://github.com/Wizin25"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl dark:bg-slate-900/60 bg-white hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300 text-slate-700 text-sm border dark:border-slate-800 border-slate-200 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span className="font-mono text-xs">@Wizin25</span>
              </a>
            </div>

            {/* Core Tech Stack */}
            <div className="pt-4">
              <span className="text-xs uppercase font-mono dark:text-slate-400 text-slate-500 tracking-wider block mb-3 font-semibold">
                {t.hero.stackTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {techPills.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg dark:bg-slate-900/80 bg-white dark:border-slate-800 border-slate-200 border text-xs font-mono dark:text-slate-300 text-slate-700 shadow-sm hover:border-indigo-500/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Cyberpunk Avatar Showcase (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] group">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-400 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden dark:bg-[#121829] bg-white border dark:border-slate-700/80 border-slate-200 shadow-2xl p-3">
                
                {/* Photo Frame with Face Focus */}
                <div className="relative w-full h-[430px] sm:h-[480px] rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src="/avatar.jpg"
                    alt="Phan Tấn Phú - Full-Stack Software Engineer"
                    className="w-full h-full object-cover object-[center_17%] transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Gradient Overlays for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/40 to-transparent"></div>
                </div>

                {/* Floating Badge 1: Top Right Tech Skill */}
                <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-xl dark:bg-slate-900/90 bg-white/95 backdrop-blur-md border dark:border-indigo-500/40 border-indigo-200 shadow-lg flex items-center gap-2 transform -rotate-1 hover:rotate-0 transition-transform">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-mono font-bold dark:text-white text-slate-900">
                    Full-Stack .NET & React
                  </span>
                </div>

                {/* Floating Badge 2: Top Left Clean Code */}
                <div className="absolute top-6 left-6 px-3 py-1.5 rounded-xl dark:bg-slate-900/90 bg-white/95 backdrop-blur-md border dark:border-cyan-500/40 border-cyan-200 shadow-lg flex items-center gap-1.5 transform rotate-1 hover:rotate-0 transition-transform">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-mono font-semibold dark:text-cyan-300 text-cyan-700">
                    Clean Architecture
                  </span>
                </div>

                {/* Floating Badge 3: Bottom Left Project Metric */}
                <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl dark:bg-[#0c1222]/95 bg-white/95 backdrop-blur-md border dark:border-purple-500/40 border-purple-200 shadow-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    🚀
                  </div>
                  <div>
                    <span className="text-xs font-bold dark:text-white text-slate-900 block leading-tight">
                      119+ Commits
                    </span>
                    <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 block">
                      Frontend Lead @ SwapX
                    </span>
                  </div>
                </div>

                {/* Floating Badge 4: Bottom Right Status */}
                <div className="absolute bottom-6 right-6 px-3.5 py-2 rounded-xl dark:bg-[#0c1222]/95 bg-white/95 backdrop-blur-md border dark:border-emerald-500/40 border-emerald-200 shadow-xl flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-mono font-semibold dark:text-emerald-300 text-emerald-700">
                    FPTU Graduate
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
