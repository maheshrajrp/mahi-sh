import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from 'three';
import { DoubleSide, Mesh } from "three";
import nebulaeFragment from './shaders/nebuale-fragment.glsl';
import nebulaeVertex from './shaders/nebulae-vertex.glsl';

type NebulaeProps = {
    position?: [number, number, number]
    debug?: boolean
}

const DebugNebulae = ({ position, rotation, width, height }: any) => {
    const perlinTexture = useTexture('./perlin.png', (texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        return texture;
    })
    const meshRef = useRef<Mesh>(null);
    const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

    const direction = useMemo(() => {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const vec = new THREE.Vector2(x, y);
        vec.normalize();
        return vec;
    }, []);

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
            depthWrite={false}
            transparent
            uniforms={{
                uPerlinTexture: new THREE.Uniform(perlinTexture),
                uTime: new THREE.Uniform(0),
                uDirection: new THREE.Uniform(direction)
            }}
        />
    </mesh>
}

const NebulaeWithControls = ({ position = [-1.8, 0.8, 0] }: NebulaeProps) => {
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
    });

    return <DebugNebulae position={position} rotation={rotation} width={width} height={height} />

}

export const Nebulae = ({ position = [-1.8, 0.8, 0], debug = false }: NebulaeProps) => {
    if (debug) {
        return <NebulaeWithControls position={position} />
    }

    const perlinTexture = useTexture('./perlin.png', (texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        return texture;
    })
    const meshRef = useRef<Mesh>(null);
    const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

    const direction = useMemo(() => {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const vec = new THREE.Vector2(x, y);
        vec.normalize();
        return vec;
    }, []);

    useFrame(({ clock }) => {
        if (!meshRef.current || !shaderMaterialRef.current) return;
        const time = clock.getElapsedTime();
        shaderMaterialRef.current.uniforms.uTime.value = time
    })

    const rotation: [number, number, number] = [7.4, -2, 2];
    const width = 7;
    const height = 18.8;

    return <mesh ref={meshRef} position={position} rotation={rotation}>
        <planeGeometry args={[width, height, 32, 64]}>
        </planeGeometry>
        <shaderMaterial
            ref={shaderMaterialRef}
            side={DoubleSide}
            vertexShader={nebulaeVertex}
            fragmentShader={nebulaeFragment}
            depthWrite={false}
            transparent
            uniforms={{
                uPerlinTexture: new THREE.Uniform(perlinTexture),
                uTime: new THREE.Uniform(0),
                uDirection: new THREE.Uniform(direction)
            }}
        />
    </mesh>
}