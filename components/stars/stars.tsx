import { useFrame, useLoader } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { AdditiveBlending, ShaderMaterial, TextureLoader } from "three"
import starFragment from './star-shader/star-fragment.glsl'
import starVertex from './star-shader/star-vertex.glsl'

const MAX_COUNT = 9000 * 10

export const Stars = () => {

    const materialRef = useRef<ShaderMaterial>(null)

    useFrame((state, delta) => {

        const { clock } = state
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
        }
    })


    const textures = useLoader(TextureLoader, [
        'star_1.png',
        'star_2.png',
        'star_3.png',
        'star_4.png',
        'star_5.png',
        'star_6.png',
        'star_7.png',
        'star_8.png',
    ])

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uTexture: { value: textures[5] }
    }), [textures])

    const points = useMemo(() => {
        const maxCount = MAX_COUNT
        const tempArr = new Float32Array(maxCount * 3)
        for (let i = 0; i < maxCount * 3; i++) {
            tempArr[i] = (Math.random() - 0.5) * 100
        }
        return tempArr
    }, [])

    const aRandom = useMemo(() => {
        const maxCount = MAX_COUNT
        const tempArr = new Float32Array(maxCount)
        for (let i = 0; i < maxCount; i++) {
            tempArr[i] = Math.random() * 3
        }
        return tempArr
    }, [])

    return <>
        <points renderOrder={-1}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[points, 3]} />
                <bufferAttribute attach="attributes-aRandom" args={[aRandom, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={starVertex}
                fragmentShader={starFragment}
                depthWrite={false}
                depthTest={true}
                transparent={false}
                blending={AdditiveBlending}
                uniforms={uniforms}
            />
        </points>
    </>
}