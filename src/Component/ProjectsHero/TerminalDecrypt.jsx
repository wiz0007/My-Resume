import { createElement, useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import { usePageVisibility } from "../../hooks/usePageVisibility";
import styles from "./TerminalDecrypt.module.scss";

const CYBER_GLYPHS = "0101<>[]/_*#~=+^%$&?!XYZ-";

const getRandomGlyph = () =>
  CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];

export const TerminalDecrypt = ({
  text,
  highlightText = "working systems",
  as = "span",
  className = "",
  startDelay = 250,
  duration = 1400,
  scrambleInterval = 40,
  onComplete,
  enableHoverReplay = true,
}) => {
  const reducedMotion = useReducedMotionPreference();
  const isPageVisible = usePageVisibility();

  const [settledCount, setSettledCount] = useState(() => (reducedMotion ? text.length : 0));
  const [activeGlyphs, setActiveGlyphs] = useState(() =>
    text.split("").map((ch) => (ch === " " ? " " : getRandomGlyph()))
  );
  const [isDecrypted, setIsDecrypted] = useState(() => Boolean(reducedMotion));
  const [justResolvedIndex, setJustResolvedIndex] = useState(-1);

  const animFrameRef = useRef(null);
  const scrambleTimerRef = useRef(null);
  const startTimeRef = useRef(null);
  const isRunningRef = useRef(false);

  // Range of highlighted text if present
  const highlightStart = highlightText ? text.toLowerCase().indexOf(highlightText.toLowerCase()) : -1;
  const highlightEnd = highlightStart !== -1 ? highlightStart + highlightText.length : -1;

  const startDecryption = useCallback(() => {
    if (reducedMotion) {
      setSettledCount(text.length);
      setIsDecrypted(true);
      return;
    }

    isRunningRef.current = true;
    setIsDecrypted(false);
    setSettledCount(0);
    startTimeRef.current = null;

    // Scramble interval loop: periodically shuffle unrevealed glyphs
    clearInterval(scrambleTimerRef.current);
    scrambleTimerRef.current = setInterval(() => {
      if (!isRunningRef.current) return;
      setActiveGlyphs(
        text.split("").map((ch) => (ch === " " ? " " : getRandomGlyph()))
      );
    }, scrambleInterval);

    const step = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      const currentSettled = Math.floor(progress * text.length);

      setSettledCount((prev) => {
        if (currentSettled > prev) {
          setJustResolvedIndex(currentSettled - 1);
        }
        return currentSettled;
      });

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        // Completed
        isRunningRef.current = false;
        clearInterval(scrambleTimerRef.current);
        setSettledCount(text.length);
        setIsDecrypted(true);
        setJustResolvedIndex(-1);
        if (onComplete) onComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [text, duration, scrambleInterval, reducedMotion, onComplete]);

  // Initial trigger after delay
  useEffect(() => {
    if (reducedMotion) {
      setSettledCount(text.length);
      setIsDecrypted(true);
      return undefined;
    }

    const timer = setTimeout(() => {
      startDecryption();
    }, startDelay);

    return () => {
      clearTimeout(timer);
      clearInterval(scrambleTimerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      isRunningRef.current = false;
    };
  }, [startDelay, startDecryption, reducedMotion, text.length]);

  // Handle visibility pause/resume
  useEffect(() => {
    if (!isPageVisible && isRunningRef.current) {
      // If user tabs out during animation, complete it cleanly
      isRunningRef.current = false;
      clearInterval(scrambleTimerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setSettledCount(text.length);
      setIsDecrypted(true);
    }
  }, [isPageVisible, text.length]);

  const handleMouseEnter = () => {
    if (enableHoverReplay && isDecrypted && !reducedMotion) {
      startDecryption();
    }
  };

  const content = (
    <>
      {/* Accessible screen reader representation */}
      <span className={styles.srOnly}>{text}</span>

      {/* Visual cybernetic rendering */}
      <span className={styles.visualText} aria-hidden="true">
        {text.split("").map((originalChar, index) => {
          if (originalChar === " ") {
            return <span key={index}> </span>;
          }

          const isSettled = index < settledCount;
          const isHighlight =
            highlightStart !== -1 && index >= highlightStart && index < highlightEnd;
          const isJustResolved = index === justResolvedIndex;
          const isActiveHead = !isSettled && index === settledCount;

          let charClass = styles.char;

          if (isSettled) {
            if (isHighlight) {
              charClass += ` ${styles.highlightResolved}`;
            } else if (isJustResolved) {
              charClass += ` ${styles.justResolved}`;
            } else {
              charClass += ` ${styles.resolved}`;
            }
          } else {
            if (isActiveHead) {
              charClass += ` ${styles.activeDecrypt}`;
            } else if (isHighlight) {
              charClass += ` ${styles.highlightScramble}`;
            } else {
              charClass += ` ${styles.scramble}`;
            }
          }

          const displayChar = isSettled ? originalChar : activeGlyphs[index] || originalChar;

          return (
            <span key={index} className={charClass}>
              {displayChar}
            </span>
          );
        })}

        {/* Cyber blinking cursor while decrypting */}
        {!isDecrypted && <span className={styles.cursor}>_</span>}
      </span>
    </>
  );

  return createElement(
    as,
    {
      className: `${styles.container} ${className}`,
      onMouseEnter: handleMouseEnter,
      "aria-label": text,
    },
    content
  );
};

export default TerminalDecrypt;
