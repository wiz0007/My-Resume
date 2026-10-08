import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  GitCommit,
  Sparkles,
} from "lucide-react";
import { profilePillars } from "./profileData";
import styles from "./ProfileDossier.module.scss";

const ProfileDossier = () => {
  return (
    <section
      className={styles.dossierSection}
      id="profile-dossier"
      aria-label="Engineering Architecture & Execution"
    >
      <div className={styles.inner}>
        {/* Clean, Focused Header (No Subtext) */}
        <div className={styles.dossierHeader}>
          <div className={styles.eyebrowBadge}>
            <Sparkles size={14} />
            <span>ENGINEERING CAPABILITY</span>
          </div>

          <h2 className={styles.mainTitle}>
            From screen{" "}
            <span className={styles.accentGrad}>to database.</span>
          </h2>
          <p className={styles.subtitle}>
            Full-lifecycle engineering from interface to persistence.
          </p>
        </div>

        {/* Architecture Pipeline Container */}
        <div className={styles.architectureContainer}>
          {/* Streamlined Circuit Origin (No Subtext, No Status Badge) */}
          <div className={styles.circuitOrigin}>
            <div className={styles.originPill}>
              <span className={styles.originDot} aria-hidden="true" />
              <span className={styles.originTitle}>Execution pipeline</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* DESKTOP VIEW (> 820px): Wide, Streamlined Circuit Stream */}
          {/* ======================================================== */}
          <div
            className={styles.circuitDesktopStream}
            aria-label="Desktop architecture circuit stream"
          >
            {/* Center Illuminated Power Line */}
            <div className={styles.circuitPowerLine} aria-hidden="true">
              <div className={styles.powerLinePulse} />
            </div>

            {/* Alternating Milestone Nodes */}
            {profilePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={pillar.id}
                  className={`${styles.circuitNodeRow} ${isEven ? styles.rowEven : styles.rowOdd}`}
                  style={{ "--circuit-accent": pillar.accent }}
                >
                  {/* Central Junction Pulse Point */}
                  <div className={styles.circuitJunction}>
                    <div
                      className={styles.junctionNode}
                      style={{ borderColor: pillar.accent, color: pillar.accent }}
                    >
                      <Icon size={18} />
                    </div>
                    <span className={styles.junctionPhaseNum}>{pillar.phase}</span>
                  </div>

                  {/* Wide, Streamlined Milestone Card */}
                  <motion.article
                    className={styles.circuitCard}
                    initial={{ opacity: 0, x: isEven ? -24 : 24, y: 14 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    {/* Header Row */}
                    <div className={styles.circuitCardHeader}>
                      <div className={styles.circuitPhaseBadge}>
                        <span className={styles.phaseIndicator}>PHASE {pillar.phase}</span>
                        <span className={styles.tagIndicator}>{pillar.tag}</span>
                      </div>
                      <div className={styles.circuitCardAura} style={{ color: pillar.accent }}>
                        <GitCommit size={16} />
                      </div>
                    </div>

                    {/* Title & Focused Summary */}
                    <h3 className={styles.circuitCardTitle}>{pillar.title}</h3>
                    <p className={styles.circuitCardLead}>{pillar.lead}</p>

                    {/* Stack Pills & Live Builds Bar */}
                    <div className={styles.circuitCardFooter}>
                      <div className={styles.circuitStackRow}>
                        {pillar.stack.map((item) => (
                          <span key={item} className={styles.circuitStackPill}>
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className={styles.circuitLinksList}>
                        {pillar.projects.map((proj) => (
                          <Link
                            key={proj.name}
                            to={proj.to}
                            className={styles.circuitProjectLink}
                          >
                            <span>{proj.name}</span>
                            <ArrowUpRight size={13} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* MOBILE VIEW (<= 820px): Ultra-Compact Pipeline Flow      */}
          {/* Drastically reduced height to minimize scroll activity   */}
          {/* ======================================================== */}
          <div
            className={styles.pipelineMobileTrack}
            aria-label="Mobile architecture pipeline flow"
          >
            {profilePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isLast = idx === profilePillars.length - 1;

              return (
                <div
                  key={pillar.id}
                  className={styles.mobileStepWrapper}
                  style={{ "--mobile-accent": pillar.accent }}
                >
                  <article className={styles.mobilePipelineCard}>
                    {/* Header: Icon + Stage + Tag */}
                    <div className={styles.mobileCardHeader}>
                      <div className={styles.mobileIconBox}>
                        <Icon size={16} />
                      </div>
                      <div className={styles.mobileHeaderMeta}>
                        <div className={styles.mobileStageRow}>
                          <span className={styles.mobileStageBadge}>STAGE {pillar.phase}</span>
                          <span className={styles.mobileTagBadge}>{pillar.tag}</span>
                        </div>
                        <h4 className={styles.mobileStageTitle}>{pillar.title}</h4>
                      </div>
                    </div>

                    {/* Concise Summary */}
                    <p className={styles.mobileLead}>{pillar.lead}</p>

                    {/* Compact Stack & Projects Strip */}
                    <div className={styles.mobileCardFooter}>
                      <div className={styles.mobileStackRow}>
                        {pillar.stack.slice(0, 3).map((item) => (
                          <span key={item} className={styles.mobileTechChip}>
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className={styles.mobileProjectsRow}>
                        {pillar.projects.map((proj) => (
                          <Link
                            key={proj.name}
                            to={proj.to}
                            className={styles.mobileProjBtn}
                          >
                            <span>{proj.name}</span>
                            <ArrowUpRight size={12} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </article>

                  {/* Minimal Directional Flow Stem */}
                  {!isLast && (
                    <div className={styles.mobileFlowConnector} aria-hidden="true">
                      <div className={styles.connectorStem} />
                      <ArrowDown size={13} className={styles.connectorArrow} />
                      <div className={styles.connectorStem} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Clean, Minimal Termination Link (No Bulky Card/Box) */}
          <div className={styles.circuitEnd}>
            <Link to="/projects" className={styles.exploreAllBtn}>
              <span>Explore All Projects</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDossier;
