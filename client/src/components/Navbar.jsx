import React, { useState, useEffect } from 'react';
import { Github, Sun, Moon, Globe, UserRound, Sparkles, BriefcaseBusiness, GraduationCap, Mail } from 'lucide-react';
import { ShimmeringText } from '@animate-ui/react/primitives/texts/shimmering';
import { ThemeToggler } from '@animate-ui/react/primitives/effects/theme-toggler';
import { LiquidButton } from './animate-ui/buttons/liquid';
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar({ serverStatus, lang, onToggleLang, theme, setTheme, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about', id: 'about', Icon: UserRound },
    { name: t.nav.skills, href: '#skills', id: 'skills', Icon: Sparkles },
    { name: t.nav.projects, href: '#projects', id: 'projects', Icon: BriefcaseBusiness },
    { name: t.nav.education, href: '#education', id: 'education', Icon: GraduationCap },
    { name: t.nav.contact, href: '#contact', id: 'contact', Icon: Mail }
  ];

  useEffect(() => {
    const sections = navLinks.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [lang]);

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'dark:bg-[#101010]/80 bg-white/75 backdrop-blur-xl dark:border-white/10 border-black/5 shadow-lg dark:shadow-black/30 shadow-slate-200/30 py-2.5' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand with Avatar */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 group-hover:scale-105 transition-transform shadow-md shadow-indigo-500/25">
                <img
                  src="/avatar.jpg"
                  alt="Phan Tấn Phú"
                  className="w-full h-full rounded-full object-cover object-[center_18%]"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#101010]" title="Available for hire"></span>
            </div>
            <div>
              <ShimmeringText
                text="Phan Tấn Phú"
                duration={3}
                color={theme === 'dark' ? '#FFFFFF' : '#6E6E6E'}
                shimmeringColor="#BAFF39"
                className="flex items-center gap-1.5 text-lg font-bold tracking-tight"
              />
              <span className="block text-xs font-mono text-indigo-500 dark:text-indigo-400 font-medium">Software Engineer</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 rounded-2xl border border-black/[0.06] bg-white/55 p-1.5 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.035]">
            {navLinks.map(({ name, href, id }) => (
              <a key={id} href={href} onClick={() => setActiveSection(id)} aria-current={activeSection === id ? 'location' : undefined}
                className={`relative isolate rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${activeSection === id ? 'text-[#20250f] dark:text-[#d8ff8c]' : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}`}>
                {activeSection === id && <motion.span layoutId="orbit-nav-active" className="absolute inset-0 -z-10 rounded-xl border border-[#baff39]/50 bg-[#baff39]/15 shadow-[0_0_22px_rgba(186,255,57,0.13)] dark:bg-[#baff39]/10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                {name}
              </a>
            ))}
          </nav>

          {/* Controls & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher (EN / VI) */}
            <LiquidButton
              onClick={onToggleLang}
              className="h-9 rounded-xl border border-slate-200 px-3 text-xs font-mono font-bold text-slate-700 dark:border-slate-700/60 dark:text-slate-200 [--liquid-button-background-color:#f1f5f9] [--liquid-button-color:#6366f1] dark:[--liquid-button-background-color:#1e293b]"
              title="Switch Language (Chuyển đổi ngôn ngữ)"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span className={lang === 'en' ? 'text-indigo-500 font-extrabold' : 'text-slate-400'}>EN</span>
              <span className="text-slate-400">/</span>
              <span className={lang === 'vi' ? 'text-indigo-500 font-extrabold' : 'text-slate-400'}>VI</span>
            </LiquidButton>

            {/* Dark / Light Mode Toggle Button */}
            <ThemeToggler theme={theme} resolvedTheme={theme} setTheme={setTheme}>
              {({ effective, toggleTheme }) => (
                <LiquidButton
                  onClick={() => toggleTheme(effective === 'dark' ? 'light' : 'dark')}
                  className="h-9 w-9 rounded-xl border border-slate-200 p-0 text-indigo-600 dark:border-slate-700/60 dark:text-amber-300 [--liquid-button-background-color:#f1f5f9] [--liquid-button-color:#6366f1] dark:[--liquid-button-background-color:#1e293b]"
                  aria-label={effective === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {effective === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </LiquidButton>
              )}
            </ThemeToggler>

            {/* GitHub */}
            <a
              href="https://github.com/Wizin25"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex p-2 rounded-xl dark:bg-slate-800/60 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 dark:hover:text-white border dark:border-slate-700/50 border-slate-200 transition-all hover:scale-105"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Contact CTA */}
            <LiquidButton
              asChild
              className="hidden md:inline-flex h-9 rounded-xl px-4 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 [--liquid-button-background-color:#BAFF39] [--liquid-button-color:#6E6E6E]"
            >
            <a
              href="#contact"
            >
              {t.nav.contactMe}
            </a>
            </LiquidButton>

          </div>
        </div>
      </div>

    </header>
    <nav aria-label="Mobile navigation" className="fixed inset-x-4 bottom-3 z-[60] lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around rounded-2xl border border-black/10 bg-white/80 p-1.5 shadow-[0_12px_45px_rgba(0,0,0,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#171717]/85 dark:shadow-black/50">
        {navLinks.map(({ name, href, id, Icon }) => (
          <a key={id} href={href} onClick={() => setActiveSection(id)} aria-label={name} aria-current={activeSection === id ? 'location' : undefined}
            className={`relative isolate flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors ${activeSection === id ? 'text-[#252b14] dark:text-[#d8ff8c]' : 'text-slate-500 dark:text-slate-400'}`}>
            {activeSection === id && <motion.span layoutId="orbit-mobile-active" className="absolute inset-0 -z-10 rounded-xl bg-[#baff39]/45 dark:bg-[#baff39]/15" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
            <Icon className={`h-[18px] w-[18px] transition-transform ${activeSection === id ? 'scale-110' : ''}`} strokeWidth={activeSection === id ? 2.4 : 1.8} />
            <AnimatePresence initial={false}>
              {activeSection === id && <motion.span initial={{ opacity: 0, y: 4, width: 0 }} animate={{ opacity: 1, y: 0, width: 'auto' }} exit={{ opacity: 0, y: 3, width: 0 }} className="max-w-full overflow-hidden whitespace-nowrap text-[10px] font-semibold">{name}</motion.span>}
            </AnimatePresence>
          </a>
        ))}
      </div>
    </nav>
    </>
  );
}
