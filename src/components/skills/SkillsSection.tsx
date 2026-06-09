"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ORBITING_SKILLS } from "@/lib/constants";

// =============================================
// NASA Solar System style — Concentric orbit rings
// Python at center, skills orbit in concentric circles
// =============================================

const RING_CONFIG = [
  { radius: 1.4, speed: 0.12, tilt: 0.0, color: "#00D9FF" },   // Ring 1: Core
  { radius: 2.2, speed: 0.08, tilt: 0.0, color: "#A78BFA" },    // Ring 2: AI
  { radius: 3.0, speed: 0.055, tilt: 0.0, color: "#34D399" },   // Ring 3: Database
  { radius: 3.8, speed: 0.035, tilt: 0.0, color: "#FBBF24" },   // Ring 4: Cloud + Tools
];

const CATEGORY_COLORS: Record<string, string> = {
  core: "#00D9FF",
  ai: "#A78BFA",
  database: "#34D399",
  cloud: "#FBBF24",
  tools: "#F87171",
};

// Canvas-rendered text label (no HTML = no white box)
function CanvasLabel({ text, color }: { text: string; color: string }) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = 256;
    canvas.height = 48;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "600 20px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 4;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [text, color]);

  if (!texture) return null;

  return (
    <sprite scale={[1.0, 0.2, 1]} position={[0, 0.18, 0]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0.85}
        depthWrite={false}
        depthTest={false}
      />
    </sprite>
  );
}

// Center sun — Python
function CenterSun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.03);
    if (glowRef.current) glowRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.04);
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.35, 48, 48]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={3}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>
      {/* Glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Label */}
      <CanvasLabel text="Python" color="#050816" />
      {/* Light */}
      <pointLight color="#00D9FF" intensity={6} distance={10} decay={2} />
    </group>
  );
}

// Orbit ring visual — thin concentric circle (flat on XZ plane)
function OrbitRing({ radius, color }: { radius: number; color: string }) {
  const geometry = useMemo(() => {
    const points = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <>
      {/* @ts-ignore: R3F line type conflicts with SVG line */}
      <line geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.07} />
      </line>
    </>
  );
}

// Skill planet orbiting on its ring
function SkillPlanet({
  name,
  radius,
  speed,
  offset,
  color,
  size,
}: {
  name: string;
  radius: number;
  speed: number;
  offset: number;
  color: string;
  size: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Group>(null);

  useFrame(({ clock, camera }) => {
    if (!groupRef.current || !meshRef.current) return;
    const t = clock.getElapsedTime();
    const angle = t * speed + offset;

    // Orbit on the XZ plane (flat, like NASA view)
    groupRef.current.position.set(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );

    meshRef.current.rotation.y = t * 0.5;

    // Billboard the label
    if (labelRef.current) {
      labelRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Planet sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[size * 2, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Label */}
      <group ref={labelRef} position={[0, size + 0.12, 0]}>
        <CanvasLabel text={name} color={color} />
      </group>
      {/* Light */}
      <pointLight color={color} intensity={0.2} distance={1.5} decay={2} />
    </group>
  );
}

// =============================================
// Solar System Scene
// =============================================

function SolarSystemScene() {
  const sceneRef = useRef<THREE.Group>(null);

  // Distribute skills into rings by category
  const planets = useMemo(() => {
    // Group skills by category
    const categoryToRing: Record<string, number> = {
      core: 0,
      ai: 1,
      database: 2,
      cloud: 3,
      tools: 3,
    };

    // Count how many per ring for even spacing
    const ringCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    const ringCurrentIndex: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    ORBITING_SKILLS.forEach((s) => {
      const ring = categoryToRing[s.category] ?? 3;
      ringCounts[ring]++;
    });

    return ORBITING_SKILLS.map((skill) => {
      const ringIdx = categoryToRing[skill.category] ?? 3;
      const ring = RING_CONFIG[ringIdx];
      const count = ringCounts[ringIdx];
      const idx = ringCurrentIndex[ringIdx]++;
      const offset = (idx / count) * Math.PI * 2;
      const color = CATEGORY_COLORS[skill.category] || "#00D9FF";
      // Larger planets on inner rings, smaller on outer
      const size = 0.09 - ringIdx * 0.01;

      return {
        name: skill.name,
        radius: ring.radius,
        speed: ring.speed,
        offset,
        color,
        size,
      };
    });
  }, []);

  return (
    <group ref={sceneRef} rotation={[0.8, 0, 0.15]}>
      {/* Center */}
      <CenterSun />

      {/* Orbit rings */}
      {RING_CONFIG.map((ring, i) => (
        <OrbitRing key={i} radius={ring.radius} color={ring.color} />
      ))}

      {/* Skill planets */}
      {planets.map((planet) => (
        <SkillPlanet key={planet.name} {...planet} />
      ))}

      <ambientLight intensity={0.12} />
    </group>
  );
}

// =============================================
// Exported Section
// =============================================

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-8">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Tech Radar
        </h2>
        <p
          className="text-base md:text-lg max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Python at the core — technologies orbiting in concentric circles
        </p>
        <div
          className="w-20 h-[2px] mx-auto mt-6"
          style={{
            background: "linear-gradient(90deg, transparent, #00D9FF, transparent)",
          }}
        />
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-[500px] md:h-[650px]">
        <Canvas
          camera={{ position: [0, 3, 6], fov: 50 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <SolarSystemScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {[
          { label: "Core", color: "#00D9FF" },
          { label: "AI / ML", color: "#A78BFA" },
          { label: "Database", color: "#34D399" },
          { label: "Cloud", color: "#FBBF24" },
          { label: "Tools", color: "#F87171" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: item.color, boxShadow: `0 0 6px ${item.color}60` }}
            />
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
