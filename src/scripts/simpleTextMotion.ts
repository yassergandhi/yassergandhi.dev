import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ANIMATED_SELECTOR = [
  "[data-hero-kicker]",
  "[data-hero-line]",
  "[data-hero-copy]",
  "[data-origin-word]",
  "[data-loss-step]",
  "[data-loss-response]",
  "[data-loss-continuity]",
  "[data-loss-copy]",
  "[data-method-word]",
  "[data-method-trajectory]",
  "[data-method-remate]",
].join(",");

function restoreVisibleState(root: HTMLElement) {
  root.classList.remove("motion-ready");
  root.querySelectorAll<HTMLElement>(ANIMATED_SELECTOR).forEach((element) => {
    element.style.removeProperty("opacity");
    element.style.removeProperty("visibility");
    element.style.removeProperty("transform");
    element.style.removeProperty("translate");
    element.style.removeProperty("rotate");
    element.style.removeProperty("scale");
  });

  root
    .querySelector<HTMLElement>(".method-build")
    ?.style.removeProperty("--method-line-scale");
}

async function waitForFonts() {
  await Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => window.setTimeout(resolve, 1200)),
  ]);
}

async function initializeMotion() {
  const root = document.querySelector<HTMLElement>("[data-simple-motion]");
  if (!root) return;

  const currentStatus = root.dataset.motionStatus;
  if (
    currentStatus === "starting" ||
    currentStatus === "full" ||
    currentStatus === "fallback" ||
    currentStatus === "reduced"
  ) {
    return;
  }

  root.dataset.motionStatus = "starting";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    restoreVisibleState(root);
    root.dataset.motionStatus = "reduced";
    root.dataset.motionTriggers = "0";
    return;
  }

  let coreContext: gsap.Context | null = null;
  let continuityContext: gsap.Context | null = null;
  let responseSplit: { revert: () => void } | null = null;
  let continuitySplit: { revert: () => void } | null = null;

  try {
    await waitForFonts();
    root.classList.add("motion-ready");

    coreContext = gsap.context(() => {
      const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const originWords =
        gsap.utils.toArray<HTMLElement>("[data-origin-word]");
      const methodWords =
        gsap.utils.toArray<HTMLElement>("[data-method-word]");

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .from("[data-hero-kicker]", { autoAlpha: 0, duration: 0.25 })
        .from(
          heroLines,
          { autoAlpha: 0, y: 20, duration: 0.45, stagger: 0.08 },
          "-=0.05",
        )
        .from(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 10, duration: 0.3 },
          "-=0.12",
        );

      gsap.from(originWords, {
        autoAlpha: 0,
        y: 18,
        duration: 0.48,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".motion-origin",
          start: "top 84%",
          once: true,
        },
      });

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: ".motion-method",
            start: "top 82%",
            once: true,
          },
        })
        .from(methodWords, {
          autoAlpha: 0,
          y: 18,
          duration: 0.42,
          stagger: 0.08,
        })
        .from(
          "[data-method-trajectory]",
          { autoAlpha: 0, y: 18, duration: 0.38 },
          "-=0.1",
        )
        .from(
          "[data-method-remate]",
          { autoAlpha: 0, y: 18, duration: 0.32 },
          "-=0.16",
        )
        .fromTo(
          ".method-build",
          { "--method-line-scale": 0 },
          {
            "--method-line-scale": 1,
            duration: 0.38,
            ease: "power2.out",
          },
          "-=0.24",
        );
    }, root);

    let SplitTextPlugin = null as
      | null
      | (typeof import("gsap/SplitText"))["SplitText"];

    try {
      const module = await import("gsap/SplitText");
      SplitTextPlugin = module.SplitText;
      gsap.registerPlugin(SplitTextPlugin);
    } catch {
      SplitTextPlugin = null;
    }

    const lossSteps = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-loss-step]"),
    );
    const lossResponse = root.querySelector<HTMLElement>(
      "[data-loss-response]",
    );
    const lossContinuity = root.querySelector<HTMLElement>(
      "[data-loss-continuity]",
    );

    if (SplitTextPlugin && lossResponse && lossContinuity) {
      continuityContext = gsap.context(() => {
        responseSplit = SplitTextPlugin.create(lossResponse, {
          type: "words",
          aria: "auto",
          wordsClass: "loss-word",
        });
        continuitySplit = SplitTextPlugin.create(lossContinuity, {
          type: "words,chars",
          aria: "auto",
          wordsClass: "loss-word",
          charsClass: "loss-char",
        });

        const continuityWord = continuitySplit.words.find((word) =>
          word.textContent
            ?.toLocaleUpperCase("es-MX")
            .startsWith("CONTINUIDAD"),
        );
        const continuityChars = continuityWord
          ? continuitySplit.chars.filter((char) =>
              continuityWord.contains(char),
            )
          : continuitySplit.chars;

        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: ".motion-loss",
              start: "top 78%",
              once: true,
            },
            onComplete: () => {
              gsap.set(lossSteps, { clearProps: "all" });
              gsap.set("[data-loss-copy]", { clearProps: "all" });
              responseSplit?.revert();
              continuitySplit?.revert();
            },
          })
          .from(lossSteps, {
            autoAlpha: 0,
            y: 18,
            duration: 0.22,
            stagger: 0.08,
          })
          .from(
            responseSplit.words,
            { autoAlpha: 0, y: 20, duration: 0.3, stagger: 0.035 },
            "-=0.08",
          )
          .from(
            continuityChars,
            {
              autoAlpha: 0,
              x: () => gsap.utils.random(-4, 4, 1),
              y: () => gsap.utils.random(20, 30, 1),
              rotation: () => gsap.utils.random(-2, 2, 0.5),
              duration: 0.38,
              stagger: 0.016,
            },
            "-=0.12",
          )
          .from(
            "[data-loss-copy]",
            { autoAlpha: 0, y: 16, duration: 0.28 },
            "-=0.08",
          );
      }, root);

      root.dataset.motionStatus = "full";
    } else {
      continuityContext = gsap.context(() => {
        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: ".motion-loss",
              start: "top 78%",
              once: true,
            },
            onComplete: () => {
              gsap.set(
                [
                  ...lossSteps,
                  "[data-loss-response]",
                  "[data-loss-continuity]",
                  "[data-loss-copy]",
                ],
                { clearProps: "all" },
              );
            },
          })
          .from(lossSteps, {
            autoAlpha: 0,
            y: 18,
            duration: 0.22,
            stagger: 0.08,
          })
          .from(
            ["[data-loss-response]", "[data-loss-continuity]"],
            { autoAlpha: 0, y: 20, duration: 0.34, stagger: 0.08 },
            "-=0.06",
          )
          .from(
            "[data-loss-copy]",
            { autoAlpha: 0, y: 16, duration: 0.28 },
            "-=0.08",
          );
      }, root);

      root.dataset.motionStatus = "fallback";
    }

    ScrollTrigger.refresh();
    root.dataset.motionTriggers = String(
      ScrollTrigger.getAll().filter((trigger) =>
        root.contains(trigger.trigger as Node),
      ).length,
    );

    window.addEventListener(
      "pagehide",
      () => {
        continuityContext?.revert();
        coreContext?.revert();
        responseSplit?.revert();
        continuitySplit?.revert();
      },
      { once: true },
    );
  } catch {
    continuityContext?.revert();
    coreContext?.revert();
    responseSplit?.revert();
    continuitySplit?.revert();
    restoreVisibleState(root);
    root.dataset.motionStatus = "error";
    root.dataset.motionTriggers = "0";
  }
}

void initializeMotion();
