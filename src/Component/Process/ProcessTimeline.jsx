import ProcessStepCard from "./ProcessStepCard";
import styles from "./Process.module.scss";

const ProcessTimeline = ({ steps }) => (
  <>
    <div className={styles.timeline} aria-hidden="true">
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} />
      </div>
    </div>

    <div className={styles.steps}>
      {steps.map((step, index) => (
        <ProcessStepCard key={step.label} step={step} index={index} />
      ))}
    </div>
  </>
);

export default ProcessTimeline;
