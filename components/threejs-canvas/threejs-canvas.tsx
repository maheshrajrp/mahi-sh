import Asteroids from '@/components/asteroids/asteroids'
import { Nebulae } from '@/components/nebulae/nebulae'
import { ProjectBoards } from '@/components/project-boards/project-boards'
import { Stars } from '@/components/stars/stars'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Content } from '../html/content'

export const ThreeJSCanvas = ({ children }: { children?: React.ReactNode }) => {
    return <>
        <Canvas gl={{ stencil: true }} >
            <ambientLight intensity={1} />
            <Stars />
            <ProjectBoards />
            <Asteroids />
            <Content />
            <Nebulae />
            <OrbitControls autoRotate autoRotateSpeed={0.08} />
        </Canvas>
    </>
}