import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import styles from "./SkillOrbitScene.module.scss";
import {
  useMediaQuery,
  useReducedMotionPreference,
} from "../hooks/useMediaPreferences";

const SkillNode = ({ label, position, color, reducedMotion, index }) => {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (!mesh.current || reducedMotion) return;
    mesh.current.rotation.x += delta * (0.18 + index * 0.012);
    mesh.current.rotation.y += delta * (0.24 + index * 0.01);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.45 + index) * 0.045;
    mesh.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.27, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.52}
          metalness={0.68}
          roughness={0.24}
        />
      </mesh>
      <pointLight color={color} intensity={0.8} distance={1.8} />
      <Html position={[0, -0.48, 0]} center distanceFactor={8}>
        <span className={styles.nodeLabel}>{label}</span>
      </Html>
    </group>
  );
};

const OrbitSystem = ({ skills, color, title, compact, reducedMotion }) => {
  const group = useRef();
  const nodes = useMemo(() => {
    const radius = compact ? 1.7 : 2.25;
    return skills.map((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const y = Math.sin(angle * 2) * (compact ? 0.42 : 0.62);
      return {
        label: skill,
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius * 0.48],
      };
    });
  }, [compact, skills]);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += (-state.pointer.y * 0.1 - group.current.rotation.x) * 0.025;
  });

  return (
    <group ref={group} scale={compact ? 0.86 : 1}>
      <mesh>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshStandardMaterial
          color="#0e7490"
          emissive={color}
          emissiveIntensity={0.55}
          metalness={0.72}
          roughness={0.22}
          wireframe
        />
      </mesh>
      <mesh rotation={[1.1, 0.15, 0]}>
        <torusGeometry args={[1.2, 0.018, 10, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.62} />
      </mesh>
      <mesh rotation={[0.4, 1.1, 0.2]}>
        <torusGeometry args={[1.48, 0.012, 10, 96]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
      </mesh>
      <Html center distanceFactor={7}>
        <span className={styles.coreLabel}>{title}</span>
      </Html>

      {nodes.map((node, index) => (
        <React.Fragment key={node.label}>
          <Line
            points={[[0, 0, 0], node.position]}
            color={color}
            lineWidth={0.75}
            transparent
            opacity={0.28}
          />
          <SkillNode
            {...node}
            color={index % 3 === 0 ? color : index % 3 === 1 ? "#8b5cf6" : "#10b981"}
            index={index}
            reducedMotion={reducedMotion}
          />
        </React.Fragment>
      ))}
      <pointLight color={color} intensity={2.6} distance={5} />
    </group>
  );
};

const SkillOrbitScene = ({ skills, color, title }) => {
  const compact = useMediaQuery("(max-width: 700px)");
  const reducedMotion = useReducedMotionPreference();

  return (
    <div className={styles.scene} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, compact ? 6.8 : 6.2], fov: 42 }}
        dpr={[1, 1.35]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#e0f2fe" />
        <Suspense fallback={null}>
          <OrbitSystem
            key={title}
            skills={skills}
            color={color}
            title={title}
            compact={compact}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkillOrbitScene;
