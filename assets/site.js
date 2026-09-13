const TRACKING = { ga4: '', googleAds: '', metaPixel: '' };

function readQuery() {
  const p = new URLSearchParams(location.search);
  const keys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','gbraid','wbraid','fbclid'];
  return Object.fromEntries(keys.filter(k => p.has(k)).map(k => [k, p.get(k)]));
}

function persistCampaign() {
  const data = readQuery();
  if (Object.keys(data).length) localStorage.setItem('goldara_campaign', JSON.stringify(data));
}

function campaignData() {
  try { return JSON.parse(localStorage.getItem('goldara_campaign') || '{}'); } catch { return {}; }
}

function whatsappUrl(message = 'Olá! Vim pelo site da Goldara e gostaria de atendimento.') {
  const base = `https://wa.me/5554996961875?text=${encodeURIComponent(message)}`;
  const data = campaignData();
  const extra = Object.entries(data).filter(([k]) => k.startsWith('utm_')).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  return extra ? `${base}&${extra}` : base;
}

function track(name, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
  if (typeof window.fbq === 'function') window.fbq('track', name, params);
}

function hydrate() {
  persistCampaign();
  document.querySelectorAll('[data-whatsapp]').forEach(a => {
    a.href = whatsappUrl(a.dataset.whatsapp || undefined);
    a.addEventListener('click', () => track('whatsapp_click', { location: a.dataset.location || 'site' }));
  });
  document.querySelectorAll('[data-track]').forEach(el => el.addEventListener('click', () => track(el.dataset.track, { location: el.dataset.location || 'site' })));
}

document.addEventListener('DOMContentLoaded', hydrate);
window.GoldaraTracking = { TRACKING, track, whatsappUrl };
