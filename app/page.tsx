"use client"

import { Stars } from '@/components/stars'
import { CameraControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'


// r150
THREE.ColorManagement.enabled = true


export default function App() {

  return <Canvas >
    <CameraControls />
    <Stars />
  </Canvas>
}