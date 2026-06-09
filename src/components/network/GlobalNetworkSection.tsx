"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

// =============================================
// Music-Globe inspired 3D Globe
// Dark sphere + glowing point grid + arc connections
// =============================================

const CONNECTIONS = [
  { name: "Azure", lat: 47.6, lng: -122.3, color: "#0078D4" },
  { name: "AWS", lat: 39.0, lng: -77.5, color: "#FF9900" },
  { name: "OpenAI", lat: 37.8, lng: -122.4, color: "#10B981" },
  { name: "LangChain", lat: 51.5, lng: -0.1, color: "#00D9FF" },
  { name: "PostgreSQL", lat: 59.3, lng: 18.1, color: "#336791" },
];

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// Create a curved arc between two points on the sphere
function createArc(
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments: number = 50,
  altitude: number = 0.4
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Slerp between start and end
    const point = new THREE.Vector3().lerpVectors(start, end, t);
    // Add altitude in the middle (arc curve)
    const midAlt = Math.sin(t * Math.PI) * altitude;
    point.normalize().multiplyScalar(start.length() + midAlt);
    points.push(point);
  }
  return points;
}

// =============================================
// Dark Earth Globe
// =============================================

function DarkEarth() {
  const globeRef = useRef<THREE.Group>(null);
  const dotsRef = useRef<THREE.Points>(null);

  // Auto rotation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  // Globe dot grid (like a dot-matrix earth)
  const dotGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    const count = 4000;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      positions.push(x, y, z);

      // Subtle color variation cyan-blue
      const brightness = 0.15 + Math.random() * 0.15;
      colors.push(0, brightness * 0.85, brightness);
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  // Connection points and arcs
  const connectionPoints = useMemo(
    () => CONNECTIONS.map((c) => ({ ...c, pos: latLngToVec3(c.lat, c.lng, 2) })),
    []
  );

  // Generate arcs between all connection pairs
  const arcs = useMemo(() => {
    const result: { points: THREE.Vector3[]; color: string }[] = [];
    for (let i = 0; i < connectionPoints.length; i++) {
      for (let j = i + 1; j < connectionPoints.length; j++) {
        const arcPoints = createArc(
          connectionPoints[i].pos,
          connectionPoints[j].pos,
          50,
          0.5
        );
        result.push({
          points: arcPoints,
          color: connectionPoints[i].color,
        });
      }
    }
    return result;
  }, [connectionPoints]);

  return (
    <group ref={globeRef}>
      {/* Dark base sphere */}
      <mesh>
        <sphereGeometry args={[1.98, 64, 64]} />
        <meshStandardMaterial
          color="#050816"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Atmosphere rim */}
      <mesh>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Dot grid */}
      <points geometry={dotGeometry}>
        <pointsMaterial
          vertexColors
          size={0.02}
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection nodes — glowing spheres */}
      {connectionPoints.map((conn) => (
        <group key={conn.name} position={conn.pos}>
          {/* Node sphere */}
          <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color={conn.color} />
          </mesh>

          {/* Glow */}
          <mesh>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial
              color={conn.color}
              transparent
              opacity={0.15}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Vertical bar (like music-globe) */}
          <mesh position={conn.pos.clone().normalize().multiplyScalar(0.15)}>
            <cylinderGeometry args={[0.008, 0.008, 0.3, 8]} />
            <meshBasicMaterial
              color={conn.color}
              transparent
              opacity={0.6}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Label — canvas texture */}
          <GlobeLabel
            text={conn.name}
            color={conn.color}
            position={conn.pos.clone().normalize().multiplyScalar(0.4)}
          />

          <pointLight color={conn.color} intensity={0.5} distance={1} decay={2} />
        </group>
      ))}

      {/* Glowing arc connections */}
      {arcs.map((arc, i) => (
        <ArcLine key={i} points={arc.points} color={arc.color} index={i} />
      ))}

      {/* Ambient glow from center */}
      <pointLight color="#00D9FF" intensity={0.3} distance={6} decay={2} />
    </group>
  );
}

// Animated arc line with traveling particle
function ArcLine({
  points,
  color,
  index,
}: {
  points: THREE.Vector3[];
  color: string;
  index: number;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const particleRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  // Animate particle traveling along arc
  useFrame(({ clock }) => {
    if (!particleRef.current) return;
    const t = clock.getElapsedTime();
    const progress = ((t * 0.3 + index * 0.7) % 2) / 2; // Loop 0-1
    const idx = Math.floor(progress * (points.length - 1));
    const next = Math.min(idx + 1, points.length - 1);
    const frac = progress * (points.length - 1) - idx;

    const pos = new THREE.Vector3().lerpVectors(points[idx], points[next], frac);
    particleRef.current.position.copy(pos);
  });

  return (
    <group>
      <line geometry={geometry} ref={lineRef}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </line>

      {/* Traveling particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Canvas-texture label (no HTML white background)
function GlobeLabel({
  text,
  color,
  position,
}: {
  text: string;
  color: string;
  position: THREE.Vector3;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = 256;
    canvas.height = 64;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 22px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [text, color]);

  return (
    <sprite position={position} scale={[0.8, 0.2, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0.6}
        depthWrite={false}
        depthTest={false}
      />
    </sprite>
  );
}

// Camera animation
function CameraController() {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Gentle camera sway
    camera.position.x = Math.sin(t * 0.1) * 0.3;
    camera.position.y = 1.5 + Math.sin(t * 0.15) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// =============================================
// Exported Section
// =============================================

export default function GlobalNetworkSection() {
  return (
    <SectionWrapper id="network">
      {/* Section heading */}
      <div className="text-center mb-8">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Global Network
        </h2>
        <p
          className="text-base md:text-lg max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Connected across cloud platforms, AI services, and data infrastructure
        </p>
        <div
          className="w-20 h-[2px] mx-auto mt-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00D9FF, transparent)",
          }}
        />
      </div>

      {/* Globe */}
      <div className="w-full h-[500px] md:h-[600px]">
        <Canvas
          camera={{ position: [0, 1.5, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.5,
          }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <DarkEarth />
            <CameraController />
            <ambientLight intensity={0.05} />
          </Suspense>
        </Canvas>
      </div>
    </SectionWrapper>
  );
}
