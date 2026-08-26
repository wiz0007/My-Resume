import { useRef } from "react";

const SpatialSurface = ({ className, children }) => {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty("--spatial-ry", `${x * 7}deg`);
    node.style.setProperty("--spatial-rx", `${y * -5}deg`);
    node.style.setProperty("--spatial-x", `${x * 10}px`);
    node.style.setProperty("--spatial-y", `${y * 8}px`);
  };

  const resetPointer = () => {
    const node = ref.current;
    if (!node) return;

    node.style.setProperty("--spatial-ry", "0deg");
    node.style.setProperty("--spatial-rx", "0deg");
    node.style.setProperty("--spatial-x", "0px");
    node.style.setProperty("--spatial-y", "0px");
  };

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {children}
    </div>
  );
};

export default SpatialSurface;
