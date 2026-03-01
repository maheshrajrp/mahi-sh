import Asteroids from '@/components/asteroids/asteroids'
import { ProjectBoards } from '@/components/project-boards/project-boards'
import { Stars } from '@/components/stars/stars'
import { Scroll, ScrollControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Content } from '../html/content'

export const ThreeJSCanvas = ({ children }: { children?: React.ReactNode }) => {
    return <>
        <Canvas gl={{ stencil: true }} >
            <ScrollControls pages={4}>
                <ambientLight intensity={1} />
                <Stats />
                <Stars />
                <ProjectBoards />
                <Asteroids />
                <Scroll html>
                    <Content />
                </Scroll>
            </ScrollControls>
        </Canvas>
    </>
}