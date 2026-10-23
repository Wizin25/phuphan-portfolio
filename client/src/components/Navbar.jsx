import React, { useState, useEffect } from 'react';
import { Github, Menu, X, Sun, Moon, Globe } from 'lucide-react';

export default function Navbar({ serverStatus, lang, onToggleLang, theme, onToggleTheme, t }) {
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
        ? 'dark:bg-[#0a0d14]/90 bg-white/90 backdrop-blur-md dark:border-slate-800/80 border-slate-200/80 shadow-lg dark:shadow-black/40 shadow-slate-200/50 py-3' 
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
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0a0d14]" title="Available for hire"></span>
            </div>
            <div>
              <span className="font-bold text-lg dark:text-white text-slate-900 tracking-tight flex items-center gap-1.5">
                Phan Tấn Phú
              </span>
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
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-slate-800/80 bg-slate-100 hover:bg-indigo-50 dark:hover:bg-slate-700/80 border dark:border-slate-700/60 border-slate-200 text-xs font-mono font-bold dark:text-slate-200 text-slate-700 transition-all hover:scale-105 cursor-pointer shadow-sm"
              title="Switch Language (Chuyển đổi ngôn ngữ)"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span className={lang === 'en' ? 'text-indigo-500 font-extrabold' : 'text-slate-400'}>EN</span>
              <span className="text-slate-400">/</span>
              <span className={lang === 'vi' ? 'text-indigo-500 font-extrabold' : 'text-slate-400'}>VI</span>
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl dark:bg-slate-800/80 bg-slate-100 hover:bg-indigo-50 dark:hover:bg-slate-700/80 border dark:border-slate-700/60 border-slate-200 dark:text-amber-300 text-indigo-600 transition-all hover:scale-105 cursor-pointer shadow-sm"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

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
            <a
              href="#contact"
              className="hidden md:inline-flex px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all hover:scale-[1.02]"
            >
              {t.nav.contactMe}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl dark:bg-slate-800 bg-slate-100 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden dark:bg-[#0e1422] bg-white border-b dark:border-slate-800 border-slate-200 px-6 py-6 space-y-4 shadow-xl">
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
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
            >
              {t.nav.contactMe}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
