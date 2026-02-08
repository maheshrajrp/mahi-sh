"use client"
import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main className="h-full">
      <Canvas orthographic>
        <CameraControls />
        <mesh>
          <torusKnotGeometry args={[1, 0.4, 100, 16]} />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </main>
  );
}
