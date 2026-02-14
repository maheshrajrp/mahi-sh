import { Cloud, Clouds } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from 'three'

export const SpaceClouds = () => {

    const cloudRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null)
    useFrame((state, delta) => {
        if (cloudRef.current) {
            cloudRef.current.position.y += delta * 0.001
            cloudRef.current.position.x += delta * 0.09
        }
    })

    return <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud ref={cloudRef} speed={0.1} bounds={[10, 10, 10]} volume={0.001} concentrate='outside' opacity={0.5} color={new THREE.Color('grey')} />
    </Clouds>
}