import React from "react";
import styles from "./Process.module.scss";

const ProcessIllustration = () => (
  <div className={styles.illustration} aria-hidden="true">
    <div className={styles.diagram}>
      <span className={styles.node}>Brief</span>
      <span className={styles.node}>Routes</span>
      <span className={styles.node}>API</span>
      <span className={styles.node}>Data</span>
      <i />
      <i />
      <i />
    </div>

    <div className={styles.terminal}>
      <span>build.pipeline</span>
      <strong>validated</strong>
      <code>ui + api + data + deploy</code>
    </div>
  </div>
);

export default ProcessIllustration;
