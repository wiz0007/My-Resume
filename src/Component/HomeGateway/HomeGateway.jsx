import { createElement, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Braces,
  Code2,
  Database,
  Fingerprint,
  GitBranch,
  Layers3,
  Mail,
  Route,
  ServerCog,
  Sparkles,
  UserRound,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./HomeGateway.module.scss";

const gateways = [
  {
    title: "Projects",
    label: "Selected Work",
    text: "A focused view of full-stack, workflow, commerce, chat, and desktop projects.",
    previewTitle: "Product work, end to end.",
    previewText: "Interfaces, APIs, data, authentication, deployment, and the decisions that connect them.",
    tags: ["Full-stack", "Product", "Systems"],
    to: "/projects",
    icon: Blocks,
    preview: "projects",
  },
  {
    title: "Process",
    label: "Build Method",
    text: "How I move from product idea to interface, API, data flow, and deployment.",
    previewTitle: "From requirement to release.",
    previewText: "A practical workflow for turning an idea into a reliable product without losing sight of the user.",
    tags: ["Plan", "Build", "Validate"],
    to: "/process",
    icon: Route,
    preview: "process",
  },
  {
    title: "Skills",
    label: "Technical Stack",
    text: "Frontend, backend, databases, languages, tools, and engineering range.",
    previewTitle: "A stack built around shipping.",
    previewText: "The technologies I use across client interfaces, services, persistence, tooling, and deployment.",
    tags: ["React", "Node", "Data"],
    to: "/skills",
    icon: Code2,
    preview: "skills",
  },
  {
    title: "Profile",
    label: "Background",
    text: "About me, education, certifications, and the experience behind the work.",
    previewTitle: "The person behind the builds.",
    previewText: "Background, experience, education, and the engineering mindset I bring to product work.",
    tags: ["About", "Experience", "Growth"],
    to: "/profile",
    icon: Fingerprint,
    preview: "profile",
  },
  {
    title: "Contact",
    label: "Next Step",
    text: "Reach out for roles, collaboration, or a closer look at the resume.",
    previewTitle: "Start a conversation.",
    previewText: "For roles, collaboration, freelance work, or simply to discuss what I can build with your team.",
    tags: ["Roles", "Collaboration", "Resume"],
    to: "/contact",
    icon: Mail,
    preview: "contact",
  },
];

const PreviewGraphic = ({ type }) => {
  if (type === "projects") {
    return (
      <div className={`${styles.graphic} ${styles.projectsGraphic}`} aria-hidden="true">
        <span className={styles.windowChrome} />
        <span className={styles.projectPanelMain}>
          <Sparkles size={19} />
          <i />
          <i />
        </span>
        <span className={styles.projectPanelSide}>
          <Braces size={18} />
          <i />
          <i />
          <i />
        </span>
      </div>
    );
  }

  if (type === "process") {
    return (
      <div className={`${styles.graphic} ${styles.processGraphic}`} aria-hidden="true">
        <span><Layers3 size={18} /> Discover</span>
        <ArrowRight size={16} />
        <span><Workflow size={18} /> Build</span>
        <ArrowRight size={16} />
        <span><GitBranch size={18} /> Ship</span>
      </div>
    );
  }

  if (type === "skills") {
    return (
      <div className={`${styles.graphic} ${styles.skillsGraphic}`} aria-hidden="true">
        <span><Code2 size={22} /> Frontend</span>
        <span><ServerCog size={22} /> Backend</span>
        <span><Database size={22} /> Data</span>
        <span><Braces size={22} /> Tooling</span>
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className={`${styles.graphic} ${styles.profileGraphic}`} aria-hidden="true">
        <span className={styles.profileMark}><UserRound size={52} /></span>
        <span className={styles.profileLine}><i /><i /></span>
        <span className={styles.profileLine}><i /><i /></span>
        <span className={styles.profileLine}><i /><i /></span>
      </div>
    );
  }

  return (
    <div className={`${styles.graphic} ${styles.contactGraphic}`} aria-hidden="true">
      <span className={styles.contactPulse}><Mail size={34} /></span>
      <span>Available for the right opportunity</span>
    </div>
  );
};

const MobilePreview = ({ item }) => (
  <div className={styles.compactPreview}>
    <div className={styles.previewTopline}>
      <span>{item.label}</span>
    </div>

    <PreviewGraphic type={item.preview} />

    <div className={styles.previewCopy}>
      <h3>{item.previewTitle}</h3>
      <p>{item.previewText}</p>
      <div className={styles.tags} aria-label={`${item.title} themes`}>
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

const HomeGateway = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const stage = stageRef.current;
    const grid = gridRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !stage || !grid || cards.length === 0) return undefined;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      const getDeckState = (card, index, compact = false) => {
        const firstCard = cards[0];
        const deckCenterX = grid.clientWidth / 2;
        const deckCenterY = firstCard.offsetTop + firstCard.offsetHeight / 2;
        const cardCenterX = card.offsetLeft + card.offsetWidth / 2;
        const cardCenterY = card.offsetTop + card.offsetHeight / 2;

        return {
          x: deckCenterX - cardCenterX + (index - 2) * (compact ? 1.5 : 3.5),
          y: deckCenterY - cardCenterY + index * (compact ? 3 : 5),
          rotation: (index - 2) * (compact ? 1.1 : 2.1),
          scale: 1 - index * (compact ? 0.008 : 0.012),
          opacity: index === 0 ? 1 : compact ? 0.91 : 0.87,
          zIndex: cards.length - index,
        };
      };

      const addCardSpread = (timeline, compact = false) => {
        cards.forEach((card, index) => {
          timeline.fromTo(
            card,
            {
              x: () => getDeckState(card, index, compact).x,
              y: () => getDeckState(card, index, compact).y,
              rotation: () => getDeckState(card, index, compact).rotation,
              scale: () => getDeckState(card, index, compact).scale,
              opacity: () => getDeckState(card, index, compact).opacity,
              zIndex: () => getDeckState(card, index, compact).zIndex,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              zIndex: 1,
              duration: 1,
              ease: compact ? "power2.out" : "none",
              immediateRender: true,
            },
            index * (compact ? 0.045 : 0.025)
          );
        });
      };

      media.add("(min-width: 1101px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top 10%",
            end: () => `+=${Math.round(Math.min(650, Math.max(420, window.innerHeight * 0.58)))}`,
            scrub: 0.5,
            pin: stage,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        addCardSpread(timeline, false);
        return () => timeline.kill();
      });

      media.add("(min-width: 821px) and (max-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          paused: true,
          scrollTrigger: {
            trigger: grid,
            start: "top 88%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        addCardSpread(timeline, true);
        return () => timeline.kill();
      });

      media.add("(min-width: 821px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          zIndex: 1,
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      const refreshFrame = window.requestAnimationFrame(refresh);
      window.addEventListener("load", refresh, { once: true });

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        window.removeEventListener("load", refresh);
        media.revert();
      };
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.gateway} id="explore">
      <div ref={stageRef} className={styles.desktopStage} aria-labelledby="site-gateway-title-desktop">
        <header className={styles.desktopHeader}>
          <h2 id="site-gateway-title-desktop">Choose the part of the portfolio you want to inspect.</h2>
        </header>

        <div ref={gridRef} className={styles.grid}>
          {gateways.map(({ title, label, text, to, icon: Icon }, index) => (
            <div
              key={title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={styles.cardShell}
            >
              <Link className={styles.card} to={to} aria-label={`Open ${title} page`}>
                <span className={styles.icon} aria-hidden="true">
                  {createElement(Icon, { size: 23 })}
                </span>
                <span className={styles.label}>{label}</span>
                <strong>{title}</strong>
                <p>{text}</p>
                <span className={styles.action}>
                  Open page <ArrowUpRight size={17} />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mobileShell} aria-labelledby="site-gateway-title-mobile">
        <header className={styles.mobileHeader}>
          <h2 id="site-gateway-title-mobile">Choose the part of the portfolio you want to inspect.</h2>
        </header>

        <div className={styles.mobileExperience}>
          {gateways.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openIndex === index;
            const panelId = `gateway-panel-${index}`;
            const buttonId = `gateway-button-${index}`;

            return (
              <article key={item.title} className={`${styles.accordionItem} ${isOpen ? styles.openItem : ""}`}>
                <button
                  id={buttonId}
                  type="button"
                  className={styles.accordionButton}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className={styles.accordionNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.accordionIcon} aria-hidden="true">
                    {createElement(Icon, { size: 20 })}
                  </span>
                  <span className={styles.accordionTitle}>
                    <small>{item.label}</small>
                    <strong>{item.title}</strong>
                  </span>
                  <span className={styles.accordionControl} aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>

                <div
                  id={panelId}
                  className={styles.accordionPanel}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <MobilePreview item={item} />
                  <Link className={styles.mobileLink} to={item.to}>
                    Explore {item.title}
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeGateway;
