import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Ring({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.6,
    roughness: 0.25,
    emissive: new THREE.Color(color).multiplyScalar(0.35),
    emissiveIntensity: 1.4,
  }), [color]);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.25;
    mesh.current.rotation.y += delta * 0.18;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.2, 0.35, 220, 32, 2, 3]} />
        <primitive object={material} attach="material" />
      </mesh>
    </Float>
  );
}

export function Portal3D({ color = "#00FFFF" }: { color?: string }) {
  return (
    <div className="relative h-[340px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Ring color={color} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)]" />
    </div>
  );
}
