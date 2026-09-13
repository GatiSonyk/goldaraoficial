const TRACKING = {
  ga4: 'G-TGK0SBQ67Y',
  googleAds: '',
  metaPixel: '1607294577443562',
};

const CAMPAIGN_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'gclid', 'gbraid', 'wbraid', 'fbclid'
];

function readQuery() {
  const p = new URLSearchParams(location.search);
  return Object.fromEntries(CAMPAIGN_KEYS.filter((key) => p.has(key)).map((key) => [key, p.get(key)]));
}

function persistCampaign() {
  const data = readQuery();
  if (Object.keys(data).length) localStorage.setItem('goldara_campaign', JSON.stringify(data));
}

function campaignData() {
  try { return JSON.parse(localStorage.getItem('goldara_campaign') || '{}'); } catch { return {}; }
}

function loadScript(src, id) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.id = id;
  document.head.appendChild(script);
}

function initGoogle() {
  if (!TRACKING.ga4) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(TRACKING.ga4)}`, 'goldara-ga4-script');
  window.gtag('js', new Date());
  window.gtag('config', TRACKING.ga4, { send_page_view: true, transport_type: 'beacon' });
  if (TRACKING.googleAds) window.gtag('config', TRACKING.googleAds);
}

function initMeta() {
  if (!TRACKING.metaPixel || window.fbq) return;
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = true; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', TRACKING.metaPixel);
  window.fbq('track', 'PageView');
}

function initTracking() {
  persistCampaign();
  initGoogle();
  initMeta();
}

function whatsappUrl(message = 'Olá! Vim pelo site da Goldara e gostaria de atendimento.') {
  const data = campaignData();
  const extra = Object.entries(data)
    .filter(([key]) => key.startsWith('utm_'))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const query = encodeURIComponent(message);
  return extra
    ? `https://wa.me/5554996961875?text=${query}&${extra}`
    : `https://wa.me/5554996961875?text=${query}`;
}

function track(name, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
  if (typeof window.fbq === 'function') window.fbq('track', name, params);
}

function hydrate() {
  initTracking();
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    a.href = whatsappUrl(a.dataset.whatsapp || undefined);
    a.addEventListener('click', () => track('whatsapp_click', { location: a.dataset.location || 'site' }));
  });
  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => track(el.dataset.track, { location: el.dataset.location || 'site' }));
  });
}

document.addEventListener('DOMContentLoaded', hydrate);
window.GoldaraTracking = { TRACKING, track, whatsappUrl, campaignData };
