import { Mask, useMask } from "@react-three/drei"

export const Atom = () => {

    const stencil = useMask(1)

    return <></>
}

export const ProjectBoards = () => {
    return <>
        <Mask position={[1, 0, 2]} id={1}>
            <planeGeometry args={[3, 3]} />
        </Mask>
    </>
}
