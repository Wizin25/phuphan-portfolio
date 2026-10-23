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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

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
    <div className="min-h-screen dark:bg-[#0a0d14] bg-slate-50 text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300">
      <Navbar 
        serverStatus={serverOnline}
        lang={lang}
        onToggleLang={toggleLang}
        theme={theme}
        onToggleTheme={toggleTheme}
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
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          lang={lang}
          t={t}
        />
      )}
    </div>
  );
}
