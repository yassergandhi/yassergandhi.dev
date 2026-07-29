const initializeRevealMotion = () => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal], [data-line]')];
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('data-reveal-ready', '');
      requestAnimationFrame(() => entry.target.setAttribute('data-visible', ''));
    } else if (entry.intersectionRatio === 0) {
      entry.target.removeAttribute('data-visible');
      entry.target.removeAttribute('data-reveal-ready');
    }
  }), { threshold: [0, 0.18] });

  elements.forEach((element) => observer.observe(element));
  addEventListener('pagehide', () => observer.disconnect(), { once: true });
  requestAnimationFrame(() => document.documentElement.dataset.motionReady = '');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRevealMotion, { once: true });
} else {
  initializeRevealMotion();
}
