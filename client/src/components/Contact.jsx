import React, { useState } from 'react';
import { Mail, MapPin, Github, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact({ profile, lang, t }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          text: t.contact.successMsg
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          text: data.error || t.contact.errorMsg
        });
      }
    } catch (err) {
      console.error('Contact error:', err);
      setStatus({
        type: 'error',
        text: t.contact.errorMsg
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative border-t dark:border-slate-900 border-slate-200 dark:bg-[#0c101a]/50 bg-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 dark:bg-indigo-500/10 bg-indigo-50 px-3 py-1 rounded-full border dark:border-indigo-500/20 border-indigo-200">
            {t.contact.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 mt-4 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="dark:text-slate-400 text-slate-600 mt-4 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-4">{t.contact.cardTitle}</h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl dark:bg-indigo-600/20 bg-indigo-50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono dark:text-slate-400 text-slate-500 block">{t.contact.emailLabel}</span>
                  <div className="space-y-1 mt-1">
                    <a
                      href={`mailto:${profile.emailPrimary}`}
                      className="dark:text-white text-slate-900 hover:text-indigo-600 font-medium text-sm transition-colors block"
                    >
                      {profile.emailPrimary} <span className="text-xs text-indigo-500 font-mono">(Primary)</span>
                    </a>
                    <a
                      href={`mailto:${profile.emailSecondary}`}
                      className="dark:text-slate-300 text-slate-700 hover:text-indigo-600 font-medium text-xs transition-colors block font-mono"
                    >
                      {profile.emailSecondary}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl dark:bg-indigo-600/20 bg-indigo-50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono dark:text-slate-400 text-slate-500 block">{t.contact.githubLabel}</span>
                  <a
                    href="https://github.com/Wizin25"
                    target="_blank"
                    rel="noreferrer"
                    className="dark:text-white text-slate-900 hover:text-indigo-600 font-medium text-sm transition-colors mt-1 block font-mono"
                  >
                    github.com/Wizin25
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl dark:bg-indigo-600/20 bg-indigo-50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono dark:text-slate-400 text-slate-500 block">{t.contact.locLabel}</span>
                  <span className="dark:text-white text-slate-900 font-medium text-sm mt-1 block">
                    {lang === 'vi' ? profile.locationVi : profile.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="p-4 rounded-xl dark:bg-emerald-500/10 bg-emerald-50 border dark:border-emerald-500/20 border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs leading-relaxed flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
              <span>{t.contact.statusText}</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-5">
              {status && (
                <div
                  className={`p-4 rounded-xl text-sm flex items-start gap-3 ${
                    status.type === 'success'
                      ? 'dark:bg-emerald-500/10 bg-emerald-50 border dark:border-emerald-500/30 border-emerald-200 text-emerald-700 dark:text-emerald-300'
                      : 'dark:bg-rose-500/10 bg-rose-50 border dark:border-rose-500/30 border-rose-200 text-rose-700 dark:text-rose-300'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono dark:text-slate-300 text-slate-700 mb-2 font-medium">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl dark:bg-slate-900/80 bg-white border dark:border-slate-700/80 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono dark:text-slate-300 text-slate-700 mb-2 font-medium">
                    {t.contact.emailInputLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl dark:bg-slate-900/80 bg-white border dark:border-slate-700/80 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono dark:text-slate-300 text-slate-700 mb-2 font-medium">
                  {t.contact.subjectLabel}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.contact.subjectPlaceholder}
                  className="w-full px-4 py-3 rounded-xl dark:bg-slate-900/80 bg-white border dark:border-slate-700/80 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono dark:text-slate-300 text-slate-700 mb-2 font-medium">
                  {t.contact.msgLabel}
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.msgPlaceholder}
                  className="w-full px-4 py-3 rounded-xl dark:bg-slate-900/80 bg-white border dark:border-slate-700/80 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none shadow-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.contact.sendingBtn}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.contact.sendBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
