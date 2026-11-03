import React, { useState, useEffect } from 'react';
import { Github, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { ShimmeringText } from '@animate-ui/react/primitives/texts/shimmering';
import { ThemeToggler } from '@animate-ui/react/primitives/effects/theme-toggler';
import { LiquidButton } from './animate-ui/buttons/liquid';
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar({ serverStatus, lang, onToggleLang, theme, setTheme, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.education, href: '#education' },
    { name: t.nav.contact, href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'dark:bg-[#101010]/90 bg-white/90 backdrop-blur-md dark:border-slate-800/80 border-slate-200/80 shadow-lg dark:shadow-black/40 shadow-slate-200/50 py-3' 
        : 'bg-transparent py-5'
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
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium dark:text-slate-300 text-slate-600 dark:hover:text-indigo-400 hover:text-indigo-600 transition-colors"
              >
                {link.name}
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

            {/* Mobile Menu Button */}
            <LiquidButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 rounded-xl p-0 text-slate-700 dark:text-slate-300 lg:hidden [--liquid-button-background-color:#f1f5f9] [--liquid-button-color:#6366f1] dark:[--liquid-button-background-color:#1e293b]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </LiquidButton>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence initial={false}>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -8 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -8 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="lg:hidden dark:bg-[#101010] bg-white border-b dark:border-slate-800 border-slate-200 px-6 py-6 space-y-4 shadow-xl overflow-hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium dark:text-slate-200 text-slate-800 hover:text-indigo-500 py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between">
            <a
              href="https://github.com/Wizin25"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm dark:text-slate-300 text-slate-700 font-mono"
            >
              <Github className="w-4 h-4" />
              <span>@Wizin25</span>
            </a>
            <LiquidButton asChild className="h-8 rounded-lg px-4 text-xs font-semibold text-white [--liquid-button-background-color:#BAFF39] [--liquid-button-color:#6E6E6E]">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.contactMe}
            </a>
            </LiquidButton>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
