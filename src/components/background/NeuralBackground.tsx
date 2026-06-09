"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ========================================
// Neural Network Node System
// ========================================

const NODE_COUNT = 80;
const CONNECTION_DISTANCE = 2.8;
const FIELD_SIZE = 12;
const HALF_FIELD = FIELD_SIZE / 2;

function NeuralNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Generate initial positions
  const { positions, velocities, dummy, linePositions, colors } =
    useMemo(() => {
      const positions = new Float32Array(NODE_COUNT * 3);
      const velocities = new Float32Array(NODE_COUNT * 3);
      const dummy = new THREE.Object3D();

      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * FIELD_SIZE;
        positions[i3 + 1] = (Math.random() - 0.5) * FIELD_SIZE;
        positions[i3 + 2] = (Math.random() - 0.5) * 4;

        velocities[i3] = (Math.random() - 0.5) * 0.003;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;
      }

      const maxConnections = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
      const linePositions = new Float32Array(maxConnections * 6);
      const colors = new Float32Array(maxConnections * 6);

      return { positions, velocities, dummy, linePositions, colors };
    }, []);

  // Handle mouse tracking for parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.5;
      mouse.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.5;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !lineRef.current) return;

    const time = state.clock.getElapsedTime();

    // Update node positions
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      positions[i3] += Math.sin(time * 0.1 + i) * 0.0005;
      positions[i3 + 1] += Math.cos(time * 0.15 + i * 0.5) * 0.0005;

      if (Math.abs(positions[i3]) > HALF_FIELD) velocities[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > HALF_FIELD) velocities[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > 2) velocities[i3 + 2] *= -1;

      const parallaxX = mouse.current.x * 0.3;
      const parallaxY = mouse.current.y * 0.3;

      dummy.position.set(
        positions[i3] + parallaxX,
        positions[i3 + 1] + parallaxY,
        positions[i3 + 2]
      );

      const scale = 0.025 + Math.sin(time * 0.5 + i * 0.3) * 0.008;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update connections
    let connectionIndex = 0;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const ci = connectionIndex * 6;

          // Cyan to purple gradient based on Y position
          const mixFactor =
            (positions[i3 + 1] + HALF_FIELD) / FIELD_SIZE;

          linePositions[ci] = positions[i3];
          linePositions[ci + 1] = positions[i3 + 1];
          linePositions[ci + 2] = positions[i3 + 2];
          linePositions[ci + 3] = positions[j3];
          linePositions[ci + 4] = positions[j3 + 1];
          linePositions[ci + 5] = positions[j3 + 2];

          const r = THREE.MathUtils.lerp(0, 0.55, mixFactor);
          const g = THREE.MathUtils.lerp(0.85, 0.36, mixFactor);
          const b = THREE.MathUtils.lerp(1, 0.96, mixFactor);

          colors[ci] = r;
          colors[ci + 1] = g;
          colors[ci + 2] = b;
          colors[ci + 3] = r;
          colors[ci + 4] = g;
          colors[ci + 5] = b;

          connectionIndex++;
        }
      }
    }

    const geometry = lineRef.current.geometry;
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        linePositions.slice(0, connectionIndex * 6),
        3
      )
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(
        colors.slice(0, connectionIndex * 6),
        3
      )
    );
    geometry.computeBoundingSphere();
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.6} />
      </instancedMesh>

      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// ========================================
// Main Background Component
// ========================================

export default function NeuralBackground() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <NeuralNodes />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}
