import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Preload, RoundedBox, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import styles from "./DeveloperScene.module.scss";
import profileImage from "../assets/MyPic.jpeg";
import {
  useMediaQuery,
  useReducedMotionPreference,
} from "../hooks/useMediaPreferences";

const NeonStrip = ({ position, size, color }) => (
  <mesh position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={2.2}
      toneMapped={false}
    />
  </mesh>
);

const PortraitMonitor = () => {
  const texture = useTexture(profileImage);

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <group position={[1.15, 0.12, 0]}>
      <RoundedBox args={[2.45, 3.15, 0.22]} radius={0.12} smoothness={5}>
        <meshStandardMaterial color="#07111f" metalness={0.72} roughness={0.28} />
      </RoundedBox>
      <mesh position={[0, 0.03, 0.125]}>
        <planeGeometry args={[2.18, 2.82]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <NeonStrip position={[0, 1.56, 0.13]} size={[2.1, 0.025, 0.025]} color="#22d3ee" />
      <NeonStrip position={[1.2, 0, 0.13]} size={[0.025, 2.7, 0.025]} color="#8b5cf6" />
      <mesh position={[0, -1.72, -0.02]}>
        <cylinderGeometry args={[0.13, 0.16, 0.48, 24]} />
        <meshStandardMaterial color="#172033" metalness={0.8} roughness={0.25} />
      </mesh>
      <RoundedBox position={[0, -2, 0.05]} args={[1.25, 0.1, 0.62]} radius={0.05}>
        <meshStandardMaterial color="#111827" metalness={0.74} roughness={0.3} />
      </RoundedBox>
      <pointLight position={[0.9, 0.4, 1.1]} color="#22d3ee" intensity={2.4} distance={4} />
    </group>
  );
};

const Laptop = () => {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const glow = 0.65 + Math.sin(state.clock.elapsedTime * 1.8) * 0.12;
    group.current.children[2].material.emissiveIntensity = glow;
  });

  return (
    <group ref={group} position={[-1.2, -1.15, 0.5]} rotation={[0, 0.18, 0]}>
      <RoundedBox args={[1.95, 0.12, 1.28]} radius={0.06}>
        <meshStandardMaterial color="#182235" metalness={0.72} roughness={0.3} />
      </RoundedBox>
      <RoundedBox position={[0, 0.76, -0.53]} rotation={[-0.12, 0, 0]} args={[1.9, 1.35, 0.1]} radius={0.06}>
        <meshStandardMaterial color="#0a1020" metalness={0.55} roughness={0.28} />
      </RoundedBox>
      <mesh position={[0, 0.77, -0.465]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[1.68, 1.12]} />
        <meshStandardMaterial color="#071a2a" emissive="#0891b2" emissiveIntensity={0.65} />
      </mesh>
      {[
        { y: 1.08, width: 1.15, color: "#67e8f9" },
        { y: 0.86, width: 0.82, color: "#a78bfa" },
        { y: 0.64, width: 1.32, color: "#34d399" },
        { y: 0.42, width: 0.68, color: "#fbbf24" },
      ].map((line) => (
        <NeonStrip
          key={line.y}
          position={[-0.15, line.y, -0.4]}
          size={[line.width, 0.045, 0.018]}
          color={line.color}
        />
      ))}
      <mesh position={[0, 0.075, 0.12]}>
        <boxGeometry args={[1.3, 0.025, 0.68]} />
        <meshStandardMaterial color="#263248" metalness={0.58} roughness={0.38} />
      </mesh>
    </group>
  );
};

const FloatingPanel = ({ position, color, rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <RoundedBox args={[1.3, 0.8, 0.06]} radius={0.06} smoothness={4}>
      <meshStandardMaterial
        color="#0b1527"
        transparent
        opacity={0.76}
        metalness={0.45}
        roughness={0.3}
      />
    </RoundedBox>
    <NeonStrip position={[0, 0.27, 0.05]} size={[0.82, 0.035, 0.02]} color={color} />
    <NeonStrip position={[-0.13, 0.06, 0.05]} size={[0.56, 0.025, 0.02]} color="#dbeafe" />
    <NeonStrip position={[0.06, -0.13, 0.05]} size={[0.92, 0.025, 0.02]} color={color} />
  </group>
);

const Workstation = ({ compact, animated }) => {
  const group = useRef();

  useFrame((state) => {
    if (!group.current || !animated || compact) return;
    group.current.rotation.y += (state.pointer.x * 0.12 - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-state.pointer.y * 0.055 - group.current.rotation.x) * 0.035;
    group.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 0.45) * 0.025;
  });

  return (
    <group
      ref={group}
      position={compact ? [0.25, -0.6, 0] : [1.8, -0.15, 0]}
      scale={compact ? 0.72 : 0.95}
    >
      <PortraitMonitor />
      <Laptop />

      <RoundedBox position={[0, -2.08, 0.05]} args={[5.25, 0.18, 2.15]} radius={0.06}>
        <meshStandardMaterial color="#152137" metalness={0.62} roughness={0.34} />
      </RoundedBox>
      <NeonStrip position={[0, -1.98, 1.02]} size={[4.7, 0.035, 0.035]} color="#22d3ee" />

      {!compact && (
        <>
          <FloatingPanel position={[-2.45, 1.35, -0.45]} rotation={[0.08, 0.32, -0.05]} color="#8b5cf6" />
          <FloatingPanel position={[2.65, 1.28, -0.55]} rotation={[-0.04, -0.28, 0.06]} color="#10b981" scale={0.88} />
        </>
      )}
    </group>
  );
};

const Particles = () => {
  const positions = useMemo(() => {
    const data = new Float32Array(140 * 3);
    for (let index = 0; index < 140; index += 1) {
      data[index * 3] = (Math.random() - 0.5) * 9;
      data[index * 3 + 1] = (Math.random() - 0.5) * 6;
      data[index * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return data;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#bae6fd" size={0.026} transparent opacity={0.46} sizeAttenuation />
    </points>
  );
};

const DeveloperScene = () => {
  const compact = useMediaQuery("(max-width: 900px)");
  const reducedMotion = useReducedMotionPreference();
  const wrapper = useRef();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const animated = visible && !reducedMotion;

  return (
    <div ref={wrapper} className={styles.scene} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.1, 8.2], fov: 40 }}
        dpr={[1, 1.5]}
        frameloop={animated ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[4, 6, 6]} intensity={1.6} color="#dbeafe" />
        <pointLight position={[-3, 2, 3]} color="#8b5cf6" intensity={2.2} distance={7} />
        <pointLight position={[3, -1, 3]} color="#10b981" intensity={1.8} distance={6} />
        <Suspense fallback={null}>
          <Workstation compact={compact} animated={animated} />
          {!compact && <Particles />}
          <Grid
            position={[1.5, -2.22, -0.4]}
            args={[10, 8]}
            cellSize={0.45}
            cellThickness={0.35}
            cellColor="#164e63"
            sectionSize={2.25}
            sectionThickness={0.65}
            sectionColor="#312e81"
            fadeDistance={9}
            fadeStrength={1.4}
            infiniteGrid
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DeveloperScene;
