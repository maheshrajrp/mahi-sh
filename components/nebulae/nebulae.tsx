import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from 'three';
import { DoubleSide, Mesh } from "three";
import nebulaeFragment from './shaders/nebuale-fragment.glsl';
import nebulaeVertex from './shaders/nebulae-vertex.glsl';

type NebulaeProps = {
    position?: [number, number, number]
}

export const Nebulae = ({ position = [-1.8, 0.8, 0] }: NebulaeProps) => {

    const perlinTexture = useTexture('./perlin.png', (texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        return texture;
    })
    const meshRef = useRef<Mesh>(null);

    const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

    const { rotation, width, height } = useControls({
        rotation: {
            value: [7.4, -2, 2],
            step: 0.1,
        },
        width: {
            value: 7,
            step: 0.1
        },
        height: {
            value: 18.8,
            step: 0.1
        }
    })

    useFrame(({ clock }) => {
        if (!meshRef.current || !shaderMaterialRef.current) return;
        const time = clock.getElapsedTime();
        shaderMaterialRef.current.uniforms.uTime.value = time
    })

    return <mesh ref={meshRef} position={position} rotation={rotation}>
        <planeGeometry args={[width, height, 32, 64]}>
        </planeGeometry>
        <shaderMaterial
            ref={shaderMaterialRef}
            side={DoubleSide}
            vertexShader={nebulaeVertex}
            fragmentShader={nebulaeFragment}
            transparent
            depthWrite={false}
            uniforms={{
                uPerlinTexture: new THREE.Uniform(perlinTexture),
                uTime: new THREE.Uniform(0)
            }}
        />
    </mesh>
}