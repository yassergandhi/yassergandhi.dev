const root = document.documentElement;

const initializeRevealMotion = () => {
  if (root.hasAttribute("data-motion-initialized")) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    root.removeAttribute("data-motion-capable");
    return;
  }

  const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-line], [data-reveal-item]"));
  document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    group.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach((item, index) => {
      item.style.setProperty("--reveal-order", String(index));
    });
  });

  revealElements.forEach((element) => {
    element.setAttribute("data-reveal-ready", "");
    const rect = element.getBoundingClientRect();
    if (rect.top < innerHeight && rect.bottom > 0) element.setAttribute("data-visible", "");
  });

  const footerWordmark = document.querySelector<HTMLElement>("[data-footer-wordmark]");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === footerWordmark && entry.isIntersecting) {
        footerWordmark.setAttribute("data-pulse", "");
        revealObserver.unobserve(footerWordmark);
        return;
      }
      if (entry.isIntersecting) entry.target.setAttribute("data-visible", "");
      else if (entry.intersectionRatio === 0) entry.target.removeAttribute("data-visible");
    });
  }, { threshold: [0, 0.18] });
  revealElements.forEach((element) => revealObserver.observe(element));

  if (footerWordmark) revealObserver.observe(footerWordmark);

  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-section]"));
  const sections = navLinks.map((link) => document.getElementById(link.dataset.navSection || "")).filter((section): section is HTMLElement => Boolean(section));
  let navObserver: IntersectionObserver | undefined;
  if (navLinks.length && sections.length) {
    navObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      navLinks.forEach((link) => {
        const current = link.dataset.navSection === active.target.id;
        link.toggleAttribute("data-active", current);
        if (current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-24% 0px -56%", threshold: [0, 0.2, 0.6] });
    sections.forEach((section) => navObserver?.observe(section));
  }

  root.setAttribute("data-motion-initialized", "");
  addEventListener("pagehide", () => {
    revealObserver.disconnect();
    navObserver?.disconnect();
  }, { once: true });
};

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeRevealMotion, { once: true });
else initializeRevealMotion();
