"use client"

import { Stars } from '@/components/stars'
import { CameraControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'


// r150
THREE.ColorManagement.enabled = true


export default function App() {

  return <Canvas camera={{ position: [3, 3, 3] }}>
    <CameraControls />
    <Stats />
    <mesh >
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
    <Stars />
  </Canvas>
}