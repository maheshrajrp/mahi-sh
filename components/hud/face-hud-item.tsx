"use client"

import { useThree } from "@react-three/fiber"
import { useLayoutEffect, useRef, useState } from "react"
import { Box3, Group, Vector3 } from "three"

type FaceHudItemProps = {
    margin?: [number, number]
    align?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
}

export const FaceHudItem: React.FC<React.PropsWithChildren<FaceHudItemProps>> = ({ align = 'center', margin = [0, 0], children }) => {

    const { viewport } = useThree()
    const group = useRef<Group>(null!)
    const [size, setSize] = useState({ x: 0, y: 0, z: 0 });

    useLayoutEffect(() => {
        if (group.current) {
            const box = new Box3().setFromObject(group.current);
            const boxSize = box.getSize(new Vector3());
            setSize(boxSize);
        }
    }, [children]);


    // Responsive logic usually happens in useFrame or just via reactive viewport
    // Because 'viewport' changes on window resize, this component will re-render 
    // with the new math automatically.

    const xOffset = viewport.width / 2
    const yOffset = viewport.height / 2

    let x = 0
    let y = 0

    // Calculate position based on alignment props
    switch (align) {
        case 'top-left':
            x = -xOffset + margin[0] + size.x / 2
            y = yOffset - margin[1] - size.y / 2
            break
        case 'top-right':
            x = xOffset - margin[0] - size.x / 2
            y = yOffset - margin[1] - size.y / 2
            break
        case 'bottom-left':
            x = -xOffset + margin[0] + size.x / 2
            y = -yOffset + margin[1] + size.y / 2
            break
        case 'bottom-right':
            x = xOffset - margin[0] - size.x / 2
            y = -yOffset + margin[1] + size.y / 2
            break
        default: // center
            x = margin[0]
            y = margin[1]
    }

    console.log("Position", x, y)

    return (
        <group ref={group} position={[x, y, 0]}>
            <group>
                {children}
            </group>
        </group>
    )
}