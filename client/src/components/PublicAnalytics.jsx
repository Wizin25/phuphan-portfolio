import React, { useEffect, useState } from 'react';
import { BarChart3, ExternalLink, Eye, MousePointerClick, Users, Activity } from 'lucide-react';

const dashboardUrl = 'https://cloud.umami.is/share/GUgusTJJmAWUaH8A';

const eventLabels = {
  vi: {
    project_open: 'Mở chi tiết dự án',
    skills_category_select: 'Chuyển nhóm năng lực',
    contact_click: 'Tương tác liên hệ',
    contact_form_success: 'Gửi form thành công',
  },
  en: {
    project_open: 'Project details opened',
    skills_category_select: 'Skill category selected',
    contact_click: 'Contact actions',
    contact_form_success: 'Contact form submitted',
  },
};

function GlassPanel({ children, className = '', ...props }) {
  const trackPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--glass-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--glass-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={trackPointer}
      {...props}
      className={`liquid-glass-surface liquid-glass-card relative isolate overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function PublicAnalytics({ lang }) {
  const [analytics, setAnalytics] = useState(null);
  const [status, setStatus] = useState('loading');
  const isVietnamese = lang === 'vi';

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/public-analytics', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Analytics request failed');
        return response.json();
      })
      .then((data) => {
        setAnalytics(data);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error');
      });

    return () => controller.abort();
  }, []);

  const number = (value) => new Intl.NumberFormat(isVietnamese ? 'vi-VN' : 'en-US').format(value || 0);
  const trackActionPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--glass-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--glass-y', `${event.clientY - rect.top}px`);
  };
  const metrics = [
    { label: isVietnamese ? 'Khách truy cập' : 'Visitors', value: analytics?.visitors, Icon: Users },
    { label: isVietnamese ? 'Lượt truy cập' : 'Visits', value: analytics?.visits, Icon: Activity },
    { label: isVietnamese ? 'Lượt xem trang' : 'Page views', value: analytics?.pageviews, Icon: Eye },
  ];

  return (
    <section id="public-analytics" className="relative border-t border-slate-200 py-16 dark:border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#BAFF39]/30 bg-[#BAFF39]/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#6E6E6E] dark:text-[#BAFF39]">
              <BarChart3 className="h-3.5 w-3.5" />
              {isVietnamese ? 'Số liệu công khai' : 'Public analytics'}
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {isVietnamese ? 'Portfolio đang được quan tâm thế nào?' : 'How is this portfolio performing?'}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {isVietnamese ? 'Số liệu 30 ngày gần nhất, cập nhật từ Umami.' : 'Stats from the last 30 days, refreshed from Umami.'}
            </p>
          </div>
          <a
            href={dashboardUrl}
            target="_blank"
            rel="noreferrer"
            onPointerMove={trackActionPointer}
            className="liquid-glass-surface relative isolate inline-flex w-fit items-center gap-2 overflow-hidden rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            {isVietnamese ? 'Mở dashboard đầy đủ' : 'Full dashboard'}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {status === 'loading' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label={isVietnamese ? 'Đang tải số liệu' : 'Loading analytics'}>
            {metrics.map(({ label }) => (
              <div key={label} className="liquid-glass-surface liquid-glass-card h-28 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {status === 'error' && (
          <GlassPanel className="p-6 text-sm text-slate-600 dark:text-slate-300" role="status">
            {isVietnamese ? 'Chưa tải được số liệu. Bạn có thể mở dashboard Umami để xem trực tiếp.' : 'Analytics could not be loaded. Open the Umami dashboard to view the live data.'}
          </GlassPanel>
        )}

        {status === 'ready' && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {metrics.map(({ label, value, Icon }) => (
                <GlassPanel key={label} className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</span>
                    <Icon className="h-4 w-4 text-[#83b91c] dark:text-[#BAFF39]" />
                  </div>
                  <div className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{number(value)}</div>
                </GlassPanel>
              ))}
            </div>

            <GlassPanel className="mt-4 p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <MousePointerClick className="h-4 w-4 text-[#83b91c] dark:text-[#BAFF39]" />
                {isVietnamese ? 'Tương tác nổi bật' : 'Selected interactions'}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(eventLabels[isVietnamese ? 'vi' : 'en']).map(([eventName, label]) => (
                  <div key={eventName} className="flex items-center justify-between gap-3 rounded-xl bg-[#BAFF39] px-4 py-3 text-slate-950 transition-colors hover:bg-[#c8ff62] dark:bg-[#BAFF39] dark:hover:bg-[#c8ff62]">
                    <span className="text-xs text-slate-950 dark:text-black">{label}</span>
                    <span className="font-mono text-sm font-bold text-slate-950 dark:text-black">{number(analytics.events?.[eventName])}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </>
        )}
      </div>
    </section>
  );
}
