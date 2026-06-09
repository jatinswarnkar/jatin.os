"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// =============================================
// Hero Globe — Dark dot-matrix sphere with
// glowing connections and traveling arc particles
// =============================================

const CONNECTIONS = [
  { name: "Azure", lat: 47.6, lng: -122.3, color: "#0078D4" },
  { name: "AWS", lat: 39.0, lng: -77.5, color: "#FF9900" },
  { name: "OpenAI", lat: 37.8, lng: -122.4, color: "#10B981" },
  { name: "LangChain", lat: 51.5, lng: -0.1, color: "#00D9FF" },
  { name: "PostgreSQL", lat: 59.3, lng: 18.1, color: "#336791" },
  { name: "Django", lat: 48.9, lng: 2.35, color: "#092E20" },
  { name: "India", lat: 20.5, lng: 78.9, color: "#8B5CF6" },
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

function createArc(
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments: number = 50,
  altitude: number = 0.4
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3().lerpVectors(start, end, t);
    const midAlt = Math.sin(t * Math.PI) * altitude;
    point.normalize().multiplyScalar(start.length() + midAlt);
    points.push(point);
  }
  return points;
}

// Animated arc with traveling pulse
function ArcLine({
  points,
  color,
  index,
}: {
  points: THREE.Vector3[];
  color: string;
  index: number;
}) {
  const particleRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  useFrame(({ clock }) => {
    if (!particleRef.current) return;
    const t = clock.getElapsedTime();
    const progress = ((t * 0.25 + index * 0.6) % 2) / 2;
    const idx = Math.floor(progress * (points.length - 1));
    const next = Math.min(idx + 1, points.length - 1);
    const frac = progress * (points.length - 1) - idx;
    const pos = new THREE.Vector3().lerpVectors(points[idx], points[next], frac);
    particleRef.current.position.copy(pos);
  });

  return (
    <group>
      <line geometry={geometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </line>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function HeroGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  // Mouse interaction
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseTarget.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.2;
      mouseTarget.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.15;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    if (!globeRef.current) return;
    // Smooth lerp for mouse follow
    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.02;
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.02;
    // Auto rotation + mouse influence
    globeRef.current.rotation.y += 0.0015;
    globeRef.current.rotation.x = -0.2 + mouseCurrent.current.y;
    globeRef.current.rotation.y += mouseCurrent.current.x * 0.01;
  });

  // Dot grid — 5000 points for dense look
  const dotGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < 5000; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.8;
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      const b = 0.15 + Math.random() * 0.2;
      colors.push(0, b * 0.85, b);
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  const connectionPoints = useMemo(
    () => CONNECTIONS.map((c) => ({ ...c, pos: latLngToVec3(c.lat, c.lng, 1.8) })),
    []
  );

  const arcs = useMemo(() => {
    const result: { points: THREE.Vector3[]; color: string }[] = [];
    for (let i = 0; i < connectionPoints.length; i++) {
      for (let j = i + 1; j < connectionPoints.length; j++) {
        // Only some connections (not all pairs)
        if (Math.abs(i - j) <= 2 || (i === 0 && j === connectionPoints.length - 1)) {
          result.push({
            points: createArc(connectionPoints[i].pos, connectionPoints[j].pos, 50, 0.45),
            color: connectionPoints[i].color,
          });
        }
      }
    }
    return result;
  }, [connectionPoints]);

  return (
    <group ref={globeRef}>
      {/* Dark base sphere */}
      <mesh>
        <sphereGeometry args={[1.78, 64, 64]} />
        <meshStandardMaterial
          color="#080C1A"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Atmosphere rim glow */}
      <mesh>
        <sphereGeometry args={[1.92, 48, 48]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Dot grid */}
      <points geometry={dotGeometry}>
        <pointsMaterial
          vertexColors
          size={0.018}
          transparent
          opacity={0.65}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection nodes */}
      {connectionPoints.map((conn) => (
        <group key={conn.name} position={conn.pos}>
          <mesh>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color={conn.color} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial
              color={conn.color}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <pointLight color={conn.color} intensity={0.4} distance={0.8} decay={2} />
        </group>
      ))}

      {/* Arcs */}
      {arcs.map((arc, i) => (
        <ArcLine key={i} points={arc.points} color={arc.color} index={i} />
      ))}

      {/* Center light */}
      <pointLight color="#00D9FF" intensity={0.2} distance={5} decay={2} />
    </group>
  );
}
