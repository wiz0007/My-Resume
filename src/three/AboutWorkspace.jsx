import React, { Suspense, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, RoundedBox } from "@react-three/drei";
import { Vector3 } from "three";
import styles from "./AboutWorkspace.module.scss";
import { useReducedMotionPreference } from "../hooks/useMediaPreferences";

const focusTargets = {
  about: { camera: [-2.8, 2.4, 6.8], look: [-1.15, 0.15, 0] },
  education: { camera: [3.1, 2.2, 6.5], look: [1.35, -0.25, 0] },
  experience: { camera: [0.2, 2.6, 6.2], look: [0.15, 0.5, -0.3] },
  achievements: { camera: [3.2, 2.8, 5.7], look: [2.05, 0.65, -0.2] },
};

const CameraRig = ({ active, reducedMotion }) => {
  const { camera, size } = useThree();
  const target = useMemo(() => new Vector3(), []);
  const lookAt = useMemo(() => new Vector3(), []);

  useFrame(() => {
    const focus = focusTargets[active];
    const narrow = size.width / size.height < 1.08;
    target.set(
      focus.camera[0] * (narrow ? 0.62 : 1),
      focus.camera[1] + (narrow ? 0.2 : 0),
      focus.camera[2] + (narrow ? 1.35 : -0.2),
    );
    lookAt.set(...focus.look);

    if (reducedMotion) {
      camera.position.copy(target);
    } else {
      camera.position.lerp(target, 0.045);
    }
    camera.lookAt(lookAt);
  });

  return null;
};

const InteractiveObject = ({ active, id, onSelect, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      scale={active === id ? 1.08 : hovered ? 1.04 : 1}
    >
      {children}
      {(active === id || hovered) && (
        <pointLight color={active === id ? "#22d3ee" : "#8b5cf6"} intensity={2.2} distance={2.4} />
      )}
    </group>
  );
};

const LaptopObject = ({ active, onSelect }) => (
  <InteractiveObject id="about" active={active} onSelect={onSelect}>
    <group position={[-1.55, -0.62, 0.45]} rotation={[0, 0.25, 0]}>
      <RoundedBox args={[1.45, 0.1, 0.9]} radius={0.05}>
        <meshStandardMaterial color="#253047" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <RoundedBox position={[0, 0.58, -0.36]} rotation={[-0.15, 0, 0]} args={[1.4, 1.02, 0.08]} radius={0.05}>
        <meshStandardMaterial color="#0a1324" metalness={0.55} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.59, -0.31]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[1.2, 0.82]} />
        <meshStandardMaterial color="#083344" emissive="#0891b2" emissiveIntensity={0.72} />
      </mesh>
    </group>
  </InteractiveObject>
);

const BooksObject = ({ active, onSelect }) => (
  <InteractiveObject id="education" active={active} onSelect={onSelect}>
    <group position={[1.35, -0.55, 0.45]} rotation={[0, -0.22, 0.02]}>
      {["#8b5cf6", "#06b6d4", "#10b981"].map((color, index) => (
        <RoundedBox
          key={color}
          position={[index * 0.03, index * 0.2, 0]}
          rotation={[0, index * 0.05, index % 2 ? 0.04 : -0.03]}
          args={[1.15, 0.18, 0.72]}
          radius={0.035}
        >
          <meshStandardMaterial color={color} metalness={0.35} roughness={0.42} />
        </RoundedBox>
      ))}
    </group>
  </InteractiveObject>
);

const MonitorObject = ({ active, onSelect }) => (
  <InteractiveObject id="experience" active={active} onSelect={onSelect}>
    <group position={[0.05, 0.05, -0.35]}>
      <RoundedBox args={[1.75, 1.28, 0.12]} radius={0.06}>
        <meshStandardMaterial color="#111827" metalness={0.68} roughness={0.28} />
      </RoundedBox>
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[1.5, 1.02]} />
        <meshStandardMaterial color="#171044" emissive="#6d28d9" emissiveIntensity={0.58} />
      </mesh>
      <mesh position={[0, -0.83, -0.02]}>
        <cylinderGeometry args={[0.1, 0.13, 0.45, 20]} />
        <meshStandardMaterial color="#273449" metalness={0.72} roughness={0.3} />
      </mesh>
    </group>
  </InteractiveObject>
);

const TrophyObject = ({ active, onSelect }) => (
  <InteractiveObject id="achievements" active={active} onSelect={onSelect}>
    <group position={[2.05, 0.28, -0.2]}>
      <mesh>
        <cylinderGeometry args={[0.34, 0.22, 0.68, 24]} />
        <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={0.35} metalness={0.82} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.09, 0.13, 0.38, 18]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.22} />
      </mesh>
      <RoundedBox position={[0, -0.78, 0]} args={[0.62, 0.16, 0.5]} radius={0.04}>
        <meshStandardMaterial color="#78350f" metalness={0.45} roughness={0.42} />
      </RoundedBox>
      <mesh position={[-0.36, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.055, 12, 28, Math.PI]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.36, 0.07, 0]} rotation={[Math.PI / 2, Math.PI, 0]}>
        <torusGeometry args={[0.25, 0.055, 12, 28, Math.PI]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  </InteractiveObject>
);

const Room = ({ active, onSelect, reducedMotion }) => (
  <>
    <CameraRig active={active} reducedMotion={reducedMotion} />
    <ambientLight intensity={0.7} />
    <directionalLight position={[4, 6, 5]} intensity={1.5} color="#e0f2fe" />
    <pointLight position={[-3, 2, 2]} color="#22d3ee" intensity={2} distance={7} />
    <pointLight position={[3, 1, 1]} color="#8b5cf6" intensity={1.8} distance={6} />

    <mesh position={[0, 1.15, -1.22]}>
      <planeGeometry args={[7, 4.8]} />
      <meshStandardMaterial color="#0d1728" roughness={0.88} />
    </mesh>
    <mesh position={[-3.15, 1.15, 0]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[2.5, 4.8]} />
      <meshStandardMaterial color="#101c30" roughness={0.9} />
    </mesh>
    <RoundedBox position={[0, -1.04, 0.1]} args={[5.25, 0.18, 2.25]} radius={0.06}>
      <meshStandardMaterial color="#182338" metalness={0.5} roughness={0.4} />
    </RoundedBox>
    <LaptopObject active={active} onSelect={onSelect} />
    <BooksObject active={active} onSelect={onSelect} />
    <MonitorObject active={active} onSelect={onSelect} />
    <TrophyObject active={active} onSelect={onSelect} />

    <Grid
      position={[0, -1.18, 0]}
      args={[8, 7]}
      cellSize={0.42}
      cellThickness={0.3}
      cellColor="#164e63"
      sectionSize={2.1}
      sectionThickness={0.6}
      sectionColor="#312e81"
      fadeDistance={8}
      infiniteGrid
    />
  </>
);

const AboutWorkspace = ({ active, onSelect }) => {
  const reducedMotion = useReducedMotionPreference();

  return (
    <div className={styles.scene}>
      <Canvas
        camera={{ position: [-2.8, 2.4, 6.6], fov: 38 }}
        dpr={[1, 1.35]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Room active={active} onSelect={onSelect} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AboutWorkspace;
