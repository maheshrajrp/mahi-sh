"use client"

import Asteroids from '@/components/asteroids/asteroids'
import { Nebulae } from '@/components/nebulae/nebulae'
import { Atom, ProjectBoards } from '@/components/project-boards/project-boards'
import { Stars } from '@/components/stars/stars'
import { CameraControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'

export default function App() {

  const { nebulaePositionOne, nebulaePositionTwo } = useControls({
    nebulaePositionOne: {
      value: [-1.8, 0.8, 0],
      step: 0.1
    },
    nebulaePositionTwo: {
      value: [+1.8, 3, 0],
      step: 0.1
    }
  })

  return <>
    <Leva collapsed hidden />
    <Canvas gl={{ stencil: true }} >
      <ambientLight intensity={1} />
      <CameraControls />
      <Stats />
      <Stars />
      <Nebulae position={nebulaePositionOne} />
      <Nebulae
        position={nebulaePositionTwo} />
      <ProjectBoards />
      <Atom />
      <Asteroids />
    </Canvas>
  </>
}