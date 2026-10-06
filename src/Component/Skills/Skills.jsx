import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import { useMediaQuery } from "../../hooks/useMediaPreferences";
import SkillsGlobe from "./SkillsGlobe";
import SkillsMobile from "./SkillsMobile";
import styles from "./Skills.module.scss";

const Skills = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className={styles.skills} id="skills">
      <SectionAtmosphere accent="#06b6d4" secondary="#10b981" side="right" subtle />
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <span className={styles.eyebrow}>Domain Engine</span>
            <h2 id="skills-globe-title">
              Explore the stack behind <span className={styles.accent}>how I build.</span>
            </h2>
            <p className={styles.subtitle}>
              Interactive 3D domain map spanning client runtime, backend services, databases, and tooling.
            </p>
          </div>
        </div>
      </div>

      {isMobile ? <SkillsMobile /> : <SkillsGlobe />}
    </section>
  );
};

export default Skills;
