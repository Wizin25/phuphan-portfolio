import React from 'react';
import { Terminal, Github, Mail, ArrowUp } from 'lucide-react';

export default function Footer({ profile, t }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t dark:border-slate-900 border-slate-200 dark:bg-[#07090e] bg-slate-50 dark:text-slate-400 text-slate-600 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold dark:text-white text-slate-900 text-sm block">Phan Tấn Phú</span>
              <span className="dark:text-slate-500 text-slate-500 font-mono text-[11px]">
                {t.footer.subtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Wizin25"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg dark:bg-slate-900 bg-white hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-300 text-slate-700 transition-colors border dark:border-slate-800 border-slate-200"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.emailPrimary}`}
              className="p-2 rounded-lg dark:bg-slate-900 bg-white hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-300 text-slate-700 transition-colors border dark:border-slate-800 border-slate-200"
              title={profile.emailPrimary}
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg dark:bg-indigo-600/20 bg-indigo-50 hover:bg-indigo-600 dark:hover:bg-indigo-600 dark:text-indigo-400 text-indigo-600 hover:text-white dark:hover:text-white transition-colors cursor-pointer border dark:border-indigo-500/30 border-indigo-200"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t dark:border-slate-900 border-slate-200 text-center dark:text-slate-500 text-slate-500 font-mono text-[11px]">
          © {new Date().getFullYear()} Phan Tan Phu ({profile.location}). {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
