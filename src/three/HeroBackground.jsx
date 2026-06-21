import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { AdditiveBlending } from "three";
import styles from "./HeroBackground.module.scss";
import { useReducedMotionPreference } from "../hooks/useMediaPreferences";

const ParticleField = ({ reducedMotion }) => {
  const points = useRef();
  const positions = useMemo(() => {
    const values = new Float32Array(260 * 3);
    for (let index = 0; index < 260; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 12;
      values[index * 3 + 1] = (Math.random() - 0.5) * 7;
      values[index * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return values;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y = clock.elapsedTime * 0.018 + pointer.x * 0.04;
    points.current.rotation.x = pointer.y * 0.025;
  });

  return (
    <points ref={points} position={[0, 0.3, -1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#67e8f9" size={0.035} sizeAttenuation transparent opacity={0.72} depthWrite={false} blending={AdditiveBlending} />
    </points>
  );
};

const OrbitSystem = ({ reducedMotion }) => {
  const group = useRef();
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const time = reducedMotion ? 0 : clock.elapsedTime;
    group.current.rotation.z = time * 0.08;
    group.current.rotation.y = -0.35 + pointer.x * 0.08;
  });

  return (
    <group ref={group} position={[2.75, 0.5, -1.6]} rotation={[1.05, -0.35, 0]}>
      {[1.25, 1.72, 2.18].map((radius, index) => (
        <mesh key={radius} rotation={[index * 0.42, index * 0.18, 0]}>
          <torusGeometry args={[radius, 0.008 + index * 0.003, 8, 120]} />
          <meshBasicMaterial color={index === 1 ? "#8b5cf6" : "#22d3ee"} transparent opacity={0.35 - index * 0.05} />
        </mesh>
      ))}
      <mesh position={[1.65, 0.2, 0]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshBasicMaterial color="#a5f3fc" />
        <pointLight color="#22d3ee" intensity={2.5} distance={2.2} />
      </mesh>
    </group>
  );
};

const HeroBackground = () => {
  const reducedMotion = useReducedMotionPreference();
  return (
    <div className={styles.background} aria-hidden="true">
      <Canvas camera={{ position: [0, 1.1, 6.8], fov: 48 }} dpr={[1, 1.4]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <fog attach="fog" args={["#07111f", 5, 13]} />
        <ParticleField reducedMotion={reducedMotion} />
        <OrbitSystem reducedMotion={reducedMotion} />
        <Grid position={[0, -2.15, -1.5]} args={[16, 12]} cellSize={0.46} cellThickness={0.35} cellColor="#155e75" sectionSize={2.3} sectionThickness={0.7} sectionColor="#4338ca" fadeDistance={10} fadeStrength={1.4} infiniteGrid />
      </Canvas>
    </div>
  );
};

export default HeroBackground;