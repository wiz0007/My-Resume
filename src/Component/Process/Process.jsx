import { useLayoutEffect, useRef, createElement } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import { useStaticHeroMotion, useReducedMotionPreference } from "../../hooks/useMediaPreferences";
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

// Static document geometry: the browser owns sticking; motion only changes
// panel opacity/translation. No pin spacer, delayed refresh or scroll snapping.
const StickyPanel = ({ stage, index, progress }) => {
  const center = index / (STAGES.length - 1);
  const fadeEdge = 1 / (STAGES.length - 1) - 0.08;
  const points = [center - fadeEdge, center - 0.08, center + 0.08, center + fadeEdge];
  const opacity = useTransform(progress, points, [0, 1, 1, 0]);
  const y = useTransform(progress, points, [18, 0, 0, -18]);
  const visibility = useTransform(opacity, value => value <= 0.001 ? "hidden" : "visible");
  const pointerEvents = useTransform(opacity, value => value < 0.5 ? "none" : "auto");
  return (
    <motion.div id={`process-${stage.id}`} className={styles.stagePanel}
      style={{ opacity, y, visibility, pointerEvents }}>
      {createElement(stage.Component)}
    </motion.div>
  );
};

const StickyProcess = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // The 340svh section minus its 100svh sticky frame gives 240svh travel.
  // Both offsets use viewport top, so address-bar height changes do not
  // change the crossfade range while the user is scrolling.
  const scrollYProgress = useTransform(sectionProgress, [0, 240 / 340], [0, 1]);
  return (
    <section ref={sectionRef} id="process"
      className={`${styles.process} ${styles.stickyProcess}`} data-process-sticky="true">
      <div className={styles.stickyFrame}>
        <SectionAtmosphere accent="#10b981" secondary="#f59e0b" side="left" subtle />
        <div className={styles.stageViewport}>
          {STAGES.map((stage, index) => (
            <StickyPanel key={stage.id} stage={stage} index={index} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const sectionRef = useRef(null);
  const compactMotion = useStaticHeroMotion();
  const naturalFlow = useReducedMotionPreference();
  const stickyMotion = compactMotion && !naturalFlow;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (compactMotion) return undefined;

    let ctx;
    let timer;
    let detachScroll;
    let cancelled = false;

    const setupAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (window.lenis) {
        const lenis = window.lenis;
        lenis.on("scroll", ScrollTrigger.update);
        detachScroll = () => lenis.off("scroll", ScrollTrigger.update);
      }

      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray(`.${styles.stagePanel}`);
        if (!panels || panels.length === 0) return;

        // Stage 1 (Discover) sits in place statically with no entrance fade
        gsap.set(panels[0], { autoAlpha: 1, y: 0, pointerEvents: "auto" });
        if (panels.length > 1) {
          gsap.set(panels.slice(1), { autoAlpha: 0, y: 36, pointerEvents: "none" });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        window.processScrollTrigger = timeline.scrollTrigger;

        // Stage 1 (Discover) holds initially, then transitions to Stage 2 (Architect)
        timeline
          .to({}, { duration: 0.35 }) // initial hold on Discover
          // Transition 1: Discover -> Architect
          .to(panels[0], { autoAlpha: 0, y: -36, duration: 0.45, ease: "power2.inOut", pointerEvents: "none" })
          .fromTo(
            panels[1],
            { autoAlpha: 0, y: 36, pointerEvents: "none" },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", pointerEvents: "auto" },
            "<0.1"
          )
          // Dwell on Architect
          .to({}, { duration: 0.35 })
          // Transition 2: Architect -> Build
          .to(panels[1], { autoAlpha: 0, y: -36, duration: 0.45, ease: "power2.inOut", pointerEvents: "none" })
          .fromTo(
            panels[2],
            { autoAlpha: 0, y: 36, pointerEvents: "none" },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", pointerEvents: "auto" },
            "<0.1"
          )
          // Dwell on Build
          .to({}, { duration: 0.35 })
          // Transition 3: Build -> Improve
          .to(panels[2], { autoAlpha: 0, y: -36, duration: 0.45, ease: "power2.inOut", pointerEvents: "none" })
          .fromTo(
            panels[3],
            { autoAlpha: 0, y: 36, pointerEvents: "none" },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", pointerEvents: "auto" },
            "<0.1"
          )
          // Dwell on Improve before unpinning
          .to({}, { duration: 0.4 });
      }, section);

      timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);


    };

    setupAnimation();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      detachScroll?.();
      delete window.processScrollTrigger;
      ctx?.revert();
    };
  }, [compactMotion]);

  if (stickyMotion) return <StickyProcess />;

  return (
    <section className={`${styles.process} ${naturalFlow ? styles.naturalFlow : ""}`} id="process" ref={sectionRef}>
      <SectionAtmosphere accent="#10b981" secondary="#f59e0b" side="left" subtle />
      <div className={styles.stageViewport}>
        {STAGES.map((stage) => (
          <div key={stage.id} id={`process-${stage.id}`} className={styles.stagePanel}>
            {createElement(stage.Component)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
