import { useLayoutEffect, useRef, createElement } from "react";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import { useGsapRefreshOnReady } from "../../hooks/useGsapRefreshOnReady";
import DiscoverScene from "./DiscoverScene";
import ArchitectScene from "./ArchitectScene";
import BuildScene from "./BuildScene";
import ImproveScene from "./ImproveScene";
import styles from "./Process.module.scss";

const STAGES = [
  { id: "discover", Component: DiscoverScene },
  { id: "architect", Component: ArchitectScene },
  { id: "build", Component: BuildScene },
  { id: "improve", Component: ImproveScene },
];

const Process = () => {
  const sectionRef = useRef(null);
  useGsapRefreshOnReady([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let ctx;
    let cancelled = false;

    const setupAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (window.lenis) {
        window.lenis.on("scroll", ScrollTrigger.update);
      }

      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray(`.${styles.stagePanel}`);
        if (!panels || panels.length === 0) return;

        // Initially hide all panels except the first one
        gsap.set(panels, { autoAlpha: 0, y: 36, pointerEvents: "none" });
        gsap.set(panels[0], { autoAlpha: 1, y: 0, pointerEvents: "auto" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        window.processScrollTrigger = timeline.scrollTrigger;

        // Transition 1: Discover -> Architect
        timeline
          .to(panels[0], { autoAlpha: 0, y: -36, duration: 0.45, ease: "power2.inOut", pointerEvents: "none" }, 0.25)
          .fromTo(
            panels[1],
            { autoAlpha: 0, y: 36, pointerEvents: "none" },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", pointerEvents: "auto" },
            0.35
          );

        // Transition 2: Architect -> Build
        timeline
          .to(panels[1], { autoAlpha: 0, y: -36, duration: 0.45, ease: "power2.inOut", pointerEvents: "none" }, 0.95)
          .fromTo(
            panels[2],
            { autoAlpha: 0, y: 36, pointerEvents: "none" },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", pointerEvents: "auto" },
            1.05
          );

        // Transition 3: Build -> Improve
        timeline
          .to(panels[2], { autoAlpha: 0, y: -36, duration: 0.45, ease: "power2.inOut", pointerEvents: "none" }, 1.65)
          .fromTo(
            panels[3],
            { autoAlpha: 0, y: 36, pointerEvents: "none" },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", pointerEvents: "auto" },
            1.75
          );

        // Dwell buffer on Improve before unpinning
        timeline.to({}, { duration: 0.45 });
      }, section);

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    };

    setupAnimation();

    return () => {
      cancelled = true;
      delete window.processScrollTrigger;
      ctx?.revert();
    };
  }, []);

  return (
    <section className={styles.process} id="process" ref={sectionRef}>
      <SectionAtmosphere accent="#10b981" secondary="#f59e0b" side="left" subtle />
      <div className={styles.stageViewport}>
        {STAGES.map((stage) => (
          <div key={stage.id} className={styles.stagePanel}>
            {createElement(stage.Component)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
