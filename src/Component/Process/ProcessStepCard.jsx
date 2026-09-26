import styles from "./Process.module.scss";

const ProcessStepCard = ({ step, index }) => {
  const { icon: Icon, label, title, text } = step;

  return (
    <article className={styles.step}>
      <div className={styles.stepIndex}>0{index + 1}</div>
      <div className={styles.stepIcon}>
        <Icon size={24} />
      </div>
      <div>
        <span>{label}</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
};

export default ProcessStepCard;
