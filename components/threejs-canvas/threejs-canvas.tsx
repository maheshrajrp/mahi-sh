import Asteroids from '@/components/asteroids/asteroids'
import { ProjectBoards } from '@/components/project-boards/project-boards'
import { Stars } from '@/components/stars/stars'
import { CameraControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export const ThreeJSCanvas = ({ children }: { children?: React.ReactNode }) => {
    return <>
        <Canvas gl={{ stencil: true }} >
            <ambientLight intensity={1} />
            <CameraControls />
            <Stats />
            <Stars />
            <ProjectBoards />
            <Asteroids />
        </Canvas>
    </>
}