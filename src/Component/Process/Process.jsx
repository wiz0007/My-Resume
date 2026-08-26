import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import ProcessOverview from "./ProcessOverview";
import DiscoverScene from "./DiscoverScene";
import ArchitectScene from "./ArchitectScene";
import BuildScene from "./BuildScene";
import ImproveScene from "./ImproveScene";
import styles from "./Process.module.scss";

const Process = () => (
  <div className={styles.process} id="process">
    <SectionAtmosphere accent="#10b981" secondary="#f59e0b" side="left" subtle />
    <div className={styles.inner}>
      <ProcessOverview />
      <DiscoverScene />
      <ArchitectScene />
      <BuildScene />
      <ImproveScene />
    </div>
  </div>
);

export default Process;
