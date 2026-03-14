"use client"

import { ThreeJSCanvas } from "@/components/threejs-canvas/threejs-canvas";
import { WelcomeSection } from "@/components/welcome-section";


export default function App() {

  return (
    <>
      <WelcomeSection />
      <ThreeJSCanvas />
    </>
  );
}
