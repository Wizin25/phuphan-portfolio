const pendingClicks = [];
let initialized = false;
let scriptFailed = false;
const defaultWebsiteId = '91a35de1-811b-414b-a73d-3e0396a33633';

const getClickLabel = (element) => {
  const rawLabel = element.getAttribute('aria-label')
    || element.getAttribute('title')
    || element.textContent
    || (element.matches('input') ? element.getAttribute('value') : '')
    || '';
  const label = rawLabel
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[redacted]')
    .replace(/\b\+?\d[\d\s().-]{7,}\d\b/g, '[redacted]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);

  return label || (element.matches('a, [role="link"]') ? 'link' : 'button');
};

const sendClick = ({ label, element }) => {
  if (typeof window.umami?.track === 'function') {
    window.umami.track('click', { label, element });
  } else if (!scriptFailed && pendingClicks.length < 50) {
    pendingClicks.push({ label, element });
  }
};

const handleClick = (event) => {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  const control = target?.closest(
    'a, button, [role="link"], [role="button"], input[type="button"], input[type="submit"], input[type="reset"]'
  );
  if (!control) return;

  sendClick({
    label: getClickLabel(control),
    element: control.matches('a, [role="link"]') ? 'link' : 'button',
  });
};

export function initializeClickAnalytics() {
  if (initialized) return;
  initialized = true;

  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim() || defaultWebsiteId;

  document.addEventListener('click', handleClick);

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
      pendingClicks.length = 0;
      return;
    }

    window.umami.track();
    pendingClicks.splice(0).forEach(({ label, element }) => {
      window.umami.track('click', { label, element });
    });
  }, { once: true });
  script.addEventListener('error', () => {
    scriptFailed = true;
    pendingClicks.length = 0;
  }, { once: true });
  document.head.appendChild(script);
}
