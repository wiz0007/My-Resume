import React from "react";
import { motion } from "framer-motion";
import styles from "./Loader.module.scss";

const stack = ["React", "Node", "API", "DB", "Web3"];

const Loader = () => {
  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className={styles.grid} aria-hidden="true" />
      <motion.div
        className={styles.orb}
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />

      <div className={styles.panel}>
        <motion.div
          className={styles.mark}
          initial={{ scale: 0.84, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span>{"<"}</span>
          <strong>AM</strong>
          <span>{"/>"}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
        >
          Initializing portfolio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.55 }}
        >
          Building UI, APIs, data flows, and verification layers.
        </motion.p>

        <div className={styles.stack}>
          {stack.map((item, index) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 + index * 0.08, duration: 0.4 }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <div className={styles.progress} aria-hidden="true">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
