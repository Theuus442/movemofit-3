import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { Suspense, memo } from "react";

interface OrbitalBackgroundProps {
  intensity?: number;
}

function OrbitalBackgroundBase({ intensity = 1 }: OrbitalBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.4 * intensity} />
        <pointLight position={[10, 10, 10]} intensity={0.6 * intensity} />
        <Suspense fallback={null}>
          <Stars
            radius={120}
            depth={50}
            count={5000}
            factor={3}
            saturation={0}
            fade
            speed={0.6}
          />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
    </div>
  );
}

export const OrbitalBackground = memo(OrbitalBackgroundBase);
