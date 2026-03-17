import Asteroids from '@/components/asteroids/asteroids'
import { Nebulae } from '@/components/nebulae/nebulae'
import { ProjectBoards } from '@/components/project-boards/project-boards'
import { Stars } from '@/components/stars/stars'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export const ThreeJSCanvas = ({ children }: { children?: React.ReactNode }) => {
    return <>
        <Canvas gl={{ stencil: true }} camera={{ position: [0, 0, 10] }}>
            {/* <ambientLight intensity={1} /> */}
            <Stars />
            <ProjectBoards />
            <Asteroids />
            <Nebulae />
            <OrbitControls autoRotate autoRotateSpeed={0.08} />
        </Canvas>
    </>
}