"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ============================================
// Iron Man Arc Reactor — Premium 3D
// No HTML elements, pure Three.js rendering
// ============================================

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 1.5) * 0.05;
    ref.current.scale.setScalar(scale);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * 1.5);
    }
  });

  return (
    <group>
      {/* Bright core */}
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.3, 5]} />
        <meshStandardMaterial
          color="#00EEFF"
          emissive="#00D9FF"
          emissiveIntensity={4}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Inner glow shell */}
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[0.35, 3]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer atmosphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function TorusRing({
  radius,
  tube,
  rotationAxis,
  speed,
  color,
  emissiveIntensity,
}: {
  radius: number;
  tube: number;
  rotationAxis: [number, number, number];
  speed: number;
  color: string;
  emissiveIntensity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = rotationAxis[0] + t * speed * 0.3;
    ref.current.rotation.y = rotationAxis[1] + t * speed * 0.5;
    ref.current.rotation.z = rotationAxis[2] + t * speed * 0.2;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 32, 128]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        transparent
        opacity={0.6}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function OrbitingParticles({ count = 30 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        radius: 0.5 + Math.random() * 1,
        speed: 0.15 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * Math.PI * 0.8,
        size: 0.008 + Math.random() * 0.015,
      });
    }
    return data;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    particleData.forEach((p, i) => {
      const angle = t * p.speed + p.phase;
      dummy.position.set(
        Math.cos(angle) * p.radius,
        Math.sin(angle) * p.radius * Math.sin(p.tilt),
        Math.sin(angle) * p.radius * Math.cos(p.tilt)
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#00D9FF"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

// Outer energy ring — rotating dashed ring
function EnergyRing({ radius, speed }: { radius: number; speed: number }) {
  const ref = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const points = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        )
      );
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    ref.current.rotation.z = clock.getElapsedTime() * speed;
  });

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color="#00D9FF"
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

export default function ArcReactor() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseTarget.current.x =
        ((e.clientX / window.innerWidth) * 2 - 1) * 0.15;
      mouseTarget.current.y =
        (-(e.clientY / window.innerHeight) * 2 + 1) * 0.15;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    mouseCurrent.current.x +=
      (mouseTarget.current.x - mouseCurrent.current.x) * 0.02;
    mouseCurrent.current.y +=
      (mouseTarget.current.y - mouseCurrent.current.y) * 0.02;
    groupRef.current.rotation.y = mouseCurrent.current.x;
    groupRef.current.rotation.x = -mouseCurrent.current.y;
  });

  return (
    <group ref={groupRef}>
      {/* Core */}
      <CoreSphere />

      {/* Torus rings — different sizes, angles, speeds */}
      <TorusRing
        radius={0.6}
        tube={0.008}
        rotationAxis={[0.3, 0, 0]}
        speed={1}
        color="#00D9FF"
        emissiveIntensity={2}
      />
      <TorusRing
        radius={0.8}
        tube={0.006}
        rotationAxis={[1.2, 0.5, 0]}
        speed={-0.7}
        color="#8B5CF6"
        emissiveIntensity={1.5}
      />
      <TorusRing
        radius={1.0}
        tube={0.005}
        rotationAxis={[0.8, -0.3, 0.6]}
        speed={0.5}
        color="#00D9FF"
        emissiveIntensity={1}
      />
      <TorusRing
        radius={1.2}
        tube={0.004}
        rotationAxis={[0.5, 1.0, -0.2]}
        speed={-0.35}
        color="#8B5CF6"
        emissiveIntensity={0.8}
      />

      {/* Energy rings */}
      <EnergyRing radius={1.4} speed={0.1} />
      <EnergyRing radius={1.6} speed={-0.08} />

      {/* Orbiting particles */}
      <OrbitingParticles count={30} />

      {/* Lights */}
      <pointLight color="#00D9FF" intensity={5} distance={6} decay={2} />
      <pointLight
        color="#8B5CF6"
        intensity={1.5}
        distance={4}
        decay={2}
        position={[0, 0.5, 0]}
      />
    </group>
  );
}
