import React from "react";
import styles from "./RouteFallback.module.scss";

const RouteFallback = () => (
  <div className={styles.fallback} role="status" aria-live="polite">
    <span />
    <p>Loading page</p>
  </div>
);

export default RouteFallback;
