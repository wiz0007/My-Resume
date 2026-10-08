import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, MapPin, Award, BookOpen, Building2 } from "lucide-react";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import shivalikImg from "../../assets/education/shivalik.jpg";
import pantnagarImg from "../../assets/education/pantnagar.jpg";
import styles from "./Education.module.scss";

const educationData = [
  {
    id: "intermediate",
    step: "01 / 02",
    title: "Intermediate (PCM)",
    school: "Shivalik Holy Mount Academy, Kashipur",
    location: "Kashipur, Uttarakhand",
    shortLocation: "Kashipur, UK",
    year: "2021",
    desc: "Rigorous mathematics, physics, and chemistry foundation establishing the analytical and logical problem-solving base for software engineering.",
    shortDesc: "Class XII Science (PCM) with 96% aggregate.",
    link: "https://www.shivalikhma.com/",
    siteName: "shivalikhma.com",
    image: shivalikImg,
    alt: "Shivalik Holy Mount Academy campus",
    highlights: [
      {
        icon: Award,
        label: "Academic Standing",
        val: "96.0% Aggregate",
        detail: "Top-tier standing in Class XII Science Stream",
      },
      {
        icon: BookOpen,
        label: "Core Curriculum",
        val: "Physics, Chem & Math",
        detail: "Calculus, coordinate geometry & mechanics",
      },
      {
        icon: Building2,
        label: "Board & Campus",
        val: "CBSE Affiliated",
        detail: "Shivalik Holy Mount Academy, Kashipur",
      },
    ],
  },
  {
    id: "btech",
    step: "02 / 02",
    title: "B.Tech in Computer Engineering",
    school: "College of Technology, Pantnagar",
    location: "Pantnagar, Uttarakhand",
    shortLocation: "Pantnagar, UK",
    year: "2022–2026",
    desc: "Comprehensive engineering curriculum focused on distributed systems, modern database architecture, data structures, and production web applications.",
    shortDesc: "B.Tech in Computer Engineering with full-stack and systems focus.",
    link: "https://www.gbpuat.ac.in/",
    siteName: "gbpuat.ac.in",
    image: pantnagarImg,
    alt: "College of Technology, Pantnagar building",
    highlights: [
      {
        icon: Award,
        label: "Degree Program",
        val: "Computer Engineering",
        detail: "Full-stack engineering & distributed systems",
      },
      {
        icon: BookOpen,
        label: "Core Disciplines",
        val: "DSA, DBMS & Networks",
        detail: "Operating systems & modern web stacks",
      },
      {
        icon: Building2,
        label: "Institution",
        val: "GBPUAT Pantnagar",
        detail: "Premier state technology campus, Uttarakhand",
      },
    ],
  },
];

const Education = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Crossfade between item 0 and item 1
  const opacity0 = useTransform(scrollYProgress, [0, 0.35, 0.62, 1], [1, 1, 0, 0]);
  const y0 = useTransform(scrollYProgress, [0, 0.35, 0.62, 1], [0, 0, -20, -20]);
  const pointerEvents0 = useTransform(opacity0, (val) => (val > 0.3 ? "auto" : "none"));

  const opacity1 = useTransform(scrollYProgress, [0, 0.38, 0.65, 1], [0, 0, 1, 1]);
  const y1 = useTransform(scrollYProgress, [0, 0.38, 0.65, 1], [20, 20, 0, 0]);
  const pointerEvents1 = useTransform(opacity1, (val) => (val > 0.3 ? "auto" : "none"));

  return (
    <section className={styles.educationTrack} id="education" ref={containerRef}>
      {/* Sticky Frame positioned below the navbar */}
      <div className={styles.stickyFrame}>
        {/* Full-bleed Campus Backgrounds */}
        <div className={styles.backgroundContainer}>
          {/* Shivalik Holy Mount Academy */}
          <motion.div
            className={styles.bgLayer}
            style={{ opacity: opacity0 }}
          >
            <img
              src={educationData[0].image}
              alt={educationData[0].alt}
              className={styles.bgImage}
            />
            <div className={styles.backdropOverlay} />
          </motion.div>

          {/* College of Technology Pantnagar */}
          <motion.div
            className={styles.bgLayer}
            style={{ opacity: opacity1 }}
          >
            <img
              src={educationData[1].image}
              alt={educationData[1].alt}
              className={styles.bgImage}
            />
            <div className={styles.backdropOverlay} />
          </motion.div>

          <SectionAtmosphere accent="#38bdf8" secondary="#818cf8" side="right" subtle />
        </div>

        {/* Foreground Content */}
        <div className={styles.contentWrap}>
          {/* Header */}
          <header className={styles.header}>
            <span className={styles.eyebrow}>ACADEMIC FOUNDATION</span>
            <h2 className={styles.heading}>
              Formal <span className={styles.accent}>education.</span>
            </h2>
            <p className={styles.subtitle}>
              Degrees, academic standings, and engineering coursework.
            </p>
          </header>

          {/* Details Stage */}
          <div className={styles.detailsStage}>
            {/* Intermediate (PCM) */}
            <motion.div
              className={styles.detailItem}
              style={{
                opacity: opacity0,
                y: y0,
                pointerEvents: pointerEvents0,
              }}
            >
              <div className={styles.stageGrid}>
                {/* Left: Main Identity & Narrative */}
                <div className={styles.mainCol}>
                  <div className={styles.metaRow}>
                    <span className={styles.stepBadge}>{educationData[0].step}</span>
                    <span className={styles.yearBadge}>{educationData[0].year}</span>
                    <span className={styles.location}>
                      <MapPin size={13} className={styles.pinIcon} />
                      <span className={styles.locDesktop}>{educationData[0].location}</span>
                      <span className={styles.locMobile}>{educationData[0].shortLocation}</span>
                    </span>
                  </div>

                  <h3 className={styles.title}>{educationData[0].title}</h3>
                  <h4 className={styles.school}>{educationData[0].school}</h4>
                  
                  {/* Full description on laptop/desktop; concise on mobile */}
                  <p className={styles.descDesktop}>{educationData[0].desc}</p>
                  <p className={styles.descMobile}>{educationData[0].shortDesc}</p>

                  <a
                    href={educationData[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <span>Visit Site</span>
                    <ExternalLink size={15} />
                  </a>
                </div>

                {/* Right: Academic Highlights (Displayed in laptop view) */}
                <div className={styles.highlightsCol}>
                  {educationData[0].highlights.map((h, i) => {
                    const Icon = h.icon;
                    return (
                      <div key={i} className={styles.highlightCard}>
                        <div className={styles.cardIconWrap}>
                          <Icon size={16} className={styles.highlightIcon} />
                        </div>
                        <div className={styles.cardContent}>
                          <span className={styles.cardLabel}>{h.label}</span>
                          <span className={styles.cardVal}>{h.val}</span>
                          <span className={styles.cardDetail}>{h.detail}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* B.Tech in Computer Engineering */}
            <motion.div
              className={styles.detailItem}
              style={{
                opacity: opacity1,
                y: y1,
                pointerEvents: pointerEvents1,
              }}
            >
              <div className={styles.stageGrid}>
                {/* Left: Main Identity & Narrative */}
                <div className={styles.mainCol}>
                  <div className={styles.metaRow}>
                    <span className={styles.stepBadge}>{educationData[1].step}</span>
                    <span className={styles.yearBadge}>{educationData[1].year}</span>
                    <span className={styles.location}>
                      <MapPin size={13} className={styles.pinIcon} />
                      <span className={styles.locDesktop}>{educationData[1].location}</span>
                      <span className={styles.locMobile}>{educationData[1].shortLocation}</span>
                    </span>
                  </div>

                  <h3 className={styles.title}>{educationData[1].title}</h3>
                  <h4 className={styles.school}>{educationData[1].school}</h4>

                  {/* Full description on laptop/desktop; concise on mobile */}
                  <p className={styles.descDesktop}>{educationData[1].desc}</p>
                  <p className={styles.descMobile}>{educationData[1].shortDesc}</p>

                  <a
                    href={educationData[1].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <span>Visit Site</span>
                    <ExternalLink size={15} />
                  </a>
                </div>

                {/* Right: Academic Highlights (Displayed in laptop view) */}
                <div className={styles.highlightsCol}>
                  {educationData[1].highlights.map((h, i) => {
                    const Icon = h.icon;
                    return (
                      <div key={i} className={styles.highlightCard}>
                        <div className={styles.cardIconWrap}>
                          <Icon size={16} className={styles.highlightIcon} />
                        </div>
                        <div className={styles.cardContent}>
                          <span className={styles.cardLabel}>{h.label}</span>
                          <span className={styles.cardVal}>{h.val}</span>
                          <span className={styles.cardDetail}>{h.detail}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
