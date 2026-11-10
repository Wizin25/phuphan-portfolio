const pendingEvents = [];
let initialized = false;
let scriptFailed = false;
const defaultWebsiteId = '91a35de1-811b-414b-a73d-3e0396a33633';

const allowedEventData = {
  project_open: {
    project: new Set([
      'swapx-ev-bss',
      'remakers-studio',
      'cat-dog-platform',
      'perfume-store-mobile',
      'sap-erp-abap',
      'python-automation-scraper',
    ]),
  },
  skills_category_select: {
    category: new Set(['frontend', 'backend', 'database', 'enterpriseAndTools']),
  },
  contact_click: {
    type: new Set([
      'primary_email',
      'secondary_email',
      'github',
      'copy_email',
      'contact_cta',
    ]),
  },
  contact_form_success: null,
};

const sanitizeEventData = (eventName, data) => {
  if (!Object.hasOwn(allowedEventData, eventName)) return null;
  const allowedProperties = allowedEventData[eventName];
  if (allowedProperties === null) return {};
  if (!data || typeof data !== 'object') return null;

  const safeData = {};
  Object.entries(allowedProperties).forEach(([key, allowedValues]) => {
    if (allowedValues.has(data[key])) safeData[key] = data[key];
  });

  return Object.keys(safeData).length ? safeData : null;
};

export function trackPortfolioEvent(eventName, data) {
  const safeData = sanitizeEventData(eventName, data);
  if (safeData === null) return;

  const event = { eventName, data: safeData };
  if (typeof window.umami?.track === 'function') {
    if (Object.keys(event.data).length) window.umami.track(event.eventName, event.data);
    else window.umami.track(event.eventName);
  } else if (!scriptFailed && pendingEvents.length < 50) {
    pendingEvents.push(event);
  }
}

export function initializeUmamiAnalytics() {
  if (initialized) return;
  initialized = true;

  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim() || defaultWebsiteId;

  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://cloud.umami.is/script.js';
  script.dataset.websiteId = websiteId;
  script.dataset.autoTrack = 'false';
  script.dataset.excludeSearch = 'true';
  script.dataset.excludeHash = 'true';
  script.dataset.doNotTrack = 'true';
  script.addEventListener('load', () => {
    if (typeof window.umami?.track !== 'function') {
      scriptFailed = true;
      pendingEvents.length = 0;
      return;
    }

    window.umami.track();
    pendingEvents.splice(0).forEach(({ eventName, data }) => {
      if (Object.keys(data).length) window.umami.track(eventName, data);
      else window.umami.track(eventName);
    });
  }, { once: true });
  script.addEventListener('error', () => {
    scriptFailed = true;
    pendingEvents.length = 0;
  }, { once: true });
  document.head.appendChild(script);
}
