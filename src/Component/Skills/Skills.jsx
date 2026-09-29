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
          <h2>Explore the stack behind how I build.</h2>
        </div>
      </div>

      {isMobile ? <SkillsMobile /> : <SkillsGlobe />}
    </section>
  );
};

export default Skills;
