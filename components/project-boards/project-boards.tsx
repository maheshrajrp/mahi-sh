import { Mask, useMask } from "@react-three/drei"

export const Atom = () => {

    const stencil = useMask(1)

    return <></>
}

export const ProjectBoards = () => {
    return <>
        <Mask position={[3, 0, 0]} rotation={[0, -Math.PI / 6, 0]} id={1}>
            <planeGeometry args={[2, 4]} />
        </Mask>
        <Mask position={[-3, 0, 0]} rotation={[0, Math.PI / 6, 0]} id={2}>
            <planeGeometry args={[2, 4]} />
        </Mask>
    </>
}
