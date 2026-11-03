import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { portfolioData } from './data/portfolioData';
import { GlyphBackground } from './components/animate-ui/backgrounds/glyph';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [portfolio, setPortfolio] = useState(portfolioData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);

  // Theme state ('dark' | 'light') with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('phu_portfolio_theme') || 'dark';
  });

  // Language state ('en' | 'vi') with localStorage persistence
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('phu_portfolio_lang') || 'vi';
  });

  // Apply theme class to <html> tag
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('phu_portfolio_theme', theme);
  }, [theme]);

  // Persist language
  useEffect(() => {
    localStorage.setItem('phu_portfolio_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'vi' : 'en'));
  };

  // Current translation dictionary
  const t = portfolio.translations[lang] || portfolio.translations.en;

  useEffect(() => {
    // Check backend health
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          setServerOnline(true);
        }
      } catch {
        setServerOnline(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="relative isolate min-h-screen">
      <GlyphBackground
        className="pointer-events-none fixed inset-0 z-0 bg-white text-indigo-400 dark:bg-[#101010] dark:text-indigo-300"
        glowColor="#BAFF39"
        shapeColor="#BAFF39"
        fontSize={14}
        interactive
      />
      <div className="relative z-10 flex min-h-screen flex-col justify-between text-slate-800 transition-colors duration-300 dark:text-white">
      <Navbar 
        serverStatus={serverOnline}
        lang={lang}
        onToggleLang={toggleLang}
        theme={theme}
        setTheme={setTheme}
        t={t}
      />

      <main className="flex-grow">
        <Hero 
          profile={portfolio.profile} 
          lang={lang}
          t={t} 
        />
        <About 
          t={t} 
        />
        <Skills 
          skills={portfolio.skills} 
          t={t} 
        />
        <Projects 
          projects={portfolio.projects} 
          onSelectProject={(project) => setSelectedProject(project)} 
          lang={lang}
          t={t} 
        />
        <Experience 
          education={portfolio.education} 
          t={t} 
        />
        <Contact 
          profile={portfolio.profile} 
          lang={lang}
          t={t} 
        />
      </main>

      <Footer 
        profile={portfolio.profile} 
        t={t} 
      />

      {/* Project Details Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            lang={lang}
            t={t}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
