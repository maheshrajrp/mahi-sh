import { useFrame, useLoader } from "@react-three/fiber"
import { useMemo } from "react"
import { AdditiveBlending, DoubleSide, TextureLoader } from "three"

export const Stars = () => {


    useFrame((state, delta, xrFrame) => {

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

    const points = useMemo(() => {
        const maxCount = 4000
        const tempArr = new Float32Array(maxCount * 3)
        for (let i = 0; i < maxCount * 3; i++) {
            tempArr[i] = (Math.random() - 0.5) * 100
        }
        return tempArr
    }, [])

    return <>
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[points, 3]} />
            </bufferGeometry>
            <pointsMaterial
                alphaMap={textures[5]}
                transparent
                sizeAttenuation={true}
                size={0.2}
                alphaTest={0.001}
                side={DoubleSide}
                blending={AdditiveBlending} />
        </points>
        <mesh>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh>
    </>
}