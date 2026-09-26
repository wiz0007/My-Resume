import styles from "./RouteFallback.module.scss";

const RouteFallback = () => (
  <main className={styles.fallback} role="status" aria-live="polite">
    <span />
    <p>Loading section</p>
  </main>
);

export default RouteFallback;
