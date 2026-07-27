import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!reduceMotion) {
  void document.fonts.ready.then(() => {
    const root = document.querySelector<HTMLElement>("[data-simple-motion]");
    if (!root) return;

    root.classList.add("motion-ready");

    const ctx = gsap.context(() => {
      const heroItems = [
        "[data-hero-kicker]",
        "[data-hero-line]",
        "[data-hero-copy]",
      ];
      const originWords = gsap.utils.toArray<HTMLElement>("[data-origin-word]");
      const lossStamps = gsap.utils.toArray<HTMLElement>("[data-loss-stamp]");
      const methodWords = gsap.utils.toArray<HTMLElement>("[data-method-word]");

      gsap.set(heroItems, { autoAlpha: 0 });
      gsap.set("[data-hero-line]", { y: 24 });
      gsap.set(originWords, { autoAlpha: 0, y: 20 });
      gsap.set(lossStamps, { autoAlpha: 0, y: 20, scale: 0.98 });
      gsap.set(["[data-loss-question]", "[data-loss-copy]"], {
        autoAlpha: 0,
        y: 20,
      });
      gsap.set(methodWords, { autoAlpha: 0, y: 20 });
      gsap.set("[data-method-trajectory]", { autoAlpha: 0, y: 20 });

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to("[data-hero-kicker]", { autoAlpha: 1, duration: 0.3 })
        .to(
          "[data-hero-line]",
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
          "-=0.12",
        )
        .to("[data-hero-copy]", { autoAlpha: 1, duration: 0.3 }, "-=0.2");

      gsap
        .timeline({
          scrollTrigger: { trigger: ".motion-origin", start: "top 82%", once: true },
        })
        .to(originWords, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
        });

      gsap
        .timeline({
          scrollTrigger: { trigger: ".motion-loss", start: "top 82%", once: true },
          defaults: { ease: "power2.out" },
        })
        .to(lossStamps, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
        })
        .to("[data-loss-question]", { autoAlpha: 1, y: 0, duration: 0.5 })
        .to("[data-loss-copy]", { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.2");

      gsap
        .timeline({
          scrollTrigger: { trigger: ".motion-method", start: "top 82%", once: true },
          defaults: { ease: "power2.out" },
        })
        .to(methodWords, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.09,
        })
        .to(
          "[data-method-trajectory]",
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.12",
        );

    }, root);

    window.addEventListener("pagehide", () => ctx.revert(), { once: true });
  });
}

document.querySelectorAll<HTMLDetailsElement>(".nav-mobile").forEach((menu) => {
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.removeAttribute("open"));
  });
});
