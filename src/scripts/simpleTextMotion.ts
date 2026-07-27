import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

async function initializeMotion() {
  await Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, 1200)),
  ]);

  const root = document.querySelector<HTMLElement>("[data-simple-motion]");
  if (!root || root.dataset.motionInitialized === "true") return;

  root.dataset.motionInitialized = "true";

  const mm = gsap.matchMedia();

  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      reduced: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      if (context.conditions?.reduced) {
        root.dataset.motionMode = "reduced";
        return;
      }

      root.dataset.motionMode = "full";
      root.classList.add("motion-ready");

      const ctx = gsap.context(() => {
        const heroItems = [
          "[data-hero-kicker]",
          "[data-hero-line]",
          "[data-hero-copy]",
        ];
        const originWords =
          gsap.utils.toArray<HTMLElement>("[data-origin-word]");
        const lossSteps =
          gsap.utils.toArray<HTMLElement>("[data-loss-step]");
        const methodWords =
          gsap.utils.toArray<HTMLElement>("[data-method-word]");
        const lossResponse = root.querySelector<HTMLElement>(
          "[data-loss-response]",
        );
        const lossContinuity = root.querySelector<HTMLElement>(
          "[data-loss-continuity]",
        );

        gsap.set(heroItems, { autoAlpha: 0 });
        gsap.set("[data-hero-line]", { y: 24 });
        gsap.set(originWords, { autoAlpha: 0, y: 20 });
        gsap.set(methodWords, { autoAlpha: 0, y: 20 });
        gsap.set(["[data-method-trajectory]", "[data-method-remate]"], {
          autoAlpha: 0,
          y: 20,
        });

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

      if (lossResponse && lossContinuity) {
        const responseSplit = SplitText.create(lossResponse, {
          type: "words,chars",
          aria: "auto",
          wordsClass: "loss-word",
        });
        const continuitySplit = SplitText.create(lossContinuity, {
          type: "words,chars",
          aria: "auto",
          wordsClass: "loss-word",
        });
        const continuityWord = continuitySplit.words.find((word) =>
          word.textContent?.toLocaleUpperCase("es-MX").startsWith("CONTINUIDAD"),
        );
        const continuityChars = continuityWord
          ? continuitySplit.chars.filter((char) => continuityWord.contains(char))
          : continuitySplit.chars;

        const lossTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".motion-loss",
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power2.out" },
          onComplete: () => {
            gsap.set(lossSteps, { clearProps: "all" });
            gsap.set([...responseSplit.words, ...continuitySplit.chars], {
              clearProps: "opacity,visibility,transform",
            });
            gsap.set("[data-loss-copy]", { clearProps: "all" });
          },
        });

        lossTimeline
          .from(lossSteps, {
            autoAlpha: 0,
            y: 18,
            duration: 0.22,
            stagger: 0.07,
          })
          .from(
            responseSplit.words,
            { autoAlpha: 0, y: 18, duration: 0.32, stagger: 0.035 },
            "-=0.08",
          )
          .from(
            continuityChars,
            {
              autoAlpha: 0,
              x: () => gsap.utils.random(-6, 6, 1),
              y: () => gsap.utils.random(18, 36, 1),
              rotation: () => gsap.utils.random(-3, 3, 0.5),
              duration: 0.42,
              stagger: 0.018,
            },
            "-=0.14",
          )
          .from(
            "[data-loss-copy]",
            { autoAlpha: 0, y: 16, duration: 0.3 },
            "-=0.1",
          );
      }

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
        )
        .to(
          "[data-method-remate]",
          { autoAlpha: 1, y: 0, duration: 0.38 },
          "-=0.2",
        )
        .fromTo(
          ".method-build",
          { "--method-line-scale": 0 },
          {
            "--method-line-scale": 1,
            duration: 0.42,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }, root);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    },
  );

  window.addEventListener("pagehide", () => mm.revert(), { once: true });
}

void initializeMotion();
